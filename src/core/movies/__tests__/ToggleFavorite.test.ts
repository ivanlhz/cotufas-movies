// src/core/movies/__tests__/ToggleFavorite.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageFavoritesRepository } from '../infrastructure/LocalStorageFavoritesRepository';
import { ToggleFavorite } from '../application/ToggleFavorite';

describe('Favorites funcionalidad', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('LocalStorageFavoritesRepository', () => {
    it('debería devolver un array vacío cuando no existen favoritos', () => {
      const repository = new LocalStorageFavoritesRepository();
      expect(repository.getFavorites()).toEqual([]);
    });

    it('debería agregar una película a favoritos cuando no está marcada como favorita', () => {
      const repository = new LocalStorageFavoritesRepository();
      const result = repository.toggleFavorite('1');
      
      expect(result).toEqual(['1']);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('favoriteMovies', JSON.stringify(['1']));
    });

    it('debería eliminar una película de favoritos cuando ya está marcada como favorita', () => {
      const repository = new LocalStorageFavoritesRepository();

      repository.toggleFavorite('1');

      const result = repository.toggleFavorite('1');
      
      expect(result).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('favoriteMovies', JSON.stringify([]));
    });

    it('debería verificar correctamente si una película es favorita', () => {
      const repository = new LocalStorageFavoritesRepository();
      
      expect(repository.isFavorite('1')).toBe(false);
      
      repository.toggleFavorite('1');
      
      expect(repository.isFavorite('1')).toBe(true);
    });
  });

  describe('ToggleFavorite caso de uso', () => {
    it('debería delegar al repositorio', () => {
      const repository = new LocalStorageFavoritesRepository();
      const toggleFavorite = new ToggleFavorite(repository);
      
      const spy = vi.spyOn(repository, 'toggleFavorite');
      
      toggleFavorite.execute('1');
      
      expect(spy).toHaveBeenCalledWith('1');
    });

    it('debería verificar si una película es favorita', () => {
      const repository = new LocalStorageFavoritesRepository();
      const toggleFavorite = new ToggleFavorite(repository);
      
      const spy = vi.spyOn(repository, 'isFavorite');
      
      toggleFavorite.isFavorite('1');
      
      expect(spy).toHaveBeenCalledWith('1');
    });

    it('debería obtener todos los favoritos', () => {
      const repository = new LocalStorageFavoritesRepository();
      const toggleFavorite = new ToggleFavorite(repository);
      
      const spy = vi.spyOn(repository, 'getFavorites');
      
      toggleFavorite.getFavorites();
      
      expect(spy).toHaveBeenCalled();
    });
  });
});