import type { CountrySummary } from "./dashboard-types";

export type ContinentCount = {
  name: string;
  value: number;
};

export type LanguageCount = {
  name: string;
  value: number;
};

export function getCountriesByContinent(countries: CountrySummary[]) {
  const map = new Map<string, number>();

  countries.forEach((country) => {
    const key = country.continent.name;
    map.set(key, (map.get(key) ?? 0) + 1);
  });

  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

export function getTopLanguages(countries: CountrySummary[], limit = 18) {
  const map = new Map<string, number>();

  countries.forEach((country) => {
    country.languages.forEach((language) => {
      const key = language.name;
      map.set(key, (map.get(key) ?? 0) + 1);
    });
  });

  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
