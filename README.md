# Invoice Tracker

A full-stack invoice management application built with **React (frontend)**, **Rails (backend)**, and **PostgreSQL (database)**.  
It supports user authentication (JWT-based) and invoice CRUD functionality.

---

## 🚀 Features
- User authentication with Devise & JWT
- Secure login and registration
- Create, read, update, and delete invoices
- RESTful API with Rails backend
- PostgreSQL database
- React frontend (with API integration)

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, JavaScript
- **Backend:** Ruby on Rails (API mode), Devise + JWT
- **Database:** PostgreSQL

---

## ⚙️ Installation & Setup

### Backend (Rails API)
```bash
# Navigate to backend folder
cd invoice_tracker_backend

# Install dependencies
bundle install

# Setup database
rails db:create db:migrate

# Start Rails server
rails s
