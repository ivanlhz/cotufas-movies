import { Heart } from "lucide-react"

interface FavoriteHeartProps {
    isFavorite: boolean;
    handleToggleFavorite: (e: React.MouseEvent) => void;
}

export const FavoriteHeart = ({isFavorite, handleToggleFavorite}: FavoriteHeartProps) => {    
    return (
        <button 
            onClick={handleToggleFavorite}
            className="p-1 rounded-full bg-black/50 hover:bg-primary/50 transition-colors"
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
            <Heart 
                size={18} 
                className={isFavorite ? "fill-primary text-primary" : "text-white"} 
            />
        </button>
    )
}