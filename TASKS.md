# Java Interview Prep — Task Breakdown

> **Legend:** `[ ]` = pending · `[/]` = in progress · `[x]` = done

---

## Phase 1 — Project Scaffolding (~15 tasks)

### 1.1 Vite + React Init
- [x] Run `npx -y create-vite@latest ./ --template react-ts` to scaffold project
- [x] Verify `package.json` was created and has correct scripts
- [x] Run `npm install` to install base dependencies
- [x] Verify `npm run dev` starts without errors
- [x] Create `.gitignore` if not present (ensure `node_modules/`, `dist/` excluded)

### 1.2 Tailwind CSS Setup
- [x] Install Tailwind: `npm install -D tailwindcss @tailwindcss/vite`
- [x] Add Tailwind vite plugin to `vite.config.ts`
- [x] Add `@import "tailwindcss"` to `src/index.css`
- [x] Verify Tailwind classes render in browser

### 1.3 shadcn/ui Init
- [x] Run `npx shadcn@latest init` and configure:
  - TypeScript: yes
  - Style: default
  - Base color: slate
  - CSS variables: yes
  - Aliases: `@/components`, `@/lib`
- [x] Verify `components.json` created
- [x] Verify `src/lib/utils.ts` with `cn()` exists
- [x] Verify `tsconfig.json` has path aliases (`@/*`)

---

## Phase 2 — Design System (~15 tasks)

### 2.1 Google Fonts
- [x] Add `<link>` to `index.html` for `JetBrains Mono` (display/headings)
- [x] Add `<link>` to `index.html` for `Plus Jakarta Sans` (body)
- [x] Configure fonts in Tailwind config (`fontFamily` extend)
- [x] Set base `font-family` on `body` in `index.css`

### 2.2 Color Palette + CSS Variables
- [x] Define dark mode HSL tokens in `index.css` (`:root` and `.dark`)
- [x] Configure `--background`, `--foreground`, `--card`, `--primary`, `--accent`, `--muted`, `--border`
- [x] Map tokens in `tailwind.config.ts` under `theme.extend.colors` (Using Tailwind v4 @theme in css)
- [x] Set default mode to dark in `<html class="dark">`

### 2.3 Theme Provider
- [x] Install shadcn `Button` component: `npx shadcn@latest add button`
- [x] Create `src/components/ThemeProvider.tsx` (React context for dark/light)
- [x] Create `src/components/ThemeToggle.tsx` (toggle button with Sun/Moon icons)
- [x] Wrap `App` with `ThemeProvider`
- [x] Test toggling between dark and light mode

---

## Phase 3 — Data Layer (~25 tasks)

### 3.1 Type Definitions
- [x] Create `src/data/types.ts` with `Problem`, `Pitfall`, `SyllabusTopic`, `CollectionRow`, `Reference` interfaces

### 3.2 Syllabus Data
- [x] Create `src/data/syllabus.ts` with 4 topic objects:
  - [x] Core Language Mechanics & Memory Models
  - [x] Collections Framework
  - [x] Concurrency & Multithreading
  - [x] Functional Programming (Java 8+)

### 3.3 Collections Table Data
- [x] Create `src/data/collections.ts` with 5 rows (ArrayList, LinkedList, HashMap, TreeMap, HashSet)
- [x] Include columns: Interface, Implementation, Internal Structure, Time Complexity, Best Use, Pitfall

### 3.4 Core Problems Data (Big 5)
- [x] Create `src/data/coreProblems.ts`
- [x] Add Train Composition problem data (concept, code, pitfalls)
- [x] Add Sorted Search problem data
- [x] Add Song (Cycle Detection) problem data
- [x] Add User Input (OOP Inheritance) problem data
- [x] Add Game Platform problem data
- [x] Verify all Java code strings are properly escaped

### 3.5 Advanced Problems Data
- [x] Create `src/data/advancedProblems.ts`
- [x] Add Boat Movements problem data
- [x] Add Folders (XML/Recursion) problem data
- [x] Add Alert Service (Architecture) problem data
- [x] Add Mega Store (Enums/Strategy) problem data

