# Github-Finder

## Overview
This project is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The application integrates with the GitHub API to fetch and manage user data, repositories, and followers while providing a responsive frontend and efficient backend services.

![Screenshot 2025-01-05 023613](https://github.com/user-attachments/assets/b740ea39-3047-46fe-955f-0b9657bf7c8c)
![Screenshot 2025-01-05 023954](https://github.com/user-attachments/assets/83bec3ea-8a73-4a38-ab3e-06f41028a4ca)
![Screenshot 2025-01-05 024011](https://github.com/user-attachments/assets/b5cb6bb1-458a-4659-8ab6-a16343e1b1bf)

## Features
### Backend
1. **GitHub API Integration**:
   - Accepts a GitHub username and saves user details from the GitHub API to a database.
   - Avoids redundant API calls by checking if the user's data already exists in the database.

2. **Mutual Follower Detection**:
   - Identifies mutual followers of a user and marks them as friends.

3. **Search Functionality**:
   - Searches user data in the database by username, location, etc.

4. **Soft Delete**:
   - Soft deletes user records based on a given username.

5. **Data Updates**:
   - Updates fields like location, blog, or bio for a user.

6. **Sorted User Listing**:
   - Returns a list of all users sorted by attributes such as public repositories, public gists, followers, etc.


### Frontend
1. **Search by GitHub Username**:
   - Initial page with an input box and a search button to query GitHub usernames.

2. **Repository List Display**:
   - Shows user info and a list of repositories for the queried GitHub username.

3. **Repository Details**:
   - Clicking on a repository displays its detailed description.

4. **Followers List**:
   - Includes a button/link to view followers of the current user.

5. **Follower Repository Navigation**:
   - Clicking on a follower shows their repository list.

6. **Navigation**:
   - Provides a way to return to the main page with the input box.

## Tech Stack
- **Frontend**: React.js (Hooks, functional components)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any relational database as needed)
- **API Integration**: GitHub API

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/itsankitksingh/Github-Finder.git
   cd Github-Finder
   ```

2. **Install dependencies:**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Variables:**
   - Create a `.env` file in the backend directory with the following keys:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     PORT=5000
     GITHUB_API_TOKEN=<your-github-api-token>
     ```

4. **Run the application:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`.

