# 📘 TaskStream — Trello-Like Project Manager

**Live:** [task-stream.vercel.app](https://task-stream.vercel.app)  
**Repository:** [github.com/Krzychu159/TaskStream](https://github.com/Krzychu159/TaskStream)

## 🚀 Project Overview

**TaskStream** is a modern project management app inspired by **Trello** and **Linear**.  
It lets you create boards, lists, cards, and comments — with full role system, priorities, drag & drop, and real-time synchronization.  
Built as a **complete SaaS-style MVP**, designed for learning and portfolio presentation.

## ✨ Key Features

✅ **Authentication & Profiles**

- Sign up / log in via Supabase Auth
- Full user profile sync (`profiles` table)
- Persistent session after refresh

✅ **Boards**

- Create, edit, and delete boards
- Manage members with roles (admin / member)
- Edit title and description

✅ **Lists & Cards**

- Full CRUD for lists and cards
- Drag & Drop with optimistic UI
- Real-time sync between users
- Inline title editing
- Priority system (Low 🟢 / Medium 🟡 / High 🔴)

✅ **Comments**

- Full CRUD with optimistic updates
- Linked author (via `profiles`)
- Inline editing, validation, toasts

✅ **Roles & Permissions**

- Admin → full access
- Member → manage own data only
- Viewer → read-only

✅ **Realtime**

- Instant updates through Supabase Realtime Channels

✅ **UX / UI**

- TailwindCSS + Framer Motion
- Toasts, loaders, empty states
- Responsive layout with smooth animations

## 🧠 Tech Stack

| Layer              | Technologies                                             |
| ------------------ | -------------------------------------------------------- |
| **Frontend**       | React 18, TypeScript, Zustand, React Query, React Router |
| **Backend (BaaS)** | Supabase (Auth + Database + Realtime)                    |
| **Styling**        | TailwindCSS + Framer Motion + react-hot-toast            |
| **Drag & Drop**    | @hello-pangea/dnd                                        |
| **Hosting**        | Vercel                                                   |
| **Database**       | PostgreSQL (Supabase SQL)                                |

## 🧩 Project Structure

src/
├─ features/
│ ├─ auth/ # login, register, user store
│ ├─ board/ # boards, edit, members
│ ├─ list/ # lists & DnD
│ ├─ card/ # cards, modal, comments
│ ├─ comment/ # comment CRUD
│ └─ members/ # board members
├─ lib/ # supabaseClient, types
└─ ui/ # shared UI components (Loader, styles, etc.)

## 🧪 Demo Account

🔑 **Login:** `gyw69262@laoia.com`  
🔒 **Password:** `test123`

## 💻 How It Works

1️⃣ Log in or register  
2️⃣ Create a board on the dashboard  
3️⃣ Add lists and cards — drag & drop freely  
4️⃣ Open a card to add comments or set a priority  
5️⃣ Watch everything sync in real time 🚀
