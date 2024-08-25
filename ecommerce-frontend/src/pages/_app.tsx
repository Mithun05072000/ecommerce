import '../styles/globals.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Any global side effects can be handled here
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
