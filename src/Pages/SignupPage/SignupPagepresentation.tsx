import React, { useState } from 'react';

// FormInput 컴포넌트
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <div className="form-group">
    <label>
      {label}
      <div className="input-wrapper">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </label>
  </div>
);

// PasswordInput 컴포넌트
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="form-group">
      <label>
        {label}
        <div className="input-wrapper">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            {...props}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShow((v) => !v)}
            tabIndex={-1}
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {show ? '🙈' : '👁️'}
          </button>
        </div>
      </label>
    </div>
  );
};

interface SignupPagePresentationProps {
  email: string;
  username: string;
  password: string;
  confirm: string;
  error: string;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onLoginClick: () => void;
}

const SignupPagePresentation: React.FC<SignupPagePresentationProps> = ({
  email,
  username,
  password,
  confirm,
  error,
  isLoading,
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  onConfirmChange,
  onSubmit,
  onLoginClick,
}) => (
  <>
    <style>{`
      .common-container {
        max-width: 400px;
        margin: 48px auto;
        padding: 40px 32px 32px 32px;
        background: #fff;
        border: 1.5px solid #b2d3f5;
        border-radius: 14px;
        box-shadow: 0 4px 24px 0 rgba(0,0,0,0.06);
        box-sizing: border-box;
      }
      .common-container h2 {
        margin-bottom: 0.2em;
        font-size: 1.1em;
        font-weight: 400;
      }
      .common-container h1 {
        margin: 0 0 0.2em 0;
        font-size: 2em;
        font-weight: bold;
        letter-spacing: -1px;
      }
      .subtitle {
        margin-bottom: 1.5em;
        color: #888;
        font-size: 1em;
      }
      .signup-form {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .form-group {
        margin-bottom: 1.2em;
      }
      .form-group label {
        display: block;
        font-size: 1em;
        font-weight: 500;
        margin-bottom: 0.4em;
      }
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      .input-wrapper input[type="password"],
      .input-wrapper input[type="email"],
      .input-wrapper input[type="text"] {
        width: 100%;
        padding: 12px 14px;
        border: 1.5px solid #bdbdbd;
        border-radius: 6px;
        font-size: 1em;
        background: #fafafa;
        outline: none;
        transition: border 0.2s;
      }
      .input-wrapper input:focus {
        border: 1.5px solid #111;
      }
      .toggle-password {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 1.1em;
        cursor: pointer;
        color: #888;
        padding: 0;
        line-height: 1;
      }
      .register-button {
        width: 100%;
        padding: 13px 0;
        margin-top: 0.8em;
        background: #111;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 1.08em;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .register-button:disabled {
        background: #888;
        cursor: not-allowed;
      }
      .error-message {
        margin-top: 0.8em;
        color: #d33;
        font-size: 0.98em;
        text-align: center;
      }
      .login-link {
        margin-top: 2.1em;
        text-align: center;
        color: #888;
        font-size: 1em;
      }
      .register-link {
        color: #111;
        text-decoration: none;
        font-weight: bold;
        margin-left: 6px;
        cursor: pointer;
      }
      .register-link:hover {
        text-decoration: underline;
      }
      @media (max-width: 500px) {
        .common-container {
          padding: 20px 8px 16px 8px;
          max-width: 98vw;
        }
      }
    `}</style>
    <div className="common-container">
      <h2>Welcome !</h2>
      <h1 className="signup-title">Sign up to</h1>
      <div className="subtitle">Lorem Ipsum is simply</div>
      <form className="signup-form" onSubmit={onSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Enter your email"
          required
        />
        <FormInput
          label="User name"
          value={username}
          onChange={onUsernameChange}
          placeholder="Enter your user name"
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Enter your Password"
          required
        />
        <PasswordInput
          label="Confirm Password"
          value={confirm}
          onChange={onConfirmChange}
          placeholder="Confirm your Password"
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? '처리 중...' : 'Register'}
        </button>
      </form>
      <div className="login-link">
        Already have an Account?{' '}
        <span
          className="register-link"
          onClick={onLoginClick}
          tabIndex={0}
          role="button"
        >
          <b>Login</b>
        </span>
      </div>
    </div>
  </>
);

export default SignupPagePresentation;