# group-9-habit-tracke-app-api

Tech Crush Cohort 7 Backend Mini Project
# Habit Tracker API (Project 14)

This project is a **beginner-friendly backend REST API** designed to help users manage and track their daily habits. It allows for core **CRUD operations** (Create, Read, Update, Delete) and includes a **check-in feature** to monitor progress.

## Team Members and Roles
As per the project guidelines, the following team members contributed to the repository:
*   **Masterpiece34 (Emmanuel Imoh)**: Project setup and coordination.
*   **EmmanuelAlliu (EMMANUEL ENERO ALLIU)**: Backend development and logic.
*   **gavileway-dot**: Routes and implementation.
*   **Edem Sokatsi**: Testing and README documentation.



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
| **GET** | `/resources` | Retrieve a list of all habits. |
| **GET** | `/resources/:id` | Retrieve a specific habit by its unique ID. |
| **POST** | `/resources` | Create a new habit. |
| **PUT** | `/resources/:id` | Update an existing habit. |
| **DELETE** | `/resources/:id` | Remove a habit from the tracker. |

### Example Request/Response
**Create a Habit (POST /resources):**
*   **Request Body:** `{"name": "Read Bible"}`
*   **Response:** `201 Created` - `{"id": 3, "name": "Read Bible", "createdAt": "2026-07-01"}`

**Get All Habits (GET /resources):**
*   **Response:** `200 OK`
    ```json
    [
      { "id": 1, "name": "Drink Water" },
      { "id": 2, "name": "Exercise" }
    ]
    ```

## Core Features and Requirements
*   **Validation:** The API checks for required fields (e.g., name cannot be empty) and appropriate data types, returning a `400 Bad Request` for invalid input.
*   **Data Persistence:** All habits are stored in a JSON file under the `data/` directory.
*   **Timestamps:** Every habit includes `createdAt` and `updatedAt` fields.
*   **Check-in & Streaks:** Users can mark habits as completed for the day. The bonus challenge includes **streak calculation** based on consecutive check-ins.

## Known Issues and Limitations
*   Data is stored in a flat JSON file; it is not suitable for high-concurrency production environments.
*   No frontend interface is provided as this is a backend-focused project.
