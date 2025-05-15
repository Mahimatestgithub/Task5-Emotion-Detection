const apiUrl = 'http://127.0.0.1:5000';

export const predictSentiment = async (text) => {
  try {
    const response = await fetch(`${apiUrl}/predict_sentiment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}