import { useNavigate } from "react-router-dom";


function isLogged() {
  return document.cookie.includes("token");
}
export function ProtectedRoute({ children }: {children: any}) {
    const nevigate = useNavigate();
  if (!isLogged()) {
    nevigate("/auth", {replace: true})
  }
  return children;
}
