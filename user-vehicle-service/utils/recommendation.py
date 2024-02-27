# import trained data model
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
import pandas as pd

vehicles_with_reviews = pickle.load(
    open("vehicles_with_reviews.pkl", 'rb'))  # load trained data model
vehicles_df = pd.read_csv('travels.csv')


class Recommendation:
    def standardize_rating(self, row):
        new_row = (row - row.mean()) / (row.max() - row.min())
        return new_row

    def get_similar_vehicles(self, vehicles_similarity_matrix_df, vehicle_id: str, user_rating: float):
        similar_score = vehicles_similarity_matrix_df[vehicle_id]
        similar_score = similar_score*(user_rating-2.5)
        similar_score = similar_score.sort_values(ascending=False)
        return similar_score

    def get_user_rated_vehicles(self, data_frame, user_id: int):
        user_reviews = data_frame[data_frame['user_id'] == user_id]
        user_ratings = pd.Series(
            user_reviews.rating.values, index=user_reviews.vehicle_id.values)
        user_ratings = user_reviews.groupby('vehicle_id')['rating'].mean()
        user_rated_vehicles_list = list(user_ratings.items())
        return user_rated_vehicles_list

    def recommend(self, data_frame, user_id):
        user_ratings = data_frame.pivot_table(
            index='user_id', columns='vehicle_id', values='rating').fillna(0)
        ratings_std = user_ratings.apply(self.standardize_rating)
        # similarity_matrix = cosine_similarity(ratings_std)
        vehicles_similarity_matrix = cosine_similarity(ratings_std.T)
        vehicles_similarity_matrix_df = pd.DataFrame(
            vehicles_similarity_matrix, index=ratings_std.columns, columns=ratings_std.columns)
        user_rated_vehicles_list = self.get_user_rated_vehicles(
            data_frame=data_frame, user_id=user_id)

        similar_vehicles_df = pd.DataFrame()
        dfs = []
        for vehicle_id, rating in user_rated_vehicles_list:
            similarity_df = self.get_similar_vehicles(
                vehicles_similarity_matrix_df, vehicle_id, rating)
            similarity_df.columns = [vehicle_id]
            dfs.append(similarity_df)
        similar_vehicles_df = pd.concat(dfs, axis=1)
        similar_vehicles_df.reset_index(drop=True, inplace=True)
        similar_vehicles = similar_vehicles_df.sum().sort_values(ascending=False)
        recommended_vehicles = similar_vehicles.index.tolist()
        return recommended_vehicles

    def get_travel_ids_from_vehicle_id(self, vehicle_ids: list[str]):
        # Getting travel_id out of using vehicle_id
        filtered_df = vehicles_df[vehicles_df['vehicle_id'].isin(vehicle_ids)]
        travel_ids = filtered_df.groupby(
            'vehicle_id')['travel_id'].apply(list).reset_index()
        travel_ids
        travel_id_list = travel_ids["travel_id"].tolist()
        flat_travel_ids = [
            item for sublist in travel_id_list for item in sublist]
        return [str(travel_id) for travel_id in flat_travel_ids]

    def explore_vehicle(self, user_id: int):
        recommended_vehicles = self.recommend(vehicles_with_reviews, user_id)
        # only 25 vehicles will be recommended with random shuffle
        travel_ids = self.get_travel_ids_from_vehicle_id(
            recommended_vehicles[:25])
        return travel_ids

    def search_vehicle(self, from_location: str, to_location: str, departure_at: str, user_id: int):
        filtered_data = vehicles_with_reviews[(vehicles_with_reviews['from'] == from_location) & (
            vehicles_with_reviews['to'] == to_location) & (vehicles_with_reviews['departure_at'] == departure_at)]
        recommended_vehicles = self.recommend(filtered_data, user_id)
        travel_ids = self.get_travel_ids_from_vehicle_id(recommended_vehicles)
        return travel_ids


# recommendation = Recommendation()
# print(recommendation.explore_vehicle(8))
# print(recommendation.search_vehicle(
#     "Pokhara, Kaski", "Pathri, Morong", "2024-03-03", 8))
