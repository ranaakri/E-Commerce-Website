import { useSelector } from "react-redux";
import type { RootState } from "../store/CartSlice";
import ShowProductDetails from "../components/ShowProductDetails";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {items.length !== 0 ? (
        items.map((item) => (
          <ShowProductDetails id={item.product} key={item.product} />
        ))
      ) : (
        <div className="flex justify-center p-4 font-semibold text-gray-500">
          -- No Items in cart --
        </div>
      )}
    </div>
  );
}
