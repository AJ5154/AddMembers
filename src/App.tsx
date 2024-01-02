import { BrowserRouter, Route, Routes } from "react-router-dom";
import Member from "./Components/Member";
import SignIn from "./Login/SignIn";
import Signup from "./Login/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/member" element={<Member />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
