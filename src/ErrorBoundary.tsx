import React from "react";
import ErrorFallback from "./fallback/ErrorFallback";

// ErrorBoundary의 상태 타입
interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

// ErrorBoundary의 props 타입 (기본적으로 children을 받는다고 가정)
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  // 에러가 발생한 경우 상태를 업데이트하여 폴백 UI를 렌더링할 수 있도록 함
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log("getDerivedStateFromError:", error);
    return { hasError: true, error: error.message };
  }

  // 에러와 에러 정보(errorInfo)를 잡아서 처리
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러를 로깅하거나 보고하는 서비스에 전달
    console.error("Caught an error:", error, errorInfo);
  }

  // 렌더링 함수
  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
