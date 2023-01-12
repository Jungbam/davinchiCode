import "./App.css";
import Router from "./share/Router";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import store from "./redux/store/store";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}
const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get("token")) dispatch();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <Router />
          <ReactQueryDevtools />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
