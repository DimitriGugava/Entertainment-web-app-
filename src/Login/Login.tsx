import "./Login.css";
import MovieIcon from "../assets/movie.svg";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedEmail: string = e.target.value.trim();
    setEmail(trimmedEmail);
  };

  const passwordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in both email and password fields");
    } else {
      setIsLoading(true);
      let url: string;
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5lEm4Lm3apblnhSgdfA-f01D3qZldlkg";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              const errorMessage: string = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          // Navigate to home page after successful login
          window.location.href = "/main";
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <form onSubmit={login}>
      <div className="loginMainCont">
        <div className="loginIconCenterBox">
          <img className="loginIconCenter" src={MovieIcon} alt="Movie Icon" />
        </div>
        <div className="loginContentContainer">
          <a className="loginUpText">Log In</a>
          <div className="loginInputContainer">
            <input
              className="loginInput"
              placeholder="Email address"
              onChange={emailInput}
            />
            <div className="loginLine"></div>
            <input
              className="loginInput"
              placeholder="Password"
              onChange={passwordInput}
            />
            <div className="loginLine"></div>
            {error && <div className="loginError">{error}</div>}

            {isLoading ? (
              <button className="loginButton" type="submit">
                Loading...
              </button>
            ) : (
              <button className="loginButton" type="submit">
                Login to your account
              </button>
            )}
          </div>
          <div className="signUpBoxText">
            Don’t have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span className="signUpButtonText">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
