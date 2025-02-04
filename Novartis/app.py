from flask import Flask, jsonify, request, render_template
from predict import find_similar_indices
app = Flask(__name__)

import pandas as pd
# Load the datasets

#Ensure files embeddings_only, usecase_1_  are unzipped using command gzip -d file.csv.gz
df2 = pd.read_csv('embeddings_only.csv')
df = pd.read_csv('processed_usecase_1.csv')


@app.route('/')
def home():
    return render_template('index.html') 

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    study_title = data.get('study_title')
    nct_id=data.get('nct_id')

    print("Received Data:", data)
    predictions = find_similar_indices(study_title,nct_id,df,df2,10) #To get 10 similar trials 
    print("Received predictions")
    return jsonify(predictions)

if __name__ == "__main__":
    app.run(debug=True)
