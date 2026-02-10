# Java Interview Prep — Implementation Plan

## 1. Project Vision

Build a **clean, minimalist, bold** single-page study application that presents the full content of the Java Interview Prep research articles. The target audience is candidates preparing for **intern / junior Java developer** technical interviews. The app will be deployed on **GitHub Pages** for zero-cost, zero-config hosting.

---

## 2. Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Vite + React 18 | Fastest DX, tree-shaking, ESM-native. |
| **UI Library** | shadcn/ui (Radix + Tailwind) | User requirement. Accessible, composable, copy-paste components — no heavy dependency. |
| **Styling** | Tailwind CSS v3 | Required by shadcn/ui. |
| **Syntax Highlighting** | `react-syntax-highlighter` (Prism) | Render all Java code blocks with proper highlighting. |
| **Icons** | Lucide React | Default icon set for shadcn. |
| **Deployment** | GitHub Pages via `gh-pages` npm package | One-command deploy; compatible with Vite `base` configuration. |

---

## 3. Site Architecture

```
┌──────────────────────────────────────────────────┐
│  Fixed Navbar  (logo + dark/light toggle)        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Hero Section                                    │
│   "Java Interview Prep 2026"                │
│   Subtitle + CTA scroll button                   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: Overview / Syllabus Cards              │
│   4 cards (Core Language, Collections,           │
│            Concurrency, Functional Java)          │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: Collections Comparison Table           │
│   shadcn Table component                          │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: Core Problems ("The Big 5")            │
│   Accordion / Collapsible per problem:           │
│     - Train Composition                          │
│     - Sorted Search                              │
│     - Song (Cycle Detection)                     │
│     - User Input (OOP)                           │
│     - Game Platform                              │
│   Each expands: concept, code, pitfalls          │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: Advanced Problems                      │
│   Same accordion pattern:                        │
│     - Boat Movements                             │
│     - Folders (XML)                              │
│     - Alert Service                              │
│     - Mega Store                                 │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: Other Frequent Archetypes              │
│     - Two Sum                                    │
│     - Merge Names                                │
│     - Stream API Aggregations                    │
│     - Thread-Safe Counter                        │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: Modern Java & Theory           │
│   Cards: Virtual Threads, Records,               │
│          Pattern Matching, Stream API,            │
│          Concurrency Pitfalls                     │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Section: References / Citations                 │
│   Numbered list with clickable links              │
│                                                  │
├──────────────────────────────────────────────────┤
│  Footer                                          │
└──────────────────────────────────────────────────┘
```

### Navigation
- **Sticky sidebar (desktop)** or **bottom sheet / hamburger (mobile)** — mini table-of-contents that tracks scroll position.
- Smooth-scroll to each section via anchor links.

---

## 4. Design System

### Typography
- **Display / Headings:** `JetBrains Mono` — monospaced, bold, technical feel.
- **Body:** `Plus Jakarta Sans` — clean geometric sans-serif with excellent readability.
- Both from Google Fonts.

### Color Palette (Dark Mode Default)
| Token | Value | Usage |
|---|---|---|
| `--background` | `hsl(222, 47%, 6%)` | Page background — deep navy-black |
| `--foreground` | `hsl(210, 40%, 96%)` | Primary text |
| `--card` | `hsl(222, 47%, 9%)` | Card surfaces |
| `--primary` | `hsl(142, 76%, 50%)` | Accents — vibrant green (Java-inspired) |
| `--primary-foreground` | `hsl(222, 47%, 6%)` | Text on primary |
| `--muted` | `hsl(217, 33%, 17%)` | Muted backgrounds |
| `--muted-foreground` | `hsl(215, 20%, 55%)` | Secondary text |
| `--border` | `hsl(217, 33%, 17%)` | Borders |
| `--accent` | `hsl(45, 93%, 58%)` | Secondary accent — amber/gold |

### Light Mode
Invert luminosity values while keeping hue relationships. Toggle via shadcn's built-in theme system.

### Micro-Animations
- Fade-in-up on scroll (Intersection Observer).
- Accordion expand/collapse with Radix transitions.
- Code block copy-to-clipboard with toast feedback.
- Hover lift on cards (`translateY(-2px)`).

---

## 5. Component Breakdown

