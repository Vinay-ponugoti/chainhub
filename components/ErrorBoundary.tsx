import React from 'react';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Call onError prop if provided
    this.props.onError?.(error, errorInfo);
    
    // Show error toast
    toast({
      title: 'An error occurred',
      description: error.message,
      variant: 'destructive',
    });

    // Update state with error info
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <h2 className="text-red-800 font-semibold text-lg">Something went wrong</h2>
          <div className="mt-2 space-y-2">
            <p className="text-red-600">{this.state.error?.message}</p>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <pre className="mt-2 p-2 bg-red-100 rounded text-sm overflow-auto">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
              onClick={this.handleRetry}
            >
              Try again
            </button>
            <button
              className="px-4 py-2 bg-white text-red-800 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}