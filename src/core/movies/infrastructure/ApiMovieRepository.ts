import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";
import { mapApiShowToMovie } from "./movieMapper";

export class ApiMovieRepository implements MovieRepository {
  private readonly apiUrl = "https://api.tvmaze.com/shows";

  async getAll(): Promise<Movie[]> {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    return data.map(mapApiShowToMovie);
  }

  async getById(id: string): Promise<Movie | null> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return mapApiShowToMovie(data);
  }
}
