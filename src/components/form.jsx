import { useState } from "react";

const Form = () => {
  // User Information State
  const [value, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Validation States
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [formSuccess, setFormSuccess] = useState(false);

  const inputChangeHandler = (property) => {
    setValues((prev) => ({
      ...prev,
      [property.target.name]: property.target.value,
    }));
  };

  const emailValidator = () => {
    if (value.email.length === 0 || !value.email.includes("@")) {
      setEmailIsValid(false);
      return false;
    } else {
      setEmailIsValid(true);
      return true;
    }
  };

  const passwordValidator = () => {
    // Regex Check
    function checkPassword() {
      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(value.password);
    }
    if (value.password.length < 15 && checkPassword()) {
      setPasswordIsValid(true);
      return true;
    } else {
      setPasswordIsValid(false);
      return false;
    }
  };
  const passwordMatch = () => {
    if (value.password === value.confirmPassword) {
      setIsPasswordMatch(true);
      return true;
    } else {
      setIsPasswordMatch(false);
      return false;
    }
  };
  // Form Handler
  const formHandler = (event) => {
    event.preventDefault();
    emailValidator();
    passwordValidator();
    passwordMatch();
    if (emailValidator() && passwordValidator() && passwordMatch()) {
      setFormSuccess(true);
    } else {
      setFormSuccess(false);
    }
  };

  return (
    <div className=" p-4 bg-white rounded-md shadow-md shadow-white">
      <h1 className="text-center font-bold">Login Form</h1>
      <form className="flex flex-col justify-between items-center">
        <label className="font-medium" htmlFor="email">
          E-Mail
        </label>
        <br />
        <input
          className="border border-black rounded p-1 font-medium"
          type="text"
          name="email"
          id="email"
          onChange={inputChangeHandler}
          value={value.email}
        />
        {!emailIsValid && (
          <p className="text-red-600 text-center">
            Please Provide a Valid Email
          </p>
        )}
        <br />
        <label className="font-medium" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="border border-black rounded p-1 font-medium"
          type="password"
          name="password"
          id="password"
          onChange={inputChangeHandler}
          value={value.password}
        />
        {!passwordIsValid && (
          <p className="text-red-600 text-center p-1 text-xs break-words ">
            Password Must Contain - 8 to 14 letters ,<br /> Capital Letter,Small
            Letter,Number,Special characters
          </p>
        )}
        <br />
        <label className="font-medium" htmlFor="confirm-password">
          Confirm Password
        </label>
        <br />
        <input
          className="border border-black rounded p-1 font-medium"
          type="password"
          name="confirmPassword"
          id="confirm-password"
          onChange={inputChangeHandler}
          value={value.confirmPassword}
        />
        {!isPasswordMatch && (
          <p className="text-red-600">Password Don't Match</p>
        )}
        <br />
        <button
          className={`border border-green-600  rounded m-2 p-1 font-bold ${
            formSuccess ? " bg-green-600 text-white" : "bg-black-200"
          }`}
          onClick={formHandler}
        >
          Log In
        </button>
      </form>
    </div>
  );
};
export default Form;
