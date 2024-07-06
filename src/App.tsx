import "./App.css";

import UserInput from "./components/User/UserInput";
import RequireUser from "./components/User/RequireUser";
import { Route, Routes } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import Department from "./components/Department/Department";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<UserInput />}></Route>
        <Route
          path="/main-page"
          element={
            <RequireUser>
              <Posts />
              <Department />
            </RequireUser>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
