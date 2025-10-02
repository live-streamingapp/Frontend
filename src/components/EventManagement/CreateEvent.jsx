import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AdminLayout from "../../Layout/AdminLayout";

function CreateEvent() {
  const [thumbnail, setThumbnail] = useState(null);
  const [isVirtual, setIsVirtual] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      entryAmount: "",
      capacity: "",
      registrationRequired: true,
      location: "",
      virtualPlatform: {
        name: "",
        url: "",
        liveStreaming: false,
        streamingUrl: "",
      },
      organizer: { name: "", email: "", contact: "" },
      topics: [""],
      resources: [""],
      requirements: [""],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      startTime: Yup.date().required("Start time required"),
      endTime: Yup.date().required("End time required"),
      entryAmount: Yup.number().min(0, "Invalid amount"),
      capacity: Yup.number().min(1, "Capacity must be at least 1"),
      organizer: Yup.object({
        name: Yup.string().required("Organizer name required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Organizer email required"),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // Append values
        Object.keys(values).forEach((key) => {
          if (typeof values[key] === "object" && !Array.isArray(values[key])) {
            Object.keys(values[key]).forEach((nestedKey) => {
              formData.append(`${key}.${nestedKey}`, values[key][nestedKey]);
            });
          } else if (Array.isArray(values[key])) {
            values[key].forEach((item) => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, values[key]);
          }
        });

        // Append thumbnail
        if (thumbnail) {
          const fileInput = document.getElementById("thumbnailInput");
          formData.append("thumbnail", fileInput.files[0]);
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/events`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Event created:", response.data);
        alert("Event created successfully!");
        resetForm();
        setThumbnail(null);
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Failed to create event. Check console for details.");
      }
    },
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };

  const handleThumbnailClick = () =>
    document.getElementById("thumbnailInput").click();

  return (
    <AdminLayout>
      <div className="w-full p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Thumbnail */}
        <div className="border-2 border-dashed border-[#BB0E00] mt-4 flex justify-center py-6 rounded-lg">
          <div className="w-full max-w-[130px] flex flex-col items-center gap-3">
            <input
              id="thumbnailInput"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              style={{ display: "none" }}
            />
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <button
                onClick={handleThumbnailClick}
                className="border border-[#BB0E00] w-16 h-16 rounded-lg text-[#BB0E00] font-bold hover:bg-[#FFF2F0]"
              >
                +
              </button>
            )}
            <p className="text-[#BB0E00] font-medium text-center text-sm">
              Add Thumbnail
            </p>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder="Event Title"
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}

          {/* Description */}
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Event Description"
            className="border border-gray-300 rounded-md p-3 w-full resize-none focus:ring-2 focus:ring-[#BB0E00] outline-none"
            rows={3}
          />

          {/* Timing */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="datetime-local"
              name="startTime"
              onChange={formik.handleChange}
              value={formik.values.startTime}
              className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
            <input
              type="datetime-local"
              name="endTime"
              onChange={formik.handleChange}
              value={formik.values.endTime}
              className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
          </div>

          {/* Entry & Capacity */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              name="entryAmount"
              onChange={formik.handleChange}
              value={formik.values.entryAmount}
              placeholder="Entry Amount"
              className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
            <input
              type="number"
              name="capacity"
              onChange={formik.handleChange}
              value={formik.values.capacity}
              placeholder="Capacity"
              className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
          </div>

          {/* Registration */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="registrationRequired"
              checked={formik.values.registrationRequired}
              onChange={formik.handleChange}
              className="accent-[#BB0E00]"
            />
            Registration Required
          </label>

          {/* Location / Virtual */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isVirtual}
                onChange={() => setIsVirtual(!isVirtual)}
                className="accent-[#BB0E00]"
              />
              Virtual Event
            </label>
          </div>

          {!isVirtual ? (
            <input
              type="text"
              name="location"
              onChange={formik.handleChange}
              value={formik.values.location}
              placeholder="Location"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={formik.values.virtualPlatform.name}
                onChange={(e) =>
                  formik.setFieldValue("virtualPlatform.name", e.target.value)
                }
                placeholder="Virtual Platform Name"
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              <input
                type="text"
                value={formik.values.virtualPlatform.url}
                onChange={(e) =>
                  formik.setFieldValue("virtualPlatform.url", e.target.value)
                }
                placeholder="Platform URL"
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formik.values.virtualPlatform.liveStreaming}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "virtualPlatform.liveStreaming",
                      e.target.checked
                    )
                  }
                  className="accent-[#BB0E00]"
                />
                Live Streaming
              </label>
              {formik.values.virtualPlatform.liveStreaming && (
                <input
                  type="text"
                  value={formik.values.virtualPlatform.streamingUrl}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "virtualPlatform.streamingUrl",
                      e.target.value
                    )
                  }
                  placeholder="Streaming URL"
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
                />
              )}
            </div>
          )}

          {/* Topics / Resources / Requirements */}
          {["topics", "resources", "requirements"].map((field) => (
            <div key={field} className="flex flex-col gap-2 mt-4">
              <p className="font-medium text-[#BB0E00]">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </p>
              {formik.values[field].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      formik.setFieldValue(`${field}[${i}]`, e.target.value)
                    }
                    placeholder={`Add ${field.slice(0, -1)}`}
                    className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-[#BB0E00] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      formik.setFieldValue(field, [...formik.values[field], ""])
                    }
                    className="text-red-500 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Organizer */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="font-medium text-[#BB0E00]">Organizer Info</p>
            <input
              type="text"
              name="organizer.name"
              onChange={formik.handleChange}
              value={formik.values.organizer.name}
              placeholder="Organizer Name"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
            <input
              type="email"
              name="organizer.email"
              onChange={formik.handleChange}
              value={formik.values.organizer.email}
              placeholder="Organizer Email"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
            <input
              type="text"
              name="organizer.contact"
              onChange={formik.handleChange}
              value={formik.values.organizer.contact}
              placeholder="Organizer Contact"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#BB0E00] outline-none"
            />
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#BB0E00] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#B94400] transition"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateEvent;
