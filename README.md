# 🍅 Tomato – Full Stack Food Delivery Platform

## 📌 Project Description
Tomato is a full-stack food delivery application where users can browse menus, add items to cart, place orders, and make secure payments via Stripe. It includes both a customer-facing interface and a dedicated admin dashboard for managing food items, orders, and delivery status.

---

## 🌐 Live Demo
- **User App**: [https://tomato-frontend-ppm5.onrender.com](https://tomato-frontend-ppm5.onrender.com)  
- **Admin Dashboard**: [https://tomato-admin-sjor.onrender.com](https://tomato-admin-sjor.onrender.com)  
- **GitHub Repo**: [Tomato GitHub](https://github.com/soumyajit-manna/Tomato-Full-Stack-Food-Delivery-Platform.git)

---

## 🧰 Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Payment Gateway**: Stripe
- **Email Service**: Nodemailer
- **Hosting**: Render (Frontend & Backend)
- **Version Control**: Git, GitHub

---

## ✨ Features

### 👥 User:
- Browse food items by category/restaurant
- Add/remove items to cart
- Secure Stripe payment integration
- Receive email confirmation on order
- Real-time order tracking

### 🛠 Admin:
- Add, update, and delete food items
- View and manage all orders
- Update delivery status
- Trigger automated emails (order updates)

---

## 🔐 Authentication

- JWT-based user authentication
- Protected admin routes
- Session-based login flow

---

## ⚙️ Implementation Details

- Stripe handles payment processing. Only after successful payment is the order created.
- Nodemailer sends order confirmation and status update emails to users.
- MongoDB stores user, food item, and order data.
- Admin dashboard accesses protected routes with verification.

---

## 🧪 How to Run Locally

```bash
# Clone repo
git clone https://github.com/soumyajit-manna/Tomato-Full-Stack-Food-Delivery-Platform.git
cd Tomato-Full-Stack-Food-Delivery-Platform

# Setup environment
cd backend
npm install
# Create .env file with Mongo URI, Stripe keys, and email credentials

cd ../frontend
npm install

