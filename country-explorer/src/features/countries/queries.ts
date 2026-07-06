import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
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
  }
`;
