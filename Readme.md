# Novartis Clinical Trial Similarity Solution

> **Note**: To view the `README.md` with proper formatting, you can open it in a Markdown editor (e.g., VS Code, click on the text and press `CTRL+SHIFT+V`), or use a browser plugin like "Markdown Viewer."


This project provides a solution to identify and rank clinical trials similar to a given query trial based on embeddings derived from Clinical BERT. The system processes the provided dataset, calculates similarity scores, and presents the top 10 similar trials via a user-friendly web interface.

## Workflow
1. Ensure all required Python libraries (use python-version>=3.9) are installed as mentioned in `requirements.txt`, using
   ```python
   pip install -r requirements.txt 
   ```
2. Unzip the files(processed_usecase_1.csv.gz) using command
   ```python
   gzip -d file_name.csv.gz
   ``` 
3. Run the `clinicalbert.ipynb` to generate `embeddings_only.csv` file. 
4. Start the Flask server by running the following command:
   ```python
   python app.py
   ```
5. Open the provided URL in your web browser to access the UI.
6. Input the required query details to retrieve the top 10 similar clinical trials.


## Directory Structure
```
Novartis/
├── static/
│   ├── css/        # Stylesheets for UI design
│   ├── js/         # JavaScript files for interactivity
│   ├── images/     # Images used in the UI
│   ├── others/     # Contains txt files used in evaluation and training
├── templates/      # HTML files for rendering the web pages
├── app.py          # Flask application to serve the web interface
├── requirements.txt  # Contains the libraries and modules needed to make code reproducible 
├── processed_usecase_1.csv   # Original dataset provided for analysis
├── predict.py      # Contains the function to compute similarity scores using `embedding.csv`
├── clinicalbert.ipynb      # Jupyter notebook with detailed EDA, visualizations, training, and evaluation steps
├── Readme.md     
```

## Files and Folders Significance
- **`static/`**: Contains all static assets for UI design, including CSS, JavaScript, and images.
- **`templates/`**: Contains HTML templates for the web application.
- **`app.py`**: The Flask application that runs the backend server for the web interface.
- **`requirements.txt`**: Contains the libraries and modules needed to make code reproducible.
- **`predict.py`**: Contains the function to compute similarity scores between trials.
- **`clinicalbert.ipynb`**: A comprehensive Jupyter notebook detailing all steps, including EDA, data cleaning, embedding generation, training, evaluation, and instructions for running the prediction.


