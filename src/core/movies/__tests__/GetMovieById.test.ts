import { describe, it, expect } from 'vitest';
import { Movie } from '../domain/Movie';
import { MovieRepository } from '../domain/MovieRepository';
import { GetMovieById } from '../application/GetMovieById';

class FakeMovieRepository implements MovieRepository {
  constructor(private movies: Movie[]) {}
  async getAll(): Promise<Movie[]> {
    return this.movies;
  }
  async getById(id: string): Promise<Movie | null> {
    return this.movies.find(m => m.id === id) ?? null;
  }
}

describe('GetMovieById', () => {
  const movies: Movie[] = [
    { id: "1", name: 'Test', image: null, summary: '...', genres: [], premiered: '2020', rating: { average: 7 }, officialSite: undefined },
    { id: "2", name: 'Otra', image: null, summary: '...', genres: [], premiered: '2021', rating: { average: null }, officialSite: undefined },
  ];
  const repo = new FakeMovieRepository(movies);
  const getMovieById = new GetMovieById(repo);

  it('devuelve la película correcta si existe', async () => {
    const movie = await getMovieById.execute("2");
    expect(movie).not.toBeNull();
    expect(movie?.name).toBe('Otra');
  });

  it('devuelve null si no existe la película', async () => {
    const movie = await getMovieById.execute("99");
    expect(movie).toBeNull();
  });
});
