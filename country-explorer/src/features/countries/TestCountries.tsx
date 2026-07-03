import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
    }
  }
`;

type Country = {
  code: string;
  name: string;
};

type GetCountriesData = {
  countries: Country[];
};

export function TestCountries() {
  const { data, loading, error } = useQuery<GetCountriesData>(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="p-4">
      {data.countries
        .slice(0, 5)
        .map((country: { code: string; name: string }) => (
          <li key={country.code}>
            {country.code} - {country.name}
          </li>
        ))}
    </ul>
  );
}
