import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# 1. Ensure output folders exist
os.makedirs('models', exist_ok=True)
os.makedirs('dataset', exist_ok=True)

print("Starting Crop Production Model Training...")

# 2. Check or load Crop Production dataset
# If not present, we will generate a sample dataset programmatically
dataset_path = 'dataset/crop_production.csv'
if not os.path.exists(dataset_path):
    print("Warning: dataset/crop_production.csv not found! Generating sample data...")
    # Generate 500 rows of synthetic high-quality crop data for training
    np.random.seed(42)
    states = ['Uttar Pradesh', 'Punjab', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Madhya Pradesh']
    seasons = ['Kharif', 'Rabi', 'Summer', 'Whole Year']
    crops = ['Rice', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 'Potato', 'Mustard', 'Soyabean', 'Groundnut']
    
    rows = []
    for i in range(1000):
        state = np.random.choice(states)
        season = np.random.choice(seasons)
        crop = np.random.choice(crops)
        district = f"{state}_Dist_{np.random.randint(1, 4)}"
        area = float(np.random.randint(500, 25000))
        
        # Determine realistic yields (Tonnes per Hectare)
        base_yield = 3.0
        if crop == 'Sugarcane': base_yield = 72.0
        elif crop == 'Potato': base_yield = 22.0
        elif crop == 'Cotton': base_yield = 1.8
        elif crop == 'Mustard': base_yield = 1.3
        
        # State modifiers
        multiplier = 1.0
        if state == 'Punjab': multiplier = 1.15
        elif state == 'Madhya Pradesh': multiplier = 0.90
        
        production = area * base_yield * multiplier * np.random.uniform(0.95, 1.05)
        rows.append([state, district, season, crop, int(area), round(production, 2)])
        
    df = pd.DataFrame(rows, columns=['State', 'District', 'Season', 'Crop', 'Area', 'Production'])
    df.to_csv(dataset_path, index=False)
    print(f"Sample dataset written to {dataset_path}")
else:
    df = pd.read_csv(dataset_path)

# 3. Data Cleaning
# Remove null values or fill with median
df = df.dropna()
df = df[df['Area'] > 0]

# 4. Label Encoding for Categorical variables
categorical_cols = ['State', 'District', 'Season', 'Crop']
encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# Save label encoders to models/encoders.pkl
encoders_save_path = 'models/encoders.pkl'
joblib.dump(encoders, encoders_save_path)
print(f"Saved label encoders to {encoders_save_path}")

# 5. Define Features and Target
X = df[['State', 'District', 'Season', 'Crop', 'Area']]
y = df['Production']

# 6. Train Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 7. Train Random Forest Regressor
print("Fitting Random Forest Regression Model...")
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

# 8. Model Evaluation
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print("\n" + "="*30)
print("MODEL EVALUATION PERFORMANCE:")
print(f"Mean Absolute Error (MAE) : {mae:.2f} Tonnes")
print(f"Mean Squared Error (MSE)  : {mse:.2f}")
print(f"Root Mean Squared (RMSE)  : {rmse:.2f} Tonnes")
print(f"R-squared (R2 Score)      : {r2:.4f}")
print("="*30 + "\n")

# 9. Save the trained model
model_save_path = 'models/crop_model.pkl'
joblib.dump(model, model_save_path)
print(f"Saved trained Random Forest model successfully to {model_save_path}")
