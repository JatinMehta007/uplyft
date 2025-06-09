import React, { useState } from 'react';
import axios from 'axios';
import { cn } from '../lib/utils';
import { Input } from '../ui/Inputs';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true
});

export default function Chat() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      // alert('Please enter a message');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await instance.post('/chat', { message }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setResponses(prev => [
        ...prev,
        { question: message, answer: res.data.results }
      ]);

      setMessage('');
    } catch (err) {
      console.error(" Failed to fetch results:", err.response?.data || err.message);
      alert('Failed to fetch results');
    }
  };

  return (
    <div className="relative min-h-screen flex w-full items-center justify-center bg-black">
      
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />


      <div className="relative p-6 max-w-4xl mx-auto z-10">
        <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-7xl font-bold text-transparent">
          E-commerce Chatbot
        </h2>

        <form onSubmit={handleSend} className="flex gap-2 mb-4">
          <Input
            className="relative"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Search for products..."
          />
          <button
  type="submit"
  className="bg-blue-600 text-white px-4 py-2 relative cursor-pointer rounded-lg "
  disabled={!message.trim()}
>
  Send
</button>
        </form>

        <div className="space-y-4">
          {responses.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <p><strong>You:</strong> {item.question}</p>
              <div className="mt-2">
                {item.answer.length > 0 ? (
                  item.answer.map((p, i) => (
                    <div key={i} className="border p-2 mb-2 rounded bg-white">
                      <p className="font-semibold">{p.name}</p>
                      <p>{p.description}</p>
                      <p className="text-sm text-gray-500">${p.price}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-red-500">No results found</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}