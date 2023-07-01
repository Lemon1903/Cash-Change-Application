import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Button from "../components/Button";

export default function MenuPage() {
  return (
    <div className="-mt-10 grid place-items-center content-center gap-8">
      <img className="w-48 sm:w-56 lg:w-auto" src={logo} alt="logo" />
      <div className="flex gap-6 max-lg:flex-col lg:gap-8">
        <Link to="/buyer/input">
          <Button intent="primary" text="Buyer" />
        </Link>
        <Link to="/admin">
          <Button intent="secondary" text="Admin" />
        </Link>
      </div>
    </div>
  );
}
