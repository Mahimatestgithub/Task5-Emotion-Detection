from flask import Flask, request, jsonify
from transformers import pipeline
import whisper
import os
from flask_cors import CORS
import traceback

app = Flask(__name__)
CORS(app)

# Load Whisper model once
whisper_model = whisper.load_model("base")

# Load Sentiment Analysis model
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment",
    framework="pt"
)

# Label mapping
label_mapping = {
    'LABEL_0': 'Negative',
    'LABEL_1': 'Neutral',
    'LABEL_2': 'Positive'
}

# Score ranking logic
def score_to_rank(label, score):
    if label == 'Positive':
        if score > 0.7:
            return 'High'
        elif score > 0.5:
            return 'Medium'
        else:
            return 'Low'
    elif label == 'Negative':
        if score > 0.7:
            return 'Low'
        elif score > 0.5:
            return 'Medium'
        else:
            return 'High'
    else:
        return 'N/A'

@app.route('/')
def home():
    return 'Python Server running locally with Whisper and Sentiment Analysis.'

@app.route('/predict_sentiment', methods=['POST'])
def predict_sentiment():
    try:
        data = request.json
        text = data.get('text')
        if not text:
            return jsonify({'error': 'Text field is required'}), 400

        result = sentiment_pipeline(text)
        sentiment_label = label_mapping[result[0]['label']]
        sentiment_score = result[0]['score']
        sentiment_score_rank = score_to_rank(sentiment_label, sentiment_score)

        return jsonify({
            'sentiment': sentiment_label,
            'score_rank': sentiment_score_rank
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/transcribe_and_analyze', methods=['POST'])
def transcribe_and_analyze():
    filepath = "temp_audio.wav"

    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save file temporarily
        file.save(filepath)

        # Step 1: Transcribe using Whisper
        transcription = whisper_model.transcribe(filepath)
        text = transcription['text']

        # Step 2: Analyze Sentiment
        result = sentiment_pipeline(text)
        sentiment_label = label_mapping[result[0]['label']]
        sentiment_score = result[0]['score']
        sentiment_score_rank = score_to_rank(sentiment_label, sentiment_score)

        return jsonify({
            'transcription': text,
            'sentiment': sentiment_label,
            'score_rank': sentiment_score_rank
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

    finally:
        # Always clean up temporary file
        if os.path.exists(filepath):
            os.remove(filepath)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
