import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "./app/api/authApi.js";
import { LoaderCircle } from "lucide-react";


const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  return <>{isLoading ? <LoaderCircle/>: <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Custom>
        <App />
      </Custom>
      <Toaster />
    </Provider>
  </StrictMode>
);
