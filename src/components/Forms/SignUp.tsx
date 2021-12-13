import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api";
import { STORAGE_CURRENT_USER_KEY } from "../../appConstants";
import { useActions } from "../../hooks";
import { SignUpFields, UserResponseModel } from "../../types";
import { FormContainer } from "../Layout";
import { Input, SubmitButton } from "./Widgets";
import FormNote from "./FormNote";

const SignUp = () => {
  const nav = useNavigate();

  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignUpFields>({
    mode: "all",
  });

  const [registerError, setRegisterError] = useState<string>(null);

  const onSubmit: SubmitHandler<SignUpFields> = ({
    username,
    email,
    password,
  }) => {};

  return (
    <FormContainer>
      <form
        className="formSlim shadow signForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="form__title">Create new account</h1>
        {/* Имя пользователя */}
        <Input
          label="username"
          register={register}
          config={{
            // обязательно поле
            required: "required field",
            // минимум 3 символа
            minLength: {
              value: 3,
              message: "from 3 to 20 chars",
            },
            // максимум 20 символов
            maxLength: {
              value: 20,
              message: "from 3 to 20 chars",
            },
            // выкидываем !, @, #, $, %, ^, &, *, ( ,), -, _, =, + и пробелы
            pattern: {
              value: /[^!@#$%^&*()-_=+\s]/,
              message: "invalid username",
            },
          }}
        />
        {errors.username && <div>{errors.username.message}</div>}
        {/* Почта */}
        <Input
          label="email"
          register={register}
          config={{
            // обязательно поле
            required: "required field",
            // минимум 6 символа
            minLength: {
              value: 6,
              message: "from 6 to 20 chars",
            },
            // максимум 20 символов
            maxLength: {
              value: 20,
              message: "from 3 to 20 chars",
            },
            // выкидываем !, @, #, $, %, ^, &, *, ( ,), -, _, =, + и пробелы
            pattern: {
              value: /\w+@\w+\.\w{2,4}/i,
              message: "invalid email",
            },
          }}
        />
        {errors.email && <div>{errors.email.message}</div>}

        {/* Пароль */}
        <Input
          label="password"
          type="password"
          register={register}
          config={{
            // обязательно поле
            required: "required field",
            // минимум 6 символа
            minLength: {
              value: 6,
              message: "from 6 to 20 chars",
            },
            // максимум 20 символов
            maxLength: {
              value: 20,
              message: "from 3 to 20 chars",
            },
          }}
        />
        {errors.password && <div>{errors.password.message}</div>}

        {/* Пароль (подтвердить) */}
        <Input
          label="repeatPassword"
          type="password"
          register={register}
          config={{
            // обязательно поле
            required: "required field",
            // минимум 6 символа
            minLength: {
              value: 6,
              message: "from 6 to 20 chars",
            },
            // максимум 20 символов
            maxLength: {
              value: 20,
              message: "from 3 to 20 chars",
            },
            // пароли должны совпадать
            validate(value: string) {
              return value === watch("password") || "Passwords must match";
            },
          }}
        />
        {errors.repeatPassword && <div>{errors.repeatPassword.message}</div>}

        {/* "Я согласен с условиями" */}
        <label className="youAgree">
          <input
            type="checkbox"
            className="youAgree__checkbox"
            {...register("youAgree", {
              required: "required field",
            })}
          />
          <div className="youAgree__checkboxView" />
          <div className="youAgree__text">
            I agree to the processing of my personal information
          </div>
        </label>
        {errors.youAgree && <div>{errors.youAgree.message}</div>}

        {registerError && <div>{registerError}</div>}

        <SubmitButton text="Create" disabled={!isValid} />
        <FormNote text="Already have an account? " eyeCathingText="Sign In." />
      </form>
    </FormContainer>
  );
};

export default SignUp;
