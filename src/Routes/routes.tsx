import React from "react";
import { RouteObject } from 'react-router-dom';
import { LandingPageContainer } from "../Pages/LandingPage";
import { InformationPage } from "../Pages/InformationPage";

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
    }
]


