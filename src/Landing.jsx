import ThemeBtn from "./components/ThemeBtn.jsx";
import { useLanding } from "./context/index.js";

export default function Landing() {
  const { start } = useLanding();
  const getStarted = () => {
    console.log("Start called");
    start();
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-white dark:bg-[#172842] relative">
      {/* Theme Button */}
      <div className="absolute top-4 right-4 sm:static sm:mb-6">
        <ThemeBtn />
      </div>
      <div className="max-w-2xl text-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#172842] dark:text-white">
          Welcome to Our Todo App
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg mb-8 text-gray-700 dark:text-gray-300">
          Stay organized and productive with a simple, clean interface. Easily manage your tasks, switch between light and dark modes, and never lose your todos.
        </p>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-[#172842] dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-700 dark:text-gray-300">Easy Task Management</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-[#172842] dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
            </svg>
            <p className="text-sm text-gray-700 dark:text-gray-300">Light & Dark Themes</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-[#172842] dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            <p className="text-sm text-gray-700 dark:text-gray-300">Persistent Storage</p>
          </div>
        </div>

        {/* Get Started Button */}
        <button className="cursor-pointer rounded-full px-5 py-2 bg-[#172842] text-white dark:bg-white dark:text-[#172842] transition-colors duration-300 hover:bg-opacity-90 dark:hover:bg-gray-100" onClick={getStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}
