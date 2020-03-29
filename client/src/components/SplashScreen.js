import React from 'react';
import '../styles/withSplashScreen.css';

export default function LoadingMessage() {
  return (
    <div className="splash-screen" style={{ height: "100vh"}}>
      Wait a moment while we load your app.
      <div className="loading-dot">.</div>
    </div>
  );
}