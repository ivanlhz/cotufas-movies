import { Movie } from "../domain/Movie";

export interface ApiShow {
  id: number;
  name: string;
  image: { medium: string; original: string } | null;
  summary: string;
  genres: string[];
  premiered: string;
  rating: { average: number | null };
  officialSite?: string;
}

export function mapApiShowToMovie(apiShow: ApiShow): Movie {
  return {
    id: apiShow.id,
    name: apiShow.name,
    image: apiShow.image,
    summary: apiShow.summary,
    genres: apiShow.genres,
    premiered: apiShow.premiered,
    rating: {
      average: apiShow.rating?.average ?? null,
    },
    officialSite: apiShow.officialSite,
  };
}