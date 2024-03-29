import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error === true) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
