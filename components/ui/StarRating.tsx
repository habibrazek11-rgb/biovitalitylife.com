import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: number
}

export default function StarRating({ rating, reviewCount, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? 'fill-[var(--color-gold)] text-[var(--color-gold)]'
                : 'fill-gray-200 text-gray-200'
            }
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-[var(--color-muted)]">({reviewCount})</span>
      )}
    </div>
  )
}
