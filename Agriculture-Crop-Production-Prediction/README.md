# Agriculture Crop Production Prediction in India 🌾

An AI-powered machine learning portal built with Python, Streamlit, and Scikit-learn to forecast regional agricultural output in India.

## Features Included
1. **Home Page**: Complete visual overview of Indian agriculture, features, and workflow metrics.
2. **Interactive Prediction Form**: Allows selection of State, District, Season, Crop and Area (Hectares) to forecast yield outputs in metric Tonnes.
3. **Data Dashboard**: Renders state-wise outputs, crop-wise performance, correlation matrices, and raw dataset inspectors.
4. **Model Performance**: Full statistical reports on MAE, RMSE, and R² scores of the trained Random Forest Regressor.

---

## Folder Structure
```
Agriculture-Crop-Production-Prediction/
│
├── app.py                     # Primary Streamlit Dashboard entry point
├── train_model.py             # Script to clean data, fit Label Encoders and RandomForestRegressor
├── predict.py                 # Predictor helper class for PKL loading and category safe-handling
├── requirements.txt           # Required Python libraries list
├── README.md                  # This instructional manual
│
├── dataset/
│   └── crop_production.csv    # Pre-processed Indian crop yields historical dataset
│
└── models/
    ├── crop_model.pkl         # Serialized Random Forest Regressor model
    └── encoders.pkl           # Serialized categorical Label Encoders
```

---

## Setup & Execution Guide

### Prerequisites
Ensure you have **Python 3.9+** and pip installed on your local operating system.

### 1. Install Dependencies
Run the command below in your terminal to install the necessary libraries:
```bash
pip install -r requirements.txt
```

### 2. Train the Machine Learning Model
Generate the sample dataset and fit the Scikit-learn Random Forest model by running:
```bash
python train_model.py
```
This cleans the training dataset, fits the **Label Encoders**, and outputs the serialized `crop_model.pkl` and `encoders.pkl` inside the `models/` folder.

### 3. Launch the Streamlit Portal
Start the web application locally on your browser:
```bash
streamlit run app.py
```
Streamlit will launch a local server and load the portal (usually at `http://localhost:8501`).
