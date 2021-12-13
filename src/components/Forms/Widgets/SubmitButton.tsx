import { FC } from "react";

interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ text, disabled = true }) => {
  return (
    <button className="submitButton" type="submit" disabled={disabled}>
      {text}
    </button>
  );
};

export default SubmitButton;
