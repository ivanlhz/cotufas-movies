import { Movie } from '@/core/movies';
import MovieCard from './MovieCard';

export interface MovieListProps {
    movies: Movie[]
}

const MovieList = ({movies}: MovieListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;