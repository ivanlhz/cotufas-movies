import { useQuery } from "@tanstack/react-query";
import MovieList from "../organisms/MovieList";
import { ApiMovieRepository, GetMovies } from "@/core/movies";

const Home = () => {
  const repository = new ApiMovieRepository()
  const moviesQuery = new GetMovies(repository)
  const { data: movies } = useQuery({ queryKey: ['todos'], queryFn: () => moviesQuery.execute() })


  return (
    <div className="min-h-screen ">
      {movies ? <MovieList movies={movies} /> : <h3>Movies not found</h3>}
    </div>
  );
};

export default Home;