export type CountrySummary = {
  code: string;
  name: string;
  continent: {
    code: string;
    name: string;
  };
  languages: {
    code: string;
    name: string;
  }[];
};
