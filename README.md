# Custom Event Calendar

## Overview

This project is a dynamic, interactive event calendar that allows users to manage their schedules efficiently. Users can add, edit, delete, and view events, including support for recurring events and drag-and-drop rescheduling.

## Features

- **Monthly View Calendar**
  - Traditional monthly calendar display
  - Highlights the current day
  - Navigation between months

- **Event Management**
  - **Add Event:** Click on a day to add an event with title, date/time, description, recurrence, and optional color/category
  - **Edit Event:** Click on an event to update details
  - **Delete Event:** Remove events from the calendar or event details

- **Recurring Events**
  - Daily, weekly, monthly, and custom recurrence patterns
  - Recurring events are displayed across all relevant days

- **Drag-and-Drop Rescheduling**
  - Drag events to different days to reschedule
  - Handles conflicts and overlapping events

- **Event Conflict Management**
  - Detects and warns/prevents overlapping/conflicting events

- **Event Filtering and Searching**
  - Filter by category or search by title/description

- **Event Persistence**
  - Events are saved using local storage 
  - Data persists across page reloads

- **Responsive Design**
  - Works on all screen sizes, including mobile

## Technical Stack

- **Framework/Library:** React
- **State Management:** Effective state handling using Redux
- **Date Handling:** Used a library date-fns
- **Drag-and-Drop:** Implemented with React DnD

## Dependencies

- `react`
- `react-dom`
- `@reduxjs/toolkit`
- `react-redux`
- `date-fns`
- `react-dnd`
- `react-dnd-html5-backend`
- `tailwindcss`
- `@tailwindcss/vite`
- `vite`

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
npm install
```

### Running the App

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

## Project Structure

- `/src` - Main source code
- `/components` - Calendar, Event Form, Event List, etc.
- `/utils` - Date and recurrence utilities

## Special Instructions

- Ensure your browser supports local storage.
- For drag-and-drop, some features may require desktop browsers.

## Demo

A live demo is available at: [Demo Link](https://your-demo-link.com)

