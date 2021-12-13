import { FC } from "react";

interface FormNoteProps {
  text: string;
  eyeCathingText?: string;
}

const FormNote: FC<FormNoteProps> = ({ text, eyeCathingText = "" }) => {
  return (
    <div className="formNote">
      {text}
      <span className="formNote__eyeCatching">{eyeCathingText}</span>
    </div>
  );
};

export default FormNote;
