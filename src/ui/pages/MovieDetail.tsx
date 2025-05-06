import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ApiMovieRepository, GetMovieById } from '@/core/movies';
import { FavoriteHeart } from '../atoms/FavoriteHeart';
import { isFavorite, toggleFavorite } from '@/state/favorites';

const MovieDetail = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const repository = new ApiMovieRepository()
    const moviesQuery = new GetMovieById(repository)

    const {data: movie} = useQuery({ queryKey: ['movie-detail'], queryFn: () => moviesQuery.execute(movieId || '') })
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Película no encontrada</h2>
        <Button onClick={() => navigate('/')}>
          Volver a la lista
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 hover:bg-primary/20"
      >
        <ArrowLeft size={16} />
        Volver a la lista
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={movie.image?.original} 
              alt={movie.name} 
              className="w-full h-auto object-cover"
            />

          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
          <FavoriteHeart 
            isFavorite={isFavorite(movie.id).value} 
            handleToggleFavorite={(e) => {e.stopPropagation(); toggleFavorite(movie.id)}} 
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {movie.name} <span className="text-gray-400">({movie.premiered})</span>
          </h1>
          </div>
   
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary px-3 py-1 rounded-full text-white font-medium">
              {movie.rating.average} / 10
            </span>
            <span className="text-gray-400">{movie.officialSite}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map(genre => (
              <span key={genre} className="bg-secondary/30 px-3 py-1 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: movie.summary }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;