// src/components/courseProgress/CourseProgressPage.jsx
import React from 'react';
import StudentProfileHeader from './StudentProfileHeader';
import StatsCard from './StatsCard';
import ProgressChart from './ProgressChart';

const sampleStudent = {
  name: 'Aditi R. Sharma',
  id: 'STU-2025-0378',
  course: 'Advanced Vedic Astrology',
  avatar: "/images/aditi.png" // or import from src/assets
};

const chartData = [
  {date: 'Week 1', value: 45},
  {date: 'Week 2', value: 60},
  {date: 'Week 3', value: 55},
  {date: 'Week 4', value: 80},
  {date: 'Week 5', value: 70},
  {date: 'Week 6', value: 88},
];

export default function CourseProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <div className="flex gap-3">
          <button className="px-3 py-2 rounded bg-gray-100">All Students</button>
          <button className="px-3 py-2 rounded bg-v-red-600 text-white">Course Progress</button>
          <button className="px-3 py-2 rounded bg-gray-100">Booking History</button>
          <button className="px-3 py-2 rounded bg-gray-100">Reports Download</button>
        </div> */}
        {/* <button className="px-4 py-2 border rounded">+ Add Students</button> */}
      </div>

      <StudentProfileHeader student={sampleStudent}/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 grid grid-cols-2 gap-4">
                <StatsCard 
          title="Videos Watched" 
          value="14 / 18" 
          icon="/images/videos.png"
        />
        <StatsCard 
          title="Quizzes Completed" 
          value="4 / 5" 
          icon="/images/quizzes.png"
        />
        <StatsCard 
          title="Progress" 
          value="78%" 
          icon="/images/progress.png"
        />
        <StatsCard 
          title="Status" 
          value={<span className="text-green-600">On Track</span>} 
          icon="/images/status.png"
        />
        </div>

        <div className="lg:col-span-2">
          <ProgressChart data={chartData}/>
        </div>
      </div>

      {/* duplicate block for second student if needed */}
      <div className="flex items-center justify-between">
        {/* <div className="flex gap-3">
          <button className="px-3 py-2 rounded bg-gray-100">All Students</button>
          <button className="px-3 py-2 rounded bg-v-red-600 text-white">Course Progress</button>
          <button className="px-3 py-2 rounded bg-gray-100">Booking History</button>
          <button className="px-3 py-2 rounded bg-gray-100">Reports Download</button>
        </div> */}
        {/* <button className="px-4 py-2 border rounded">+ Add Students</button> */}
      </div>

      <StudentProfileHeader student={sampleStudent}/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 grid grid-cols-2 gap-4">
        <StatsCard 
          title="Videos Watched" 
          value="14 / 18" 
          icon="/images/videos.png"
        />
        <StatsCard 
          title="Quizzes Completed" 
          value="4 / 5" 
          icon="/images/quizzes.png"
        />
        <StatsCard 
          title="Progress" 
          value="78%" 
          icon="/images/progress.png"
        />
        <StatsCard 
          title="Status" 
          value={<span className="text-green-600">On Track</span>} 
          icon="/images/status.png"
        />
        </div>

        <div className="lg:col-span-2">
          <ProgressChart data={chartData}/>
        </div>
      </div>
    </div>
  );
}
