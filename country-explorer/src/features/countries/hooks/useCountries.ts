import { useQuery } from "@apollo/client/react";
import { GET_COUNTRIES } from "../queries";
import type { Country } from "../types.ts";

type CountriesQueryData = {
  countries: Country[];
};

export function useCountries() {
  return useQuery<CountriesQueryData>(GET_COUNTRIES);
}
