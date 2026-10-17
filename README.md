# mp3tag.js Website

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmp3tag.js.org)][homepage]

Public repository of the library's [homepage]. The website is built with
[React], [Vite], [TypeScript], and [Tailwind CSS], and is deployed to
[GitHub Pages] by the `Deploy website` GitHub Actions workflow on every push to
the `gh-pages` branch.

## Development

Requires [Node.js](https://nodejs.org) 22 or later.

```sh
npm install
npm run dev       # Start the dev server
npm run build     # Type-check and build to dist/
npm run preview   # Serve the production build
```

## Structure

- `src/pages/` - Home, Downloads, Editor, and 404 pages
- `src/pages/docs/` - Documentation pages; `pages.ts` lists them for the sidebar
- `src/components/` - Shared layout and UI components
- `src/index.css` - Tailwind setup and the light/dark color tokens
- `public/` - Static files copied as-is, including `CNAME` and the `404.html`
  fallback that lets GitHub Pages serve client-side routes

If you have any suggestions or questions, feel free to file an issue.

[homepage]: https://mp3tag.js.org
[React]: https://react.dev
[Vite]: https://vite.dev
[TypeScript]: https://www.typescriptlang.org
[Tailwind CSS]: https://tailwindcss.com
[GitHub Pages]: https://pages.github.com
