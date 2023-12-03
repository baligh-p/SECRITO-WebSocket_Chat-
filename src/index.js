import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import "./index.css"
import { RecoilRoot } from "recoil"
import { CookiesProvider } from 'react-cookie';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>
  // </React.StrictMode >
);
