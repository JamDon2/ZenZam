# ZenZam

## Next.js (Frontend and main backend)

### Prerequisites

-   Node.js and NPM installed: you can get them [here](https://nodejs.org/en), the LTS version should be good.

-   The repository cloned or downloaded to the runner computer

### Setting up

-   Open a terminal in the repository's folder

-   Install all dependencies via `npm install`

-   Make a copy of the `.env.example` file with the name `.env`

-   If you already have a MongoDB server running just add it's URI to the `MONGODB_URI` key, and skip to the [Running section](#running)

-   There are many ways to run a MongoDB server, here are some options:

    -   Provision one on [MongoDB Atlas](https://www.mongodb.com/atlas)

    -   [Run one in Docker](https://hub.docker.com/_/mongo)

    -   [Run it on your local machine](https://www.mongodb.com/try/download/community)

-   Your connection string should look something like this: `mongodb+srv://<user>:<password>@<mongodb-cluster>.mongodb.net/?retryWrites=true&w=majority`, this is what you need to put after `MONGODB_URI=` in the .env file

### Running

-   In your terminal start the development server with the following command: `npm run dev`

-   Open your browser, and visit the following URL: http://localhost:3000, or the URL that it sends in the log

## Python (grouping backend)

### Prerequisites

-   [Python](https://www.python.org/downloads/) >= 3.10

### Setting up

-   Open a seperate terminal in the `grouping` folder

-   Install the required modules by running `pip install -r requirements.txt`

### Running

-   Type `python app.py` in your terminal

## Usage

If you navigate to http://localhost:3000 (or your own URL from the log) you will be redirected to the onboarding page. There you can create a user by entering your interests, and you'll be taken to the user dashboard. Here you can change your interests, and request a new group.

The grouping algorithm can be triggered manually by navigating to http://localhost:3000/api/group/execute, however keep in mind, that at least 3 users have to be looking for a group for the grouping functionality to be enabled.

Once you are assigned a group, you can see your shared interests in the form of badges (like **#Cybersecurity**), and chat with other group members.

Your groups are the circles at the top of your screen, with the leftmost one bringing you back to the dashboard.
