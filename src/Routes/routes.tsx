import React from "react";
import { RouteObject } from 'react-router-dom';
import { LandingPageContainer } from "../Pages/LandingPage";
import { InformationPage } from "../Pages/InformationPage";
import { QaPage } from "../Pages/QaPage";
import { QaInfoPage } from "../Pages/QaInfoPage";
import { ChatPage } from "../Pages/ChatPage";
import { ChattingPage } from "../Pages/ChattingPage";

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
    }
]


