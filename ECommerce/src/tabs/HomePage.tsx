import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center justify-cente flex-col">
      <div className="text-4xl text-blue-700 font-semibold p-10">Welcome to website</div>
      <NavLink to="product" className="bg-blue-400 p-2 rounded text-white hover:bg-blue-600 duration-300">
        Products
      </NavLink>
    </div>
  );
}
