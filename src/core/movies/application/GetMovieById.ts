import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export class GetMovieById {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: number): Promise<Movie | null> {
    return this.movieRepository.getById(id);
  }
}
