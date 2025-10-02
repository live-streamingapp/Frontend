import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AdminLayout from "../../Layout/AdminLayout";

function CreateBook() {
  const [coverImage, setCoverImage] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      coverImage: "",
      highlights: { whyThisBook: "", difference: "", whoCanBuy: "" },
      keyFeatures: [""],
      targetAudience: [""],
      languageOptions: [{ language: "", stock: 0, buyLink: "" }],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number().min(0, "Price must be positive"),
      highlights: Yup.object({
        whyThisBook: Yup.string(),
        difference: Yup.string(),
        whoCanBuy: Yup.string(),
      }),
      languageOptions: Yup.array().of(
        Yup.object({
          language: Yup.string().required("Language required"),
          stock: Yup.number().min(0, "Invalid stock"),
          buyLink: Yup.string().url("Invalid URL"),
        })
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("🚀 Form submission started");
      console.log("Form values:", values);
      console.log("Environment URL:", import.meta.env.VITE_BACKEND_URL);

      try {
        const formData = new FormData();

        // Convert keyFeatures strings to objects
        const keyFeaturesData = values.keyFeatures.map((f) => ({ feature: f }));

        const payload = {
          ...values,
          keyFeatures: keyFeaturesData,
        };

        console.log("Payload to send:", payload);

        // Append all fields, stringify nested objects/arrays
        Object.keys(payload).forEach((key) => {
          if (Array.isArray(payload[key]) || typeof payload[key] === "object") {
            formData.append(key, JSON.stringify(payload[key]));
          } else {
            formData.append(key, payload[key]);
          }
        });

        // Append cover file
        if (coverFile) {
          formData.append("file", coverFile);
          console.log("Cover file attached:", coverFile.name);
        }

        console.log(
          "Making API request to:",
          `${import.meta.env.VITE_BACKEND_URL}/books`
        );

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/books`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("✅ Book added successfully:", res.data);
        alert("Book added successfully!");
        resetForm();
        setCoverImage(null);
        setCoverFile(null);
      } catch (error) {
        console.error("❌ Error adding book:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        alert(
          `Failed to add book: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    },
  });

  // Add debugging for validation errors
  console.log("Formik errors:", formik.errors);
  console.log("Formik touched:", formik.touched);
  console.log("Is form valid:", formik.isValid);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleCoverImageClick = () =>
    document.getElementById("coverInput").click();

  // Debug button click
  const handleSubmitClick = (e) => {
    console.log("🔘 Submit button clicked");
    console.log("Form is valid:", formik.isValid);
    console.log("Form errors:", formik.errors);

    // Let the default form submission continue
  };

  return (
    <AdminLayout>
      {" "}
      <div className="w-full p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <form
          onSubmit={formik.handleSubmit}
          className="mt-6 flex flex-col gap-4"
          encType="multipart/form-data"
        >
          <div className="border-2 border-dashed border-[#BB0E00] mt-4 flex justify-center py-6 rounded-lg">
            <div className="w-full max-w-[130px] flex flex-col items-center gap-3">
              <input
                id="coverInput"
                type="file"
                accept="image/*"
                name="file"
                onChange={handleCoverImageChange}
                style={{ display: "none" }}
              />
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={handleCoverImageClick}
                  className="border border-[#BB0E00] w-16 h-16 rounded-lg text-[#BB0E00] font-bold hover:bg-[#FFF2F0]"
                >
                  +
                </button>
              )}
              <p className="text-[#BB0E00] font-medium text-center text-sm">
                Add Cover
              </p>
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder="Book Title"
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}

          {/* Description */}
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Book Description"
            className="border border-gray-300 rounded-md p-3 w-full resize-none focus:ring-2 focus:ring-[#BB0E00] outline-none"
            rows={3}
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            placeholder="Price"
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
          />

          {/* Highlights */}
          <h3 className="font-medium mt-4 text-[#BB0E00]">Highlights</h3>
          {["whyThisBook", "difference", "whoCanBuy"].map((field) => (
            <input
              key={field}
              type="text"
              name={`highlights.${field}`}
              value={formik.values.highlights[field]}
              onChange={formik.handleChange}
              placeholder={field}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
          ))}

          {/* Key Features */}
          <h3 className="font-medium mt-4 text-[#BB0E00]">Key Features</h3>
          {formik.values.keyFeatures.map((feature, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  formik.setFieldValue(`keyFeatures[${i}]`, e.target.value)
                }
                placeholder="Feature"
                className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  formik.setFieldValue("keyFeatures", [
                    ...formik.values.keyFeatures,
                    "",
                  ]);
                }}
                className="text-red-500 font-bold text-lg"
              >
                +
              </button>
            </div>
          ))}

          {/* Target Audience */}
          <h3 className="font-medium mt-4 text-[#BB0E00]">Target Audience</h3>
          <input
            type="text"
            value={formik.values.targetAudience.join(", ")}
            onChange={(e) =>
              formik.setFieldValue(
                "targetAudience",
                e.target.value.split(",").map((t) => t.trim())
              )
            }
            placeholder="Homeowners, Entrepreneurs, etc."
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
          />

          {/* Language Options */}
          <h3 className="font-medium mt-4 text-[#BB0E00]">Language Options</h3>
          {formik.values.languageOptions.map((lang, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                value={lang.language}
                onChange={(e) => {
                  const updated = [...formik.values.languageOptions];
                  updated[i].language = e.target.value;
                  formik.setFieldValue("languageOptions", updated);
                }}
                placeholder="Language"
                className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              <input
                type="number"
                value={lang.stock}
                onChange={(e) => {
                  const updated = [...formik.values.languageOptions];
                  updated[i].stock = Number(e.target.value);
                  formik.setFieldValue("languageOptions", updated);
                }}
                placeholder="Stock"
                className="border border-gray-300 rounded-md p-2 w-20 focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              <input
                type="text"
                value={lang.buyLink}
                onChange={(e) => {
                  const updated = [...formik.values.languageOptions];
                  updated[i].buyLink = e.target.value;
                  formik.setFieldValue("languageOptions", updated);
                }}
                placeholder="Buy Link"
                className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              {formik.errors.languageOptions?.[i] && (
                <div className="text-red-500 text-xs">
                  {JSON.stringify(formik.errors.languageOptions[i])}
                </div>
              )}
            </div>
          ))}

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              onClick={handleSubmitClick}
              className="bg-[#BB0E00] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#B94400] transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateBook;
