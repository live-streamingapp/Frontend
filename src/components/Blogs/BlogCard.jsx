import { Link } from "react-router-dom";
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <article className="bg-white flex flex-col rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-300 h-[500px]">
      {/* Image Block */}
      <div className="w-full">
        <img
          src={blog.mainImage || "/images/course.png"}
          alt={blog.title}
          className="h-[200px] object-cover w-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1/2 p-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {blog.description.length > 100
              ? blog.description.slice(0, 100) + "..."
              : blog.description}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          By {blog.author} • {new Date(blog.date).toDateString()}
        </p>
        <Link
          to={`/blogs/${blog._id}`}
          className="font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 rounded-lg text-sm text-center mt-3"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
