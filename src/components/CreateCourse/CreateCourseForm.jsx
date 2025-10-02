import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import AdminLayout from "../../Layout/AdminLayout";

export default function CreateCourseForm() {
  const formik = useFormik({
    initialValues: {
      // Basic info
      title: "",
      description: "",
      detailedDescription: [""],
      price: "",
      originalPrice: "",
      image: null, // store file
      createdBy: "",
      lastUpdated: "",
      duration: "",
      lessons: "",
      progress: "",
      includedInPlans: false,
      premium: false,

      // Arrays
      languages: [""],
      subtitles: [""],
      whatYouWillLearn: [""],
      relatedTopics: [""],
      courseIncludes: [""],
      requirements: [""],

      // Course Content
      courseContent: [{ title: "", preview: false, video: null }],

      // Preview for images
      imagePreview: null,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // Append course image
        if (values.image) formData.append("image", values.image);

        // Append top-level fields
        for (let key in values) {
          if (["image", "imagePreview", "courseContent"].includes(key)) continue;
          const value = values[key];
          if (Array.isArray(value)) continue; // handled separately
          else formData.append(key, value);
        }

        // Append arrays of strings
        [
          "languages",
          "subtitles",
          "whatYouWillLearn",
          "relatedTopics",
          "courseIncludes",
          "detailedDescription",
          "requirements",
        ].forEach((field) => {
          (values[field] || []).forEach((item, i) =>
            formData.append(`${field}[${i}]`, item || "")
          );
        });

        // Append course content
        (values.courseContent || []).forEach((content, i) => {
          formData.append(`courseContent[${i}][title]`, content.title || "");
          formData.append(
            `courseContent[${i}][preview]`,
            content.preview || false
          );
          if (content.video) {
            formData.append(`courseContent[${i}][video]`, content.video);
          }
        });

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/courses`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Course created successfully:", response.data);
        alert("✅ Course created successfully!");
        resetForm();
      } catch (error) {
        console.error("Error creating course:", error.response?.data || error);
        alert("❌ Failed to create course. Check console for details.");
      }
    },
  });

  const addField = (field) => {
    formik.setFieldValue(field, [...formik.values[field], ""]);
  };

  const removeField = (field, index) => {
    const newArr = [...formik.values[field]];
    newArr.splice(index, 1);
    formik.setFieldValue(field, newArr);
  };

  const addCourseContent = () => {
    formik.setFieldValue("courseContent", [
      ...formik.values.courseContent,
      { title: "", preview: false, video: null },
    ]);
  };

  const removeCourseContent = (index) => {
    const arr = [...formik.values.courseContent];
    arr.splice(index, 1);
    formik.setFieldValue("courseContent", arr);
  };

  return (
  <AdminLayout> 
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-5xl mx-auto flex flex-col bg-white p-8 rounded-xl shadow-lg my-10 space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="font-bold text-2xl text-[#BB0E00] mb-4 border-b-2 border-[#BB0E00] pb-2">
        Course Details
      </h2>

      {/* Course Image */}
      <div className="mb-4">
        <h3 className="font-semibold text-[#BB0E00] mb-2">Course Image</h3>
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#BB0E00] rounded-xl cursor-pointer hover:bg-[#ffe5e0] transition-colors">
          {formik.values.imagePreview ? (
            <img
              src={formik.values.imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span className="text-gray-500 text-center">
              Click to upload or drag & drop image here
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                formik.setFieldValue("image", file);
                formik.setFieldValue("imagePreview", URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Basic Inputs */}
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        className="border border-gray-300 rounded-md p-3 mb-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
      />
      <textarea
        name="description"
        placeholder="Short Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className="resize-none border border-gray-300 rounded-md p-3 mb-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
      />
      <textarea
        name="detailedDescription[0]"
        placeholder="Detailed Description"
        value={formik.values.detailedDescription[0]}
        onChange={formik.handleChange}
        className="resize-none border border-gray-300 rounded-md p-3 mb-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
      />
      <input
        type="text"
        name="createdBy"
        placeholder="Created By"
        value={formik.values.createdBy}
        onChange={formik.handleChange}
        className="border border-gray-300 rounded-md p-3 mb-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
      />
      <input
        type="text"
        name="lastUpdated"
        placeholder="Last Updated"
        value={formik.values.lastUpdated}
        onChange={formik.handleChange}
        className="border border-gray-300 rounded-md p-3 mb-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
      />

      {/* Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
        /> 
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={formik.values.originalPrice}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (hrs)"
          value={formik.values.duration}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
        />
        <input
          type="number"
          name="lessons"
          placeholder="No. of Lessons"
          value={formik.values.lessons}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#BB0E00] outline-none"
        />
      </div>

      {/* Boolean Fields */}
      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="includedInPlans"
            checked={formik.values.includedInPlans}
            onChange={formik.handleChange}
            className="accent-[#BB0E00]"
          />
          Included in Plans
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="premium"
            checked={formik.values.premium}
            onChange={formik.handleChange}
            className="accent-[#BB0E00]"
          />
          Premium
        </label>
      </div>

      {/* Arrays */}
      {[
        "languages",
        "subtitles",
        "whatYouWillLearn",
        "relatedTopics",
        "courseIncludes",
        "requirements",
      ].map((field) => (
        <div key={field}>
          <h3 className="font-semibold text-[#BB0E00] mb-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </h3>
          {formik.values[field].map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const arr = [...formik.values[field]];
                  arr[i] = e.target.value;
                  formik.setFieldValue(field, arr);
                }}
                className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              <button
                type="button"
                onClick={() => removeField(field, i)}
                className="text-red-500 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField(field)}
            className="border border-[#BB0E00] text-[#BB0E00] px-3 py-1 rounded-md hover:bg-[#BB0E00] hover:text-white transition"
          >
            + Add {field.charAt(0).toUpperCase() + field.slice(1)}
          </button>
        </div>
      ))}

      {/* Course Content */}
      <h3 className="font-semibold text-[#BB0E00] mt-6 mb-2">Course Content</h3>
      {formik.values.courseContent.map((content, i) => (
        <div key={i} className="border border-gray-300 rounded-md p-4 mb-4">
  <input
    type="text"
    placeholder="Content Title"
    value={content.title}
    onChange={(e) => {
      const arr = [...formik.values.courseContent];
      arr[i].title = e.target.value;
      formik.setFieldValue("courseContent", arr);
    }}
    className="border border-gray-300 rounded-md p-2 w-full mb-2 focus:ring-2 focus:ring-[#BB0E00] outline-none"
  />

  <label className="flex items-center gap-2 mb-2">
    <input
      type="checkbox"
      checked={content.preview}
      onChange={(e) => {
        const arr = [...formik.values.courseContent];
        arr[i].preview = e.target.checked;
        formik.setFieldValue("courseContent", arr);
      }}
      className="accent-[#BB0E00]"
    />
    Preview Available
  </label>

  {/* Styled Video Upload */}
  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#BB0E00] rounded-xl cursor-pointer hover:bg-[#ffe5e0] transition-colors mb-2">
    {content.video ? (
      <span className="text-gray-700 text-center text-sm">
        {content.video.name}
      </span>
    ) : (
      <span className="text-gray-500 text-center text-sm">
        Click to upload or drag & drop video
      </span>
    )}
    <input
      type="file"
      accept="video/*"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          const arr = [...formik.values.courseContent];
          arr[i].video = e.target.files[0];
          formik.setFieldValue("courseContent", arr);
        }
      }}
      className="hidden"
    />
  </label>

  <button
    type="button"
    onClick={() => removeCourseContent(i)}
    className="text-red-500 font-bold text-lg mt-2"
  >
    Remove
  </button>
</div>

      ))}
      <button
        type="button"
        onClick={addCourseContent}
        className="border border-[#BB0E00] text-[#BB0E00] px-3 py-1 rounded-md hover:bg-[#BB0E00] hover:text-white transition mb-4"
      >
        + Add Course Content
      </button>

      {/* Submit */}
      <button
        type="submit"
        className="bg-[#BB0E00] text-white w-[220px] mx-auto px-4 py-3 rounded-md mt-6 font-semibold hover:bg-[#B94400] transition"
      >
        Create Course
      </button>
    </form>
    </AdminLayout>
   
  );
}
