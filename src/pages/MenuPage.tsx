import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Button from "../components/Button";

export default function MenuPage() {
  return (
    <div className="-mt-10 grid place-items-center content-center gap-8">
      <img src={logo} alt="logo" />
      <div className="flex gap-8">
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
