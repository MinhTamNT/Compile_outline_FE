import React, { useState } from "react";
import Rating from "react-rating-stars-component";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Xử lý khi thay đổi rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Xử lý khi submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="md:w-[900px] w-full md:mx-0 mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Đánh giá sản đề cương</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Điểm đánh giá:
          </label>
          <Rating
            id="rating"
            count={5}
            size={30}
            value={rating}
            onChange={handleRatingChange}
            activeColor="#FFD700"
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Nhận xét:
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            value={comment}
            onChange={handleCommentChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
