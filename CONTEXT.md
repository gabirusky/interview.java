# Java Interview Prep — Agent Context

> This file provides domain knowledge, conventions, common errors, and edge cases
> for the coding agent implementing this project.

---

## 1. Project-Specific Conventions

### Repository Name
- The GitHub repo is `pesquisa.javainterview`.  
- GitHub Pages base path **must** be `/pesquisa.javainterview/` (with trailing slash).
- All asset paths in production must be relative or use the Vite `base` config.

### Language
- The **UI chrome** (buttons, labels, section headings) should be in **English**.
- The **article content** is in English (the source articles are in English).
- Reference titles may include Portuguese text — preserve them as-is.

### Files to Preserve
- `Overview.md`, `Java Interview Prep_ Common Problems.md`, and `SKILL.md` are source reference files. **Do not modify or delete them.**

### Code Style
- Use **TypeScript** everywhere (`.tsx` / `.ts`), never `.jsx` / `.js`.
- Use **named exports** for components, not default exports.
- Component files: PascalCase filename matching component name (e.g., `HeroSection.tsx` → `export function HeroSection()`).
- Data files: camelCase (e.g., `coreProblems.ts`).
- Use `cn()` from `@/lib/utils` for conditional class merging.

---

## 2. Common Agent Errors to Avoid

### 2.1 Vite + GitHub Pages
- **CRITICAL:** Always set `base: '/pesquisa.javainterview/'` in `vite.config.ts`. Without this, all assets will 404 on GitHub Pages.
- When using `gh-pages` npm package, the deploy command pushes the `dist/` directory to a `gh-pages` branch. Do **not** manually create this branch.
- The `index.html` in the project root is Vite's entry point, NOT the built output. The built output goes to `dist/`.

### 2.2 shadcn/ui Setup
- shadcn/ui is NOT an npm package you install. You use the CLI to copy component source files into your project.
- Run `npx shadcn@latest init` first, then `npx shadcn@latest add <component>` for each component.
- The CLI may prompt for config. Use these answers:
  - TypeScript: Yes
  - Style: Default
  - Base color: Slate
  - CSS variables: Yes
  - `tailwind.config` path: `tailwind.config.ts`
  - Components alias: `@/components`
  - Utils alias: `@/lib/utils`
- **Path aliases**: shadcn requires `@/*` path aliases. Ensure both `tsconfig.json` AND `vite.config.ts` resolve `@` to `./src`.
  - In `vite.config.ts`, install `@types/node` and add:
    ```ts
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ```
  - In `tsconfig.json`:
    ```json
    "paths": { "@/*": ["./src/*"] }
    ```

### 2.3 Tailwind CSS v4 (latest) vs v3
- As of 2026, `npm install tailwindcss` installs **v4** by default.
- Tailwind v4 uses `@import "tailwindcss"` instead of `@tailwind base; @tailwind components; @tailwind utilities;`.
- Tailwind v4 DOES NOT use `tailwind.config.ts` — configuration is done directly in CSS with `@theme { }` blocks.
- shadcn/ui has been updated to support Tailwind v4. When running `npx shadcn@latest init`, it will detect the Tailwind version.
- **If using Tailwind v4:** 
  - No `tailwind.config.ts` or `postcss.config.js` needed.
  - Use the `@tailwindcss/vite` plugin instead of PostCSS.
  - The `@theme` block in CSS replaces the old config file.

### 2.4 React Syntax Highlighter
- Import from `react-syntax-highlighter/dist/esm/styles/prism/` for tree-shaking (ESM).
- Register only the Java language to keep bundle small:
  ```ts
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
  import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
  ```
- The `children` prop must be a **string**, not JSX.
- Always pass `language="java"` explicitly.

### 2.5 Java Code in TypeScript Strings
- Java code stored as TS string literals WILL contain backticks, angle brackets, and special characters.
- Use **template literals** (backticks) for multi-line code.
- **Escape internal backticks** with `\`` if the Java code uses template strings or generics with backtick contexts.
- For generics like `List<String>`, these are safe in regular strings but watch out in JSX where `<` might be interpreted. Always pass code as a prop string, not inline JSX.
- Watch for `${}` in template literals — if Java code uses `$`, it will be interpreted as string interpolation. Escape as `\${}`.

### 2.6 Content Accuracy
- **Do NOT shorten, summarize, or skip any article content.** The user explicitly wants the "full content" of the articles rendered.
- Code examples must be **exactly** as they appear in the source markdown files.
- Preserve all 33 references with their original URLs and titles.
- The escaped characters in the source (like `\<`, `\>`, `\\`) are markdown escapes — render the actual characters in the UI.

---

## 3. Domain Knowledge

