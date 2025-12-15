import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, MessageSquareQuote } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (mood: string, type: 'all' | 'text' | 'image') => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [mood, setMood] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const presets = [
    "Snowy Silence",
    "Childhood Nostalgia",
    "Winter Solstice",
    "Family Chaos",
    "Grateful Heart"
  ];

  const handleGenerate = (type: 'all' | 'text' | 'image') => {
    if (!mood.trim()) return;
    onGenerate(mood, type);
  };

  const handlePresetClick = (preset: string) => {
    setMood(preset);
    setActivePreset(preset);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMood(e.target.value);
    setActivePreset(null);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12 space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="mood" className="text-holiday-gold font-serif text-lg italic">
          What is your heart feeling?
        </label>
        <input
          id="mood"
          type="text"
          value={mood}
          onChange={handleInputChange}
          placeholder="e.g., Peaceful evening by the fire..."
          className="w-full bg-holiday-green/30 border border-holiday-gold/30 rounded-lg px-4 py-3 text-holiday-cream placeholder-holiday-cream/40 focus:outline-none focus:border-holiday-gold focus:ring-1 focus:ring-holiday-gold transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
              activePreset === preset
                ? 'bg-holiday-gold text-holiday-dark border-holiday-gold'
                : 'bg-transparent text-holiday-cream/70 border-holiday-cream/20 hover:border-holiday-gold/50'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
         <button
          onClick={() => handleGenerate('all')}
          disabled={isLoading || !mood.trim()}
          className="col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-holiday-gold to-amber-600 text-holiday-dark font-medium py-3 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="animate-spin">✦</span>
          ) : (
            <Sparkles size={18} />
          )}
          <span>Create Serenity</span>
        </button>

        <button
          onClick={() => handleGenerate('text')}
          disabled={isLoading || !mood.trim()}
          className="flex items-center justify-center gap-2 bg-holiday-green/40 border border-holiday-green text-holiday-cream py-2 rounded-lg hover:bg-holiday-green/60 disabled:opacity-50 transition-all text-sm"
        >
          <MessageSquareQuote size={16} />
          <span>New Words</span>
        </button>

        <button
          onClick={() => handleGenerate('image')}
          disabled={isLoading || !mood.trim()}
          className="flex items-center justify-center gap-2 bg-holiday-green/40 border border-holiday-green text-holiday-cream py-2 rounded-lg hover:bg-holiday-green/60 disabled:opacity-50 transition-all text-sm"
        >
          <ImageIcon size={16} />
          <span>New Image</span>
        </button>
      </div>
    </div>
  );
};
