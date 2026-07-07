import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_COUNTRY_BY_CODE } from "../features/countries/queries";
import type { Country } from "../features/countries/types";
import { useFavourites } from "../features/countries/hooks/useFavourites";
import { useTrackRecentlyViewed } from "../features/countries/hooks/useRecentlyViewed";
import { copyToClipboard } from "../utils/copyToClipboard";

type CountryQueryData = {
  country: Country | null;
};

function CountryDetailsPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<CountryQueryData>(
    GET_COUNTRY_BY_CODE,
    {
      variables: { code },
      skip: !code,
    },
  );

  const { isFavourite, toggleFavourite } = useFavourites();

  useTrackRecentlyViewed(code);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCopyCode = async () => {
    if (!code) return;
    await copyToClipboard(data?.country?.phone ?? "");
    alert("Copied");
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
        <div className="h-40 bg-slate-800 rounded animate-pulse" />
        <div className="h-40 bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg border border-red-700 bg-red-950/40 text-red-200">
        <h1 className="text-lg font-semibold">Failed to load country</h1>
        <p className="text-sm mt-1">{error.message}</p>
        <button
          type="button"
          onClick={handleBack}
          className="mt-4 px-4 py-2 rounded bg-slate-800 text-slate-100 cursor-pointer"
        >
          Back
        </button>
      </div>
    );
  }

  if (!data?.country) {
    return (
      <div className="p-4">
        <p className="text-slate-300">Country not found.</p>
        <button
          type="button"
          onClick={handleBack}
          className="mt-4 px-4 py-2 rounded bg-slate-800 text-slate-100"
        >
          Back
        </button>
      </div>
    );
  }

  const country = data.country;
  const favourite = isFavourite(country.code);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="px-3 py-1 rounded bg-slate-800 text-sm cursor-pointer"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {country.name}
                {country.native && (
                  <span className="text-sm text-slate-400">
                    ({country.native})
                  </span>
                )}
              </h1>
              <p className="text-sm text-slate-400">
                {country.code} · {country.continent.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3 py-1 rounded bg-slate-800 text-sm cursor-pointer"
          >
            Copy Code
          </button>
          <button
            type="button"
            onClick={() => toggleFavourite(country.code)}
            className={`px-3 py-1 rounded text-sm font-semibold cursor-pointer ${
              favourite
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-800 text-slate-100"
            }`}
          >
            {favourite ? "Remove Favourite" : "Add Favourite"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
          <h2 className="text-lg font-semibold mb-3">Basic Info</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Capital</dt>
              <dd className="text-slate-100">{country.capital ?? "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Currency</dt>
              <dd className="text-slate-100">{country.currency ?? "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Phone Code</dt>
              <dd className="text-slate-100">
                {country.phone ? `+${country.phone}` : "N/A"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Continent</dt>
              <dd className="text-slate-100">{country.continent.name}</dd>
            </div>
          </dl>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
          <h2 className="text-lg font-semibold mb-3">Languages</h2>
          {country.languages.length === 0 ? (
            <p className="text-sm text-slate-400">No languages listed.</p>
          ) : (
            <ul className="list-disc pl-5 text-sm">
              {country.languages.map((lang) => (
                <li key={lang.code}>
                  {lang.name} ({lang.code})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
        <h2 className="text-lg font-semibold mb-3">States</h2>
        {country.states && country.states.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {country.states.map((state) => (
              <li
                key={state.code ?? state.name}
                className="px-3 py-2 rounded bg-slate-800"
              >
                {state.name}
                {state.code && (
                  <span className="text-slate-400 text-xs ml-2">
                    ({state.code})
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No states information.</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetailsPage;
