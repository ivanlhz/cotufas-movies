import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export class GetMovieById {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Movie | null> {
    return this.movieRepository.getById(id);
  }
}
