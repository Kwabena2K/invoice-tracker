import styles from "./App.module.css";
import DashboardPage from "./pages/DashboardPage";
import {Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home";


function App() {
  return (
    <div className="min-h-screen w-full bg-white box-border font-roboto">
      {/* Nav */}
        <nav>
          <Link to="/">Home</Link> | {""}
          <Link to="/invoices">Invoices</Link>
        </nav>

      {/* Routing */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoices" element={<DashboardPage />} />
        </Routes>
      {/* <DashboardPage /> */}
    </div>
  );
}

export default App;
