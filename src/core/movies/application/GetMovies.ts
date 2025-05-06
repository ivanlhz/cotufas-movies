import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export class GetMovies {
  constructor(private movieRepository: MovieRepository) {}

  async execute(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }
}
