import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ebookImg from "../../assets/ebook.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BookCard from "./BookCard";

export default function BookOverview() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/books`,
          {
            withCredentials: true,
          }
        );
        setBooks(res.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const bannerImage = ebookImg;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        {/* Banner */}
        <div className="mx-auto px-4 my-[1rem]">
          <img
            src={bannerImage}
            alt="Book Banner"
            className="w-full h-[400px] object-contain shadow-lg rounded"
          />
        </div>

        <main className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-[1rem]">
            E - Books by: <span className="text-[#C71210]">Vastu Abhishek</span>
          </h2>

          {/* Loading/Error */}
          {loading && <p className="text-gray-600 text-lg">Loading books...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {/* Books Grid */}
          <div className="flex flex-wrap gap-6 justify-center">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={{
                  ...book,
                  image: book.coverImage
                    ? `${import.meta.env.VITE_BACKEND_URL}/${book.coverImage}`
                    : ebookImg,
                  price: `₹${book.price}`,
                }}
                onClick={() => navigate(`/books/${book._id}`)}
                // userToken is no longer needed
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
