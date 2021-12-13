import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../api";
import { useActions, useTagControls, useTypedSelector } from "../../hooks";
import {
  NewArticleRequestModel,
  SingleArticleResponseModel,
} from "../../types";
import { ContentContainer } from "../Layout";
import Input from "./Widgets/Input";
import SubmitButton from "./Widgets/SubmitButton";

export interface CreateArticleFields {
  title: string;
  body: string;
  description: string;
}

const CreateArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateArticleFields>({
    mode: "all",
  });

  const { token } = useTypedSelector((state) => state.auth.user);

  const { tagList, addTagField, deleteTag, setTagList } = useTagControls();

  const onSubmit: SubmitHandler<CreateArticleFields> = async (data) => {
    const reqData = {
      article: {
        ...data,
        tagList: tagList.map(({ name }) => name).filter((val) => val),
      },
    };

    const res = await createArticle(reqData, token);

    const json = await res.json();
    console.log(json);
  };

  return (
    <ContentContainer>
      <form className="createArticle shadow" onSubmit={handleSubmit(onSubmit)}>
        {/* TITLE */}
        <h1 className="form__title">Create article</h1>

        {/* TITLE INPUT */}
        <Input<CreateArticleFields>
          register={register}
          label="title"
          config={{
            required: "required field",
          }}
        />
        {errors.title && <div>{errors.title.message}</div>}

        {/* DESCRIPTION FIELD */}
        <Input<CreateArticleFields>
          register={register}
          label="description"
          config={{
            required: "required field",
          }}
        />
        {errors.description && <div>{errors.description.message}</div>}

        {/* BODY FIELD */}
        <Input<CreateArticleFields>
          register={register}
          config={{
            required: "required field",
          }}
          label="body"
          area
        />
        {errors.body && <div>{errors.body.message}</div>}

        <div className="form__tags formTags">
          <h1 className="formTags__title">tags</h1>

          <div className="listAddTagWrapper">
            <div>
              {tagList.map(({ name, id }) => (
                <div className="form__tag" key={id}>
                  <input
                    type="text"
                    className="formField__input"
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const { value: inputValue } = event.target;

                      setTagList((prev) =>
                        prev.map((tag) =>
                          tag.id === id ? { ...tag, name: inputValue } : tag
                        )
                      );
                    }}
                  />

                  <button
                    className="btn btn_danger"
                    onClick={() => deleteTag(id)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
            <button
              className="btn btn_primary addTagButton"
              type="button"
              onClick={addTagField}
            >
              add tag
            </button>
          </div>
        </div>

        <SubmitButton text="Send" disabled={!isValid} />
      </form>
    </ContentContainer>
  );
};

export default CreateArticle;
