import {MAX_REVIEWS_COUNT} from '../../common/const';
import {ReviewType} from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewsItem from '../reviews-item/reviews-item';

type TReviewsListProps = {
  reviews: ReviewType[];
}

function ReviewsList({reviews}: TReviewsListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.slice(0, MAX_REVIEWS_COUNT).map((review) => (
          <ReviewsItem
            key={review.id}
            reviewsItem={review}
          />
        ))}
      </ul>
      <ReviewForm />
    </section>
  );
}

export default ReviewsList;
