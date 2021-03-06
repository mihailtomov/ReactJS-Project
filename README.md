# Resource Sharing Space

React App that allows users to interact with or create articles on different topics.

## Project Architecture

A client-server architecture within the same project is used for both the frontend and backend of the application.

### Frontend

Frontend developed with Create React App library and React Router for the client-side routing.

### Backend

The backend is a custom REST API server built on Node.js using Express and a local instance of MongoDB database.

## Functionality

All users of the application can browse through and read the published articles.

### Guest Users

Guests can access all sections with articles, read each published article and register an account to unlock additional functionality.

### Registered Users

Registered users can create new articles, edit or delete their own articles, read or write comments on all articles and view their profile page.