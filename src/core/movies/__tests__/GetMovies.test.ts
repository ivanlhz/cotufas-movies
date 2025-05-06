import { describe, it, expect } from 'vitest';
import { Movie } from '../domain/Movie';
import { MovieRepository } from '../domain/MovieRepository';
import { GetMovies } from '../application/GetMovies';

class FakeMovieRepository implements MovieRepository {
  constructor(private movies: Movie[]) {}
  async getAll(): Promise<Movie[]> {
    return this.movies;
  }
  async getById(id: string): Promise<Movie | null> {
    return this.movies.find(m => m.id === id) ?? null;
  }
}

describe('GetMovies', () => {
  const movies: Movie[] = [
    { id: "1", name: 'Test', image: null, summary: '...', genres: [], premiered: '2020', rating: { average: 7 }, officialSite: undefined },
    { id: "2", name: 'Otra', image: null, summary: '...', genres: [], premiered: '2021', rating: { average: null }, officialSite: undefined },
  ];
  const repo = new FakeMovieRepository(movies);
  const getMovies = new GetMovies(repo);

  it('devuelve todas las películas del repositorio', async () => {
    const result = await getMovies.execute();
    expect(result).toHaveLength(2);
    expect(result[1].name).toBe('Otra');
  });
});
