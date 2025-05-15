import React, { useState, useEffect } from "react";
import { predictSentiment } from "./apis/sentimentAPI";
import logo from "./img/logo.jpg";
import productlogo from "./img/headphone.jpg";
import ReviewCard from "./components/card";
import ProductCard from "./components/productCard";

export default function App() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [audioResult, setAudioResult] = useState(null);

  const handleAudioUpload = async () => {
    if (!audioFile) {
      alert("Please upload an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("http://localhost:5000/transcribe_and_analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setAudioResult(data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to analyze audio.");
    }
  };

  const signOutHandler = () => {
    localStorage.removeItem("reviews");
    window.location.href = "http://localhost:3000";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.trim() !== "") {
      try {
        const sentiment = await predictSentiment(review);
        const updatedReviews = [...reviews, { text: review, sentiment }];
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        setReview("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
      setReviews(storedReviews);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EFE6]">
      {/* Navbar */}
     <nav className="bg-violet-500 text-white p-4 flex justify-between items-center">
  <div className="flex items-center space-x-3">
    <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
    <span className="text-2xl font-bold">Unified Customer Insights</span>
  </div>
 <div>
  <button
    onClick={signOutHandler}
    className="hover:underline text-lg font-medium text-white bg-transparent border-none cursor-pointer"
  >
    Sign Out
  </button>
</div>
</nav>


      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Products */}
        <section className="bg-white rounded-2xl shadow p-4 mb-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold">Purchased Items</h2>
            <img src={productlogo} className="w-6 h-6 ml-2" alt="Shopping Bag" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <ProductCard
                key={i}
                name="Sample Product"
                price={19.99}
                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
              />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-violet-600 mb-4 text-center">Recent Reviews</h2>

          <div className="h-64 overflow-y-auto mb-6 space-y-4 flex flex-col-reverse">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          {/* Review Input + Audio Upload */}
          <div className="space-y-6">
            {/* Text Review */}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Your review here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="flex-grow w-full md:w-auto border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-3 rounded-xl transition-transform transform hover:scale-105"
              >
                Submit
              </button>
            </form>

            {/* Audio Upload Section */}
            <div className="bg-gray-50 p-4 rounded-2xl border">
              <h3 className="text-lg font-semibold text-violet-500 mb-3">Or Upload Audio Review</h3>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="w-full sm:w-auto"
                />
                <button
                  onClick={handleAudioUpload}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition-transform transform hover:scale-105"
                >
                  Upload & Analyze Audio
                </button>
              </div>

              {audioResult && (
                <div className="mt-4 bg-white p-4 rounded shadow text-sm space-y-2">
                  <p><strong>Transcription:</strong> {audioResult.transcription}</p>
                  <p><strong>Sentiment:</strong> {audioResult.sentiment}</p>
                  <p><strong>Score Rank:</strong> {audioResult.score_rank}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-violet-500 text-white text-center p-4">
        © 2024 Unified Customer Insights.
      </footer>
    </div>
  );
}
