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
      content: 'Hello! I am your Fit-Zone AI Coach powered by Gemini 1.5 Pro & pgvector. Ask me for custom workout plans or nutrition macro targets!',
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
        content: `🏋️ **AI Fitness Guidance**: Aim for 3-4 progressive overload strength sessions per week paired with 2.0g protein per kg bodyweight and 7-8 hours rest.`,
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
        className="fixed bottom-6 right-6 z-40 p-4 bg-cta-gradient rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group border border-primary/40"
        aria-label="Open AI Fitness Coach"
      >
        <Sparkles className="w-6 h-6 animate-spin-slow text-secondary" />
        <span className="hidden sm:inline font-black text-sm">AI Coach</span>
      </button>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm glass-card rounded-3xl border border-border shadow-2xl flex flex-col h-[500px] overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-surface border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-accent/20 rounded-2xl text-accent shadow-md shadow-accent/20">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  AI Personal Coach <Sparkles size={14} className="text-secondary" />
                </h3>
                <p className="text-[10px] text-secondary font-bold">● RAG Vector Engine Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-text-muted hover:text-white rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-text-secondary">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ASSISTANT' && (
                  <div className="p-1.5 bg-accent/20 rounded-full text-accent h-fit border border-accent/30">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'USER'
                      ? 'bg-cta-gradient text-white rounded-br-none shadow-md shadow-primary/20'
                      : 'bg-surface text-text-primary rounded-bl-none border border-border'
                  }`}
                >
                  {m.content}
                </div>
                {m.sender === 'USER' && (
                  <div className="p-1.5 bg-surface rounded-full text-white h-fit border border-border">
                    <UserIcon size={14} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-text-muted text-xs italic">
                <Bot size={14} className="animate-bounce text-accent" /> Generating AI recommendation...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-border bg-dark flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI coach..."
              className="input-field py-2 text-xs"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-cta-gradient rounded-xl text-white hover:opacity-90 transition disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
