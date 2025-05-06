import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiMovieRepository } from '../infrastructure/ApiMovieRepository';
import { ApiShow } from '../infrastructure/movieMapper';

// Datos de ejemplo de la API externa
const apiShow: ApiShow = {
  id: 1,
  name: 'TVMaze Movie',
  image: { medium: 'img.jpg', original: 'img-big.jpg' },
  summary: 'Resumen',
  genres: ['Drama'],
  premiered: '2022-01-01',
  rating: { average: 8 },
  officialSite: 'https://tvmaze.com',
};

const apiShowList = [apiShow];

// Mock global fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch as unknown as typeof fetch;

describe('ApiMovieRepository', () => {
  let repo: ApiMovieRepository;

  beforeEach(() => {
    repo = new ApiMovieRepository();
    mockFetch.mockReset();
  });

  it('getAll devuelve las películas mapeadas del API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => apiShowList,
    });
    const movies = await repo.getAll();
    expect(movies).toHaveLength(1);
    expect(movies[0].name).toBe('TVMaze Movie');
    expect(movies[0].image?.medium).toBe('img.jpg');
  });

  it('getById devuelve la película mapeada si existe', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => apiShow,
    });
    const movie = await repo.getById(1);
    expect(movie).not.toBeNull();
    expect(movie?.name).toBe('TVMaze Movie');
  });

  it('getById devuelve null si la respuesta no es ok', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const movie = await repo.getById(999);
    expect(movie).toBeNull();
  });
});
