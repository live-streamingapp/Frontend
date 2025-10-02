import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function AddBlogForm() {
  const [formData, setFormData] = useState({
    header: "",
    subHeader: "",
    description: "",
    tags: "",
    category: "Astrology",
    thumbnail: null, // main blog thumbnail
  });

  const [sections, setSections] = useState([]);

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

  // handle main thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  // add new section
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        subHeader: "",
        description: "",
        image: null,
      },
    ]);
  };

  // handle section change
  const handleSectionChange = (id, field, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handlePublish = () => {
    console.log("Publishing blog:", formData, sections);
  };

  const handleCancel = () => {
    setFormData({
      header: "",
      subHeader: "",
      description: "",
      tags: "",
      category: "Astrology",
      thumbnail: null,
    });
    setSections([]);
  };

  // helper for file size formatting
  const formatFileSize = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add Blog</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PREVIEW SIDE */}
          <div className="space-y-3">
            <label className="border-2 border-dashed border-[#BB0E00] rounded-lg p-8 text-center cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />
              <div className="w-12 h-12 bg-white border border-[#BB0E00] rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaPlus className="w-6 h-6 text-[#BB0E00]" />
              </div>
              <p className="text-[#BB0E00] font-medium">
                {formData.thumbnail ? "Change Thumbnail" : "Add Thumbnail"}
              </p>
            </label>

            {formData.thumbnail ? (
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">File:</span>{" "}
                  {formData.thumbnail.name}
                </p>
                <p>
                  <span className="font-medium">Size:</span>{" "}
                  {formatFileSize(formData.thumbnail.size)}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900">
                  {formData.header || "File Details"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {formData.description || ""}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT FORM SIDE */}
          <div className="space-y-3 col-span-2 bg-white border border-gray-200 p-4 rounded-lg">
            {/* Blog Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Add Blog Details:
              </h2>
            </div>

            {/* Header */}
            <div>
              <label
                htmlFor="header"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add Header
              </label>
              <input
                type="text"
                id="header"
                name="header"
                value={formData.header}
                onChange={handleInputChange}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00]"
                placeholder="Enter blog header"
              />
            </div>

            {/* SubHeader */}
            <div>
              <label
                htmlFor="subHeader"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add Sub Header
              </label>
              <input
                type="text"
                id="subHeader"
                name="subHeader"
                value={formData.subHeader}
                onChange={handleInputChange}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00]"
                placeholder="Enter sub header"
              />
            </div>

            {/* Description */}
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
                rows={3}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:border-[#BB0E00] resize-none"
                placeholder="Enter description"
              />
            </div>

            {/* Add Section Button */}
            <div>
              <button
                onClick={addSection}
                className="w-full border border-[#BB0E00] text-[#BB0E00] py-2 px-4 rounded-md hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-[#BB0E00] focus:ring-offset-2 transition-colors"
              >
                Add Section
              </button>
              <p className="text-sm text-gray-600">
                Click on Add Section to add more sections to your blog.
              </p>
            </div>

            {/* Render Sections */}
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <h3 className="font-semibold text-gray-800">
                  Section {index + 2}
                </h3>

                {/* Sub Header */}
                <input
                  type="text"
                  value={section.subHeader}
                  onChange={(e) =>
                    handleSectionChange(section.id, "subHeader", e.target.value)
                  }
                  placeholder="Enter sub header"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#BB0E00]"
                />

                {/* Description */}
                <textarea
                  value={section.description}
                  onChange={(e) =>
                    handleSectionChange(
                      section.id,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter section description"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#BB0E00] resize-none"
                  rows={2}
                />

                {/* Upload Image */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleSectionChange(section.id, "image", e.target.files[0])
                  }
                  className="w-full text-sm text-gray-600"
                />

                {section.image && (
                  <div className="text-xs text-gray-500 mt-1">
                    <p>
                      <span className="font-medium">File:</span>{" "}
                      {section.image.name}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span>{" "}
                      {formatFileSize(section.image.size)}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Tags */}
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How Would You Categorize?
              </label>
              <div className="flex flex-wrap gap-4">
                {["Astrology", "Vastu", "Numerology"].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={formData.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 bg-gray-100 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-[#BB0E00] text-white rounded-md hover:bg-[#BB0E00] focus:outline-none focus:ring-2 focus:ring-[#BB0E00] focus:ring-offset-2 transition-colors"
              >
                Publish Blog
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
