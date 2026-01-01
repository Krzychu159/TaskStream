import { NavLink } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className="text-xl m-auto w-max mt-16 font-bold">
      Page not Found - check if your link is correct or{" "}
      <NavLink to="/">
        <span className="text-blue-500">go back to dashboard</span>
      </NavLink>
    </div>
  );
}
