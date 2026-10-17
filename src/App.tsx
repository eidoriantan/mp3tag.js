import { lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Downloads from './pages/Downloads'
import NotFound from './pages/NotFound'
import { DocsLayout } from './pages/docs/DocsLayout'
import Installation from './pages/docs/Installation'
import Usage from './pages/docs/Usage'
import MP3TagClass from './pages/docs/MP3TagClass'
import Frames from './pages/docs/Frames'

const Editor = lazy(() => import('./pages/Editor'))

/** Old Jekyll URLs mapped to their new paths */
const redirects: Record<string, string> = {
  '/index.html': '/',
  '/docs/index.html': '/docs',
  '/docs/usage.html': '/docs/usage',
  '/docs/mp3tag.html': '/docs/mp3tag',
  '/docs/frames.html': '/docs/frames',
  '/downloads/index.html': '/downloads',
  '/editor/index.html': '/editor'
}

function Redirect ({ to }: { to: string }) {
  const { search, hash } = useLocation()
  return <Navigate to={{ pathname: to, search, hash }} replace />
}

export default function App () {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<Installation />} />
          <Route path="usage" element={<Usage />} />
          <Route path="mp3tag" element={<MP3TagClass />} />
          <Route path="frames" element={<Frames />} />
        </Route>
        <Route path="downloads" element={<Downloads />} />
        {Object.entries(redirects).map(([from, to]) => (
          <Route key={from} path={from} element={<Redirect to={to} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<Layout footer={false} />}>
        <Route path="editor" element={<Editor />} />
      </Route>
    </Routes>
  )
}
