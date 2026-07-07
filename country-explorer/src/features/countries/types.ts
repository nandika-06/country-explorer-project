export type CountryLanguage = {
  code: string;
  name: string;
};

export type CountryContinent = {
  code: string;
  name: string;
};

export type CountryState = {
  code?: string | null;
  name: string;
};

export type Country = {
  code: string;
  name: string;
  native?: string | null;
  emoji: string;
  capital?: string | null;
  currency?: string | null;
  phone?: string | null;
  continent: CountryContinent;
  languages: CountryLanguage[];
  states?: CountryState[] | null;
};

export type CountrySummary = Country;
