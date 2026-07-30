
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches JavaScript errors anywhere in the child component tree,
 * preventing the entire app from crashing when a lazy-loaded section fails.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    // TODO: report to an error tracking service (e.g., Sentry) in production.
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto text-center">
            <p className="text-white/50 text-sm font-mono">
              Something went wrong loading this section.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
