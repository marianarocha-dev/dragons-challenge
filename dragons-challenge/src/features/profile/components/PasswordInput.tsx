import { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  padding-right: 3rem;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  outline: none;
  width: 100%;

  &:focus {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }

  &::placeholder {
    color: #C4C4C4;
  }

  &:disabled {
    background: #f8f9fa;
    color: #828080;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #828080;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #0048FF;
  }

  &:focus {
    outline: none;
  }
`;

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const PasswordField = ({ 
  value, 
  onChange, 
  placeholder, 
  disabled 
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PasswordInputContainer>
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <TogglePasswordButton
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
      >
        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
      </TogglePasswordButton>
    </PasswordInputContainer>
  );
};