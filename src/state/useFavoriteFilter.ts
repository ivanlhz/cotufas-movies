import { useComputed, useSignal } from "@preact/signals-react";
import { isFavorite } from "./favorites";
import { Movie } from "@/core/movies";


export const useFavoriteFilter = (allMovies: Movie[]) => {
    const showOnlyFavorites = useSignal<boolean>(false);
    
    const toggleShowOnlyFavorites = () => {
        showOnlyFavorites.value = !showOnlyFavorites.value;
    };

    const filteredMovies = useComputed(() => {
    if (showOnlyFavorites.value) {
        return allMovies?.filter(movie => isFavorite(movie.id).value);
    }
    return allMovies;
    });

    return {
        showOnlyFavorites,
        toggleShowOnlyFavorites,
        filteredMovies
    }
}