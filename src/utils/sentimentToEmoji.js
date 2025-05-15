
const sentimentToEmoji = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return '😊'; // Happy face for positive sentiment
      case 'Negative':
        return '😞'; // Sad face for negative sentiment
      default:
        return '😐'; // Neutral face for neutral or unknown sentiment
    }
  };
  export default sentimentToEmoji;