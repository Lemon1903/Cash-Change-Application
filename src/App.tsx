import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReceiptProvider from "./contexts/ReceiptProvider";
import AdminPage from "./pages/AdminPage";
import ChangePage from "./pages/ChangePage";
import InputPage from "./pages/InputPage";
import MenuPage from "./pages/MenuPage";

export default function App() {
  return (
    <ReceiptProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/buyer/input" element={<InputPage />} />
          <Route path="/buyer/output" element={<ChangePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ReceiptProvider>
  );
}
