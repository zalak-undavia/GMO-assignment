import { Navigate } from "react-router-dom";

import { SHOW_MESSAGE_QUERY_STRING, USER_INPUT_KEY } from "../../constants";

export default function RequireUser({ children }: { children: React.ReactElement[] }) {
  const raw = localStorage.getItem(USER_INPUT_KEY);

  if (!raw) {
    return <Navigate to={`/?${SHOW_MESSAGE_QUERY_STRING}=true`} />;
  }
  return children;
}
