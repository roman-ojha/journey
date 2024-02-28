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

    def get_user_rated_vehicles(self, data_frame, user_id: int | None) -> list:
        user_reviews = data_frame[data_frame['user_id'] == user_id]
        if user_reviews.count()["rating"] == 0:
            return []
        user_ratings = pd.Series(
            user_reviews.rating.values, index=user_reviews.vehicle_id.values)
        user_ratings = user_reviews.groupby('vehicle_id')['rating'].mean()
        user_rated_vehicles_list = list(user_ratings.items())
        return user_rated_vehicles_list

    def get_travel_ids_from_vehicle_id(self, vehicle_ids: list[str]):
        # Getting travel_id out of using vehicle_id
        # NOTE that there could be multiple travel_id for a single vehicle_id so we need to recommend all travel_id for a single vehicle_id
        # TODO So you need to see if bellow code is running fine or not in future.
        filtered_df = vehicles_df[vehicles_df['vehicle_id'].isin(vehicle_ids)]
        travel_ids = filtered_df.groupby(
            'vehicle_id')['travel_id'].apply(list).reset_index()
        travel_ids
        travel_id_list = travel_ids["travel_id"].tolist()
        flat_travel_ids = [
            item for sublist in travel_id_list for item in sublist]
        return [str(travel_id) for travel_id in flat_travel_ids]

    def popularity_based_recommendation(self, data_frame) -> list[str]:
        vehicles_with_ratings_df = data_frame.groupby("vehicle_id").count()[
            "rating"].reset_index()
        vehicles_with_ratings_df.rename(
            columns={"rating": "no_of_rating"}, inplace=True)
        average_rating_df = data_frame.groupby(
            "vehicle_id")["rating"].mean().reset_index()
        average_rating_df.rename(
            columns={"rating": "avg_rating"}, inplace=True)
        popular_df = vehicles_with_ratings_df.merge(
            average_rating_df, on='vehicle_id')
        # Only get top 30 vehicles
        popular_df = popular_df.sort_values(
            'no_of_rating', ascending=False).head(30)
        popular_df = popular_df.sort_values('avg_rating', ascending=False)
        popular_vehicles = popular_df["vehicle_id"].values.tolist()
        return popular_vehicles

    def collaborative_filtering_recommendation(self, data_frame, user_rated_vehicles_list: list) -> list[str]:
        user_ratings = data_frame.pivot_table(
            index='user_id', columns='vehicle_id', values='rating').fillna(0)
        ratings_std = user_ratings.apply(self.standardize_rating)
        # similarity_matrix = cosine_similarity(ratings_std)
        vehicles_similarity_matrix = cosine_similarity(ratings_std.T)
        vehicles_similarity_matrix_df = pd.DataFrame(
            vehicles_similarity_matrix, index=ratings_std.columns, columns=ratings_std.columns)
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

    def recommend(self, data_frame, user_id: int | None) -> list:
        user_rated_vehicles_list = self.get_user_rated_vehicles(
            data_frame=data_frame, user_id=user_id)
        if len(user_rated_vehicles_list) == 0:
            # If user has not rated any vehicle then recommend popular vehicles
            # OR recommend popularity based vehicles for UnAuthorized user
            return self.popularity_based_recommendation(data_frame)

        return self.collaborative_filtering_recommendation(data_frame=data_frame, user_rated_vehicles_list=user_rated_vehicles_list)

    def explore_vehicle(self, user_id: int | None) -> list[str]:
        recommended_vehicles = self.recommend(vehicles_with_reviews, user_id)
        if len(recommended_vehicles) == 0:
            return []
        # # only 30 vehicles will be recommended
        travel_ids = self.get_travel_ids_from_vehicle_id(
            recommended_vehicles[:30])
        return travel_ids

    def search_vehicle(self, from_location: str, to_location: str, departure_at: str, user_id: int | None) -> list[str]:
        filtered_data = vehicles_with_reviews[(vehicles_with_reviews['from'] == from_location) & (
            vehicles_with_reviews['to'] == to_location) & (vehicles_with_reviews['departure_at'] == departure_at)]
        recommended_vehicles = self.recommend(filtered_data, user_id)
        travel_ids = self.get_travel_ids_from_vehicle_id(recommended_vehicles)
        return travel_ids
