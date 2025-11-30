export interface WasteAnalysis {
  itemName: string;
  category: 'Recyclable' | 'Compost' | 'Trash' | 'Hazardous' | 'E-Waste' | 'Unknown';
  isRecyclable: boolean;
  disposalAdvice: string;
  confidenceScore: number;
}

export interface AppState {
  image: string | null; // Base64 data URL
  isAnalyzing: boolean;
  result: WasteAnalysis | null;
  error: string | null;
}
