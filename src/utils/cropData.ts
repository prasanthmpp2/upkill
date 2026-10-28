import { CropDataRecord } from '../types';

export const STATES_AND_DISTRICTS: Record<string, string[]> = {
  'Uttar Pradesh': ['Bulandshahr', 'Aligarh', 'Agra', 'Mathura', 'Meerut', 'Gorakhpur'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda', 'Firozpur'],
  'Maharashtra': ['Pune', 'Nashik', 'Nagpur', 'Satara', 'Solapur', 'Kolhapur'],
  'Karnataka': ['Belagavi', 'Dharwad', 'Mandya', 'Mysuru', 'Tumakuru', 'Shimoga'],
  'Tamil Nadu': ['Thanjavur', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Erode'],
  'West Bengal': ['Bardhaman', 'Murshidabad', 'Medinipur', 'Hooghly', 'Nadia', 'Birbhum'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Gwalior', 'Jabalpur', 'Dhar'],
};

export const SEASONS = ['Kharif', 'Rabi', 'Summer', 'Whole Year'];

export const CROPS_METADATA: Record<string, {
  avgYield: number; // Tonnes per Hectare
  soil: string;
  irrigation: string;
  sowMonth: string;
  demand: 'High' | 'Medium' | 'Low';
}> = {
  'Rice': { avgYield: 3.8, soil: 'Alluvial, Clayey', irrigation: 'High (Frequent flooding)', sowMonth: 'June - July', demand: 'High' },
  'Wheat': { avgYield: 3.4, soil: 'Clayey, Loamy', irrigation: 'Moderate (3-5 waterings)', sowMonth: 'October - November', demand: 'High' },
  'Maize': { avgYield: 2.9, soil: 'Sandy Loam, Alluvial', irrigation: 'Moderate', sowMonth: 'June - July', demand: 'Medium' },
  'Sugarcane': { avgYield: 72.0, soil: 'Black, Deep Clayey', irrigation: 'High (Continuous moisture)', sowMonth: 'January - March', demand: 'High' },
  'Cotton': { avgYield: 1.8, soil: 'Black Cotton Soil', irrigation: 'Moderate', sowMonth: 'May - June', demand: 'High' },
  'Potato': { avgYield: 22.5, soil: 'Sandy Loam', irrigation: 'Moderate', sowMonth: 'October - November', demand: 'High' },
  'Mustard': { avgYield: 1.4, soil: 'Sandy Loam to Clayey', irrigation: 'Low', sowMonth: 'October - November', demand: 'Medium' },
  'Soyabean': { avgYield: 1.2, soil: 'Black, Loamy', irrigation: 'Moderate', sowMonth: 'June - July', demand: 'Medium' },
  'Groundnut': { avgYield: 1.9, soil: 'Sandy Loam, Red Soil', irrigation: 'Low to Moderate', sowMonth: 'June - July', demand: 'Medium' },
};

export const CROPS = Object.keys(CROPS_METADATA);

// Generate 120 highly realistic Indian Crop Production Records
export const RAW_CROP_DATA: CropDataRecord[] = [
  // Uttar Pradesh - Wheat (Rabi) & Sugarcane (Whole Year)
  { id: 1, state: 'Uttar Pradesh', district: 'Bulandshahr', season: 'Rabi', crop: 'Wheat', area: 12500, production: 43750, yield: 3.5 },
  { id: 2, state: 'Uttar Pradesh', district: 'Aligarh', season: 'Rabi', crop: 'Wheat', area: 14200, production: 48280, yield: 3.4 },
  { id: 3, state: 'Uttar Pradesh', district: 'Agra', season: 'Rabi', crop: 'Wheat', area: 9800, production: 31360, yield: 3.2 },
  { id: 4, state: 'Uttar Pradesh', district: 'Mathura', season: 'Rabi', crop: 'Wheat', area: 11000, production: 36300, yield: 3.3 },
  { id: 5, state: 'Uttar Pradesh', district: 'Meerut', season: 'Whole Year', crop: 'Sugarcane', area: 18000, production: 1332000, yield: 74.0 },
  { id: 6, state: 'Uttar Pradesh', district: 'Gorakhpur', season: 'Whole Year', crop: 'Sugarcane', area: 15500, production: 1116000, yield: 72.0 },
  { id: 7, state: 'Uttar Pradesh', district: 'Bulandshahr', season: 'Whole Year', crop: 'Sugarcane', area: 12000, production: 888000, yield: 74.0 },
  { id: 8, state: 'Uttar Pradesh', district: 'Aligarh', season: 'Whole Year', crop: 'Sugarcane', area: 8500, production: 612000, yield: 72.0 },
  { id: 9, state: 'Uttar Pradesh', district: 'Meerut', season: 'Kharif', crop: 'Maize', area: 4100, production: 11480, yield: 2.8 },
  { id: 10, state: 'Uttar Pradesh', district: 'Agra', season: 'Rabi', crop: 'Potato', area: 6500, production: 149500, yield: 23.0 },

  // Punjab - Wheat (Rabi) & Rice (Kharif)
  { id: 11, state: 'Punjab', district: 'Ludhiana', season: 'Rabi', crop: 'Wheat', area: 22000, production: 96800, yield: 4.4 },
  { id: 12, state: 'Punjab', district: 'Amritsar', season: 'Rabi', crop: 'Wheat', area: 18500, production: 79550, yield: 4.3 },
  { id: 13, state: 'Punjab', district: 'Patiala', season: 'Rabi', crop: 'Wheat', area: 20400, production: 89760, yield: 4.4 },
  { id: 14, state: 'Punjab', district: 'Jalandhar', season: 'Rabi', crop: 'Wheat', area: 17000, production: 73100, yield: 4.3 },
  { id: 15, state: 'Punjab', district: 'Bathinda', season: 'Rabi', crop: 'Wheat', area: 19500, production: 79950, yield: 4.1 },
  { id: 16, state: 'Punjab', district: 'Ludhiana', season: 'Kharif', crop: 'Rice', area: 21500, production: 90300, yield: 4.2 },
  { id: 17, state: 'Punjab', district: 'Amritsar', season: 'Kharif', crop: 'Rice', area: 19000, production: 77900, yield: 4.1 },
  { id: 18, state: 'Punjab', district: 'Patiala', season: 'Kharif', crop: 'Rice', area: 20000, production: 84000, yield: 4.2 },
  { id: 19, state: 'Punjab', district: 'Jalandhar', season: 'Kharif', crop: 'Rice', area: 16500, production: 67650, yield: 4.1 },
  { id: 20, state: 'Punjab', district: 'Firozpur', season: 'Kharif', crop: 'Rice', area: 23000, production: 94300, yield: 4.1 },

  // Maharashtra - Sugarcane (Whole Year), Cotton (Kharif), Soyabean (Kharif)
  { id: 21, state: 'Maharashtra', district: 'Pune', season: 'Whole Year', crop: 'Sugarcane', area: 14000, production: 1050000, yield: 75.0 },
  { id: 22, state: 'Maharashtra', district: 'Nashik', season: 'Whole Year', crop: 'Sugarcane', area: 11500, production: 839500, yield: 73.0 },
  { id: 23, state: 'Maharashtra', district: 'Kolhapur', season: 'Whole Year', crop: 'Sugarcane', area: 25000, production: 1950000, yield: 78.0 },
  { id: 24, state: 'Maharashtra', district: 'Satara', season: 'Whole Year', crop: 'Sugarcane', area: 13000, production: 975000, yield: 75.0 },
  { id: 25, state: 'Maharashtra', district: 'Solapur', season: 'Kharif', crop: 'Cotton', area: 16000, production: 28800, yield: 1.8 },
  { id: 26, state: 'Maharashtra', district: 'Nagpur', season: 'Kharif', crop: 'Cotton', area: 19500, production: 37050, yield: 1.9 },
  { id: 27, state: 'Maharashtra', district: 'Pune', season: 'Kharif', crop: 'Soyabean', area: 8500, production: 11900, yield: 1.4 },
  { id: 28, state: 'Maharashtra', district: 'Nashik', season: 'Kharif', crop: 'Soyabean', area: 9000, production: 12150, yield: 1.35 },
  { id: 29, state: 'Maharashtra', district: 'Satara', season: 'Kharif', crop: 'Soyabean', area: 7200, production: 10080, yield: 1.4 },
  { id: 30, state: 'Maharashtra', district: 'Nagpur', season: 'Kharif', crop: 'Soyabean', area: 10500, production: 14175, yield: 1.35 },

  // Karnataka - Sugarcane (Whole Year), Rice (Kharif), Maize (Rabi/Kharif)
  { id: 31, state: 'Karnataka', district: 'Belagavi', season: 'Whole Year', crop: 'Sugarcane', area: 16500, production: 1221000, yield: 74.0 },
  { id: 32, state: 'Karnataka', district: 'Mandya', season: 'Whole Year', crop: 'Sugarcane', area: 12000, production: 900000, yield: 75.0 },
  { id: 33, state: 'Karnataka', district: 'Mysuru', season: 'Kharif', crop: 'Rice', area: 10200, production: 36720, yield: 3.6 },
  { id: 34, state: 'Karnataka', district: 'Tumakuru', season: 'Kharif', crop: 'Rice', area: 8500, production: 28900, yield: 3.4 },
  { id: 35, state: 'Karnataka', district: 'Belagavi', season: 'Kharif', crop: 'Maize', area: 11200, production: 35840, yield: 3.2 },
  { id: 36, state: 'Karnataka', district: 'Dharwad', season: 'Kharif', crop: 'Maize', area: 9500, production: 28500, yield: 3.0 },
  { id: 37, state: 'Karnataka', district: 'Dharwad', season: 'Rabi', crop: 'Wheat', area: 5400, production: 12960, yield: 2.4 },
  { id: 38, state: 'Karnataka', district: 'Shimoga', season: 'Kharif', crop: 'Rice', area: 13500, production: 51300, yield: 3.8 },
  { id: 39, state: 'Karnataka', district: 'Tumakuru', season: 'Kharif', crop: 'Groundnut', area: 7800, production: 12480, yield: 1.6 },
  { id: 40, state: 'Karnataka', district: 'Mysuru', season: 'Summer', crop: 'Groundnut', area: 3200, production: 5760, yield: 1.8 },

  // Tamil Nadu - Rice (Kharif/Summer), Groundnut (Kharif), Sugarcane
  { id: 41, state: 'Tamil Nadu', district: 'Thanjavur', season: 'Kharif', crop: 'Rice', area: 24500, production: 98000, yield: 4.0 },
  { id: 42, state: 'Tamil Nadu', district: 'Thanjavur', season: 'Summer', crop: 'Rice', area: 12000, production: 50400, yield: 4.2 },
  { id: 43, state: 'Tamil Nadu', district: 'Coimbatore', season: 'Kharif', crop: 'Cotton', area: 4500, production: 8100, yield: 1.8 },
  { id: 44, state: 'Tamil Nadu', district: 'Madurai', season: 'Kharif', crop: 'Rice', area: 11000, production: 40700, yield: 3.7 },
  { id: 45, state: 'Tamil Nadu', district: 'Salem', season: 'Whole Year', crop: 'Sugarcane', area: 9500, production: 693500, yield: 73.0 },
  { id: 46, state: 'Tamil Nadu', district: 'Trichy', season: 'Whole Year', crop: 'Sugarcane', area: 10200, production: 744600, yield: 73.0 },
  { id: 47, state: 'Tamil Nadu', district: 'Erode', season: 'Whole Year', crop: 'Sugarcane', area: 11000, production: 814000, yield: 74.0 },
  { id: 48, state: 'Tamil Nadu', district: 'Salem', season: 'Kharif', crop: 'Groundnut', area: 8200, production: 15580, yield: 1.9 },
  { id: 49, state: 'Tamil Nadu', district: 'Erode', season: 'Kharif', crop: 'Groundnut', area: 6500, production: 12350, yield: 1.9 },
  { id: 50, state: 'Tamil Nadu', district: 'Coimbatore', season: 'Rabi', crop: 'Maize', area: 7400, production: 25900, yield: 3.5 },

  // West Bengal - Rice (Kharif/Summer/Winter), Potato (Rabi)
  { id: 51, state: 'West Bengal', district: 'Bardhaman', season: 'Kharif', crop: 'Rice', area: 26000, production: 104000, yield: 4.0 },
  { id: 52, state: 'West Bengal', district: 'Murshidabad', season: 'Kharif', crop: 'Rice', area: 21000, production: 81900, yield: 3.9 },
  { id: 53, state: 'West Bengal', district: 'Medinipur', season: 'Kharif', crop: 'Rice', area: 25000, production: 97500, yield: 3.9 },
  { id: 54, state: 'West Bengal', district: 'Hooghly', season: 'Rabi', crop: 'Potato', area: 15000, production: 360000, yield: 24.0 },
  { id: 55, state: 'West Bengal', district: 'Bardhaman', season: 'Rabi', crop: 'Potato', area: 12500, production: 287500, yield: 23.0 },
  { id: 56, state: 'West Bengal', district: 'Nadia', season: 'Summer', crop: 'Rice', area: 9800, production: 39200, yield: 4.0 },
  { id: 57, state: 'West Bengal', district: 'Birbhum', season: 'Kharif', crop: 'Rice', area: 14500, production: 55100, yield: 3.8 },
  { id: 58, state: 'West Bengal', district: 'Hooghly', season: 'Kharif', crop: 'Rice', area: 11200, production: 43680, yield: 3.9 },
  { id: 59, state: 'West Bengal', district: 'Murshidabad', season: 'Rabi', crop: 'Mustard', area: 7200, production: 9360, yield: 1.3 },
  { id: 60, state: 'West Bengal', district: 'Nadia', season: 'Rabi', crop: 'Mustard', area: 6800, production: 8840, yield: 1.3 },

  // Madhya Pradesh - Wheat (Rabi), Soyabean (Kharif), Mustard (Rabi)
  { id: 61, state: 'Madhya Pradesh', district: 'Indore', season: 'Rabi', crop: 'Wheat', area: 11500, production: 36800, yield: 3.2 },
  { id: 62, state: 'Madhya Pradesh', district: 'Bhopal', season: 'Rabi', crop: 'Wheat', area: 10200, production: 31620, yield: 3.1 },
  { id: 63, state: 'Madhya Pradesh', district: 'Ujjain', season: 'Rabi', crop: 'Wheat', area: 15000, production: 49500, yield: 3.3 },
  { id: 64, state: 'Madhya Pradesh', district: 'Gwalior', season: 'Rabi', crop: 'Wheat', area: 8900, production: 27590, yield: 3.1 },
  { id: 65, state: 'Madhya Pradesh', district: 'Jabalpur', season: 'Rabi', crop: 'Wheat', area: 12200, production: 39040, yield: 3.2 },
  { id: 66, state: 'Madhya Pradesh', district: 'Indore', season: 'Kharif', crop: 'Soyabean', area: 18000, production: 21600, yield: 1.2 },
  { id: 67, state: 'Madhya Pradesh', district: 'Bhopal', season: 'Kharif', crop: 'Soyabean', area: 14500, production: 16675, yield: 1.15 },
  { id: 68, state: 'Madhya Pradesh', district: 'Ujjain', season: 'Kharif', crop: 'Soyabean', area: 24000, production: 28800, yield: 1.2 },
  { id: 69, state: 'Madhya Pradesh', district: 'Dhar', season: 'Kharif', crop: 'Soyabean', area: 19000, production: 22800, yield: 1.2 },
  { id: 70, state: 'Madhya Pradesh', district: 'Gwalior', season: 'Rabi', crop: 'Mustard', area: 9500, production: 12350, yield: 1.3 },

  // Additional randomized records to reach 100+ for stable statistics and ML modeling
  { id: 71, state: 'Uttar Pradesh', district: 'Mathura', season: 'Rabi', crop: 'Mustard', area: 5400, production: 7560, yield: 1.4 },
  { id: 72, state: 'Uttar Pradesh', district: 'Meerut', season: 'Rabi', crop: 'Wheat', area: 13000, production: 45500, yield: 3.5 },
  { id: 73, state: 'Punjab', district: 'Bathinda', season: 'Kharif', crop: 'Cotton', area: 11000, production: 20900, yield: 1.9 },
  { id: 74, state: 'Punjab', district: 'Firozpur', season: 'Rabi', crop: 'Wheat', area: 21000, production: 92400, yield: 4.4 },
  { id: 75, state: 'Maharashtra', district: 'Kolhapur', season: 'Kharif', crop: 'Rice', area: 4800, production: 15360, yield: 3.2 },
  { id: 76, state: 'Maharashtra', district: 'Solapur', season: 'Rabi', crop: 'Wheat', area: 6200, production: 14260, yield: 2.3 },
  { id: 77, state: 'Karnataka', district: 'Belagavi', season: 'Rabi', crop: 'Wheat', area: 7100, production: 17750, yield: 2.5 },
  { id: 78, state: 'Karnataka', district: 'Dharwad', season: 'Kharif', crop: 'Cotton', area: 6500, production: 10400, yield: 1.6 },
  { id: 79, state: 'Tamil Nadu', district: 'Trichy', season: 'Kharif', crop: 'Rice', area: 12000, production: 44400, yield: 3.7 },
  { id: 80, state: 'Tamil Nadu', district: 'Madurai', season: 'Whole Year', crop: 'Coconut', area: 4200, production: 37800, yield: 9.0 }, // Coconut yield modeled high or scaled
  { id: 81, state: 'West Bengal', district: 'Murshidabad', season: 'Rabi', crop: 'Wheat', area: 5500, production: 15400, yield: 2.8 },
  { id: 82, state: 'West Bengal', district: 'Nadia', season: 'Rabi', crop: 'Potato', area: 8500, production: 195500, yield: 23.0 },
  { id: 83, state: 'Madhya Pradesh', district: 'Indore', season: 'Kharif', crop: 'Maize', area: 4800, production: 12000, yield: 2.5 },
  { id: 84, state: 'Madhya Pradesh', district: 'Jabalpur', season: 'Kharif', crop: 'Rice', area: 7800, production: 21060, yield: 2.7 },
  { id: 85, state: 'Uttar Pradesh', district: 'Gorakhpur', season: 'Kharif', crop: 'Rice', area: 16000, production: 54400, yield: 3.4 },
  { id: 86, state: 'Uttar Pradesh', district: 'Meerut', season: 'Rabi', crop: 'Potato', area: 4200, production: 96600, yield: 23.0 },
  { id: 87, state: 'Punjab', district: 'Ludhiana', season: 'Rabi', crop: 'Potato', area: 5100, production: 119850, yield: 23.5 },
  { id: 88, state: 'Punjab', district: 'Amritsar', season: 'Summer', crop: 'Maize', area: 2500, production: 7500, yield: 3.0 },
  { id: 89, state: 'Maharashtra', district: 'Nashik', season: 'Rabi', crop: 'Wheat', area: 7800, production: 19500, yield: 2.5 },
  { id: 90, state: 'Maharashtra', district: 'Kolhapur', season: 'Rabi', crop: 'Wheat', area: 5200, production: 13520, yield: 2.6 },
  { id: 91, state: 'Karnataka', district: 'Mandya', season: 'Kharif', crop: 'Rice', area: 9800, production: 36260, yield: 3.7 },
  { id: 92, state: 'Karnataka', district: 'Shimoga', season: 'Rabi', crop: 'Maize', area: 6200, production: 21080, yield: 3.4 },
  { id: 93, state: 'Tamil Nadu', district: 'Salem', season: 'Kharif', crop: 'Rice', area: 9100, production: 33670, yield: 3.7 },
  { id: 94, state: 'Tamil Nadu', district: 'Coimbatore', season: 'Summer', crop: 'Rice', area: 4100, production: 16810, yield: 4.1 },
  { id: 95, state: 'West Bengal', district: 'Birbhum', season: 'Rabi', crop: 'Wheat', area: 4800, production: 13920, yield: 2.9 },
  { id: 96, state: 'West Bengal', district: 'Bardhaman', season: 'Summer', crop: 'Rice', area: 13000, production: 54600, yield: 4.2 },
  { id: 97, state: 'Madhya Pradesh', district: 'Dhar', season: 'Rabi', crop: 'Wheat', area: 14200, production: 44020, yield: 3.1 },
  { id: 98, state: 'Madhya Pradesh', district: 'Bhopal', season: 'Rabi', crop: 'Mustard', area: 5900, production: 7375, yield: 1.25 },
  { id: 99, state: 'Uttar Pradesh', district: 'Mathura', season: 'Kharif', crop: 'Bajra', area: 7800, production: 14040, yield: 1.8 },
  { id: 100, state: 'Punjab', district: 'Patiala', season: 'Summer', crop: 'Maize', area: 3400, production: 10200, yield: 3.0 },
  { id: 101, state: 'Maharashtra', district: 'Nagpur', season: 'Rabi', crop: 'Wheat', area: 6400, production: 15360, yield: 2.4 },
  { id: 102, state: 'Karnataka', district: 'Mysuru', season: 'Rabi', crop: 'Wheat', area: 3500, production: 8750, yield: 2.5 },
  { id: 103, state: 'Tamil Nadu', district: 'Thanjavur', season: 'Rabi', crop: 'Maize', area: 5500, production: 19800, yield: 3.6 },
  { id: 104, state: 'West Bengal', district: 'Hooghly', season: 'Rabi', crop: 'Wheat', area: 4200, production: 11760, yield: 2.8 },
  { id: 105, state: 'Madhya Pradesh', district: 'Gwalior', season: 'Kharif', crop: 'Maize', area: 5100, production: 11730, yield: 2.3 },
  { id: 106, state: 'Uttar Pradesh', district: 'Agra', season: 'Kharif', crop: 'Bajra', area: 8900, production: 15130, yield: 1.7 },
  { id: 107, state: 'Punjab', district: 'Ludhiana', season: 'Summer', crop: 'Groundnut', area: 1200, production: 2280, yield: 1.9 },
  { id: 108, state: 'Maharashtra', district: 'Kolhapur', season: 'Kharif', crop: 'Maize', area: 6000, production: 19200, yield: 3.2 },
  { id: 109, state: 'Karnataka', district: 'Belagavi', season: 'Kharif', crop: 'Rice', area: 12500, production: 45000, yield: 3.6 },
  { id: 110, state: 'Tamil Nadu', district: 'Salem', season: 'Kharif', crop: 'Cotton', area: 3800, production: 6460, yield: 1.7 },
  { id: 111, state: 'West Bengal', district: 'Medinipur', season: 'Rabi', crop: 'Potato', area: 9000, production: 207000, yield: 23.0 },
  { id: 112, state: 'Madhya Pradesh', district: 'Ujjain', season: 'Rabi', crop: 'Mustard', area: 6500, production: 8125, yield: 1.25 },
  { id: 113, state: 'Uttar Pradesh', district: 'Meerut', season: 'Kharif', crop: 'Rice', area: 7200, production: 23760, yield: 3.3 },
  { id: 114, state: 'Punjab', district: 'Jalandhar', season: 'Summer', crop: 'Maize', area: 2200, production: 6820, yield: 3.1 },
  { id: 115, state: 'Maharashtra', district: 'Nashik', season: 'Kharif', crop: 'Groundnut', area: 4500, production: 8100, yield: 1.8 },
  { id: 116, state: 'Karnataka', district: 'Tumakuru', season: 'Rabi', crop: 'Wheat', area: 3900, production: 9360, yield: 2.4 },
  { id: 117, state: 'Tamil Nadu', district: 'Madurai', season: 'Kharif', crop: 'Groundnut', area: 5200, production: 9360, yield: 1.8 },
  { id: 118, state: 'West Bengal', district: 'Murshidabad', season: 'Summer', crop: 'Rice', area: 11500, production: 46000, yield: 4.0 },
  { id: 119, state: 'Madhya Pradesh', district: 'Indore', season: 'Rabi', crop: 'Mustard', area: 4100, production: 5125, yield: 1.25 },
  { id: 120, state: 'Uttar Pradesh', district: 'Gorakhpur', season: 'Rabi', crop: 'Wheat', area: 13500, production: 44550, yield: 3.3 },
];
