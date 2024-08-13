import type * as React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function PrivateRoute(props: { children: React.ReactNode }) {
  return Cookies.get("token") ? props.children : <Navigate to="/login" />;
}
