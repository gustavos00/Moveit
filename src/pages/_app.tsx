import '../styles/global.css';
import { useState } from 'react';

import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
