import joblib
import pandas as pd
import numpy as np
import os

class CropPredictor:
    def __init__(self, model_path='models/crop_model.pkl', encoders_path='models/encoders.pkl'):
        self.model_path = model_path
        self.encoders_path = encoders_path
        
        # Verify and load serialized assets
        if not os.path.exists(model_path) or not os.path.exists(encoders_path):
            raise FileNotFoundError("Trained model or encoders files missing in 'models/'. Please run train_model.py first!")
            
        self.model = joblib.load(model_path)
        self.encoders = joblib.load(encoders_path)

    def predict(self, state, district, season, crop, area):
        """
        Predicts crop production in Tonnes.
        """
        # Transform inputs using pre-fitted encoders with safe-handling for unseen categories
        try:
            encoded_state = self.encoders['State'].transform([state])[0]
            # Handle district safely
            if district in self.encoders['District'].classes_:
                encoded_district = self.encoders['District'].transform([district])[0]
            else:
                # Fallback to first class
                encoded_district = self.encoders['District'].transform([self.encoders['District'].classes_[0]])[0]
                
            encoded_season = self.encoders['Season'].transform([season])[0]
            encoded_crop = self.encoders['Crop'].transform([crop])[0]
        except ValueError as e:
            raise ValueError(f"Categorical encoding failed. Please check input labels. Detail: {e}")

        # Construct feature array
        features = pd.DataFrame([[
            encoded_state,
            encoded_district,
            encoded_season,
            encoded_crop,
            float(area)
        ]], columns=['State', 'District', 'Season', 'Crop', 'Area'])

        # Predict
        predicted_production = self.model.predict(features)[0]
        return round(predicted_production, 2)

# Self test execution
if __name__ == '__main__':
    try:
        predictor = CropPredictor()
        ans = predictor.predict('Uttar Pradesh', 'Bulandshahr', 'Rabi', 'Wheat', 1500)
        print(f"Predicted Production output for 1500 Hectares: {ans} Tonnes")
    except Exception as e:
        print(f"Execution Error: {e}")
