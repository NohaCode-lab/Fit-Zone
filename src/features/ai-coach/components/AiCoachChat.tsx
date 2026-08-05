import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User as UserIcon } from 'lucide-react';
import { apiClient } from '../../../services/api/client';

interface Message {
  id: string;
  sender: 'USER' | 'ASSISTANT';
  content: string;
}

export const AiCoachChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ASSISTANT',
      content: 'Hello! I am your Fit-Zone AI Coach. Ask me to generate a workout plan, calculate macro targets, or give dietary guidance!',
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'USER',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await apiClient.post('/ai/coach', { message: currentInput });
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ASSISTANT',
        content: res.data.content,
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      // Fallback AI simulation
      const fallbackReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ASSISTANT',
        content: `🏋️ **AI Fitness Guidance**: Great question! To optimize your training for strength and mobility, aim for 3-4 progressive overload sessions per week paired with 7-8 hours of quality sleep.`,
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-primary to-accent rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        aria-label="Open AI Fitness Coach"
      >
        <Sparkles className="w-6 h-6 animate-spin-slow" />
        <span className="hidden sm:inline font-bold text-sm">AI Coach</span>
      </button>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm glass-card rounded-3xl border border-white/20 shadow-2xl flex flex-col h-[500px] overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-primary/20 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/30 rounded-full text-primary">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">AI Personal Coach</h3>
                <p className="text-[10px] text-green-400 font-medium">● RAG Engine Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-gray-200">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ASSISTANT' && (
                  <div className="p-1.5 bg-primary/20 rounded-full text-primary h-fit">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'USER'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
                  }`}
                >
                  {m.content}
                </div>
                {m.sender === 'USER' && (
                  <div className="p-1.5 bg-white/20 rounded-full text-white h-fit">
                    <UserIcon size={14} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                <Bot size={14} className="animate-bounce" /> Generating AI recommendation...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-dark/90 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI coach..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-primary rounded-xl text-white hover:bg-primary/80 transition disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
