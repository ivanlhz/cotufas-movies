import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from '@/core/movies';

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
        <img    
          src={movie.image?.original} 
          alt={movie.name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">{movie.name}</h3>
            <span className="bg-primary/80 text-white text-sm px-2 py-1 rounded-md">
              {movie.rating.average}
            </span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-gray-300 text-sm line-clamp-2">{movie.summary}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <span 
              key={genre} 
              className="bg-secondary/30 text-xs px-2 py-1 rounded-md text-gray-300"
            >
              {genre}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;