### 3.6 Other Archetypes Data
- [x] Create `src/data/archetypes.ts`
- [x] Add Two Sum problem data
- [x] Add Merge Names problem data
- [x] Add Stream API Aggregations data
- [x] Add Thread-Safe Counter data

### 3.7 Modern Java Data
- [x] Create `src/data/modernJava.ts`
- [x] Add Virtual Threads topic
- [x] Add Records topic
- [x] Add Pattern Matching topic
- [x] Add Stream API Grouping/Partitioning topic
- [x] Add Concurrency Pitfalls topic (Deadlock, Race Condition)

### 3.8 References Data
- [x] Create `src/data/references.ts`
- [x] Add all 33 citation objects with id, title, and URL

---

## Phase 4 — Core Components (~30 tasks)

### 4.1 Layout Components
- [x] Clean up default Vite boilerplate from `App.tsx`
- [x] Clean up default CSS from `index.css` (keep Tailwind + vars)
- [x] Remove default `App.css` and Vite logo assets
- [x] Create `Navbar.tsx` with logo text and ThemeToggle
- [x] Style Navbar with sticky positioning and backdrop blur
- [x] Create `Footer.tsx` with credits and source links
- [x] Create `ScrollToTop.tsx` floating button

### 4.2 Hero Section
- [x] Create `HeroSection.tsx`
- [x] Add title: "Java Interview Prep 2025/2026"
- [x] Add subtitle describing the content
- [x] Add "Start Studying" CTA button with smooth scroll
- [x] Add decorative code snippet or badge elements
- [x] Style with bold typography and gradient accent

### 4.3 Code Block Component
- [x] Install `react-syntax-highlighter`: `npm install react-syntax-highlighter`
- [x] Install types: `npm install -D @types/react-syntax-highlighter`
- [x] Create `CodeBlock.tsx` wrapping PrismLight
- [x] Import and register Java language for Prism
- [x] Choose dark Prism theme (e.g., `vscDarkPlus` or `oneDark`)
- [x] Add copy-to-clipboard button with icon
- [x] Implement clipboard API logic (`navigator.clipboard.writeText`)
- [x] Add "Copied!" toast/tooltip feedback
- [x] Style code container with rounded corners, border, file-name header

### 4.4 Problem Accordion
- [x] Install shadcn Accordion: `npx shadcn@latest add accordion`
- [x] Create `ProblemAccordion.tsx` component
- [x] Accept `Problem` type as props
- [x] Render archetype badge in trigger
- [x] Render concept description in content
- [x] Render "Optimal Approach" section
- [x] Render `CodeBlock` with the problem's Java code
- [x] Create `PitfallAlert.tsx` component
- [x] Install shadcn Alert: `npx shadcn@latest add alert`
- [x] Render list of pitfalls using `PitfallAlert`
- [x] Style with proper spacing, dividers, typography hierarchy

### 4.5 Additional shadcn Installs
- [x] Install Card component: `npx shadcn@latest add card`
- [x] Install Table component: `npx shadcn@latest add table`
- [x] Install Badge component: `npx shadcn@latest add badge`
- [x] Install Separator component: `npx shadcn@latest add separator`

---

## Phase 5 — Content Sections Assembly (~30 tasks)

### 5.1 Syllabus Section
- [x] Create `SyllabusCards.tsx`
- [x] Import syllabus data
- [x] Render 4 cards in responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- [x] Add icon per card (BookOpen, Database, Cpu, Lambda)
- [x] Add title, key points list per card
- [x] Style cards with hover lift animation

### 5.2 Collections Table Section
- [x] Create `CollectionsTable.tsx`
- [x] Import collections data
- [x] Render shadcn Table with sortable-looking headers
- [x] Highlight complexity values with colored badges (green=O(1), yellow=O(log n), red=O(n))
- [x] Add responsive horizontal scroll wrapper for mobile
- [x] Add section heading + intro paragraph

