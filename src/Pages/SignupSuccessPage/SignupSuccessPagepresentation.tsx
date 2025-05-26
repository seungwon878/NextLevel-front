import React from 'react';

interface Props {
  onLoginClick: () => void;
}

const SignupSuccessPresentation: React.FC<Props> = ({ onLoginClick }) => (
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
        text-align: center;
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
        display: block;
        text-align: center;
        text-decoration: none;
      }
      .login-btn:hover {
        background: #222;
      }
    `}</style>
    <div className="common-container">
      <h2>Welcome !</h2>
      <h1>Sign up Success</h1>
      <div className="subtitle">회원가입이 완료되었습니다.</div>
      <div style={{ margin: "32px 0" }}>
        <span style={{ fontSize: "1.1em", color: "#111" }}>
          이제 로그인하여 서비스를 이용해보세요!
        </span>
      </div>
      <button
        className="login-btn"
        onClick={onLoginClick}
        type="button"
      >
        Login
      </button>
    </div>
  </>
);

export default SignupSuccessPresentation;
