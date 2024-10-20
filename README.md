# Task Manager Application

This Task Manager Application allows users to manage tasks by creating, updating, and deleting them. Tasks can be filtered by their status (pending, in-progress, completed) and assigned to categories. Users can also add new categories when managing tasks.

## Features

- User authentication (login/register).
- Manage tasks with a title, description, status, due date, and category.
- Filter tasks by status (pending, in-progress, completed).
- Add, update, and delete tasks.
- Assign categories to tasks.
- Add a new category if none are available.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Environment Variables](#environment-variables)
6. [Dependencies](#dependencies)

---

## Tech Stack

**Frontend**:
- React (Vite)
- Tailwind CSS
- Axios

**Backend**:
- Node.js (Express)
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication

**State Management**:
- Redux Toolkit

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local or cloud setup)
- npm (comes with Node.js)

### Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
