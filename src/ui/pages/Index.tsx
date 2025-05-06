import { useQuery } from "@tanstack/react-query";
import MovieList from "../organisms/MovieList";
import { ApiMovieRepository, GetMovies } from "@/core/movies";

const IndexPage = () => {
    const repository = new ApiMovieRepository()
    const moviesQuery = new GetMovies(repository)
    const {data:movies} = useQuery({ queryKey: ['todos'], queryFn: () => moviesQuery.execute() })


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      { movies ? <MovieList movies={movies} /> : <h3>Movies not found</h3> }
    </div>
  );
};

export default IndexPage;