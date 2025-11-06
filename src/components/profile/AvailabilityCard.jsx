"use client";

import { useState } from "react";

const days = [
  { short: "M", full: "Monday", time: "Morning 9am – 11am" },
  { short: "T", full: "Tuesday", time: "" },
  { short: "W", full: "Wednesday", time: "Afternoon 1pm – 4pm" },
  { short: "T", full: "Thursday", time: "" },
  { short: "F", full: "Friday", time: "Evening 6pm – 8pm" },
  { short: "S", full: "Saturday", time: "" },
  { short: "S", full: "Sunday", time: "" },
];

export default function AvailabilityCard() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className=" mx-auto mt-10 mb-10 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-semibold text-center mb-4">
        Weekly Availability
      </h2>

      {/* Weekday Circles */}
      <div className="flex justify-between mb-4">
        {days.map((day, index) => {
          const isAvailable = day.time !== "";
          const isSelected = selectedDay?.full === day.full;

          return (
            <button
              key={index}
              onClick={() => isAvailable && handleClick(day)}
              className={`relative w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                ${
                  isAvailable
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
                ${isSelected ? "ring-2 ring-blue-400 ring-offset-2" : ""}
              `}
            >
              {day.short}
            </button>
          );
        })}
      </div>

      {/* Selected Day Info */}
      {selectedDay && selectedDay.time && (
        <div className="mt-4 text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-all">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {selectedDay.full}:
            </span>{" "}
            {selectedDay.time}
          </p>
        </div>
      )}

      {!selectedDay && (
        <p className="text-center text-gray-400 text-sm">
          Select a highlighted day to view timing
        </p>
      )}
    </div>
  );
}
