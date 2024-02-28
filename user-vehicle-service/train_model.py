import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict


def train_model():
    try:
        # Step 1: Load the Data
        vehicles_df = pd.read_csv('data/dataset/travels.csv')
        reviews_df = pd.read_csv('data/dataset/reviews.csv')
        reviews_df.rename(columns={"id": 'review_id'}, inplace=True)

        # Step 2: Preprocess the Data
        vehicles_with_reviews = pd.merge(
            reviews_df, vehicles_df, on='vehicle_id')

        # Now we will export all the trained dataset into pkl files
        pickle.dump(vehicles_with_reviews, open(
            "data/trained-models/vehicles_with_reviews.pkl", 'wb'))
        print("Model trained successfully and saved to 'vehicles_with_reviews.pkl' file")
    except:
        print("Error occurred while training the model")
