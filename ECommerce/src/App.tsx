import { NavLink, Outlet } from "react-router-dom";
import "./App.css";
import { fetchProducts } from "./ApiCalls/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import type { Product } from "./components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addProductList } from "./store/ItemStore";
import { addCartList, type RootState } from "./store/CartSlice";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["fetchingProducts"],
    queryFn: fetchProducts,
  });

  const product = useMemo<Product[]>(
    () => (data?.products ? data.products : []),
    [data],
  );

  useEffect(() => {
    dispatch(addProductList(product));
    const data = localStorage.getItem("data");
    console.log(data)
    if (data) dispatch(addCartList(JSON.parse(data)));
  }, []);

  if (isError)
    return <div className="flex justify-center">Error: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center">Loading...</div>;

  return (
    <>
      <div className="flex flex-row gap-4 justify-between items-center p-4 bg-blue-300 text-white shadow-md">
        <div className="font-bold text-shadow-2xs text-3xl">E Commerce</div>
        <div className="flex gap-6">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
                : "hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
                : "hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
            }
          >
            About
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-300 hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
                  : "hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
              } flex flex-row gap-2`
            }
          >
            Cart{" "}
            <div className="bg-red-500 text-white flex items-center justify-center px-2 rounded-full text-xs">
              {cart.length}
            </div>
          </NavLink>
        </div>
      </div>
      <Outlet context={product} />
    </>
  );
}

export default App;
