# Smart Form Builder & Feedback Collection System

## Overview
This project is a **Smart Form Builder and Feedback Collection System** that allows users to create dynamic forms, collect responses, and analyze feedback.

The system enables creators to design forms with multiple question types and view responses through a structured dashboard.

---

## Features

### Form Builder
- Create forms with **title and description**
- Add multiple question types:
  - Short Answer
  - Multiple Choice
  - Checkboxes
  - Dropdown
  - Emoji-based Feedback
- Add and delete questions dynamically

### Form Filling Experience
- Generate **shareable form links**
- Users can easily fill and submit responses
- Simple and clean UI for answering questions

### Response Collection
- Store responses on the backend
- Responses saved in **JSON format**

### Results Dashboard
Responses are displayed in structured format:
- **Table View** – shows individual responses
- **Summary View** – shows count of selections

### Innovative Feedback Feature
Includes **emoji-based feedback scale** allowing users to express emotions quickly instead of traditional rating systems.

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask

### Data Storage
- JSON files

---

## Project Structure

```
smart-form-builder
│
├── backend
│   ├── app.py
│   ├── forms.json
│   ├── responses.json
│
├── frontend
│   ├── builder.html
│   ├── form.html
│   ├── results.html
│   ├── script.js
│   ├── style.css
```

---

## How to Run the Project

### 1. Install dependencies

```
pip install flask flask-cors
```

### 2. Run the backend server

```
python app.py
```

### 3. Open the application in browser

```
http://127.0.0.1:5000
```

---

## Application Flow

1. Creator builds a form using the **Form Builder**
2. The system generates:
   - **Open Form link**
   - **View Results link**
3. Users fill the form using the **Open Form link**
4. Responses are stored in the backend
5. Creator views collected responses through the **Results Dashboard**

---

## Results Visualization

The system displays responses using:

- **Table format** showing individual responses
- **Summary analytics** showing counts of selections

---

## Future Improvements

- Edit questions
- Reorder questions
- Database storage instead of JSON
- Authentication for form creators
- Advanced analytics dashboard
