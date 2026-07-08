import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type SortingState, type VisibilityState } from "@tanstack/react-table";
import { useCountries } from "../features/countries/hooks/useCountries";
import { useDebounce } from "../features/countries/hooks/useDebounce";
import { CountriesTable } from "../features/countries/components/CountriesTable";
import { type Country } from "../features/countries/types";
import { exportToCsv } from "../utils/csvExport";

function CountriesPage() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useCountries();

  const [searchName, setSearchName] = useState("");
  const [searchCurrency, setSearchCurrency] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [sorting, setSorting] = useState<SortingState>([]);
  console.log(sorting);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    phone: false,
    statesCount: false,
  });

  const debouncedName = useDebounce(searchName, 300);
  const debouncedCurrency = useDebounce(searchCurrency, 300);

  const continents = useMemo(() => {
    const map = new Map<string, string>();
    (data?.countries ?? []).forEach((country) => {
      map.set(country.continent.code, country.continent.name);
    });
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }));
  }, [data]);

  const filteredData = useMemo(() => {
    const countries = data?.countries ?? [];

    return countries.filter((country) => {
      const matchesName = country.name
        .toLowerCase()
        .includes(debouncedName.toLowerCase());

      const matchesCurrency = (country.currency ?? "")
        .toLowerCase()
        .includes(debouncedCurrency.toLowerCase());

      const matchesContinent =
        selectedContinent === "all" ||
        country.continent.code === selectedContinent;

      return matchesName && matchesCurrency && matchesContinent;
    });
  }, [data, debouncedName, debouncedCurrency, selectedContinent]);

  const handleExportCsv = () => {
    const rows = filteredData.map((country) => ({
      Flag: country.emoji,
      Name: country.name,
      Code: country.code,
      Capital: country.capital ?? "",
      Currency: country.currency ?? "",
      Continent: country.continent.name,
      Phone: country.phone ?? "",
      States: country.states?.length ?? 0,
    }));
    exportToCsv("countries.csv", rows);
  };

  const handleRowClick = (country: Country) => {
    navigate(`/countries/${country.code}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
        <div className="h-12 bg-slate-800 rounded animate-pulse" />
        <div className="h-80 bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg border border-red-700 bg-red-950/40 text-red-200">
        <h1 className="text-lg font-semibold">Failed to load countries</h1>
        <p className="text-sm mt-1">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 rounded bg-red-500 text-slate-950 font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Countries</h1>
        <button
          type="button"
          onClick={handleExportCsv}
          className="px-4 py-2 rounded bg-emerald-500 text-slate-950 font-semibold cursor-pointer"
        >
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by country name"
          className="px-3 py-2 rounded dark:bg-slate-900 border border-slate-800"
        />
        <input
          value={searchCurrency}
          onChange={(e) => setSearchCurrency(e.target.value)}
          placeholder="Search by currency"
          className="px-3 py-2 rounded dark;bg-slate-900 border border-slate-800"
        />
        <select
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value)}
          className="px-3 py-2 rounded dark:bg-slate-900 border border-slate-800"
        >
          <option value="all">All continents</option>
          {continents.map((continent) => (
            <option key={continent.code} value={continent.code}>
              {continent.name}
            </option>
          ))}
        </select>
      </div>

      <CountriesTable
        data={filteredData}
        sorting={sorting}
        setSorting={setSorting}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default CountriesPage;
