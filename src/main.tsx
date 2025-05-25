import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Campaign from "./pages/ViewCampaign.tsx";
import ToolBar from "./componenets/ToolBar.tsx";

function App() {
  const location = useLocation();
  const noFooterRoutes = ["/login"];
  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideFooter && (
        <nav>
          <ToolBar />
        </nav>
      )}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campaign:id" element={<Campaign />} />
      </Routes>
      {!hideFooter && (
        <footer>
          <p>© 2025 OneHand</p>
          <a>Terms</a> <a>Privacy</a> <a>Notice</a> <a>Legal</a>
          <a>Accessibility</a> <a>Statement</a> <a>Cookie</a> <a>Policy</a>
        </footer>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
