import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict

# Step 1: Load the Data
vehicles_df = pd.read_csv('travels.csv')
reviews_df = pd.read_csv('reviews.csv')
reviews_df.rename(columns={"id": 'review_id'}, inplace=True)

# Step 2: Preprocess the Data
vehicles_with_reviews = pd.merge(reviews_df, vehicles_df, on='vehicle_id')

# Now we will export all the trained dataset into pkl files
pickle.dump(vehicles_with_reviews, open("vehicles_with_reviews.pkl", 'wb'))
