---

# Task Tracker

## Overview
<img width="2750" alt="Screenshot 2024-10-04 at 4 21 15 PM" src="https://github.com/user-attachments/assets/8735edea-4404-4366-9c14-585827eb19c9">


**Task Tracker** is a full-stack web application designed to help users efficiently manage their daily tasks. The app allows users to create tasks, set priorities, track time spent on each task, and visualize their progress through dynamic bar graphs. The frontend is built with **React**, while the backend uses **Express** with **MongoDB** as the database. JWT-based authentication ensures secure user sessions.

## Features

- **Task Management**: Create, edit, delete tasks with priority settings.
- **Time Tracking**: Track time spent on each task individually.
- **Bar Graph Visualization**: Dynamic graphs to visualize tasks and time spent.
- **JWT Authentication**: Secure login and session management.
- **RESTful API**: CRUD operations for tasks, user authentication, and task prioritization.

## Tech Stack

### Frontend:
- **React**
- **Redux** (for state management)
- **Formik** (for forms)
- **Chart.js** (for bar graph visualizations)
  
### Backend:
- **Express.js**
- **MongoDB** (for data storage)
- **JWT** (for authentication)
- **Body-parser**, **CORS**, and **Morgan** middleware

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/task-tracker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd task-tracker
    ```

3. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. Configure environment variables:
   Create a `.env` file in the backend folder and provide your MongoDB URI and JWT secret:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. Run the application:
    - Start the backend:
      ```bash
      cd backend
      npm start
      ```
    - Start the frontend:
      ```bash
      cd frontend
      npm start
      ```

### API Endpoints

- **POST /api/auth/login**: User login.
- **POST /api/auth/register**: User registration.
- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/:id**: Update a task by ID.
- **DELETE /api/tasks/:id**: Delete a task by ID.

## Usage

1. Sign up or log in using the authentication system.
2. Create tasks and set their priorities.
3. Track how much time you spend on each task.
4. View the time spent on tasks in a bar graph format, with tasks on the x-axis and time on the y-axis.
5. Prioritize and reorder tasks as needed to manage your daily workflow efficiently.

## Contributing

Contributions are welcome! Feel free to open a pull request or raise issues.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.
