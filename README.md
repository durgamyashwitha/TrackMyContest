# Contest Tracker

A responsive web application that helps competitive programmers discover, track, and manage upcoming coding contests from multiple platforms — all in one place.

---

## Preview

| Home Page | Contest List | Saved Contests | Calendar View |
|-----------|-------------|----------------|---------------|
| ![Home](Screenshots/home.png) | ![Contests](Screenshots/contests.png) | ![Saved](Screenshots/saved.png) | ![Calendar](Screenshots/calendar.png) |

---

##  Features

### Contest Discovery
- Fetches **real-time contest data** from the **CLIST API**
- Tracks upcoming contests across **4 platforms:**
  - Codeforces
  - LeetCode
  - CodeChef
  - AtCoder
- **Search** contests by name or platform
- **Filter** contests by platform
- **Direct registration links** to contest pages

### Contest Management
- **Save favourite contests** for quick access
- **Dedicated Saved Contests page**
- **Calendar view** — visualise upcoming contests by date
- **Persistent storage** using Local Storage — favourites survive page refresh

### Rating Tracker
- Fetch and display **user ratings** from competitive programming platforms
- Track your standing across platforms in one place

### UI/UX
- Clean, responsive interface
- Works on desktop 

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure and layout |
| CSS3 | Styling and responsive design |
| JavaScript | Logic, API calls, DOM manipulation |
| CLIST API | Real-time contest data |
| Local Storage | Persistent favourites and saved contests |

---

## How It Works

1. On load, the app calls the **CLIST API** to fetch upcoming contests filtered by supported platforms
2. Contests are rendered as cards with platform, name, start time, duration, and a registration link
3. Users can **search and filter** contests in real time via JavaScript DOM manipulation
4. **Saving a contest** serialises it to Local Storage — persisting across sessions
5. The **Calendar view** maps contests to their dates for a timeline overview
6. The **Rating Tracker** fetches user rating data from platform APIs and displays them together

---

## Getting Started

### Prerequisites
- A modern web browser
- CLIST API key — get one free at [clist.by](https://clist.by)

### Run
- Open `index.html` directly in your browser, **or**
- Use the **Live Server** extension in VS Code for hot reload

### API Setup
In `script.js`, replace the placeholder with your CLIST API key:
```javascript
const API_KEY = "aed3273654180869d39c99ee92ce041a25c14321";
```

---

## Project Structure

```
contest-tracker/
│
├── index.html           # Home page
├── upcoming.html        # Upcoming contests page
├── yourcontests.html    # Saved contests page
├── calendar.html        # Calendar view
├── rating.html          # User rating tracker
│
├── style.css            # Global styles
├── script.js            # Core logic — API fetch, search, filter, save
├── yourcontests.js      # Saved contests logic
├── calendar.js          # Calendar rendering logic
├── rating.js            # Rating fetch and display logic
│
├── /Screenshots
│   ├── home.png
│   ├── contests.png
│   ├── saved.png
│   └── calendar.png
│
└── README.md
```

---

## Possible Extensions

- Contest countdown timers
- Push notifications for upcoming contests
- Dark mode
- Personalised dashboard with contest history
- Backend authentication for cross-device sync

---

## 🙌 Acknowledgements

Built to solve a real problem — tracking contests across multiple platforms manually is tedious. This project aggregates everything in one clean interface.

Uses the [CLIST API](https://clist.by) for contest data.