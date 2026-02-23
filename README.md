# ☕ Java Interview Prep | 2025/2026

> A comprehensive, single-page study application for Java technical interview preparation — targeting intern and junior developer positions across platforms like **TestDome**, **Codility**, **HackerRank**, and **LeetCode**.

<p align="center">
  <a href="https://gabirusky.github.io/interview.java/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

---

## 📖 About

This project is a **research-driven study guide** that transforms two in-depth articles on Java interview preparation into an interactive, beautifully designed web application. All content is structured as typed TypeScript data and rendered through purpose-built React components.

### What's Inside

| Section | Description |
|---|---|
| **Technical Syllabus** | 4 core competency areas: Language Mechanics, Collections Framework, Concurrency, Functional Programming |
| **The "Big 5" Archetypes** | 5 essential problems every candidate must master: Train Composition, Sorted Search, Song (Cycle Detection), User Input (OOP), Game Platform |
| **Advanced Challenges** | 4 senior-level problems: Boat Movements, Folders (XML), Alert Service (Architecture), Mega Store (Enums/Strategy) |
| **Other Archetypes** | 4 common screening patterns: Two Sum, Merge Names, Stream API Aggregations, Thread-Safe Counter |
| **Modern Java & Theory** | 5 topics for Java 17/21+ roles: Virtual Threads, Records, Pattern Matching, Stream API Grouping, Concurrency Pitfalls |
| **Collections Comparison** | Side-by-side table comparing ArrayList, LinkedList, HashMap, TreeMap, HashSet — with time complexity, internal structure, and common pitfalls |
| **References** | 33 numbered academic and technical citations |

Each problem includes:
- **Concept** explanation
- **Optimal approach** description
- **Full Java code** with syntax highlighting and copy-to-clipboard
- **Common pitfalls** with detailed warnings

---

## ✨ Features

- 🌓 **Dark/Light theme** toggle with smooth transitions
- 📋 **Copy-to-clipboard** on all Java code blocks with toast feedback
- 🎯 **Table of Contents** — sticky sidebar on desktop; mobile FAB (bottom-left) opens a bottom sheet drawer; auto-hides after 2 s of scroll inactivity and reappears on hover
- 📖 **Clickable section cards** — every card, table row, and accordion opens a full-screen modal with a complete in-depth markdown guide (including flowcharts)
- 🎬 **Scroll animations** — fade-in-up with staggered delays
- 📱 **Fully responsive** — tested at 375px, 768px, 1280px, and 1920px; mobile layout keeps the TOC trigger (bottom-left) and scroll-to-top (bottom-right) from overlapping
- 🍔 **Mobile navigation** — hamburger menu with quick section links
- ⬆️ **Scroll-to-top** floating button (bottom-right)
- 🔍 **Syntax highlighting** — PrismJS (One Dark theme) for all Java code
- ♿ **Accessible** — keyboard navigation, ARIA labels, semantic HTML, WCAG AA contrast

---

