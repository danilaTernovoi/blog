import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { STORAGE_CURRENT_USER_KEY } from "../../appConstants";
import FormNote from "./FormNote";
import { SubmitButton, Input } from "./Widgets";
import { FormContainer } from "../Layout";
import { SignUpFields } from "../../types";
import { useActions, useTypedSelector } from "../../hooks";
import useCheckAuth from "../../hooks/useCheckAuth";

const SignIn = () => {
  const nav = useNavigate();
  const { login } = useActions();
  const isAuth = useCheckAuth();

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFields>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<SignUpFields> = (user) =>
    login(user, () => nav("/articles"));

  return (
    <FormContainer>
      <form
        className="formSlim signForm shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="form__title">Sign In</h1>
        <Input
          label="email"
          register={register}
          config={{
            required: "required field",
          }}
        />
        {errors.email ? <div>{errors.email.message}</div> : null}

        <Input
          label="password"
          type="password"
          register={register}
          config={{
            required: "required field",
          }}
        />
        {errors.password ? <div>{errors.password.message}</div> : null}

        <SubmitButton text="Login" disabled={!isValid} />
        <FormNote text="Don’t have an account?" eyeCathingText=" Sign Up." />
      </form>
    </FormContainer>
  );
};

export default SignIn;
