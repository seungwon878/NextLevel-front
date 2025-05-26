import React from "react";
import { RouteObject } from 'react-router-dom';
import { LandingPageContainer } from "../Pages/LandingPage";

export const routes: RouteObject[] = [
    {
      path: "/",
      element: <LandingPageContainer />,
    },
    {
      path: "/landing",
      element: <LandingPageContainer />,
    }
]


