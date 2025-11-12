📘 TaskStream — Trello-Like Project Manager

Live: task-stream.vercel.app
Repozytorium: github.com/Krzychu159/TaskStream

🚀 Opis projektu

TaskStream to nowoczesna aplikacja do zarządzania projektami inspirowana Trello i Linear.
Pozwala tworzyć tablice, listy, karty i komentarze — z pełnym systemem ról, priorytetami, drag & drop oraz synchronizacją w czasie rzeczywistym.

Projekt został zaprojektowany jako pełnoprawne MVP aplikacji SaaS, z myślą o nauce i portfolio frontend developera.

✨ Kluczowe funkcje

✅ Autoryzacja i profile

Rejestracja i logowanie przez Supabase Auth

Pełna synchronizacja profilu użytkownika (profiles table)

Persistent session po odświeżeniu

✅ Zarządzanie tablicami (Boards)

Tworzenie, edycja i usuwanie tablic

Członkowie tablicy z rolami (admin / member)

Edycja tytułu i opisu

✅ Listy i karty (Lists & Cards)

Tworzenie, edycja, usuwanie

Drag & Drop z optimistic UI

Realtime sync między użytkownikami

Inline edycja tytułów

System priorytetów (Low / Medium / High)

✅ Komentarze

CRUD komentarzy z optimistic updates

Autor komentarza (relacja profiles)

Edycja inline, toasty, walidacje

✅ Uprawnienia i role

Admin może usuwać i edytować wszystko

Member – tylko własne zasoby

Viewer – tylko podgląd

✅ Realtime

Zmiany widoczne natychmiast dzięki Supabase Realtime Channels

✅ UX / UI

Tailwind + Framer Motion

Toasty, loadery, empty states

Responsywny design (mobile / desktop)

Kolorowe oznaczenia priorytetów

🧠 Stack technologiczny
Warstwa	Technologie
Frontend	React 18, TypeScript, React Router, Zustand, React Query
Backend (BaaS)	Supabase (Auth + DB + Realtime)
Stylizacja	TailwindCSS + Framer Motion + react-hot-toast
DnD	@hello-pangea/dnd
Hosting	Vercel
Baza	Postgres (Supabase SQL)
🧩 Struktura projektu
src/
 ├─ features/
 │   ├─ auth/          # logowanie, rejestracja, user store
 │   ├─ board/         # widok tablicy, edycja, członkowie
 │   ├─ list/          # listy i DnD
 │   ├─ card/          # karty, opis, modal, komentarze
 │   ├─ comment/       # CRUD komentarzy
 │   ├─ members/       # członkowie tablicy
 │   └─ priority/      # system priorytetów
 ├─ lib/
 │   ├─ supabaseClient.ts
 │   └─ types.ts
 └─ ui/
     ├─ InlineLoader.tsx
     ├─ Loader.tsx
     ├─ ErrorMessage.tsx
     └─ styles.ts

🧪 Dane testowe (Demo)

🔑 Login: gyw69262@laoia.com

🔒 Hasło: test123

💻 Działanie projektu

1️⃣ Zaloguj się lub utwórz konto.
2️⃣ Dodaj tablicę w dashboardzie.
3️⃣ Twórz listy i karty — możesz je przeciągać.
4️⃣ Otwórz kartę, dodaj komentarz lub ustaw priorytet.
5️⃣ Wszystko synchronizuje się w czasie rzeczywistym 🚀

🧹 Checklista końcowa
Obszar	Status
Supabase Auth & Profiles	✅
Realtime Channels	✅
Rejestracja / Logowanie / Logout	✅
CRUD Boards / Lists / Cards	✅
Comments CRUD	✅
Role & Permissions	✅
DnD Cards & Lists	✅
Priority System	✅
Responsywny UX	✅
Toasts & Loaders	✅
Error states & Empty screens	✅
Favicon & Metadata	⚙️ (do uzupełnienia)
README z opisem	🟢 (masz właśnie gotowy opis)
🏁 Status projektu

✅ Projekt ukończony
📦 Stabilny build na Vercelu
🎯 Gotowy do portfolio i pokazania rekruterom
