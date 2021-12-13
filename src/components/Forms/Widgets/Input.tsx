import { FC } from "react";
import { InputProps, SignUpFields } from "../../../types";
import { CreateArticleFields } from "../CreateArticle";
type Fields = SignUpFields | CreateArticleFields;

function Input<T extends Fields = SignUpFields>({
  label,
  register,
  config,
  type = "text",
  area = false,
}: InputProps<T>) {
  return (
    <label className="formField">
      <span className="formField__label">{label}</span>
      {area ? (
        <textarea
          className="formField__input formField__input_area"
          placeholder={label}
          {...register(label, config)}
        ></textarea>
      ) : (
        <input
          className="formField__input"
          type={type}
          placeholder={label}
          {...register(label, config)}
        />
      )}
    </label>
  );
}

export default Input;
