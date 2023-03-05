import "./Signup.css";
import MovieIcon from "../assets/movie.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = (e: any) => {
    const trimmedEmail = e.target.value.trim();
    setEmail(trimmedEmail);
    console.log(trimmedEmail);
  };

  const passwordInput = (e: any) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(e.target.value);

    setPassword(e.target.value);

    if (!isValidPassword) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else if (repeatPassword !== "" && password !== repeatPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const repeatPasswordInput = (e: any) => {
    setRepeatPassword(e.target.value);
    if (password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
      setIsPasswordValid("Passwords match");
    }
  };

  const createAccount = (e: any) => {
    e.preventDefault();
    if (email === "" || password === "" || repeatPassword === "") {
      setError("Please fill in both password and email fields");
    } else if (
      password !== repeatPassword ||
      password === "" ||
      repeatPassword === ""
    ) {
      setError("Passwords do not match");
    } else {
      setIsPasswordValid("Passwords match");

      // // Save the email and password to local storage
      // localStorage.setItem("email", email);
      // localStorage.setItem("password", password);

      setIsLoading(true);
      let url;
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5lEm4Lm3apblnhSgdfA-f01D3qZldlkg";

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5lEm4Lm3apblnhSgdfA-f01D3qZldlkg",
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: { "Content-Type": "appl ication/json" },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
            // Navigate to login page
          } else {
            return res.json().then((data) => {
              const errorMessage = data.error.message;
              console.log(data);

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          window.location.href = "/login";
        })

        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <form onSubmit={createAccount}>
      <div className="signMainCont">
        <div className="signIconCenterBox">
          <img className="signIconCenter" src={MovieIcon} alt="Movie Icon" />
        </div>
        <div className="signContentContainer">
          <a className="signUpText">Sign Up</a>
          <div className="signInputContainer">
            <input
              className="signInput"
              placeholder="Email address"
              onChange={emailInput}
            />
            <div className="signLine"></div>
            <input
              className="signInput"
              placeholder="Password"
              onChange={passwordInput}
            />
            <div className="signLine"></div>
            <input
              className="signInput"
              placeholder="Repeat Password"
              onChange={repeatPasswordInput}
            />
            <div className="signLine"></div>
            {error && <div className="signError">{error}</div>}
            {isPasswordValid && (
              <div className="signSuccess">{isPasswordValid}</div>
            )}

            {isLoading ? (
              <button className="createAccountButton" type="submit">
                Loading...
              </button>
            ) : (
              <button className="createAccountButton" type="submit">
                Create an account
              </button>
            )}
          </div>
          {error ? (
            <div className="loginBoxText">
              Already have an account?
              <span className="loginUpButtonText">Login</span>
            </div>
          ) : (
            <div className="loginBoxText" style={{ marginTop: "-20px" }}>
              Already have an account?
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="loginUpButtonText">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Signup;
