import React from 'react';
import { CardContent } from '../types';
import { Download, Share2 } from 'lucide-react';

interface CardDisplayProps {
  content: CardContent;
  imageUrl: string;
  isLoadingImage: boolean;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ content, imageUrl, isLoadingImage }) => {
  
  const handleCopyText = () => {
    const textToCopy = `${content.quote}\n\n${content.caption}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Text copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto perspective-1000">
      {/* Card Container */}
      <div className="relative w-full bg-stone-100 p-4 shadow-2xl rotate-1 transition-transform duration-500 hover:rotate-0 rounded-sm">
        
        {/* Image Area */}
        <div className="relative w-full aspect-[4/5] bg-neutral-200 overflow-hidden rounded-sm mb-6 shadow-inner">
          {isLoadingImage ? (
            <div className="absolute inset-0 flex items-center justify-center bg-holiday-green/20 animate-pulse">
              <span className="text-holiday-green font-serif italic text-lg">Conjuring holiday magic...</span>
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt="Holiday Mood" 
              className="w-full h-full object-cover transition-opacity duration-700 opacity-100"
            />
          )}
          
          {/* Overlay Texture (Optional for 'aged' look) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none"></div>
        </div>

        {/* Text Area */}
        <div className="text-center px-4 pb-4">
          <h2 className="font-serif text-2xl md:text-3xl text-holiday-dark leading-tight mb-4 italic">
            "{content.quote}"
          </h2>
          
          <div className="border-t border-holiday-gold/30 w-16 mx-auto mb-4"></div>
          
          <p className="font-sans text-xs md:text-sm text-holiday-green uppercase tracking-widest font-medium opacity-80">
            {content.caption}
          </p>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button 
          onClick={handleCopyText}
          className="flex items-center gap-2 px-4 py-2 bg-transparent border border-holiday-gold text-holiday-gold rounded-full hover:bg-holiday-gold hover:text-holiday-dark transition-colors duration-300 font-sans text-sm"
        >
          <Share2 size={16} />
          <span>Copy Text</span>
        </button>
        {/* Note: Actual image download in browser requires canvas manipulation which is complex without libs.
            We provide a visual cue button. */}
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-holiday-gold text-holiday-dark rounded-full hover:bg-white transition-colors duration-300 font-sans text-sm font-medium"
          onClick={() => alert("To save the card, please take a screenshot or long-press the image on mobile.")}
        >
          <Download size={16} />
          <span>Save Card</span>
        </button>
      </div>
    </div>
  );
};
