import "./Login.css";
import MovieIcon from "../assets/movie.svg";
const login = () => {
  return (
    <div className="loginMainCont">
      <div className="loginIconCenterBox">
        <img className="loginIconCenter" src={MovieIcon} />
      </div>
      <div className="loginContentContainer">
        <a className="loginnUpText">Sign Up</a>
        <div className="loginInputContainer">
          <input className="loginInput" placeholder="Email address" />
          <div className="loginLine"></div>
          <input className="loginInput" placeholder="Password" />
          <div className="loginLine"></div>

          <button className="loginButton">Login to your account</button>
        </div>
        <div className="signUpBoxText">
          Don’t have an account?
          <span className="signUpButtonText">Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default login;
