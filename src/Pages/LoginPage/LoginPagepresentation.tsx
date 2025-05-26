import React, { ChangeEvent, RefObject, useState } from 'react';

interface LoginPagePresentationProps {
  username: string;
  password: string;
  remember: boolean;
  error: string;
  isLoading: boolean;
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRememberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

// FormInput 컴포넌트 (내부 정의)
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
}) => {
  return (
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
};

// PasswordInput 컴포넌트 (내부 정의)
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

const LoginPagePresentation: React.FC<LoginPagePresentationProps> = ({
  username,
  password,
  remember,
  error,
  isLoading,
  formRef,
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  onRememberChange,
  onForgotPassword,
  onRegister,
}) => {
  return (
    <>
      <style>{`
        /* 메인 컨테이너 */
        .login-form-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 40px 32px 32px 32px;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1.5px solid #e0e0e0;
        }
        .login-form-container h2 {
          margin-bottom: 0.2em;
          font-size: 1.1em;
          font-weight: 400;
        }
        .login-form-container h1 {
          margin: 0 0 0.2em 0;
          font-size: 2em;
          font-weight: bold;
          letter-spacing: -1px;
        }
        .login-form-container .subtitle {
          margin-bottom: 1.5em;
          color: #888;
          font-size: 1em;
        }

        /* 폼 레이아웃 */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.4em;
        }

        /* FormInput & PasswordInput 스타일 */
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

        /* 옵션 행 (Remember me, Forgot password) */
        .options-row, .login-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5em;
          font-size: 0.97em;
        }
        .remember-label {
          display: flex;
          align-items: center;
          gap: 0.3em;
          font-size: 0.97em;
        }
        .forgot-link, .login-link {
          font-size: 0.97em;
          color: #888;
          text-decoration: none;
        }

        /* 버튼들 */
        .login-btn {
          width: 100%;
          padding: 15px 0;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1.15em;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.2em;
          transition: background 0.2s;
        }
        .login-btn:hover {
          background: #222;
        }
        .login-btn:disabled {
          background: #888;
          cursor: not-allowed;
        }

        /* 하단 회원가입 링크 */
        .register-row {
          margin-top: 2.1em;
          text-align: center;
          color: #bbb;
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

        /* 에러 메시지 */
        .error-message {
          margin-top: 0.8em;
          color: #d33;
          font-size: 0.98em;
          text-align: center;
        }

        /* 반응형 */
        @media (max-width: 500px) {
          .login-form-container {
            padding: 20px 8px 16px 8px;
            max-width: 98vw;
          }
        }
      `}</style>
      <div className="login-form-container">
        <div>
          <h2>Welcome !</h2>
          <h1>Sign in to</h1>
          <div className="subtitle">Lorem Ipsum is simply</div>
          <form className="login-form" onSubmit={onSubmit} ref={formRef}>
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
            <div className="login-options-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={onRememberChange}
                />
                Remember me
              </label>
              <div className="login-link">
                Forgot Password ?
                <span
                  className="register-link"
                  onClick={onForgotPassword}
                  tabIndex={0}
                  role="button"
                >
                  <b>Find password</b>
                </span>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? '처리 중...' : 'Login'}
            </button>
            <div className="register-row">
              Don't have an Account ?{' '}
              <span
                className="register-link"
                onClick={onRegister}
                tabIndex={0}
                role="button"
              >
                <b>Register</b>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPagePresentation;
