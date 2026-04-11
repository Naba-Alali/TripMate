# TripMate

> A React-based travel planning web application that helps users discover, organize, and plan trips across Saudi Arabia — all in one place.

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech](#tech)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Team Members](#team-members)

---

## Project Description

**TripMate** is a frontend web application built with React that allows users to explore destinations across Saudi Arabia, create personalized multi-day trip itineraries, manage trip members, and discover places by category (landmarks, food, nature, shopping, and entertainment).

Users can sign up, log in, build trips with custom durations, add places to each day of their itinerary, invite members, and manage everything through a clean and intuitive interface.

---

## Features

| Feature        | Description |
|----------------|---|
| Home Page      | Landing page introducing TripMate |
| Auth           | User Sign Up and Login |
| Profile        | User profile page |
| Create Trip    | Build a trip with name, destination, duration, itinerary, and members |
| Explore Places | Browse and filter places by city and category |
| Admin Panel  | Admin management dashboard |

### Create Trip — Detailed Features
- Create multiple trips with a name, destination city, and duration **(1–12 days)**
- Add and remove days dynamically from the itinerary
- Filter places by category: **All, Landmarks, Local Food, Nature, Shopping, Entertainment**
- Filter places by city: **Riyadh, Jeddah, Abha, AlUla, Al Hassa**
- Add places to specific days in the itinerary
- Invite trip members by name and email (with validation of the email format)
- Remove members (organizer is protected)
- Delete entire trips
- Trip data is persisted per user session

---

## Tech 

- **Framework:** React (with Hooks)
- **Styling:** CSS stylesheets
- **Language:** JavaScript (JSX)
- **State Management:** React `useState`
- **Routing:** Custom `onNavigate` prop-based navigation
- **Build Tool:** Vite

---

## Folder Structure

```
TripMate/
├── public/
├── src/
│   ├── assets/
│   │   └── imgs/
│   ├── components/
│   │   ├── PlanTripComponents/
│   │   │   ├── data/
│   │   │   │   ├── members.js
│   │   │   │   └── places.js
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── CityTabs.jsx
│   │   │   ├── DayTabs.jsx
│   │   │   ├── ItineraryPanel.jsx
│   │   │   ├── MemberPanel.jsx
│   │   │   ├── PlaceCard.jsx
│   │   │   ├── PlaceDetailModal.jsx
│   │   │   └── TripForm.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── CreateTrip.jsx
│   │   ├── ExplorePlaces.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── SignUp.jsx
│   ├── styles/
│   │   ├── auth.css
│   │   ├── CategoryFilter.css
│   │   ├── CityTabs.css
│   │   ├── createTrip.css
│   │   ├── ExplorePlaces.css
│   │   ├── home.css
│   │   ├── PlaceCard.css
│   │   ├── PlaceDetailModal.css
│   │   └── profile.css
│   ├── utils/
│   │   ├── auth.js
│   │   └── trips.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## Setup & Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) 

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tripmate.git
   cd tripmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

   Visit `http://localhost:5173` (default Vite port)

---

## Usage

### Creating a Trip

1. Navigate to the **Plan Your Trip** page from the navbar.
2. Enter a **Trip Name**, select a **Destination City**, and choose the **Duration** (number of days).
3. Click **+ Create Trip** — your trip will appear in the sidebar.
4. Use the **Category Filter** or **City Tabs** to browse places.
5. Click the **+** button on any place card to add it to the currently active day.
6. Use **Day Tabs** to switch between days or add/remove days.
7. Use the **Members Panel** to invite people by name and email.
8. Delete any trip using the 🗑️ icon next to it in the sidebar.

### Exploring Places

- Navigate to **Explore Places** to browse all destinations.
- Filter by city or category to find relevant spots.
- Click on a place card for more details and add reviews. (Note: Reviews are stored in-memory and will reset on page refresh.)
---

## Team Members

| Name | Role |
|---|---|
| **Rayhanah Alobaid** | Create Trip Page |
| **Naba Alali** | Explore Places Page |
| **Bana Jaber** | Home Page, Login & Sign Up, User Profile |
| **Forqan Alsalman** | Admin Page |

---

## License

This project was built as part of an academic course project. All rights reserved by the team members listed above.