# Vibe Commerce 🛒

A full-stack mock e-commerce application built as a part of an internship assignment.  
Users can browse products, add/remove items to/from the cart, and perform a mock checkout. The app demonstrates integration between frontend, backend, and database.

---

## Features

- Browse products in a responsive grid layout  
- Add products to cart and update quantity  
- Remove products from cart  
- Mock checkout with receipt generation  
- Responsive design for mobile and desktop  
- Smooth UI interactions and modal displays

---

## Tech Stack

- **Frontend:** React, CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Other:** dotenv, cors  

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd vibe_commerce


BACKEND----(backend setup)
cd backend
npm install

MONGO_URI=<your-mongodb-connection-string>
PORT=5000


node seed.js

node server.js

FRONTEND (setup)---
cd frontend
npm install
npm start

