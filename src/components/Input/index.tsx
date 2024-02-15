import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const StyledInput = styled.input<InputProps>`
  background: #f0f0f0;
  box-sizing: border-box;
  margin: 0.5em 0;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1px solid ${(props) => (props.error ? "#a71e1e" : "transparent")};
  width: 100%;
  padding: 16px;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;

  &::placeholder {
    color: rgba(107, 110, 113, 1);
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }

  &:focus {
    outline-color: ${(props) => (props.error ? "#a71e1e" : "")};
  }
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...rest }, ref) => {
    return <StyledInput error={error} ref={ref} {...rest} />;
  }
);

export default Input;
