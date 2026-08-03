import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, HelpCircle, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface ChatViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  grade: string;
  subject: string;
  language: string;
}

const STARTER_PROMPTS = [
  "How do I solve quadratic equations by completing the square?",
  "Help me understand Photosynthesis in Grade 10 Life Sciences.",
  "Eish, I'm stuck balancing this chemical equation: H2 + O2 -> H2O",
  "Can you explain Newton's Second Law using a rugby tackle example?",
  "How do I calculate VAT and compound interest in Grade 11 Accounting?"
];

export function ChatView({ messages, setMessages, grade, subject, language }: ChatViewProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          grade,
          subject,
          language
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const modelMessage: Message = {
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, modelMessage]);
    } catch (err: any) {
      const errorMsg: Message = {
        role: 'model',
        content: "Eish! Something went wrong connecting to Sifiso. Please check your connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Chat header banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-emerald-400 font-bold text-lg shadow">
            🎓
          </div>
          <div>
            <h2 className="font-semibold text-lg flex items-center gap-2">
              Sifiso Mentor <span className="text-xs bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-500 font-normal">Grade {grade} • {subject}</span>
            </h2>
            <p className="text-xs text-emerald-200">Socratic guidance for CAPS & IEB success • Sharp sharp!</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-700/50">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>No direct answers—learning by doing!</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner">
              🇿🇦
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Sawubona! I'm Sifiso, your tutor.</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              What are we tackling today in <span className="font-semibold text-emerald-800">Grade {grade} {subject}</span>? Pick a starter question below or type your own homework puzzle!
            </p>

            <div className="w-full space-y-2 text-left">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Suggested Starting Questions:</p>
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left text-xs sm:text-sm bg-white hover:bg-emerald-50 text-slate-700 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition shadow-xs flex items-center justify-between group"
                >
                  <span>{prompt}</span>
                  <span className="text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition">Ask →</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-white font-medium text-sm'
                    : 'bg-emerald-800 text-white font-bold'
                }`}
              >
                {msg.role === 'user' ? <User className="w-5 h-5" /> : '👨‍🏫'}
              </div>
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-xs text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="markdown-body prose prose-sm max-w-none text-slate-800">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    msg.role === 'user' ? 'text-amber-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              👨‍🏫
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center space-x-2 text-slate-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Sifiso is thinking through the steps with you...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask Sifiso anything about Grade ${grade} ${subject} (remember, no direct answers!)...`}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 px-1">
          <span>💡 Tip: Ask Sifiso to break down a tricky word problem or give you a hint.</span>
          <span>CAPS & IEB Aligned</span>
        </div>
      </div>
    </div>
  );
}
