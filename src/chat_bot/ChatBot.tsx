import React, { useState, useRef } from "react";
import logo from '../assets/NeuroMind.png';
import { IoSend } from "react-icons/io5";
import patric_gif from '../assets/patrick-crazytalk.gif';

interface Message {
  role: "user" | "assistant";
  content: string;
  duration?: number;
  tokensPerSec?: number;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const startTime = performance.now();

      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gemma:2b", // replace with your model
          prompt: input
        })
      });

      const data = await res.json();
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Calculate tokens/sec
      const tokens = data?.usage?.total_tokens || data?.tokens || data?.text?.length || 1;
      const tokensPerSec = tokens / (duration / 1000);

      const assistantMessage: Message = {
        role: "assistant",
        content: data?.text || "No response",
        duration,
        tokensPerSec
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: "assistant", content: "Failed to fetch response" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

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

        <div ref={scrollRef} className="h-80 overflow-y-auto border border-purple-100 rounded-2xl p-4 mb-6 bg-gradient-to-br from-white to-purple-50 shadow-inner flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="text-gray-600 text-sm text-center mt-10 opacity-70">
              Start a conversation with <span className="text-purple-700 font-medium">Neuro_mind</span>!
              <img src={patric_gif} alt="Patrick GIF" className="mx-auto mt-4 w-50 h-50" />
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${msg.role === "user" ? "bg-purple-100 self-end" : "bg-purple-50 self-start"}`}
            >
              <p className="text-gray-700">{msg.content}</p>
              {msg.role === "assistant" && msg.duration && (
                <p className="text-xs text-gray-400 mt-1">
                  Duration: {(msg.duration / 1000).toFixed(2)}s | Tokens/sec: {msg.tokensPerSec?.toFixed(2)}
                </p>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm text-center">Neuro_mind is thinking...</div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-l-full text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-200 shadow-md"
          />
          <button
            onClick={sendMessage}
            className="flex items-center justify-center px-4 py-3 rounded-r-full bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition-transform"
          >
            <IoSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
