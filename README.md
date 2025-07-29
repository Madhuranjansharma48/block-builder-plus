# Welcome to project

# Contentful Landing Page Builder

This repository contains a **custom Contentful App** (fullscreen) and a **Next.js frontend** that enables editors to visually arrange and save landing page layouts using drag-and-drop. The layout is stored in Contentful and rendered statically via Next.js.

---

---

## ✨ Features

- 🔲 Drag-and-drop interface to arrange:
  - Hero Block (heading, subtitle, CTA, background)
  - Two Column Row (text + image)
  - 2x2 Image Grid (Contentful assets)
- 🧠 Powered by Redux (with undo/redo, auto-save via middleware)
- 💾 Layout saved as JSON to Contentful entry field (`layoutConfig`)
- 🌐 Frontend with two SSG pages: `/landing/page-1` and `/landing/page-2`
- 🔍 Dynamic metadata + JSON-LD for SEO
- ⚡ Optimized images via `next/image`

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Yarn or npm
- Contentful space with:
  - Content model including:
    - `layoutConfig` (JSON field)
    - `heroBlock`, `twoColumnBlock`, `imageBlock` (linked or embedded)
- Contentful Management Token & Space ID
- Next.js 15.3+ with App Router enabled

---

## 🔧 Environment Variables

See [.env.example](./.env.example)




Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.




