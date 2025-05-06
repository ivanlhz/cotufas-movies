import { Movie } from '@/core/movies';
import MovieCard from './MovieCard';

export interface MovieListProps {
    movies: Movie[]
}

const MovieList = ({movies}: MovieListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl font-bold mb-8 text-center bg-gradient-to-br from-purple-500 to-pink-500 text-transparent bg-clip-text">
        CotufaMovies
      </h1>
      <h2 className="text-2xl font-extralight mb-8 text-center text-gray-200">
        "La vida no es nada sin cotufas"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;