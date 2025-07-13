import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { AppProvider } from "./context/AppContext.jsx";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Auth0Provider  domain="dev-3aplxrn0ub1t5tt4.us.auth0.com"
    clientId="IW9Th8HcVe2H4wIdjrq4S1mYOLyKxX1w"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
      <App />
      </Auth0Provider>
    </AppProvider>
  </React.StrictMode>
);