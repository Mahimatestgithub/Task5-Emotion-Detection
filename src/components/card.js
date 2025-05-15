import React from 'react';
import  sentimentToEmoji  from '../utils/sentimentToEmoji';

const ReviewCard = ({ review }) => {
  const emoji = sentimentToEmoji(review.sentiment.sentiment);

  return (
    <div
     className="bg-white p-4 border border-gray-300 rounded shadow-md mb-4 flex justify-between items-center"

    >
      <div>
      <p>Text: {review.text}</p>
      <p>Sentiment: {review.sentiment.sentiment}</p>
      </div>
      <div className='text-4xl'>
        <h1>{emoji}</h1>
      </div>
      
    </div>
  );
};
export default ReviewCard;
