# ⚡ CodeShare — Real-Time Collaborative Code Editor

<p align="center">
  <strong>Share code snippets instantly. Real-time collaboration, syntax highlighting, and beautiful image exports.</strong>
</p>

<p align="center">
  <a href="https://codeshare-henna.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Click_Here-6366f1?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/CodeMirror-6-d30707?style=flat-square" />
  <img src="https://img.shields.io/badge/Yjs-CRDT-ff6600?style=flat-square" />
  <img src="https://img.shields.io/badge/Node.js-WebSocket-339933?style=flat-square&logo=node.js" />
  <img src="https://img.shields.io/badge/PWA-Ready-5a0fc8?style=flat-square&logo=pwa" />
</p>

---

## 🎯 The Problem

Every developer has been there: you need to share a code snippet with a colleague, so you paste it into Slack. The formatting breaks, the indentation disappears, and syntax highlighting is gone. Existing tools like CodeSandbox are too heavy for a quick snippet share.

## 💡 The Solution

**CodeShare** is a lightweight, real-time collaborative code editor that runs in the browser. Create a room, share the link, and code together — no signup, no install, no friction.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **Real-Time Collaboration** | See every keystroke instantly via WebSockets + CRDTs (Yjs). No conflicts, no data loss. |
| 🎨 **5 Editor Themes** | One Dark, GitHub Dark, Dracula, Nord, Monokai |
| 💻 **12+ Languages** | JavaScript, TypeScript, Python, Rust, C++, Java, SQL, HTML, CSS, JSON, Markdown |
| 📸 **Export as Image** | Beautiful Carbon/ray.so-style screenshots with 10 gradient backgrounds (PNG/SVG, 3x retina) |
| 📱 **PWA Support** | Installable on mobile & desktop, works offline |
| 🔗 **Room-Based Sharing** | Unique URLs via nanoid, no signup required |
| ⌨️ **Full Editor Power** | Autocomplete, code folding, find/replace, bracket matching, multi-cursor |
| 📊 **Status Bar** | Live cursor position, line count, character count, selection info |
| 🔔 **Toast Notifications** | Peer join/leave alerts, action confirmations |
| 🎬 **Smooth Animations** | Framer Motion transitions throughout |

---

## 🏗️ Architecture
┌──────────────────┐ ┌──────────────────┐
│ Browser Tab A │ │ Browser Tab B │
│ │ │ │
│ React + Vite │ │ React + Vite │
│ CodeMirror 6 │ │ CodeMirror 6 │
│ Yjs Document │ │ Yjs Document │
└────────┬─────────┘ └────────┬─────────┘
│ │
│ WebSocket (y-websocket) │
│ │
└──────────┬─────────────────┘
│
┌────────▼────────┐
│ Node.js Server │
│ Express + WS │
│ Yjs Sync Hub │
│ (Render.com) │
└─────────────────┘

text


**How CRDTs work:** Yjs uses Conflict-free Replicated Data Types to ensure that even when two users type simultaneously at the same position, the document converges to the same state on all clients — no central authority needed for conflict resolution.

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 19 + Vite | Fastest DX, instant HMR |
| **Styling** | Tailwind CSS v4 | Utility-first, zero config |
| **Editor** | CodeMirror 6 | Industry standard (Chrome DevTools, Firebase) |
| **Real-Time** | Yjs + y-websocket | CRDT-based, battle-tested (used by Figma, Notion) |
| **Backend** | Node.js + Express + ws | Lightweight WebSocket signaling |
| **Export** | html-to-image | 3x retina PNG/SVG rendering |
| **PWA** | vite-plugin-pwa + Workbox | Offline caching, installability |
| **Animations** | Framer Motion | Spring-based, GPU-accelerated |
| **Routing** | React Router v7 | URL-based room sharing |
| **Deploy** | Vercel + Render | Auto-deploy on push, free tier |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org))
- **npm** (comes with Node)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AnkurSingh02/codeshare.git
cd codeshare

# 2. Start the WebSocket server
cd server
npm install
npm start
# Server runs on ws://localhost:1234

# 3. In a NEW terminal, start the frontend
cd client
npm install
npm run dev
# Client runs on http://localhost:5173
Usage
Open http://localhost:5173
Click "Create Room"
Copy the URL and share it with a friend
Both of you can now edit code in real-time!
Click "Export" to download a beautiful image of your code

📁 Project Structure
text

codeshare/
├── client/                          # React Frontend
│   ├── public/
│   │   └── icons/                   # PWA icons (SVG)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/
│   │   │   │   ├── CollabEditor.jsx # CodeMirror + Yjs binding
│   │   │   │   ├── EditorHeader.jsx # Language, theme, font controls
│   │   │   │   └── StatusBar.jsx    # Cursor position, line count
│   │   │   ├── Export/
│   │   │   │   ├── ExportModal.jsx  # Settings + download
│   │   │   │   └── ExportPreview.jsx# Carbon-style preview
│   │   │   └── UI/
│   │   │       ├── Toast.jsx        # Notification system
│   │   │       ├── InstallPrompt.jsx# PWA install banner
│   │   │       └── OfflineBanner.jsx# Online/offline indicator
│   │   ├── hooks/
│   │   │   ├── useYjs.js           # WebSocket + Yjs connection
│   │   │   └── useRoom.js          # Room creation + routing
│   │   ├── lib/
│   │   │   ├── languages.js        # 12+ language configs
│   │   │   ├── themes.js           # 5 editor themes
│   │   │   └── exportConfig.js     # Backgrounds, padding, defaults
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Landing page
│   │   │   └── RoomPage.jsx        # Editor room
│   │   ├── App.jsx                 # Router + PWA + Toast
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Tailwind + custom styles
│   ├── index.html                  # PWA meta tags
│   ├── vite.config.js              # Vite + Tailwind + PWA plugins
│   └── package.json
│
├── server/                          # WebSocket Backend
│   ├── index.js                    # Express + WS + Yjs sync
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
🌐 Deployment
Service	What	URL
Vercel	Frontend (React)	https://codeshare-henna.vercel.app
Render	Backend (WebSocket)	wss://codeshare-server-9bck.onrender.com
Both deploy automatically on every git push to main.

Environment Variables (Vercel)
Key	Value
VITE_WS_URL	wss://codeshare-server.onrender.com

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

🙏 Acknowledgments
Yjs — CRDT framework for real-time collaboration
CodeMirror 6 — Extensible code editor
Carbon — Inspiration for code image exports
<p align="center"> <strong>Built with ❤️ by <a href="https://github.com/AnkurSingh02">AnkurSingh02</a></strong> </p> ```