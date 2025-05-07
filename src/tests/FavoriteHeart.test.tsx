import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteHeart } from '@/ui/atoms/FavoriteHeart';

describe('FavoriteHeart', () => {
  it('debe renderizar correctamente cuando no es favorito', () => {
    const handleToggleFavorite = vi.fn();
    
    render(
      <FavoriteHeart 
        isFavorite={false} 
        handleToggleFavorite={handleToggleFavorite} 
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Agregar a favoritos');
    
    const icon = button.querySelector('svg');
    expect(icon).toHaveClass('text-white');
    expect(icon).not.toHaveClass('fill-primary');
  });
  
  it('debe renderizar correctamente cuando es favorito', () => {
    const handleToggleFavorite = vi.fn();
    
    render(
      <FavoriteHeart 
        isFavorite={true} 
        handleToggleFavorite={handleToggleFavorite} 
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Quitar de favoritos');
  });
  
  it('debe llamar al manejador cuando se hace click', () => {
    const handleToggleFavorite = vi.fn();
    
    render(
      <FavoriteHeart 
        isFavorite={false} 
        handleToggleFavorite={handleToggleFavorite} 
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
