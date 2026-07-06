import { gql } from "@apollo/client";

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    countries {
      code
      name
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
    continents {
      code
      name
    }
    languages {
      code
      name
    }
  }
`;
