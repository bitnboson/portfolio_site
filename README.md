# Lokesh — Personal Portfolio & Blog

> A dark, monochrome personal website built with **React, Vite, Tailwind CSS & Framer Motion**.
> Live at: `https://portfolio-site-lokesh.vercel.app/`

![theme](https://img.shields.io/badge/theme-dark-0a0a0a?style=flat-square)
![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Tailwind-60a5fa?style=flat-square)

---

## Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Editing Your Content](#-editing-your-content)
  - [Personal details](#personal-details)
  - [Projects](#projects)
  - [Experience](#experience)
  - [Skills & About](#skills--about)
- [Writing Blog Posts](#-writing-blog-posts)
- [Contact Form (EmailJS)](#-contact-form-emailjs)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [Dependencies](#-dependencies)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

```bash
npm install        # install dependencies
cp .env.example .env   # add EmailJS keys (optional, for the contact form)
npm run dev        # start dev server → http://localhost:5173
```

| Command          | What it does                    |
| ---------------- | ------------------------------- |
| `npm run dev`    | Local dev server with hot reload |
| `npm run build`  | Production build to `dist/`     |
| `npm run preview`| Preview the production build    |
| `npm run lint`   | Run oxlint checks               |

> **Note:** This project uses **Vite 8 / rolldown**. Markdown blog files are imported
> at build time via `import.meta.glob`, so every content change requires a rebuild
> (`npm run build` or a fresh `vercel` deploy).

---

## 📁 Project Structure

```
website/
├── blog/                     ← 📝 Drop markdown posts here
│   ├── getting-started-with-esp32.md
│   └── building-scalable-apis.md
├── public/favicon.svg        ← Site icon
├── index.html                ← Title, meta tags, fonts
├── tailwind.config.js        ← Design tokens (colors, fonts)
├── vite.config.js
└── src/
    ├── main.jsx              ← React entry + router
    ├── App.jsx               ← Route definitions (add pages here)
    ├── index.css             ← Tailwind layers + blog prose styles
    ├── data/                 ← ✏️ All site content lives here
    │   ├── projects.js       ← Project list & metadata
    │   ├── skills.js         ← Expertise, tech groups, education
    │   ├── experience.js     ← Journey timeline
    │   └── posts.js          ← Reads blog/*.md → posts (built at compile time)
    ├── components/           ← Navbar, Footer, cards, timeline, form, etc.
    └── pages/                ← One file per route
```

---

## ✏️ Editing Your Content

Most content lives in **`src/data/`** — edit these files (no code changes needed).

### Personal details

Contact info & social links are referenced in several files:

| What        | Where                                             |
| ----------- | ------------------------------------------------- |
| Name/brand  | `Navbar.jsx`, `Footer.jsx`, `Home.jsx`            |
| Email       | `Contact.jsx`, `Footer.jsx`                       |
| GitHub handle | `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `Contact.jsx` |
| LinkedIn    | `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `Contact.jsx` |
| SEO tags    | `index.html` (`<title>`, meta description)        |

> Search for your GitHub/LinkedIn handles with `rg "github|linkedin" src/` to
> find every spot that needs updating.

### Projects

Each entry in `src/data/projects.js`:

```js
{
  title: 'quickDisplay',
  description: 'One or two sentences about the project.',
  tags: ['ESP32', 'FreeRTOS', 'MQTT'],
  category: 'embedded',           // web | embedded | desktop | utility
  github: 'https://github.com/bitnboson/quickDisplay',
  demo: null,                       // optional live URL
  image: null,                      // optional thumbnail URL
}
```

Filter categories are defined at the top of `src/pages/Projects.jsx`
(`const categories = [...]`). Add a category there if you add a new one.

### Experience

`src/data/experience.js` — ordered newest → oldest. Each entry:
`role`, `company`, `period`, `description`, `tags`. To mark the newest role as
*current* again, add `featured: true` (the timeline already supports it).

### Skills & About

`src/data/skills.js` exports:
`expertise` (3 cards), `skillGroups` / `coreTechnologies`, `currentlyExploring`,
and `education`. About-page prose (bio paragraphs) is hard-coded in
`src/pages/About.jsx`.

---

## ✍️ Writing Blog Posts

1. Create a `.md` file in **`/blog`** — the filename **becomes the URL slug**
   (`blog/hello-world.md` → `/blog/hello-world`).
2. Add **YAML frontmatter** at the top:

```markdown
---
title: "My Awesome Post"
date: "2025-12-01"
excerpt: "A short teaser shown on the /blog listing page."
tags: ["React", "Tips"]
cover: "https://images.unsplash.com/photo-...?w=1200&auto=format&fit=crop"
---

# Your content starts here...
```

### Supported markdown

- **GFM** (via `remark-gfm`): tables, task lists, strikethrough
- **Syntax highlighting** (via `rehype-highlight`): fenced code blocks
- **Images**: rendered rounded with a subtle border; `![alt](url)`
- **Links & blockquotes**: styled to match the theme

Removing a file removes the post. No other steps are needed — posts are picked
up automatically at build time.

---

## 📬 Contact Form (EmailJS)

The form on `/contact` is wired to [EmailJS](https://www.emailjs.com/). It falls
back to a "Failed" state until keys are provided:

```bash
cp .env.example .env
```

Then fill in `.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> `.env` is gitignored — never commit real keys. Create this once and forget it;
> the form will working again on every future `npm run dev`.

---

## 🎨 Design System

Tokens are defined in `tailwind.config.js`.

| Token        | Value      | Used for                     |
| ------------ | ---------- | ---------------------------- |
| `ink-950`    | `#0a0a0a`  | Page background              |
| `ink-900`    | `#111111`  | Cards / surfaces             |
| `ink-800`    | `#1a1a1a`  | Chips, hover states          |
| `accent`     | `#3b82f6`  | Blue accent (buttons, links) |
| `accent-soft`| `#60a5fa`  | Accent text                  |
| `muted`      | `#a0a0a0`  | Secondary text               |

**Fonts** (loaded in `index.html`): `Space Grotesk` (display/headings),
`Inter` (body), `JetBrains Mono` (code/labels).

Reusable classes live in `src/index.css`: `.container-site`, `.card-surface`,
`.btn-primary`, `.btn-ghost`, `.btn-icon`, `.section-label`, `.input-field`.

---

## ☁️ Deployment

Deploys as a **static site** (no backend) — works great on **Vercel**:

1. Push the repo to GitHub and import it in Vercel.
2. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. Set the three `VITE_EMAILJS_*` env vars in Vercel's dashboard (if not using a local `.env`).
4. Confirm the blog folder `blog/` is committed — posts are statically bundled.

Every push runs a fresh build so new markdown posts go live automatically.

---

## 📦 Dependencies

**Runtime:** `react`, `react-router-dom` (routing), `framer-motion` (animations),
`react-icons` (icons), `react-markdown` + `remark-gfm` + `rehype-highlight`
(blog rendering), `@emailjs/browser` (contact form).

**Dev:** `vite`, `@vitejs/plugin-react`, `tailwindcss` + `@tailwindcss/typography`,
`postcss`, `autoprefixer`, `oxlint`.

> The blog-post page is **lazy-loaded** — `react-markdown` etc. are split into a
> separate chunk so the main bundle stays small.

---

## 🛟 Troubleshooting

| Problem | Solution |
| ------- | -------- |
| New blog post doesn't appear | Commit the file (or rebuild). Blog files are bundled at build time. |
| Build error parsing `blog/*.md` | Make sure the file has valid YAML frontmatter (title/date required). |
| Contact form shows "Failed" | `.env` missing or keys wrong → see [Contact Form](#-contact-form-emailjs). |
| Project has no GitHub icon | `github` is `null` in `src/data/projects.js`. |
| Want the newest role "Current" | Add `featured: true` to that entry in `src/data/experience.js`. |