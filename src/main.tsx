import { mountApp } from './app/main'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

mountApp(rootElement)
