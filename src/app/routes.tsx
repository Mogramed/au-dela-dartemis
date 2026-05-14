import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

const PresentationMode = lazy(() => import('@/components/presentation/PresentationMode'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/presentation',
    element: (
      <Suspense fallback={<div className="min-h-screen bg-space" />}>
        <PresentationMode />
      </Suspense>
    ),
  },
])
