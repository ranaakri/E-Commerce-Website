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
import { Provider } from "react-redux";
import { store } from "./store/CartSlice.ts";
import Cart from "./tabs/Cart.tsx";
import { ProtectedRoute } from "./components/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <ListProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <ProtectedRoute>
            <ShowProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:productId/customize",
        element: (
          <ProtectedRoute>
            <CustomizeProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/auth", element: <LoginFunction /> },
  // {
  //   path: "",
  //   element: <InvalidPath />,
  // },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
