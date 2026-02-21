import React from "react";

function ErrorScreen({ message, darkMode, goBack }) {
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center justify-center p-4`}>
      <h1 className="text-3xl font-bold mb-6 text-red-600">Oops!</h1>
      <p className="mb-6 text-center">{message}</p>
      <button onClick={goBack} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Try Again
      </button>
    </div>
  );
}

export default ErrorScreen;