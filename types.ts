export interface CardContent {
  quote: string;
  caption: string;
}

export interface GenerationState {
  isLoadingText: boolean;
  isLoadingImage: boolean;
  error: string | null;
}

export interface GeneratedImage {
  url: string; // Base64 data URL
  prompt: string;
}

export const INITIAL_CONTENT: CardContent = {
  quote: "The older you get, the more you realize peace is the real Christmas gift.",
  caption: "Forget the noise. If your heart feels calmer this year, you already won."
};

// Fallback image if generation fails or for initial state
export const INITIAL_IMAGE_URL = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2787&auto=format&fit=crop";
