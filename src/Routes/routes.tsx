import React from "react";
import { RouteObject } from 'react-router-dom';
import { LandingPageContainer } from "../Pages/LandingPage";
import { InformationPage } from "../Pages/InformationPage";
import { QaPage } from "../Pages/QaPage";
import { QaInfoPage } from "../Pages/QaInfoPage";
import { ChatPage } from "../Pages/ChatPage";
import { ChattingPage } from "../Pages/ChattingPage";
import { LoginPageContainer } from "../Pages/LoginPage";
import { SignupPageContainer } from "../Pages/SignupPage";
import { SignupSuccessContainer } from "../Pages/SignupSuccessPage";
import { ForgotPasswordContainer } from "../Pages/ForgotPasswordPage";
import { MyPageContainer } from "../Pages/MyPage";
import { TeamProjectContainer } from "../Pages/TeamProjectPage";
import { TeamPage } from "../Pages/TeamPage/";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPageContainer />,
  },
  {
    path: "/landing",
    element: <LandingPageContainer />,
  },
  {
    path: "/information/:id",
    element: <InformationPage />,
  },
  {
    path: "/qapage",
    element: <QaPage />,
  },
  {
    path: "/qainfo/:id",
    element: <QaInfoPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/chatting/:id",
    element: <ChattingPage />,
  },
  {
    path: "/login",
    element: <LoginPageContainer />,
  },
  {
    path: "/signup",
    element: <SignupPageContainer />,
  },
  {
    path: "/signupsuccess",
    element: <SignupSuccessContainer />,
  },
  {
    path: "/forgot",
    element: <ForgotPasswordContainer />,
  },
  {
    path: "/mypage",
    element: <MyPageContainer />,
  },
  {
    path: "/project",
    element: <TeamProjectContainer />,
  },
  {
    path: "/team/:id",
    element: <TeamPage />,
  },
];
