import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StGlobalStyle from "./styles/StGlobalStyle";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StGlobalStyle />
        <App />
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  </>
);

reportWebVitals();
