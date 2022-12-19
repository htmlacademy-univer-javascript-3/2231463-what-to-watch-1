import React, { FC, useState } from 'react';
import RatingStar from './rating-star';
import { ReviewData } from '../../types/review-data';

const MAX_RATING = 10;

type Props = {
  disabled: boolean;
  onSubmit: (reviewData: ReviewData) => void;
}

const AddReviewForm: FC<Props> = (props) => {
  const { disabled, onSubmit } = props;
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({reviewText: reviewText, rating: rating});
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const isSubmitButtonDisabled = reviewText.length < 50 || reviewText.length > 400 || disabled;

  const ratings: JSX.Element[] = [...Array(MAX_RATING)] // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    .map((_, idx) =>
      (
        <RatingStar
          key={idx} // eslint-disable-line react/no-array-index-key
          score={idx + 1}
          isChosen={rating === (idx + 1)}
          onChange={handleRatingChange}
        />
      )
    );

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleReviewSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {ratings}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            disabled={disabled}
            className="add-review__textarea"
            name="review-text" id="review-text"
            placeholder="Review text"
            onChange={handleReviewTextChange}
            value={reviewText}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" disabled={isSubmitButtonDisabled} type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
