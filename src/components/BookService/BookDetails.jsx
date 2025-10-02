import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ebookImg from "../../assets/ebook.png";

export default function BookDetails() {
  const { id } = useParams(); // get book id from route
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/books/${id}`
        );
        setBook(res.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!book) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cover Banner */}
          <div
            className="rounded-lg p-8 mb-8 lg:py-16 w-full h-[70vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                book.coverImage
                  ? `${import.meta.env.VITE_BACKEND_URL}/${book.coverImage}`
                  : ebookImg
              })`,
            }}
          ></div>

          {/* Book Info */}
          <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              {book.title}
            </h2>

            <p className="text-gray-700 mb-4">{book.description}</p>

            {/* Buy Links (from languageOptions) */}
            <div className="flex gap-4 flex-wrap">
              {book.languageOptions.map((lang) => (
                <button
                  key={lang._id}
                  disabled={!lang.available}
                  onClick={() => window.open(lang.buyLink, "_blank")}
                  className={`px-6 py-2 rounded text-sm inline-flex items-center gap-2 ${
                    lang.available
                      ? "bg-[#c22e1c] text-white hover:opacity-90"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  Buy {lang.language} Version
                </button>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-6">
              {book.highlights?.whyThisBook && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Why this Book?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {book.highlights.whyThisBook}
                  </p>
                </>
              )}
              {book.highlights?.difference && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How this Book is Different?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {book.highlights.difference}
                  </p>
                </>
              )}
              {book.highlights?.whoCanBuy && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Who can Buy this Book?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {book.highlights.whoCanBuy}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Bottom Buy Section */}
          <div className="flex justify-center gap-4 flex-wrap mt-6">
            {book.languageOptions
              .filter((option) => option.available)
              .map((option) => (
                <div
                  key={option.language}
                  className="flex flex-col items-start"
                >
                  <button
                    disabled={option.stock <= 0}
                    onClick={() => {
                      if (option.stock > 0)
                        window.open(option.buyLink, "_blank");
                    }}
                    className={`px-6 py-2 rounded text-sm inline-flex items-center gap-2 
            ${
              option.stock > 0
                ? "bg-[#c22e1c] text-white hover:opacity-90"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
                  >
                    Buy {option.language} Version
                  </button>

                  {option.stock <= 0 && (
                    <span className="text-xs text-red-600 mt-1">
                      Out of Stock
                    </span>
                  )}
                </div>
              ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
