# 🎫 Eventify — Hyper-local Event Discovery & Ticket Management

Eventify is a premium, full-stack MERN application designed for seamless event discovery, instant ticket booking, and high-fidelity organizer management. Built with a focus on **modern aesthetics**, **real-time interactions**, and **secure ticket handling**.

![Eventify Banner](https://img.shields.io/badge/Eventify-Modern--UI-4F47E5?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind--CSS-38B2AC?style=for-the-badge)

## ✨ Key Features

### 👤 For Attendees
*   **Hyper-local Discovery**: Browse events with advanced filtering by city, category, and type.
*   **Bento-style Landing Page**: A premium, animated landing page showcasing platform capabilities.
*   **Instant Booking**: Secure seat reservation with a strict 1-ticket-per-user constraint.
*   **Digital Boarding Pass**: Airline-style ticket pass with unique QR codes and "Download as Image" functionality.
*   **Automated Confirmation**: Receive professionally styled HTML email tickets after every successful booking.

### 🏢 For Organizers
*   **Manager Dashboard**: Comprehensive overview of personal events with real-time statistics.
*   **Event Lifecycle Management**: Create, Edit, and Delete events with robust date validation (future-only).
*   **Attendee Analytics**: View complete attendee lists and export-ready data for each event.
*   **Gate Scan Tool**: Built-in QR scanner to verify attendee authenticity at the venue entrance.
*   **Expired Logic**: Automatic dimming and locking of past events to prevent invalid bookings.

---

## 🛠 Tech Stack

### Frontend
- **React 19**: Core UI framework for component-driven development.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first styling with custom glassmorphism effects.
- **Lucide React**: Elegant, consistent iconography.
- **React Leaflet**: Interactive maps for event location display.
- **Chart.js**: Dynamic data visualization for organizer analytics.
- **html2canvas**: DOM-to-image conversion for ticket downloading.

### Backend
- **Node.js & Express**: Scalable server-side logic and RESTful API.
- **MongoDB & Mongoose**: NoSQL database for flexible event and user schema management.
- **JWT (JSON Web Tokens)**: Secure, stateless authentication with role-based access control (RBAC).
- **ImageKit**: Cloud-based image management for event posters.
- **Nodemailer**: SMTP integration for transactional email delivery.
- **express-validator**: Robust server-side input sanitization.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- ImageKit Account (for posters)
- Gmail App Password (for Nodemailer)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/TeamZebra_PriyanshuKumarPrasad.git
   cd TeamZebra_PriyanshuKumarPrasad
   ```

2. **Environment Configuration**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_super_secret_key
   CLIENT_URL=http://localhost:5173
   
   # ImageKit Config
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id/
   
   # Email Config
   EMAIL=your_gmail@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

3. **Install Dependencies**
   ```bash
   # Install Backend dependencies
   cd backend
   npm install
   
   # Install Frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Run the Application**
   ```bash
   # Start Backend (from backend/ directory)
   npm run dev
   
   # Start Frontend (from frontend/ directory)
   npm run dev
   ```

---

## 📁 Project Structure

```text
TeamZebra_PriyanshuKumarPrasad/
├── backend/
│   ├── config/         # Database and third-party configs
│   ├── controllers/    # API request handling logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express dynamic routing
│   ├── utils/          # Helpers (Email templates, QR gen)
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global Auth & State providers
│   │   ├── pages/      # View components
│   │   ├── assets/     # Images and SVGs
│   │   └── App.jsx     # Main Routing
│   └── tailwind.config.js
└── README.md
```

---

## 🎨 UI & UX Design
- **Floating Navbar**: A responsive, glassmorphic navigation bar that adapts on scroll.
- **Bento Grid**: Modern feature showcase with hover-triggered micro-interactions.
- **Premium Buttons**: Custom gradients and smooth hover transitions using CSS variables.
- **Accessibility**: Semantic HTML and descriptive alt tags throughout.

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Developed with ❤️ by Priyanshu Kumar Prasad**
