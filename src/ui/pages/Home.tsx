import { useQuery } from "@tanstack/react-query";
import MovieList from "../organisms/MovieList";
import { ApiMovieRepository, GetMovies } from "@/core/movies";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavoriteFilter } from "@/state/useFavoriteFilter";

const Home = () => {
  const repository = new ApiMovieRepository();
  const moviesQuery = new GetMovies(repository);
  const { data: allMovies } = useQuery({ queryKey: ['movies'], queryFn: () => moviesQuery.execute() });
  const { showOnlyFavorites, toggleShowOnlyFavorites, filteredMovies } = useFavoriteFilter(allMovies || []);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-br from-purple-500 to-pink-500 text-transparent bg-clip-text">
            CotufaMovies
          </h1>
        </div>
        <Button 
          onClick={toggleShowOnlyFavorites}
        >
          <Heart className={showOnlyFavorites.value ? "fill-white" : ""} size={16} />
          {showOnlyFavorites.value ? "Todas las películas" : "Solo favoritas"}
        </Button>
      </div>

      {showOnlyFavorites.value ? (
        filteredMovies.value.length > 0 ? (
          <MovieList movies={filteredMovies.value} />
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl text-gray-400 mb-4">No tienes películas favoritas</h3>
            <Button onClick={toggleShowOnlyFavorites}>
              Ver todas las películas
            </Button>
          </div>
        )
      ) : (
        <MovieList movies={allMovies || []} />
      )}
    </div>
  );
};

export default Home;