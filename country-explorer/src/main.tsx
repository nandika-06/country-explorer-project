import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App.tsx";
import "./index.css";
import { apolloClient } from "./apollo/client";
// import { ThemeProvider } from "./features/theme/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      {/* <ThemeProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </ApolloProvider>
  </React.StrictMode>,
);
