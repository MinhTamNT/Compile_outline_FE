import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { commentSpecification } from "../../Redux/apiRequeust";

const ReviewForm = ({ specId, setRefresh, refresh }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.accessToken);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const newComment = {
        content: comment,
        starts: rating,
      };
      await commentSpecification(token, newComment, dispatch, specId);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[900px] md:h-[300px] h-auto w-full md:mx-0 mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Đánh giá đề cương</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Điểm đánh giá:
          </label>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
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
          className={`inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
