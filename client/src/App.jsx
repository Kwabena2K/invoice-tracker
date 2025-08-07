import styles from "./App.module.css";
import DashboardPage from "./pages/DashboardPage";
import CreateInvoice from "./pages/CreateInvoice";
import './global.css';



function App() {
  return (
    <div className={styles.app}>
      <DashboardPage />
    </div>
  );
}

export default App;
