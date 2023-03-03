import "./Signup.css";
import MovieIcon from "../assets/movie.svg";
const Signup = () => {
  return (
    <div className="signMainCont">
      <div className="signIconCenterBox">
        <img className="signIconCenter" src={MovieIcon} />
      </div>
      <div className="signContentContainer">
        <a className="signUpText">Sign Up</a>
        <div className="signInputContainer">
          <input className="signInput" placeholder="Email address" />
          <div className="signLine"></div>
          <input className="signInput" placeholder="Password" />
          <div className="signLine"></div>
          <input className="signInput" placeholder="Repeat Password" />
          <div className="signLine"></div>
          <button className="createAccountButton">Create an account</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
