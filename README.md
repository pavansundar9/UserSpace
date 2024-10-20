# User Management Application

This React project allows user authentication, displays a paginated user list, and supports editing and deleting users using the Reqres API. The app also integrates Firebase for alternative login options.

![image](https://github.com/user-attachments/assets/b453d4c7-df23-444b-bd58-dbb4f84b6ed4)


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Assumptions](#assumptions)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Considerations](#considerations)
- [Live Demo](#live-demo)

## Features
- **Login**: Users can log in using both the Reqres API and Firebase.
- **Users List**: Displays a paginated list of users fetched from the Reqres API.
- **Edit Users**: Users can edit a specific user's details.
- **Delete Users**: Users can delete a user from the list.
- **Persistent Auth**: Authentication tokens are stored in local storage to persist the session across page reloads.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/user-management-app.git
   cd user-management-app
2. **Install dependencies**: Make sure you have Node.js installed, then run
   ```bash
       npm install

3. **Configure Firebase**: Create a *firebaseConfig.js* file in the src folder and provide your Firebase configuration
    ```bash
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    };
    
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
4. **Run the project**: To start the development server, run
   ```bash
       npm start
The app will be available at *http://localhost:3000*.

## Running the Project
1. **Login**: Use the following credentials for the Reqres API:
           - Email: eve.holt@reqres.in
           - Password: cityslicka
2. **Firebase Authentication**: You can also log in using Firebase credentials if you've set up the Firebase auth service.
3. **User Lis**: After logging in, you will be redirected to the user list page, which fetches users from Reqres API with pagination.
4. **Edit/Delete Users**: On the user list page, you can edit or delete users. The changes are simulated using local storage for persistence after editing.

## Assumptions

- **User Authentication**: The app assumes that users will either log in using the Reqres API or Firebase authentication.
- **Data Persistence**: Changes to user data (edit/delete) are stored locally via localStorage and do not persist on the API.
- **User Images**: Randomly selected images are used for profile pictures in the Navbar.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Firebase Authentication**: Alternative login option.
- **Axios**: For making HTTP requests to the Reqres API.
- **React Router**: For handling navigation between login, user list, and edit pages.
- **LocalStorage**: For persisting authentication tokens and user data edits locally.
- **CSS**: Basic styling for UI components.

## Project Structure
    /src
      ├── /components
      │     ├── Navbar.js
      │     ├── Navbar.css
      │     ├── Login.js
      │     ├── Register.js
      │     ├── UsersList.js
      │     ├── EditUser.js
      │     ├── UserContext.js
      │     ├── firebaseConfig.js
      ├── /images
      │     └── user1
      │     ├── user2
      │     ├── user3
      └── App.js

## Considerations
- **Error Handling**: Basic error handling is implemented for both Firebase and Reqres API calls.
- **Responsive Design**: Basic responsiveness is considered for mobile devices.
- **Navigation**: React Router is used for navigating between pages.

## Live Demo
Check out the live demo of the project [here](https://usersphere-d6472.web.app/login).


  
