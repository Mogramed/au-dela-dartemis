import { useLocation, useNavigate } from 'react-router-dom'

export const usePresentationMode = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isPresentationMode = location.pathname === '/presentation'

  return {
    isPresentationMode,
    openPresentation: () => navigate('/presentation'),
    openArchive: () => navigate('/'),
    togglePresentationMode: () =>
      navigate(isPresentationMode ? '/' : '/presentation'),
  }
}
