import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Guest from "./pages/Guest";
import Root from "./pages/Root";
import Home from "./pages/Home";
import store from "./store";

import "./styles/index.css";
import "./styles/styled.css";
import ForgetMail from "./pages/ForgetMail";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exect path="" element={<Root />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={<ForgetMail />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
