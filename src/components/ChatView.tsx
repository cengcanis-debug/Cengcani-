import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, HelpCircle, BookOpen, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
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
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    // Stop speech when component unmounts or language changes
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = (text: string, index: number) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean markdown symbols for clearer speech synthesis
    const cleanText = text
      .replace(/[#*`_~[\]()]/g, '')
      .replace(/->/g, ' yields ')
      .replace(/H2O/g, 'H O')
      .replace(/CO2/g, 'C O 2');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'Afrikaans' ? 'af-ZA' : language === 'isiZulu' ? 'zu-ZA' : language === 'Setswana' ? 'tn-ZA' : 'en-ZA';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingIndex(null);
    };

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice-to-text is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'Afrikaans' ? 'af-ZA' : language === 'isiZulu' ? 'zu-ZA' : language === 'Setswana' ? 'tn-ZA' : 'en-ZA';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert("Microphone access was denied or is not permitted in this frame. Please check browser microphone permissions.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

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
                  <div>
                    <div className="markdown-body prose prose-sm max-w-none text-slate-800">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleSpeak(msg.content, index)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
                          speakingIndex === index
                            ? 'bg-red-600 text-white border-red-700 animate-pulse'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {speakingIndex === index ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>🔊 Listen to Sifiso</span>
                          </>
                        )}
                      </button>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                  </div>
                )}
                {msg.role === 'user' && (
                  <div className="text-[10px] mt-1.5 text-right text-amber-200">
                    {msg.timestamp}
                  </div>
                )}
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
        {isListening && (
          <div className="mb-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between animate-pulse">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Listening to your voice... Speak your question clearly.
            </span>
            <button
              onClick={toggleListening}
              className="text-xs font-semibold underline hover:text-red-900"
            >
              Stop
            </button>
          </div>
        )}
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
            placeholder={`Ask Sifiso anything about Grade ${grade} ${subject} (or use mic to speak)...`}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-red-600 text-white border-red-700 animate-bounce shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title={isListening ? 'Stop listening' : 'Speak your question (Voice-to-Text)'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-sm cursor-pointer shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 px-1">
          <span>💡 Tip: Click the microphone icon to speak your homework question out loud.</span>
          <span>CAPS & IEB Aligned</span>
        </div>
      </div>
    </div>
  );
}
