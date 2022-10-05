import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const hanldleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email is required!",
      },
      isEmail: {
        message: "Email is not corrected!",
      },
    },
    password: {
      isRequired: {
        message: "Password is required!",
      },
      isCapitalSymbol: {
        message: "Password must contain a capital character!",
      },
      isContainDigit: {
        message: "Password must contain digit!",
      },
      min: {
        message: "Password must contain minimum 8 symbols!",
        value: 8,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container mt-5 shadow">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              onChange={hanldleChange}
              value={data.email}
              label="E-mail"
              error={errors.email}
            />
            <TextField
              name="password"
              onChange={hanldleChange}
              value={data.password}
              type="password"
              label="Password"
              error={errors.password}
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
