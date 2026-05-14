import { Component, type ErrorInfo, type ReactNode } from 'react'

type ViewerErrorBoundaryProps = {
  children: ReactNode
  fallback: ReactNode
  resetKey: string
}

type ViewerErrorBoundaryState = {
  hasError: boolean
}

class ViewerErrorBoundary extends Component<
  ViewerErrorBoundaryProps,
  ViewerErrorBoundaryState
> {
  override state: ViewerErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}

  override componentDidUpdate(prevProps: ViewerErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ViewerErrorBoundary
