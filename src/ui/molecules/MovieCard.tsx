import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from '@/core/movies';
import { FavoriteHeart } from '../atoms/FavoriteHeart';
import { MovieImage } from '../atoms/MovieImage';
import { RatingBadge } from '../atoms/RatingBadge';
import { GenreBadge } from '../atoms/GenreBadge';
import { isFavorite, toggleFavorite } from '@/state/favorites';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card 
      className="movie-card cursor-pointer overflow-hidden bg-black/40 border-0"
      onClick={handleClick}
    >
      <div className="relative h-[250px] w-full overflow-hidden">
        <MovieImage
          src={movie.image?.original || ''}
          alt={movie.name}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">{movie.name}</h3>
            <RatingBadge rating={movie.rating.average ?? 0} />
          </div>
          <FavoriteHeart 
            isFavorite={isFavorite(movie.id).value} 
            handleToggleFavorite={(e) => {e.stopPropagation(); toggleFavorite(movie.id)}} 
          />
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-gray-300 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: movie.summary }} />
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <GenreBadge key={genre} genre={genre} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
