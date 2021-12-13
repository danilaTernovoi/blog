import React, { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { editArticle } from "../../api";
import { useTagControls, useTypedSelector } from "../../hooks";
import { ContentContainer } from "../Layout";
import { CreateArticleFields } from "./CreateArticle";
import Input from "./Widgets/Input";
import SubmitButton from "./Widgets/SubmitButton";

interface Tag {
  id: number;
  value: string;
}

const EditArticle = () => {
  const { slug } = useParams();
  const { addTagField, tagList, deleteTag, setTagList } = useTagControls();
  const editedArticle = useTypedSelector((state) =>
    state.articles.list.find((art) => art.slug === slug)
  );

  console.log(slug);

  const { token } = useTypedSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateArticleFields>({
    mode: "all",

    defaultValues: {
      title: editedArticle.title,
      description: editedArticle.description,
      body: editedArticle.body,
    },
  });

  const onSubmit: SubmitHandler<CreateArticleFields> = (data) => {
    (async () => {
      const reqData = {
        ...data,
        tagList: tagList.map(({ name }) => name).filter((val) => val),
      };

      const res = await editArticle({ article: reqData }, slug, token);

      const json = await res.json();
      console.log(json);
    })();
  };

  return (
    <ContentContainer>
      <form className="createArticle shadow" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Edit article</h1>

        <Input<CreateArticleFields>
          register={register}
          label="title"
          config={{
            required: "required field",
          }}
        />

        {errors.title && <div>{errors.title.message}</div>}

        <Input<CreateArticleFields>
          register={register}
          label="description"
          config={{
            required: "required field",
          }}
        />

        {errors.description && <div>{errors.description.message}</div>}

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

          <div className="listAddTagWrapper bg">
            <div className="bg">
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

export default EditArticle;
