import React, {useState} from "react";
import PropTypes from "prop-types";

const TextField = ({label, type, value, name, onChange, error}) => {
  const [showPassword, seShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const showTogglePassword = () => {
    seShowPassword((prevState) => !prevState);
  };
  return (
      <div className="mb-4">
        <label htmlFor={name}>{label}</label>
        <div className="input-group has-validation">
          <input
              type={showPassword ? "text" : type}
              id={name}
              value={value}
              onChange={onChange}
              name={name}
              className={getInputClasses()}
          />
          {type === "password" && (
              <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={showTogglePassword}
              >
                <i
                    className={
                      showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                    }
                ></i>
              </button>
          )}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
  );
};

TextField.defaultProps = {
  type: "text",
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
};

export default TextField;