### Article Content Structure
The main article (`Java Interview Prep_ Common Problems.md`) has these sections:
1. **Executive Summary** — overview of 2025/2026 hiring landscape
2. **Java Technical Syllabus** — 4 subsections:
   - 2.1 Core Language Mechanics (primitives, strings, memory)
   - 2.2 Collections Framework (ArrayList vs LinkedList, HashMap internals)
   - 2.3 Concurrency (threads, synchronization, volatile)
   - 2.4 Functional Programming (Streams, lambdas, collectors)
3. **TestDome Core Archetypes ("Big 5")** — 5 detailed problems with code
4. **Advanced Challenges** — 4 more problems
5. **Other Frequent Archetypes** — 4 more patterns
6. **Conclusion**
7. **Citation Index + References** — 33 numbered citations

The overview article (`Overview.md`) is a condensed table/list format of the same content, organized as:
1. Core TestDome Archetypes (Big 5 table)
2. Advanced Algorithmic Challenges
3. Codility & Mathematical Optimization
4. Modern Java & Theory (2025 Syllabus)

### Problems with Java Code Blocks
These problems have actual Java code in the article:
- Train Composition (Deque usage)
- Sorted Search (Binary Search)
- Song (Floyd's Cycle Detection)
- User Input (Inheritance/Polymorphism)
- Game Platform (Array simulation)
- Folders (XML DOM parsing)
- Stream API Aggregation (one-liner)
- AtomicInteger (one-liner)

Other problems (Boat Movements, Alert Service, Mega Store, Two Sum, Merge Names) have conceptual descriptions but no full code blocks in the source — the agent may need to keep these as concept + approach descriptions without code blocks, or note that code is not provided.

---

## 4. Edge Cases and Gotchas

### Content Rendering
- The source markdown uses `\\` escape sequences extensively (e.g., `\<Integer\>`, `\>=`, etc.). These need to be cleaned up when extracting content to TypeScript data files. Remove the backslash escapes and use the actual characters.
- Some code blocks in the source are preceded by a bare language word (e.g., just "Java" on its own line) instead of proper fenced code blocks. The agent must recognize these as code block indicators.
- The Collections comparison table has 6 columns — ensure the Table component handles all columns without overflow on desktop, and scrolls horizontally on mobile.

### Deployment
- The GitHub repo name contains a period: `pesquisa.javainterview`. This is valid for GitHub Pages but test the base path with the actual deployed URL.
- Ensure the `404.html` redirect trick is implemented if using client-side routing (although this project doesn't use routing, so likely not needed — but worth noting).
- GitHub Pages serves from the root of the `gh-pages` branch. Verify that `dist/index.html` ends up at the root of that branch, not nested.

### Performance
- The page is content-heavy (~500 lines of article). Use a single-page layout (no routing) to keep things simple.
- Lazy-load code syntax highlighting if the bundle becomes too large.
- All content is static — no API calls, no external data fetching at runtime.

### Accessibility
- All accordion triggers must be keyboard-accessible (shadcn handles this via Radix).
- Code blocks should have `aria-label` describing the code purpose.
- Color contrast must meet WCAG AA in both dark and light modes.
- The ToC should use `<nav>` with `aria-label="Table of Contents"`.

### Browser Compatibility
- Target modern evergreen browsers (Chrome, Firefox, Safari, Edge latest 2 versions).
- `navigator.clipboard.writeText()` requires HTTPS or localhost — works on GitHub Pages but NOT on `http://` local server. Vite's dev server serves on `http://localhost` which is treated as secure context.
- Intersection Observer is supported in all modern browsers.

### Windows Terminal / npx Issues
- **Use Git Bash** for commands like `npx -y shadcn@latest init --defaults --yes`. PowerShell's execution policy often blocks npx scripts from running.
- If PowerShell is required, use `cmd.exe` as a fallback instead: `cmd /c "npx -y shadcn@latest init --defaults --yes"`.
- **npm lock file conflicts:** If an `npm install` or `npx` command hangs or fails due to a stale lock file, delete `package-lock.json` and the `node_modules` folder, then retry (`Remove-Item -Recurse node_modules; Remove-Item package-lock.json; npm install`).

---

## 5. Testing Checklist for Agent

After implementation, verify these critical items:

1. `npm run build` → zero errors  
2. `npx tsc --noEmit` → zero type errors  
3. Open `http://localhost:5173` → page loads with dark theme  
4. Theme toggle → switches to light mode cleanly  
5. Scroll through all sections → content matches source articles  
6. Click accordion for each of the 5 core problems → code renders highlighted  
7. Click "copy" on a code block → clipboard contains the Java code  
8. ToC links → smooth scroll to correct section  
9. Resize to 375px width → no horizontal overflow, content readable  
10. Collections table on mobile → horizontal scroll works  
11. All external reference links → open in new tab with `rel="noopener noreferrer"`  
12. `npm run build` → check `dist/index.html` references base path `/pesquisa.javainterview/`
