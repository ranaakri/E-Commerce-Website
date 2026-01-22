import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-row gap-4 justify-between items-center p-4 bg-blue-300 text-white shadow-md">
        <div className="font-bold text-shadow-2xs text-3xl">E Commerce</div>
        <div className="flex gap-6">
          <NavLink
            to=""
            end
            className={({isActive}) =>
              isActive
                ? "text-yellow-300 hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
                : "hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="about"
            className={({isActive}) =>
              isActive
                ? "text-yellow-300 hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
                : "hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
            }
          >
            About
          </NavLink>
          <NavLink
            to="cart"
            className={({isActive}) =>
              isActive
                ? "text-yellow-300 hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
                : "hover:font-semibold hover:text-shadow-2xs hover:text-xl duration-150"
            }
          >
            Cart
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
