import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import AnimatedBackground from './components/AnimatedBackground'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

const BlogPost = lazy(() => import('./pages/BlogPost'))

function PageLoader() {
  return (
    <div className="container-site py-24 flex justify-center">
      <span className="animate-pulse text-neutral-500 font-mono text-sm">Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <BlogPost />
              </Suspense>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}