| Component | shadcn Component(s) | Purpose |
|---|---|---|
| `Navbar` | custom | Logo, theme toggle, mobile menu |
| `HeroSection` | `Button` | Title, subtitle, CTA |
| `SyllabusCards` | `Card`, `CardHeader`, `CardContent` | 4 topic overview cards |
| `CollectionsTable` | `Table`, `TableHeader`, `TableRow`, `TableCell` | Collections comparison |
| `ProblemAccordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Each coding problem |
| `CodeBlock` | custom (wraps `react-syntax-highlighter`) | Java code with copy button |
| `PitfallAlert` | `Alert`, `AlertDescription` | Common mistakes callouts |
| `TopicCard` | `Card`, `Badge` | Modern Java topics |
| `TableOfContents` | custom | Sticky sidebar nav |
| `ReferencesSection` | custom | Citation links |
| `Footer` | custom | Credits |
| `ThemeToggle` | `Button` + `DropdownMenu` | Dark/Light switch |
| `ScrollToTop` | `Button` | Floating button |

---

## 6. Content Data Model

All article content will be stored as **structured TypeScript data** (not markdown-at-runtime) in `src/data/` files:

```
src/data/
  syllabus.ts        → Section 2 content (4 topic objects)
  collections.ts     → Collections table data
  coreProblems.ts    → Big 5 problems (title, concept, code, pitfalls)
  advancedProblems.ts → Advanced problems
  archetypes.ts      → Other frequent archetypes
  modernJava.ts      → Modern Java 2025 topics
  references.ts      → 33 citation objects {id, title, url}
```

Each problem object shape:
```ts
interface Problem {
  id: string;
  title: string;
  archetype: string;
  source: string;
  concept: string;         // markdown-safe text
  optimalApproach: string; // explanation
  code: string;            // raw Java code
  pitfalls: Pitfall[];
}

interface Pitfall {
  title: string;
  description: string;
}
```

---

## 7. File Structure

```
pesquisa.javainterview/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── components.json            ← shadcn config
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css              ← Tailwind directives + custom vars
│   ├── lib/
│   │   └── utils.ts           ← shadcn cn() utility
│   ├── components/
│   │   ├── ui/                ← shadcn components (auto-generated)
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SyllabusCards.tsx
│   │   ├── CollectionsTable.tsx
│   │   ├── ProblemAccordion.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── PitfallAlert.tsx
│   │   ├── TopicCard.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ReferencesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ScrollToTop.tsx
│   └── data/
│       ├── syllabus.ts
│       ├── collections.ts
│       ├── coreProblems.ts
│       ├── advancedProblems.ts
│       ├── archetypes.ts
│       ├── modernJava.ts
│       └── references.ts
├── PLAN.md
├── TASKS.md
├── CONTEXT.md
├── Overview.md                ← source article
├── Java Interview Prep_ Common Problems.md  ← source article
└── SKILL.md
```

---

## 8. Deployment Strategy (GitHub Pages)

1. **Vite config:** Set `base: '/pesquisa.javainterview/'` (repo name).
2. **Install:** `npm install --save-dev gh-pages`.
3. **package.json scripts:**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. **GitHub repo settings:** Source = `gh-pages` branch, `/ (root)`.
5. **Deploy command:** `npm run deploy`.

---

## 9. Implementation Phases

| Phase | Description | Estimated Tasks |
|---|---|---|
| **Phase 1** | Project scaffolding (Vite, Tailwind, shadcn init) | ~15 tasks |
| **Phase 2** | Design system (fonts, colors, CSS vars, ThemeProvider) | ~15 tasks |
| **Phase 3** | Data layer (all content → TS data files) | ~25 tasks |
| **Phase 4** | Core components (Navbar, Hero, CodeBlock, Accordion) | ~30 tasks |
| **Phase 5** | Content sections assembly | ~30 tasks |
| **Phase 6** | Table of Contents + scroll tracking | ~10 tasks |
| **Phase 7** | Animations + polish | ~15 tasks |
| **Phase 8** | Responsive design | ~10 tasks |
| **Phase 9** | GitHub Pages deployment config | ~8 tasks |
| **Phase 10** | Testing + verification | ~10 tasks |

---

## 10. Verification Plan

### Automated
- `npm run build` — Must compile with zero errors and zero warnings.
- `npx tsc --noEmit` — TypeScript type-checking passes.

### Visual / Browser
- Open dev server (`npm run dev`) in browser.
- Verify all 7+ sections render with correct content.
- Verify all Java code blocks have syntax highlighting.
- Verify accordion expand/collapse works for every problem.
- Verify dark/light theme toggle works.
- Verify responsive layout at 375px, 768px, 1280px widths.
- Verify smooth-scroll navigation from ToC links.
- Verify copy-to-clipboard on code blocks.

### Deployment
- Run `npm run build` and verify `dist/` output.
- Confirm `base` path is set correctly in `vite.config.ts`.
