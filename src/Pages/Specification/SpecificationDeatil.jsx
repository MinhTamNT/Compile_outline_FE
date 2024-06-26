import React, { useState, useEffect } from "react";
import { SpecificationHeader } from "./SpecificationHeader";
import { SpecificationContent } from "./SpecificationContent";
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authApi, endpoints } from "../../Service/ApiConfig";

export const SpecificationDetail = () => {
  const [showJumpToReviews, setShowJumpToReviews] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [specification, setSpecification] = useState(false);
  const { id } = useParams();
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowJumpToReviews(true);
        setShowBackToTop(true);
      } else {
        setShowJumpToReviews(false);
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY > 300]);

  const handleJumpToReviews = () => {
    const reviewsSection = document.getElementById("review-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getSpecificatonDetail = async () => {
      try {
        const res = await authApi(accessToken).get(
          endpoints["specification-detail"](id)
        );
        setSpecification(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificatonDetail();
  }, [id]);

  return (
    <div className="p-2 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpecificationHeader />
        <SpecificationContent specification={specification} />
      </div>
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleBackToTop}
          className={`fixed bottom-4 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-opacity duration-300 ${
            showBackToTop ? "opacity-100" : "opacity-0"
          } pointer-events-auto`}
        >
          Back to Top
        </button>
        <button
          id="jump-to-reviews"
          onClick={handleJumpToReviews}
          className={`fixed bottom-4 right-[140px] bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-opacity duration-300 ${
            showJumpToReviews ? "opacity-100" : "opacity-0"
          } pointer-events-auto`}
        >
          Đánh giá
        </button>

        <div className="mt-8">
          <h2 id="review-section" className="text-2xl font-bold mb-4">
            Đánh giá đề cương
          </h2>
          <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
            <ReviewForm />
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Danh sách đánh giá</h3>
              {/* Ví dụ danh sách đánh giá */}
              <div className="border-t border-gray-200 py-4">
                <div className="flex items-center mb-2">
                  <div className="mr-2">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="Avatar"
                      className="rounded-full w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Người dùng A</p>
                    <div className="flex items-center mt-1">
                      <span className="mr-1 text-yellow-500">★★★★☆</span>
                      <span className="text-gray-500 text-sm">
                        5 phút trước
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque eget viverra nisl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
