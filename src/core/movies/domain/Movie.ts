export interface Movie {
  id: string;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
  genres: string[];
  premiered: string;
  rating: {
    average: number | null;
  };
  officialSite?: string;
}
