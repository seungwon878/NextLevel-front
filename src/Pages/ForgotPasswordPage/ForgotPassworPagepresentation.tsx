import React from 'react';

interface Props {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  message: string;
  onLoginClick: () => void;
}

// FormInput 컴포넌트를 내부에 포함
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

const ForgotPasswordPagePresentation: React.FC<Props> = ({
  email,
  onEmailChange,
  onSubmit,
  isLoading,
  message,
  onLoginClick,
}) => (
  <>
    <style>{`
      /* 중앙 박스 컨테이너 */
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

      /* 타이틀 */
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

      /* 폼 */
      .forgot-form {
        display: flex;
        flex-direction: column;
        gap: 1.4em;
      }

      /* FormInput 스타일 (포함된 컴포넌트) */
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

      /* 버튼 */
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

      /* 성공 메시지 */
      .success-message {
        color: #4caf50;
        text-align: center;
        margin: 10px 0;
        font-size: 0.95em;
      }

      /* 하단 링크 */
      .forgot-link {
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
      <h1>Reset Password</h1>
      <form className="forgot-form" onSubmit={onSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Enter your email"
          required
        />
        {message && (
          <div className="success-message">{message}</div>
        )}
        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : 'Send Reset Link'}
        </button>
      </form>
      <div className="forgot-link" style={{ marginTop: '2.1em', textAlign: 'center', color: '#888', fontSize: '1em' }}>
        Remember your password?
        <span
          className="register-link"
          onClick={onLoginClick}
          tabIndex={0}
          role="button"
          style={{ color: '#111', fontWeight: 'bold', marginLeft: 6, cursor: 'pointer' }}
        >
          login
        </span>
      </div>
    </div>
  </>
);

export default ForgotPasswordPagePresentation;
