import { gql } from "@apollo/client";

export const COUNTRY_DETAILS_FRAGMENT = gql`
  fragment CountryDetailsFragment on Country {
    code
    name
    native
    emoji
    capital
    currency
    phone
    continent {
      code
      name
    }
    languages {
      code
      name
    }
    states {
      code
      name
    }
  }
`;
export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      ...CountryDetailsFragment
    }
  }
  ${COUNTRY_DETAILS_FRAGMENT}
`;

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      ...CountryDetailsFragment
    }
  }
  ${COUNTRY_DETAILS_FRAGMENT}
`;
