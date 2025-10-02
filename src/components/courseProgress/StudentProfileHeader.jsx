// src/components/courseProgress/StudentProfileHeader.jsx
import React from 'react';

export default function StudentProfileHeader({ student }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 relative">
      <div className="flex items-center gap-4">
        {/* Profile Image - slightly up but centered */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow absolute -top--2 left-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Info */}
        <div className="pl-28">
          <div className="text-lg font-semibold">{student.name}</div>
          <div className="text-sm text-gray-500">ID: {student.id}</div>
          <div className="text-sm text-gray-400">{student.course}</div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <button className="px-4 py-2 bg-v-red-600 text-white rounded">
            View
          </button>
          {/* 3 dots icon from /images */}
          <button className="p-2 rounded hover:bg-gray-100">
            <img
              src="/images/3dots.png"
              alt="Menu"
              className="w-5 h-5 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
