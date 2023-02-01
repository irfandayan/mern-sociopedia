import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenses/homePage";
import LoginPage from "scenses/loginPage";
import ProfilePage from "scenses/profilePage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile/:usreId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
