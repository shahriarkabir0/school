import React from "react";

const NoticeBoard = () => {
  const notices = [
    "Admission is open for the 2025 batch.",
    "Upcoming seminar on medical advancements on March 15th.",
    "Hostel facilities will be upgraded by next semester.",
    "Final exam schedule has been published.",
  ];

  return (
    <div className=" bg-white shadow-lg rounded-lg p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Notice Board</h2>
      <ul className="space-y-2">
        {notices.map((notice, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
          >
            {notice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
