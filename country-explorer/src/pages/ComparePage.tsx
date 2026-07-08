import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import {
  GET_COUNTRIES,
  GET_COUNTRY_BY_CODE,
} from "../features/countries/queries";
import type { Country } from "../features/countries/types";

type CountriesQueryData = {
  countries: Country[];
};

type CountryQueryData = {
  country: Country | null;
};

function ComparePage() {
  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
  } = useQuery<CountriesQueryData>(GET_COUNTRIES);

  const [leftCode, setLeftCode] = useState("");
  const [rightCode, setRightCode] = useState("");

  const [fetchLeftCountry, leftResult] =
    useLazyQuery<CountryQueryData>(GET_COUNTRY_BY_CODE);
  const [fetchRightCountry, rightResult] =
    useLazyQuery<CountryQueryData>(GET_COUNTRY_BY_CODE);

  const sortedCountries = (countriesData?.countries ?? [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleLeftChange = (code: string) => {
    setLeftCode(code);
    if (code) {
      fetchLeftCountry({ variables: { code } });
    }
  };

  const handleRightChange = (code: string) => {
    setRightCode(code);
    if (code) {
      fetchRightCountry({ variables: { code } });
    }
  };

  const handleSwap = () => {
    if (!leftCode && !rightCode) return;

    const newLeft = rightCode;
    const newRight = leftCode;

    setLeftCode(newLeft);
    setRightCode(newRight);

    if (newLeft) fetchLeftCountry({ variables: { code: newLeft } });
    if (newRight) fetchRightCountry({ variables: { code: newRight } });
  };

  const handleReset = () => {
    setLeftCode("");
    setRightCode("");
  };

  if (countriesLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 dark:bg-slate-800 shadow-md bg-slate-200 rounded animate-pulse" />
        <div className="h-40 dark:bg-slate-800 shadow-md bg-slate-200 rounded animate-pulse" />
      </div>
    );
  }

  if (countriesError) {
    return (
      <div className="p-4 rounded-lg border border-red-700 bg-red-950/40 text-red-200">
        <h1 className="text-lg font-semibold">Failed to load countries</h1>
        <p className="text-sm mt-1">{countriesError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Compare Countries</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSwap}
            disabled={!leftCode && !rightCode}
            className="px-3 py-2 rounded dark:bg-slate-800 bg-slate-300 text-sm disabled:opacity-50 cursor-pointer"
          >
            Swap
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded dark:bg-slate-800 bg-slate-300 text-sm cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm dark:text-slate-300">
            Country A
            <select
              value={leftCode}
              onChange={(e) => handleLeftChange(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded dark:bg-slate-900 border border-slate-800"
            >
              <option value="">Select country</option>
              {sortedCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </label>

          {leftCode && (
            <CompareCard
              label="Country A"
              loading={leftResult.loading}
              error={leftResult.error?.message}
              country={leftResult.data?.country ?? undefined}
            />
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm dark:text-slate-300">
            Country B
            <select
              value={rightCode}
              onChange={(e) => handleRightChange(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded dark:bg-slate-900 border border-slate-800"
            >
              <option value="">Select country</option>
              {sortedCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </label>

          {rightCode && (
            <CompareCard
              label="Country B"
              loading={rightResult.loading}
              error={rightResult.error?.message}
              country={rightResult.data?.country ?? undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CompareCard({
  country,
  label,
  loading,
  error,
}: {
  country?: Country;
  label: string;
  loading?: boolean;
  error?: string;
}) {
  if (loading) {
    return (
      <div className="p-4 rounded-lg dark:bg-slate-900 border border-slate-800 text-sm dark:text-slate-300">
        Loading {label}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-900/40 border border-red-700 text-sm text-red-200">
        Failed to load {label}: {error}
      </div>
    );
  }

  if (!country) {
    return (
      <div className="p-4 rounded-lg dark:bg-slate-900 border border-slate-800 text-sm text-slate-400">
        Select {label} to see details.
      </div>
    );
  }

  const languages = country.languages.map((l) => l.name).join(", ");

  return (
    <div className="p-4 rounded-lg dark:bg-slate-900 border dark:border-slate-800 border-slate-300 shadow-md space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{country.emoji}</span>
        <div>
          <p className="font-semibold">
            {country.name}{" "}
            <span className="text-xs dark:text-slate-400">
              ({country.code})
            </span>
          </p>
          <p className="text-xs dark:text-slate-400">
            {country.continent.name}
          </p>
        </div>
      </div>

      <dl className="space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="dark:text-slate-400">Capital</dt>
          <dd className="dark:text-slate-100">{country.capital ?? "N/A"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="dark:text-slate-400">Currency</dt>
          <dd className="dark:text-slate-100">{country.currency ?? "N/A"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="dark:text-slate-400">Phone</dt>
          <dd className="dark:text-slate-100">
            {country.phone ? `+${country.phone}` : "N/A"}
          </dd>
        </div>
        <div>
          <dt className="dark:text-slate-400 mb-1">Languages</dt>
          <dd className="dark:text-slate-100 text-xs">{languages || "N/A"}</dd>
        </div>
      </dl>
    </div>
  );
}

export default ComparePage;
