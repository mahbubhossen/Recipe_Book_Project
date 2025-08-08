import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";  
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import router from "./routes/routes.jsx";
import AuthProvider from "./providers/AuthProvider"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <>
        <RouterProvider router={router} />
        <Toaster position="top-center" />  
        <ToastContainer />
      </>
    </AuthProvider>
  </StrictMode>
);
