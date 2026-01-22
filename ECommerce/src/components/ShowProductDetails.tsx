import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { fetchProductDetails } from "../ApiCalls/apiCalls";
import type { Product } from "./ProductCard";

export default function ShowProductDetails() {
  const { productId } = useParams();

  const [item, setItem] = useState<Product>();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["fetchSingleProduct"],
    queryFn: () => fetchProductDetails(Number(productId)),
  });

  useEffect(() => {
    setItem(data);
  }, [data]);

  const [count, setCount] = useState(0);
  //   const [item, setItem] = useMemo(() => data?.produ)

  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    // setCart((prev) =>
    //   prev.some((c) => c.item.id === item.id)
    //     ? prev
    //     : [...prev, { item, count: 1 }],
    // );
    // if (count == 0) setCount((prev) => prev + 1);
    setAdded(true);
  };

  const handleIncrement = () => {
    // setCart((prev) =>
    //   prev
    //     .map((c) => (c.item.id === item.id ? { ...c, count: c.count + 1 } : c))
    //     .filter((c) => c.count > 0),
    // );
    // if (count < item.stock) setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    // setCart((prev) =>
    //   prev
    //     .map((c) => (c.item.id === item.id ? { ...c, count: c.count - 1 } : c))
    //     .filter((c) => c.count > 0),
    // );
    // if (count > 0) setCount((prev) => prev - 1);
    // if (count === 1) setAdded(false);
  };

  if (isError)
    return <div className="flex justify-center">Error: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center">Loading...</div>;

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
            <h2 className={`font-semibold`}>{item.title}</h2>
            <br />
            <hr />
            <p>Description: {item?.description}</p>
            <hr />
            <br />
            <div className="grid grid-cols-2">
              <p>&#8377;{item.price * 84}</p>
              {item.price * 84 > 500 && (
                <p className="bg-yellow-300 text-black border rounded-full text-center">
                  Expencive
                </p>
              )}
            </div>
            <p>Catagory: {item.category}</p>
            <div className="grid grid-cols-2">
              <p>Quentity: {item.stock}</p>
              {item.stock <= 5 && (
                <p className="bg-yellow-300 text-black border rounded-full text-center">
                  Limited
                </p>
              )}
            </div>
            {!added ? (
              <div className="flex justify-between">
                <button
                  className="flex flex-row justify-center items-center border border-blue-500 bg-blue-500 p-3 rounded-2xl mt-3"
                  onClick={handleAdd}
                >
                  <MdOutlineShoppingCart /> Add To Cart
                </button>
                <div className="flex flex-row justify-center items-center border border-yellow-800 bg-yellow-600 p-3 rounded-2xl mt-3">
                  <NavLink to={"customize"}>Customize</NavLink>
                </div>
              </div>
            ) : (
              <div className="">
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
                <div className="text-white">
                  <NavLink to={"customize"}>Customize</NavLink>
                </div>
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
