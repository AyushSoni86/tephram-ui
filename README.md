# Tephram Asset Management – Disassembly Electrolyzer UI

This project implements the **Disassembly Electrolyzer** screen for the Tephram Asset Management Solution using **React** and **Tailwind CSS**.
The goal is to closely match the provided UI designs and implement all required interactions using **static data only** (no backend).

---

## 📌 Assignment Overview

- Build a screen using **React.js**
- Preferred stack:

  - React
  - Tailwind CSS

- Match the provided UI screens and popups as closely as possible
- Follow standard coding practices
- All data is static and provided in a data file
- No backend or data persistence required
- Any missing data or behavior assumptions are handled logically

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Header.tsx
│   ├── DisassemblyPanel.tsx
│   ├── ElectrolyzerList.tsx
│   ├── ElementList.tsx
│   └── ConfirmModal.tsx
│
├── data/
│   └── data.js
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🖥 Screens Implemented

### 1. Default State (Image_1)

- No Electrolyzer ID selected by default
- Instruction shown to select an Electrolyzer ID
- Search bar available to filter Electrolyzer IDs

### 2. Elements Part ID List (Image_2)

- Selecting an Electrolyzer ID displays all related element part IDs
- Users can:

  - Select individual elements
  - Select all available elements

- Two possible actions:

  - **Send to Repair**
  - **Ready to Assemble**

### 3. Taking Action on Selected Elements (Image_2)

- When elements are selected:

  - Checklist items can be selected (only for repair)
  - Comments can be added per selected element

- Only selected elements appear in the comments table
- Selected checklist count is displayed

### 4. Send Elements to Repair (Image_3 & Image_4)

- Confirmation modal appears before applying changes
- After confirmation:

  - Selected elements are disabled
  - Status is updated to **Ready for Repair**
  - Checklist item count is displayed beside the element

### 5. Ready Elements to Assemble (Image_5)

- Checklist is **not required**
- Confirmation modal appears
- After confirmation:

  - Selected elements are disabled
  - Status is updated to **Ready for Assemble**

---

## 📊 Data Used

All data is stored locally in `data.js`.

### Electrolyzer IDs

```js
export const electrolyzer_ids = [6310, 6345, 6350, 6388, 6392];
```

### Element Part IDs (Sample for Electrolyzer 6345)

```js
export const element_ids = [
  { position: 1, id: "TC-080" },
  { position: 2, id: "1869" },
  { position: 3, id: "BR-307" },
  { position: 4, id: "2765" },
  { position: 5, id: "BR-165" },
  { position: 6, id: "1716" },
  { position: 7, id: "2013" },
  { position: 8, id: "2015" },
  { position: 9, id: "2329" },
  { position: 10, id: "2341" },
  { position: 11, id: "1863" },
  { position: 12, id: "BR-201" },
  { position: 13, id: "TA-134" },
];
```

### Checklist Items

```js
export const checklist_items = [
  "Anolyte Leaker",
  "Catholyte Leaker",
  '1–1.5" Nozzle',
  '2" Nozzle',
  '4" Nozzle',
  '8" Nozzle',
  "Cathode screens",
  "Cathode perimeter screens",
  "Gasket surface",
  "Dye-Check Coupling",
  "Outside Steel",
  "Hydrogen Chamber",
  "Hydrogen Box",
  "Hydrogen Channel",
  "Anode Studs / Alignment",
];
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd tephram-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🧠 Code Guide

- **`App.tsx`**

  - Acts as the main container
  - Manages all shared state:

    - Selected Electrolyzer
    - Selected Elements
    - Checklist items
    - Comments
    - Disabled elements
    - Confirmation modal

- **State Lifting**

  - All business logic is centralized in `App.tsx`
  - Child components are mostly presentational

- **No Backend**

  - All state updates happen in-memory
  - Page refresh resets the application state

---
