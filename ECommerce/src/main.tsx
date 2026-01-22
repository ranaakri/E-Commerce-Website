import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./tabs/About.tsx";
import HomePage from "./tabs/HomePage.tsx";
import ListProducts from "./tabs/ListProducts.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShowProductDetails from "./components/ShowProductDetails.tsx";
import CustomizeProduct from "./components/CustomizeProduct.tsx";
import LoginFunction from "./components/AuthComponent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/auth", element: <LoginFunction /> },
      { path: "/", element: <HomePage /> },
      { path: "product", element: <ListProducts /> },
      { path: "about", element: <About /> },
      { path: "product/:productId", element: <ShowProductDetails /> },
      { path: "product/:productId/customize", element: <CustomizeProduct /> },
    ],
  },
  // {
  //   path: "",
  //   element: <InvalidPath />,
  // },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
