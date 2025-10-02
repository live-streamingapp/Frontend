import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../Layout/AdminLayout";

const BooksList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`, {
        withCredentials: true,
      });
      if (res.data.status) {
        setBooks(res.data.data);
      } else {
        setError("Failed to fetch books");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    // Ensure all nested objects and arrays exist with default values
    const bookToEdit = {
      ...book,
      // Use the correct ID field
      id: book._id || book.id,
      highlights: book.highlights || {
        whyThisBook: "",
        difference: "",
        whoCanBuy: "",
      },
      keyFeatures: book.keyFeatures || [],
      targetAudience: book.targetAudience || [],
      languageOptions: book.languageOptions || [
        { language: "", stock: 0, buyLink: "", available: true },
      ],
    };

    console.log("Editing book:", bookToEdit);
    setSelectedBook(bookToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;

    try {
      // Use _id for API call
      const id = bookId._id || bookId;
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/books/${id}`,
        { withCredentials: true }
      );
      if (res.data.status) {
        setBooks((prev) => prev.filter((book) => (book._id || book.id) !== id));
      } else {
        alert("Failed to delete book");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book");
    }
  };

  // Unified input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating field: ${name} with value:`, value);

    setSelectedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle nested highlights updates
  const handleHighlightChange = (field, value) => {
    console.log(`Updating highlight ${field}:`, value);

    setSelectedBook((prev) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [field]: value,
      },
    }));
  };

  // Handle key features updates
  const handleKeyFeatureChange = (index, value) => {
    console.log(`Updating key feature ${index}:`, value);

    setSelectedBook((prev) => {
      const updatedFeatures = [...prev.keyFeatures];
      if (updatedFeatures[index]) {
        updatedFeatures[index] = {
          ...updatedFeatures[index],
          feature: value,
        };
      } else {
        updatedFeatures[index] = { feature: value };
      }
      return {
        ...prev,
        keyFeatures: updatedFeatures,
      };
    });
  };

  // Handle language options updates
  const handleLanguageOptionChange = (index, field, value) => {
    console.log(`Updating language option ${index} ${field}:`, value);

    setSelectedBook((prev) => {
      const updatedLangs = [...prev.languageOptions];
      if (!updatedLangs[index]) {
        updatedLangs[index] = {
          language: "",
          stock: 0,
          buyLink: "",
          available: true,
        };
      }
      updatedLangs[index] = {
        ...updatedLangs[index],
        [field]: field === "stock" ? Number(value) : value,
      };
      return {
        ...prev,
        languageOptions: updatedLangs,
      };
    });
  };

  // Handle target audience updates
  const handleTargetAudienceChange = (value) => {
    console.log("Updating target audience:", value);

    setSelectedBook((prev) => ({
      ...prev,
      targetAudience: value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    }));
  };

  const handleSave = async () => {
    try {
      // Clean up the data before sending
      const bookToSave = {
        ...selectedBook,
        price: Number(selectedBook.price) || 0,
        // Remove MongoDB specific fields that shouldn't be updated
        // Keep _id for reference but don't send internal fields
      };

      // Remove fields that shouldn't be sent to backend
      delete bookToSave.createdAt;
      delete bookToSave.updatedAt;
      delete bookToSave.__v;
      delete bookToSave.id; // Remove our custom id field

      console.log("Saving book data:", bookToSave);
      console.log(
        "API URL:",
        `${import.meta.env.VITE_BACKEND_URL}/books/${
          selectedBook._id || selectedBook.id
        }`
      );

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/books/${
          selectedBook._id || selectedBook.id
        }`,
        bookToSave,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", res.data);

      if (res.data.status) {
        // Update the books list with the updated book
        setBooks((prev) =>
          prev.map((book) =>
            (book._id || book.id) === (selectedBook._id || selectedBook.id)
              ? { ...book, ...(res.data.data || bookToSave) }
              : book
          )
        );
        setIsModalOpen(false);
        setSelectedBook(null);
        alert("Book updated successfully!");
      } else {
        console.error("API returned unsuccessful status:", res.data);
        alert(`Failed to update book: ${res.data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error updating book:", err);
      console.error("Error response data:", err.response?.data);
      console.error("Error response status:", err.response?.status);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Unknown error occurred";

      alert(`Failed to update book: ${errorMessage}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  if (loading) return <p className="text-center mt-8">Loading books...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <AdminLayout>
      {" "}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-[2rem]">
          <p className="text-xl font-bold">Books</p>
          <button
            onClick={() => navigate("/admin/add-book")}
            className="flex h-[40px] items-center gap-[.5rem] px-[1rem] py-[2px] rounded-[5px] cursor-pointer text-white bg-gradient-to-b from-[#bf1305] to-[#f64f42]"
          >
            <FiPlus size={23} />
            Add New Book
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id || book.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">{book.description}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-red-600 font-bold">₹{book.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id || book.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Book Modal */}
        {isModalOpen && selectedBook && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">
                Edit Book (ID: {selectedBook._id || selectedBook.id})
              </h2>

              {/* Basic Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-blue-600">Basic Information</h3>

                <input
                  type="text"
                  name="title"
                  value={selectedBook.title || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Book Title"
                />

                <textarea
                  name="description"
                  value={selectedBook.description || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Book Description"
                  rows={3}
                />

                <input
                  type="number"
                  name="price"
                  value={selectedBook.price || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Price"
                />

                <input
                  type="text"
                  name="coverImage"
                  value={selectedBook.coverImage || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cover Image URL"
                />
              </div>

              {/* Highlights */}
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-blue-600">Highlights</h3>

                <input
                  type="text"
                  value={selectedBook.highlights?.whyThisBook || ""}
                  onChange={(e) =>
                    handleHighlightChange("whyThisBook", e.target.value)
                  }
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Why This Book"
                />

                <input
                  type="text"
                  value={selectedBook.highlights?.difference || ""}
                  onChange={(e) =>
                    handleHighlightChange("difference", e.target.value)
                  }
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Difference"
                />

                <input
                  type="text"
                  value={selectedBook.highlights?.whoCanBuy || ""}
                  onChange={(e) =>
                    handleHighlightChange("whoCanBuy", e.target.value)
                  }
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Who Can Buy"
                />
              </div>

              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-blue-600">Key Features</h3>
                {selectedBook.keyFeatures &&
                selectedBook.keyFeatures.length > 0 ? (
                  selectedBook.keyFeatures.map((feature, idx) => (
                    <input
                      key={feature._id || idx}
                      type="text"
                      value={feature.feature || ""}
                      onChange={(e) =>
                        handleKeyFeatureChange(idx, e.target.value)
                      }
                      className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Feature ${idx + 1}`}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No key features available
                  </p>
                )}
              </div>

              {/* Target Audience */}
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-blue-600">Target Audience</h3>
                <textarea
                  value={selectedBook.targetAudience?.join(", ") || ""}
                  onChange={(e) => handleTargetAudienceChange(e.target.value)}
                  className="w-full border rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Target Audience (comma separated)"
                  rows={2}
                />
              </div>

              {/* Language Options */}
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-blue-600">Language Options</h3>
                {selectedBook.languageOptions &&
                selectedBook.languageOptions.length > 0 ? (
                  selectedBook.languageOptions.map((lang, idx) => (
                    <div
                      key={lang._id || idx}
                      className="grid grid-cols-3 gap-2"
                    >
                      <input
                        type="text"
                        value={lang.language || ""}
                        onChange={(e) =>
                          handleLanguageOptionChange(
                            idx,
                            "language",
                            e.target.value
                          )
                        }
                        className="border rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Language"
                      />
                      <input
                        type="number"
                        value={lang.stock || 0}
                        onChange={(e) =>
                          handleLanguageOptionChange(
                            idx,
                            "stock",
                            e.target.value
                          )
                        }
                        className="border rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Stock"
                      />
                      <input
                        type="text"
                        value={lang.buyLink || ""}
                        onChange={(e) =>
                          handleLanguageOptionChange(
                            idx,
                            "buyLink",
                            e.target.value
                          )
                        }
                        className="border rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Buy Link"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No language options available
                  </p>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 text-sm text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BooksList;
