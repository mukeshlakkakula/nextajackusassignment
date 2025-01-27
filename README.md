This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is the Website Link for Demo https://nextajackusassignment.vercel.app/

## Getting Started

Note: To run this application we need to have node in our system

```bash
Installation and Setup

Step 1: Clone the Repository

https://github.com/mukeshlakkakula/nextajackusassignment.git

Step 2: Navigate to the Project Directory

cd nextajackusassignment

Step 3: Install Dependencies

npm install

Step 4: Run the Development Server

npm run dev

The application will now be running at http://localhost:3000.
```

## Next.js User Management App

This project is a User Management Application built using Next.js (App Routing), styled with Tailwind CSS, and used libraries like react-icons, react-toastify, and uuid for better user experience. It consists of two primary components:

UserForm - Handles the user interface for adding and editing users.

UserList - Displays the list of users and allows deletion and updates.

The project follows a clean and modular structure with two main subdirectories:

components/: Contains reusable React components.

services/: Manages the connection with APIs for CRUD operations.

## Features

User List: View all users in a structured list.

Add User: Add new users via a form.

Edit User: Update details of existing users.

Delete User: Remove a user from the list.

API Integration: Fetches, adds, updates, and deletes users via a dedicated service layer.

Toast Notifications: Provides user feedback using react-toastify.

## Tech Stack

Frontend

Next.js: For server-side rendering and app routing.

Tailwind CSS: For styling the UI with a modern utility-first CSS framework.

React-Icons: For including beautiful icons in the UI.

React-Toastify: For user-friendly notifications.

UUID: To generate unique identifiers for users.

## Project Structure

## Directories

nextajackusassignment/
├── components/
│ ├── UserForm.js
│ ├── UserList.js
├── services/
│ └── api.js
├── public/
├── globals.css
├── pages/
│ └── index.js
├── .gitignore
├── package.json
├── README.md

## Components

## 1. UserForm.js

Provides a user interface for adding and updating users.

Utilizes form validation to ensure required fields are filled.

Integrates with react-toastify to display success or error messages.

## 2. UserList.js

Displays the list of users in card format.

Provides options to delete or update user details.

Pagination controls for navigating through users.

Uses react-icons for delete/edit buttons.

## Services

## 1. api.js

Handles all API-related interactions.

Exposes methods for:

API = "https://jsonplaceholder.typicode.com/users";

Fetching Users: Retrieves the list of users.(API)

Adding Users: Adds a new user.(API)

Updating Users: Edits user details.(API/id)

Deleting Users: Removes a user.(API/id)

## Contact

If you have any questions or issues, feel free to reach out:

Name: Lakkakula Mukesh

Email: lakkakulababblu@gmail.com

contact: 8978347377
