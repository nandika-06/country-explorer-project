import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { GET_COUNTRIES } from "../features/countries/queries";
import type { Country } from "../features/countries/types";
import { useFavourites } from "../features/countries/hooks/useFavourites";

type CountriesQueryData = {
  countries: Country[];
};

// type SortOption = "name-asc" | "name-desc" | "code-asc" | "code-desc";

function FavouritesPage() {
  const navigate = useNavigate();
  const { favourites, removeFavourite } = useFavourites();
  const { data, loading, error } = useQuery<CountriesQueryData>(GET_COUNTRIES);

  const [search, setSearch] = useState("");
  // const [sort, setSort] = useState<SortOption>("name-asc");

  const favouriteCountries = useMemo(() => {
    const all = data?.countries ?? [];
    const favSet = new Set(favourites);

    let list = all.filter((c) => favSet.has(c.code));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          (c.capital ?? "").toLowerCase().includes(q),
      );
    }

    // switch (sort) {
    //   case "name-asc":
    //     list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    //     break;
    //   case "name-desc":
    //     list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    //     break;
    //   case "code-asc":
    //     list = [...list].sort((a, b) => a.code.localeCompare(b.code));
    //     break;
    //   case "code-desc":
    //     list = [...list].sort((a, b) => b.code.localeCompare(a.code));
    //     break;
    // }

    return list;
  }, [
    data,
    favourites,
    search,
    // sort
  ]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 dark:bg-slate-800 shadow-md bg-slate-200 rounded animate-pulse" />
        <div className="h-40 dark:bg-slate-800 shadow-md bg-slate-200 rounded animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg border border-red-700 bg-red-950/40 text-red-200">
        <h1 className="text-lg font-semibold">Failed to load favourites</h1>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  if (!favouriteCountries.length) {
    return (
      <div className="p-4 space-y-3">
        <h1 className="text-2xl font-bold mb-2">Favourites</h1>
        <p className="text-sm text-slate-400">
          You have no favourite countries yet.
        </p>
        <button
          type="button"
          onClick={() => navigate("/countries")}
          className="px-4 py-2 rounded bg-emerald-500 text-slate-950 font-semibold cursor-pointer"
        >
          Browse countries
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Favourites</h1>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search favourites"
            className="px-3 py-2 rounded dark:bg-slate-900 border border-slate-800 text-sm"
          />
          {/* <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-2 rounded bg-slate-900 border border-slate-800 text-sm"
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="code-asc">Code (A → Z)</option>
            <option value="code-desc">Code (Z → A)</option>
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {favouriteCountries.map((country) => (
          <div
            key={country.code}
            className="p-4 rounded-lg dark:bg-slate-900 border dark:border-slate-800 border-slate-300 shadow-md flex items-center justify-between gap-3"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/countries/${country.code}`)}
            >
              <span className="text-3xl">{country.emoji}</span>
              <div>
                <p className="font-semibold">
                  {country.name}{" "}
                  <span className="text-xs dark:text-slate-400">
                    ({country.code})
                  </span>
                </p>
                <p className="text-xs darrk:text-slate-400">
                  {country.capital ?? "No capital"} · {country.continent.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeFavourite(country.code)}
              className="px-3 py-1 rounded dark:bg-slate-800 bg-red-700 text-slate-200  shadow-md text-xs font-semibold cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouritesPage;