## 🛠 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript | Fast DX, tree-shaking, ESM-native |
| **UI Library** | [shadcn/ui](https://ui.shadcn.com) (Radix + Tailwind) | Accessible, composable, copy-paste components |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first, configured via `@theme` blocks in CSS |
| **Syntax Highlighting** | [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) (Prism) | Java code blocks with One Dark theme |
| **Icons** | [Lucide React](https://lucide.dev) | Default icon set for shadcn |
| **Fonts** | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (headings) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (body) | Technical monospace + clean geometric sans-serif |
| **Deployment** | [GitHub Pages](https://pages.github.com) via GitHub Actions | Zero-cost, automatic on push to `main` |

---

## 📁 Project Structure

```
pesquisa.javainterview/
├── .github/
│   └── workflows/
│       └── deploy.yml              ← GitHub Actions deploy workflow
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                    ← React entry point
│   ├── App.tsx                     ← Root component (assembles all sections)
│   ├── index.css                   ← Tailwind directives + design tokens + animations
│   ├── lib/
│   │   └── utils.ts                ← shadcn cn() utility
│   ├── hooks/
│   │   └── useScrollAnimation.ts   ← IntersectionObserver-based scroll animation hook
│   ├── components/
│   │   ├── ui/                     ← shadcn primitives (Accordion, Button, Card, Dialog, Table, etc.)
│   │   ├── Navbar.tsx              ← Sticky nav with hamburger menu + desktop links
│   │   ├── HeroSection.tsx         ← Title, subtitle, CTA, animated badges
│   │   ├── SyllabusCards.tsx       ← 4 topic cards (clickable → modal)
│   │   ├── CollectionsTable.tsx    ← Comparison table with complexity badges (rows clickable → modal)
│   │   ├── CoreProblemsSection.tsx ← "Big 5" problems with accordions (clickable → modal)
│   │   ├── AdvancedProblemsSection.tsx
│   │   ├── ArchetypesSection.tsx   ← 2-column card layout (clickable → modal)
│   │   ├── ModernJavaSection.tsx   ← Topic cards with Java version badges (clickable → modal)
│   │   ├── ReferencesSection.tsx   ← Numbered citation links
│   │   ├── ProblemAccordion.tsx    ← Reusable accordion for problems
│   │   ├── CodeBlock.tsx           ← Syntax highlighter + copy button
│   │   ├── PitfallAlert.tsx        ← Warning callout component
│   │   ├── FadeIn.tsx              ← Scroll animation wrapper
│   │   ├── SectionModal.tsx        ← Full-screen dialog rendering markdown guides
│   │   ├── MarkdownRenderer.tsx    ← Custom markdown renderer (headers, code, tables, flowcharts)
│   │   ├── TableOfContents.tsx     ← Desktop sidebar + mobile bottom sheet (auto-hide on scroll)
│   │   ├── ThemeProvider.tsx       ← Dark/Light mode context
│   │   ├── ThemeToggle.tsx         ← Sun/Moon toggle button
│   │   ├── ScrollToTop.tsx         ← Floating scroll button (bottom-right on mobile)
│   │   └── Footer.tsx
│   ├── content/                    ← Markdown guide files (one per section)
│   │   ├── index.ts                ← Barrel export mapping section keys → markdown imports
│   │   ├── core-problems.md
│   │   ├── advanced-problems.md
│   │   ├── archetypes.md
│   │   ├── collections-framework.md
│   │   ├── syllabus-core-language.md
│   │   ├── syllabus-collections.md
│   │   ├── syllabus-concurrency.md
│   │   ├── syllabus-functional.md
│   │   ├── modern-java-virtual-threads.md
│   │   ├── modern-java-records.md
│   │   ├── modern-java-pattern-matching.md
│   │   ├── modern-java-stream-grouping.md
│   │   └── modern-java-concurrency-pitfalls.md
│   └── data/
│       ├── types.ts                ← TypeScript interfaces (Problem, Pitfall, etc.)
│       ├── syllabus.ts             ← 4 syllabus topic objects
│       ├── collections.ts          ← 5 collection comparison rows
│       ├── coreProblems.ts         ← 5 core problems with full Java code
│       ├── advancedProblems.ts     ← 4 advanced problems
│       ├── archetypes.ts           ← 4 common archetype patterns
│       ├── modernJava.ts           ← 5 modern Java topics
│       └── references.ts           ← 33 citation objects
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── components.json                 ← shadcn/ui configuration
├── PLAN.md                         ← Implementation plan
├── TASKS.md                        ← Task breakdown (~168 tasks)
├── CONTEXT.md                      ← Agent context & conventions
└── Overview.md                     ← Source article (structured overview)
```

---

## 🎨 Design System

### Color Palette

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| `--background` | `hsl(222, 47%, 6%)` | `hsl(0, 0%, 98%)` | Page background |
| `--foreground` | `hsl(210, 40%, 96%)` | `hsl(222, 47%, 11%)` | Primary text |
| `--primary` | `hsl(142, 76%, 50%)` | `hsl(142, 76%, 36%)` | Accents — vibrant green |
| `--accent` | `hsl(45, 93%, 58%)` | `hsl(45, 93%, 47%)` | Secondary accent — amber/gold |
| `--card` | `hsl(222, 47%, 9%)` | `hsl(0, 0%, 100%)` | Card surfaces |
| `--muted` | `hsl(217, 33%, 17%)` | `hsl(220, 14%, 96%)` | Muted backgrounds |

### Typography
- **Display / Headings:** `JetBrains Mono` — monospaced, bold, technical feel
- **Body:** `Plus Jakarta Sans` — clean geometric sans-serif with excellent readability

### Animations
- Fade-in-up on scroll via IntersectionObserver (`animation-fill-mode: both` to prevent FOUC)
- Staggered animation delays for grid items
- Hover lift on cards (`translateY(-2px)`)
- Accordion expand/collapse via Radix transitions
- Gradient text animation on hero title

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9+

### Installation

```bash
# Clone the repo
git clone https://github.com/usain/pesquisa.javainterview.git
cd pesquisa.javainterview

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5174/pesquisa.javainterview/`

### Build for Production

```bash
npm run build
```

Output is generated in `dist/` with all assets referencing the `/pesquisa.javainterview/` base path.

### Deploy

Deployment is fully automated via GitHub Actions. Push to `main` and the workflow at `.github/workflows/deploy.yml` handles building and deploying to GitHub Pages.

---

## 📚 Content Sources

This application renders content from two research articles:

1. **Java Interview Prep: Common Problems** — In-depth analysis of technical assessment archetypes across TestDome, Codility, HackerRank, and LeetCode platforms. Covers 13+ problems with Java code solutions, optimal approaches, and common pitfalls.

2. **Overview** — Condensed structured reference table of the same content, organized by archetype category with quick-reference columns.

All content is stored as **structured TypeScript data** in `src/data/` files — not parsed from markdown at runtime. This ensures type safety, fast rendering, and easy maintenance.

---

## 📊 Content Summary

| Category | Count |
|---|---|
| Syllabus Topics | 4 |
| Core Problems ("Big 5") | 5 |
| Advanced Problems | 4 |
| Other Archetypes | 4 |
| Modern Java Topics | 5 |
| Collection Comparisons | 5 |
| References / Citations | 33 |
| **Total Data Points** | **~60** |

---

## 🧩 Key Components

| Component | Description |
|---|---|
| `ProblemAccordion` | Reusable expandable panel displaying concept, approach, Java code, and pitfalls |
| `CodeBlock` | Wraps PrismJS syntax highlighter with copy-to-clipboard, file name header, and macOS-style dots |
| `FadeIn` | Generic scroll-triggered animation wrapper using IntersectionObserver |
| `SectionModal` | Full-screen dialog triggered by clicking any section card/row; loads the matching markdown guide |
| `MarkdownRenderer` | Custom renderer for the in-modal guides — supports headings, code blocks, tables, and Mermaid-style flowcharts |
| `TableOfContents` | Dual-mode: desktop sticky sidebar (auto-hides after 2 s idle) + mobile FAB (bottom-left) with bottom sheet drawer |
| `ScrollToTop` | Floating button fixed to bottom-right on all viewports |
| `ThemeProvider` | React context managing dark/light mode with localStorage persistence |

---

## 📄 License

This project is for educational and personal study purposes.

---

<p align="center">
  Built with ☕ React + shadcn/ui + Tailwind CSS v4
</p>
