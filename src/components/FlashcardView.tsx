import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Volume2, ArrowLeft, ArrowRight, RotateCw, Loader2 } from 'lucide-react';
import { FlashcardItem } from '../types';

interface FlashcardViewProps {
  grade: string;
  subject: string;
  language: string;
}

export function FlashcardView({ grade, subject, language }: FlashcardViewProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerateFlashcards = async (topicToUse?: string) => {
    setLoading(true);
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicToUse || subject, grade, subject, language })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setFlashcards(data.flashcards || []);
    } catch (err: any) {
      alert(err.message || 'Failed to generate flashcards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateFlashcards();
  }, [grade, subject]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            🃏
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Sifiso's Interactive Revision Flashcards</h2>
            <p className="text-xs text-slate-500">Master key terms, formulas, and definitions for Grade {grade} {subject}. Flip cards to reveal simplified explanations!</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Custom topic (e.g. Stoichiometry, Genetics)..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          <button
            onClick={() => handleGenerateFlashcards(topic)}
            disabled={loading}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm cursor-pointer flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
            <span>New Flashcards</span>
          </button>
        </div>
      </div>

      {/* Flashcard Stack */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-emerald-100 p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-sm font-medium text-slate-600">Sifiso is crafting your revision flashcards...</p>
        </div>
      ) : flashcards.length > 0 && currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Card {currentIndex + 1} of {flashcards.length}</span>
            <span>Click card to flip • Sharp sharp!</span>
          </div>

          {/* Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full min-h-[280px] bg-white border-2 rounded-3xl p-8 shadow-md cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center relative ${
              isFlipped ? 'border-teal-500 bg-teal-50/20' : 'border-emerald-200 hover:border-emerald-400'
            }`}
          >
            <div className="absolute top-4 left-4 text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {isFlipped ? 'Definition & Memory Hook' : 'Key Term / Formula'}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                speakText(isFlipped ? currentCard.definition : currentCard.term);
              }}
              className="absolute top-4 right-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 p-2 rounded-xl transition shadow-xs"
              title="Read aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <div className="my-auto py-6">
              {!isFlipped ? (
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentCard.term}
                </h3>
              ) : (
                <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-xl">
                  {currentCard.definition}
                </p>
              )}
            </div>

            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-auto">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Showing definition (Click to show term)' : 'Showing term (Click to reveal definition)'}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(prev => (prev > 0 ? prev - 1 : flashcards.length - 1));
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Card</span>
            </button>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
              Grade {grade} • {subject}
            </span>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(prev => (prev < flashcards.length - 1 ? prev + 1 : 0));
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          No flashcards generated yet. Click "New Flashcards" above!
        </div>
      )}
    </div>
  );
}
