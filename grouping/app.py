from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import KMeans
import numpy as np

app = Flask(__name__)

@app.route('/groups', methods=['POST'])
def get_groups():
    # Get user interests from the JSON request
    user_interests = request.json['user_interests']

    # Convert user interests into a sparse matrix
    vectorizer = CountVectorizer(binary=True)
    interests_matrix = vectorizer.fit_transform([" ".join(user) for user in user_interests])

    # Perform KMeans clustering
    min_group_size = 3
    max_group_size = 5
    num_clusters = int(np.ceil(len(user_interests) / ((min_group_size + max_group_size) / 2)))
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(interests_matrix)

    # Assign users to clusters
    user_clusters = kmeans.labels_

    # Group users based on clusters
    groups = [[] for _ in range(num_clusters)]
    for i, cluster in enumerate(user_clusters):
        groups[cluster].append(i)

    # Return the groups as JSON response
    return jsonify(groups)

if __name__ == '__main__':
    app.run()
