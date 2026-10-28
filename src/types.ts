export interface CropDataRecord {
  id: number;
  state: string;
  district: string;
  season: string;
  crop: string;
  area: number;
  production: number;
  yield: number; // production / area
}

export interface PredictionInput {
  state: string;
  district: string;
  season: string;
  crop: string;
  area: number;
}

export interface PredictionResult {
  production: number;
  yieldValue: number;
  confidence: number;
  message: string;
  insights: {
    irrigationNeed: string;
    soilType: string;
    bestMonthToSow: string;
    marketDemand: 'High' | 'Medium' | 'Low';
  };
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
}

export interface ModelMetrics {
  mae: number;
  mse: number;
  rmse: number;
  r2: number;
  totalSamples: number;
  trainSize: number;
  testSize: number;
}
