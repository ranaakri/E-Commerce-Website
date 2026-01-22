import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useOutletContext, useParams } from "react-router-dom";
import type { Product } from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  setCustomization,
  type RootState,
} from "../store/CartSlice";

export default function CustomizeProduct({ id }: { id?: number }) {
  const { productId } = useParams();

  const product: Product[] = useOutletContext();
  const cart = useSelector((state: RootState) => state.cart);
  const [cust, setCust] = useState<string>();

  const [item, setItem] = useState<Product>();

  const dispatch = useDispatch();

  useEffect(() => {
    setItem(product.find((items) => items.id === (id ?? Number(productId))));
    const cartItem = cart.find(
      (item) => item.product === (id ?? Number(productId)),
    );
    if (cartItem) {
      setAdded(true);
      setCount(cartItem.count);
    }
  }, [productId]);

  const [count, setCount] = useState(1);

  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    if (item) dispatch(addItemToCart(item.id));
    setAdded(true);
    localStorage.setItem("data", JSON.stringify(cart));
  };

  const handleIncrement = () => {
    if (item) {
      dispatch(addItemToCart(item.id));
      if (count < item.stock) setCount((prev) => prev + 1);
      localStorage.setItem("data", JSON.stringify(cart));
    }
  };

  const handleDecrement = () => {
    if (item) {
      dispatch(removeItemFromCart(item.id));
      if (count > 0) setCount((prev) => prev - 1);
      if (count === 1) setAdded(false);
      localStorage.setItem("data", JSON.stringify(cart));
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {item ? (
        <div
          className={`max-w-2xl border rounded-md shadow-md "bg-black text-white bg-black border-black" `}
        >
          <div className="flex items-center justify-center bg-white rounded-md">
            <img src={item.images[0]} className="w-48 h-48 object-cover" />
          </div>
          <div className="p-4 rounded-md h-fit">
            <h2 className={`font-semibold p-2`}>{item.title}</h2>
            <br />
            <hr />
            <p className="p-2">Description: {item?.description}</p>
            <hr />
            <br />
            <div className="grid grid-cols-2">
              <p className="p-2">&#8377;{item.price * 84}</p>
              {item.price * 84 > 500 && (
                <p className="bg-yellow-300 text-black border rounded-full text-center">
                  Expencive
                </p>
              )}
            </div>
            <p className="p-2">Catagory: {item.category}</p>
            <div className="grid grid-cols-2">
              <p className="p-2">Quentity: {item.stock}</p>
              {item.stock <= 5 && (
                <p className="bg-yellow-300 text-black border rounded-full text-center">
                  Limited
                </p>
              )}
            </div>
            <div className="p-2 w-fit">
              <textarea
                name=""
                id=""
                defaultValue={cust ?? cust}
                onChange={(e) => setCust(e.target.value)}
                required
                className="border-2 rounded border-white p-2 px-5"
                placeholder="Enter customizations"
              ></textarea>
            </div>
            {!added ? (
              <div className="flex justify-between">
                <button
                  className="flex flex-row justify-center items-center border border-blue-500 bg-blue-500 p-3 rounded-2xl mt-3"
                  onClick={handleAdd}
                >
                  <MdOutlineShoppingCart /> Add To Cart
                </button>
                <button
                  className="flex flex-row justify-center items-center border border-green-800 bg-green-600 p-3 rounded-2xl mt-3"
                  onClick={() => {
                    if (cust)
                      dispatch(
                        setCustomization({ id: item.id, customization: cust }),
                      );
                      localStorage.setItem("data", JSON.stringify(cart));
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <div className="flex flex-row gap-4">
                  <button
                    className="flex flex-row justify-center items-center border border-gray-500 bg-white p-3 rounded-2xl mt-3 text-black"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                  <div className="flex justify-center items-center">
                    {count}
                  </div>
                  <button
                    className="flex flex-row justify-center items-center border border-gray-500 bg-white p-3 rounded-2xl mt-3 text-black"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                </div>
                <button
                  className="flex flex-row justify-center items-center border border-green-800 bg-green-600 p-3 rounded-2xl mt-3"
                  onClick={() => {
                    if (cust)
                      dispatch(
                        setCustomization({ id: item.id, customization: cust }),
                      );
                      localStorage.setItem("data", JSON.stringify(cart));
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="">Incorrect Item</div>
      )}
    </div>
  );
}
