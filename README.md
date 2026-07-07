# group-9-habit-tracke-app-api

Tech Crush Cohort 7 Backend Mini Project
# Habit Tracker API (Project 14)

This project is a **beginner-friendly backend REST API** designed to help users manage and track their daily habits. It allows for core **CRUD operations** (Create, Read, Update, Delete) and includes a **check-in feature** to monitor progress.

## Team Members and Roles
As per the project guidelines, the following team members contributed to the repository:
*   **Emmanuel Shigiri Imoh**: Repository setup, GitHub collaboration, testing of end points.
*   **Alliu Emmanuel**: Data and Services Codebase
*   **Dosumu Emmanuel**: GitHub collaboration, validation branch
*   **Edem Sokatsi**:  README documentation.
*   **Egba Henry Chukwuemeka**: GitHub collaboration validation branch
*   **Animasaun Farouk**
*   **Ernest James**: Route
*   **Nobong Umoette**: Reviewed pull requests and merged branches



## Tech Stack
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Module System:** ES Modules (import/export)
*   **Storage:** Local JSON file (`data/habits.json`) using `fs/promises`

## Installation and Setup
To get our project running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Masterpiece34/habit-tracker-app-api.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd habit-tracker-app-api
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```

## API Endpoints
All endpoints return proper **HTTP status codes** and handle data in **JSON format**.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/habit` | Retrieve a list of all habits. |
| **GET** | `/habit/:id` | Retrieve a specific habit by its unique ID. |
| **POST** | `/habit` | Create a new habit. |
| **PUT** | `/habit/:id` | Update an existing habit. |
| **DELETE** | `/habit/:id` | Remove a habit from the tracker. |

### Example Request/Response
**Create a Habit (POST /habit):**
*   **Request Body:** `{"name": "Read Bible"}`
*   **Response:** `201 Created` - `{"id": 3, "name": "Read Bible", "createdAt": "2026-07-01"}`

**Get All Habits (GET /habit):**
*   **Response:** `200 OK`
    ```json
    [
      { "id": "a1b2c3d4-e5f6-4890-abcd-ef4434567890", "name": "Drink Water" },
      { "id":"a1b2c3d4-j5f6-4891-abcd-ef1234567111", "name": "Meditate" }
    ]
    ```

## Core Features and Requirements
*   **Validation:** The API checks for required fields (e.g., name cannot be empty) and appropriate data types, returning a `400 Bad Request` for invalid input(server-side error).
*   **Data Persistence:** All habits are stored in a JSON file under the `data/` directory.
*   **Timestamps:** Every habit includes `createdAt` and `updatedAt` fields.
*   **Check-in & Streaks:** Users can mark habits as completed for the day. The bonus challenge includes **streak calculation** based on consecutive check-ins.

## Things to know and limitations
*   Data is stored in a JSON file. It is not suitable for high-concurrency production environments.
*   We did not provide any frontend interface because this is a backend-focused project.
