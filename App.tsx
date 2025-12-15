import React, { useState } from 'react';
import { CardDisplay } from './components/CardDisplay';
import { InputSection } from './components/InputSection';
import { generateHolidayText, generateHolidayImage } from './services/gemini';
import { CardContent, INITIAL_CONTENT, INITIAL_IMAGE_URL } from './types';
import { Github, Star } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState<CardContent>(INITIAL_CONTENT);
  const [imageUrl, setImageUrl] = useState<string>(INITIAL_IMAGE_URL);
  
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (mood: string, type: 'all' | 'text' | 'image') => {
    setError(null);

    // Initial check for API Key
    if (!process.env.API_KEY) {
      setError("API Key is missing. Please check your configuration.");
      return;
    }

    try {
      if (type === 'all' || type === 'text') {
        setIsLoadingText(true);
        // Fire and forget text generation if type is all, or await if just text
        // Actually, we should just run them.
        const textPromise = generateHolidayText(mood)
          .then(newContent => setContent(newContent))
          .catch(e => {
             console.error(e);
             setError("Failed to generate words of wisdom.");
          })
          .finally(() => setIsLoadingText(false));
          
        if (type === 'text') await textPromise;
      }

      if (type === 'all' || type === 'image') {
        setIsLoadingImage(true);
        const imagePromise = generateHolidayImage(mood)
          .then(newUrl => setImageUrl(newUrl))
          .catch(e => {
            console.error(e);
            setError("Failed to conjure a new vision.");
          })
          .finally(() => setIsLoadingImage(false));

        if (type === 'image') await imagePromise;
      }

    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred.");
      setIsLoadingText(false);
      setIsLoadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-holiday-dark text-holiday-cream font-sans selection:bg-holiday-gold selection:text-holiday-dark flex flex-col">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-holiday-green rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-holiday-gold rounded-full blur-[100px] opacity-10"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex-grow flex flex-col lg:flex-row gap-12 items-start justify-center">
        
        {/* Left Column: Intro & Controls */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-8">
            <h1 className="font-serif text-5xl md:text-6xl text-holiday-gold mb-4 italic tracking-tight">
              Serenity Cards
            </h1>
            <p className="text-holiday-cream/80 text-lg md:text-xl max-w-md leading-relaxed">
              The older you get, the more you realize peace is the gift. 
              Generate reflective holiday thoughts and imagery to share the calm.
            </p>
          </div>

          <InputSection 
            onGenerate={handleGenerate} 
            isLoading={isLoadingText || isLoadingImage} 
          />

          {error && (
            <div className="w-full max-w-md p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm mb-6">
              {error}
            </div>
          )}

          <div className="hidden lg:block mt-auto text-holiday-cream/30 text-xs font-sans">
            <p>Powered by Google Gemini 2.5 Flash & Flash Image</p>
          </div>
        </div>

        {/* Right Column: Card Display */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <CardDisplay 
            content={content} 
            imageUrl={imageUrl} 
            isLoadingImage={isLoadingImage} 
          />
        </div>

      </main>

      {/* Mobile Footer */}
      <footer className="lg:hidden py-6 text-center text-holiday-cream/30 text-xs">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
}
