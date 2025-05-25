import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataPreview from "./DataPreview";
import BuyedTicket from './BuyedTicket'


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DataPreview />} />
      <Route path="/ticket" element={<BuyedTicket />} />
    </Routes>
  </BrowserRouter>
);
export default App