### 5.3 Core Problems Section
- [x] Create `CoreProblemsSection.tsx`
- [x] Import core problems data array
- [x] Add section heading + overview table (from Overview.md "Big 5" table)
- [x] Render each problem via `ProblemAccordion`
- [x] Add numbered labels / difficulty badge per problem
- [x] Verify all 5 problems render with code + pitfalls

### 5.4 Advanced Problems Section
- [x] Create `AdvancedProblemsSection.tsx`
- [x] Import advanced problems data array
- [x] Add section heading + intro text
- [x] Render each problem via `ProblemAccordion`
- [x] Verify all 4 problems render correctly

### 5.5 Other Archetypes Section
- [x] Create `ArchetypesSection.tsx`
- [x] Import archetypes data
- [x] Render each archetype with concept, approach, code, pitfalls
- [x] Use condensed card layout (not full accordion if content is shorter)
- [x] Verify all 4 archetypes render

### 5.6 Modern Java Section
- [x] Create `ModernJavaSection.tsx`
- [x] Import modern Java data
- [x] Render topic cards in grid layout
- [x] Add badges for Java version (e.g., "Java 21", "Java 8+")
- [x] Include key points per topic

### 5.7 References Section
- [x] Create `ReferencesSection.tsx`
- [x] Import references data
- [x] Render numbered list with clickable external links
- [x] Style links with muted color and hover underline
- [x] Add `target="_blank" rel="noopener noreferrer"`

### 5.8 App Assembly
- [x] Import all sections into `App.tsx`
- [x] Arrange in correct order with `<section>` wrappers and `id` anchors
- [x] Add consistent section spacing (py-16 / py-24)
- [x] Add subtle section dividers or alternating background tones

---

## Phase 6 — Table of Contents + Scroll Tracking (~10 tasks)

### 6.1 TableOfContents Component
- [x] Create `TableOfContents.tsx`
- [x] Define section list with ids and labels
- [x] Render as a vertical nav list
- [x] Style as sticky sidebar on desktop (left or right)
- [x] Hide on mobile or show as a floating FAB opener
- [x] Hide sidebar on scroll (desktop) for better readability

### 6.2 Scroll Tracking
- [x] Implement Intersection Observer for each section
- [x] Highlight active section in ToC
- [x] Smooth-scroll on ToC link click (`scrollIntoView({ behavior: 'smooth' })`)
- [x] Add/remove `active` class styling for current section
- [x] Handle edge cases (top of page, bottom of page)

---

## Phase 7 — Animations + Polish (~15 tasks)

### 7.1 Scroll Animations
- [x] Create custom hook `useScrollAnimation` with Intersection Observer
- [x] Add fade-in-up animation class to `index.css`
- [x] Apply animation to section headings on scroll enter
- [x] Apply animation to cards on scroll enter
- [x] Apply animation to accordion items on scroll enter
- [x] Stagger animations for grid items (animation-delay)

### 7.2 Interaction Polish
- [x] Add hover scale/lift on cards (`transform: translateY(-2px)`)
- [x] Add transition on accordion expand (height + opacity)
- [x] Add focus-visible styles for keyboard navigation
- [x] Smooth transition on theme toggle (background-color transition)
- [x] Add loading state or skeleton if needed (likely not needed for static data)

### 7.3 Favicon + Meta
- [x] Create or generate a simple favicon (Java coffee cup icon or code bracket)
- [x] Add `<title>` tag: "Java Interview Prep | 2025/2026"
- [x] Add `<meta name="description">` tag
- [x] Add Open Graph meta tags for link previews

---

## Phase 8 — Responsive Design (~10 tasks)

### 8.1 Breakpoint Testing
- [x] Test at 375px width (mobile) — all content readable, no horizontal overflow
- [x] Test at 768px width (tablet) — grid collapses to 2 columns
- [x] Test at 1280px width (desktop) — full layout with sidebar ToC
- [x] Test at 1920px width (large desktop) — max-width container centered

