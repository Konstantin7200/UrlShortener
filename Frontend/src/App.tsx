import { Route, Routes } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { RedirectionPage } from "./pages/RedirectionPage/RedirectionPage";
import { StatsPage } from "./pages/StatsPage/StatsPage";

function App() {
  return (
    <Routes>
      <Route path="stats" element={<StatsPage />} />
      <Route path=":url" element={<RedirectionPage />}></Route>
      <Route index element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
