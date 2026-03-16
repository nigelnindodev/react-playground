# React Playground

A lightweight, purely local React playground environment with vim support.

<img width="1353" height="674" alt="Screenshot from 2026-03-16 06-38-07" src="https://github.com/user-attachments/assets/38c22bf7-018b-4230-9131-435075d6e94a" />

## Motivation 

Testing and validating backend code logic is incredibly easy with simple terminal scripts or REPLs. However, doing the same for React code often requires significant boilerplate or relying on external cloud-based sandbox websites. 

This React Playground is designed to bring that same quick, frictionless testing experience to React. It removes the need to think about local setup or environment configuration—just launch it and start writing and validating code instantly. Plus, it is completely self-contained and operates 100% offline.

## Setup Instructions

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   Run the following to start the application locally:
   ```bash
   npm run dev
   ```

3. **Open the App**
   Navigate to the local Vite URL provided in your terminal (usually `http://localhost:5173`).

## Usage

* **Select a Challenge:** Use the dropdown in the header to select a React challenge.
* **Vim Mode:** Toggle the Vim Mode switch in the header to enable or disable Vim bindings in the code editor.
* **Validate Details:** Write your code in the editor, and hit "Validate" to check whether your component meets the challenge criteria.

## Adding Challenges

New challenges can be added within the `challenges/` directory. Each challenge folder should contain:
* `instructions.md` - The problem description and hints.
* `starter.tsx` - The boilerplate starting code.
* `validate.ts` - The exact tests checking the component rendering logic.
