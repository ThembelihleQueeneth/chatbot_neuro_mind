import logo from '../assets/NeuroMind.png';
import { IoSend } from "react-icons/io5";
import patric_gif from '../assets/patrick-crazytalk.gif'

export const ChatBot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col items-center p-6">
      <nav className="flex items-center justify-center gap-3 bg-white shadow-md rounded-full px-6 py-3 w-fit mb-6">
        <img src={logo} alt="Neuro_mind Logo" className="w-12 h-12 rounded-full object-cover" />
        <h1 className="text-3xl font-semibold text-purple-700 tracking-wide">Neuro_mind</h1>
      </nav>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-3xl p-8 border border-purple-100">
        <h2 className="text-2xl font-light mb-6 text-center">
          Welcome to <span className="font-semibold text-purple-700">Neuro_mind</span> Assistant 
        </h2>

        <div className="h-80 overflow-y-auto border border-purple-100 rounded-2xl p-4 mb-6 bg-gradient-to-br from-white to-purple-50 shadow-inner">
          <div className="text-gray-600 text-sm text-center mt-10 opacity-70">
            Start a conversation with <span className="text-purple-700 font-medium">Neuro_mind</span>!
            <img src={patric_gif} alt="Patrick GIF" className="mx-auto mt-4 w-50 h-50" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="search" className="sr-only">Ask Neuro_mind</label>
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full shadow-md focus-within:ring-2 focus-within:ring-purple-200">
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-l-full text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Send question"
              className="flex items-center justify-center px-4 py-3 rounded-r-full bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <IoSend className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Neuro_mind. All rights reserved.
      </footer>
    </div>
  );
};
