import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/context";
import { ErrorBoundary } from "../src/components/common";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
