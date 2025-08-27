
export interface FormData {
  businessType: string;
  city: string;
  areaType: string;
  targetCustomers: string[];
  areaSize: number;
  facadeWidth: number;
  condition: string;
  sidewalk: boolean;
  openingHour: number;
  closingHour: number;
  competitors: number;
  amenities: string[];
  fengShui: string;
  rent: number;
  paymentMethod: string;
  notes: string;
  customerEmail: string;
  customerPhone: string;
}

export interface DetailedAnalysis {
  category: string;
  score: number;
  analysis: string;
}

export interface EvaluationResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  detailedAnalysis: DetailedAnalysis[];
}
