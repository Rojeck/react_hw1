import Button from "../../common/button/Button";
import Logo from "./components/logo/Logo";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <div className="user-info">
        <span className="user-info__user-name">Dave</span>
        <Button text={"Logout"} fontSize={14} />
      </div>
    </header>
  );
};

export default Header;
