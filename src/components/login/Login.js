import React, { useEffect } from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// validation
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleLogin = async (values) => {
    if (!isValid) return;
    
    //handle login here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // end handle

    toast.success("Login success!!!");
    navigate("/");
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  return (
    <form className="form" onSubmit={handleSubmit(handleLogin)}>
      <div className="form__container">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.jpg"}
            alt="logo"
            className="form__logo"
          />
        </div>
        <div className="form__input-wrapper">
          <input
            {...register("username")}
            type="text"
            id="username"
            className="form__input"
            placeholder="Enter your username"
            control={control}
          />
          <input
            {...register("password")}
            type="password"
            id="password"
            className="form__input"
            placeholder="Enter your password"
            control={control}
          />
        </div>

        <Button
          type="submit"
          className="form__button"
          isloading={isSubmitting}
          disabled={isSubmitting}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
