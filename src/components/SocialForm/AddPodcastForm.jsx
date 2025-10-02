import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function AddPodcastVideoForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    tags: "",
    category: "Astrology",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handlePublish = () => {
    console.log("Publishing:", formData);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      url: "",
      tags: "",
      category: "Astrology",
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-2 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add Podcast / Video
          </h1>
        </div>

        <div className="space-y-4 bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add Details:
            </h2>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Add Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border bg-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00]"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Add Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-2 py-1.5 border bg-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00] resize-none"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Add URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00]"
              placeholder="Enter URL"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Add Tags (10 maximum)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00]"
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How Would You Categorize?
            </label>
            <div className="flex flex-wrap gap-4">
              {["Astrology", "Vastu", "Numerology"].map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-[#BB0E00] bg-gray-100 border-gray-300 focus:ring-[#BB0E00] focus:ring-1"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-2">
            <button
              onClick={handlePublish}
              className="px-8 py-2 bg-[#BB0E00] text-white rounded-md hover:bg-[#BB0E00] focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:ring-offset-2 transition-colors"
            >
              Publish
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-2 border border-[#BB0E00] text-[#BB0E00] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