### 8.2 Mobile-Specific Fixes
- [x] Table horizontal scroll works on mobile
- [x] Code blocks have horizontal scroll and don't break layout
- [x] Navbar hamburger or simplified mobile nav
- [x] ToC accessible on mobile (drawer or bottom sheet)
- [x] Font sizes appropriate on small screens
- [x] Touch targets >= 44px for interactive elements

### 8.3 Bug Fix — Fade Animation Flash (FOUC)
- [x] Fix `animation-fill-mode` from `forwards` to `both` in `.animate-fade-in-up`
- [x] Remove premature `opacity-0` class removal from `useScrollAnimation` hook
- [x] Verify staggered delay animations no longer flash visible before animating

---

## Phase 9 — GitHub Pages Deployment (~8 tasks)

### 9.1 Vite Configuration
- [x] Set `base: '/pesquisa.javainterview/'` in `vite.config.ts`
- [x] Verify build output references correct base path

### 9.2 Deploy Setup
- [x] Install `gh-pages`: `npm install -D gh-pages`
- [x] Add `"predeploy": "npm run build"` to package.json scripts
- [x] Add `"deploy": "gh-pages -d dist"` to package.json scripts
- [x] Run `npm run build` — verify zero errors
- [x] Create `.github/workflows/deploy.yml` GitHub Actions workflow (replaces `gh-pages` npm)
- [ ] Configure GitHub repo: Settings → Pages → Source: **GitHub Actions** *(manual)*
- [ ] Push to `main` and verify deployment succeeds *(manual)*

---

## Phase 10 — Testing + Final Verification (~10 tasks)

### 10.1 Build Verification
- [X] `npm run build` completes with zero errors
- [X] `npx tsc --noEmit` passes type checking
- [X] `dist/` output contains `index.html` and hashed JS/CSS assets

### 10.2 Content Verification
- [X] All 7 major sections render in browser
- [X] All Java code blocks have syntax highlighting
- [X] All 5 core problems have concept, code, and pitfalls
- [X] All 4 advanced problems have concept, code, and pitfalls
- [X] All 4 archetypes render correctly
- [X] Modern Java section renders all 5 topics
- [X] References section renders all 33 citations with working links
- [X] Collections table renders all 5 rows with correct data

### 10.3 Interaction Verification
- [X] Dark/Light theme toggle works correctly
- [X] All accordions expand and collapse
- [X] Copy-to-clipboard works on code blocks
- [X] ToC scroll tracking highlights correct section
- [X] Smooth scroll works for all navigation links
- [X] Scroll-to-top button appears and works

---


---

## Phase 11 — Advanced Mobile Experience (Requested)

### 11.1 Global Touch Feedback
- [x] Add `active:scale-95` or `active:bg-accent/10` to interactive elements for tactile feel
- [x] Ensure `cursor-pointer` is distinct on non-touch devices and touch targets are large on touch inputs

### 11.2 Component Mobile Optimization
- [x] **Navbar**: Refine mobile menu animation and glassmorphism (ensure high contrast)
- [x] **HeroSection**: Adjust typography scaling for smaller devices (prevent word breaks in awkward places)
- [x] **CollectionsTable**: Add visual scroll hints (sticky col) for horizontal scrolling on mobile
- [x] **SyllabusCards**: Optimize padding and margins for single-column mobile view
- [x] **CodeBlock**: Ensure font size scales down slightly on mobile for better visibility
- [x] **ProblemAccordion**: Maximize screen usage when expanded on mobile

### 11.3 App-Shell Polish
- [x] Verify `meta theme-color` matches dark mode background for integrated status bar feel
- [x] Disable text selection on UI elements (buttons, nav) for "app-like" feel
- [x] Ensure `100dvh` (dynamic viewport height) is used where applicable to avoid URL bar layout shifts

---

**Total estimated tasks: ~175 atomic tasks**
