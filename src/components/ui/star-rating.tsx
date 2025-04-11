import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = max - fullStars - (partialStar > 0 ? 1 : 0);
  
  const starSize = {
    sm: 14,
    md: 16,
    lg: 20
  };
  
  const renderStars = () => {
    const stars = [];
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          size={starSize[size]} 
          className="text-yellow-400 fill-yellow-400" 
        />
      );
    }
    
    // Partial star
    if (partialStar > 0) {
      stars.push(
        <div key="partial" className="relative">
          <Star size={starSize[size]} className="text-gray-300 fill-gray-300" />
          <div 
            className="absolute top-0 left-0 overflow-hidden" 
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star size={starSize[size]} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          size={starSize[size]} 
          className="text-gray-300 fill-gray-300" 
        />
      );
    }
    
    return stars;
  };
  
  return (
    <div className="flex">
      {renderStars()}
    </div>
  );
}