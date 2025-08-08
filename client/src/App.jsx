import styles from "./App.module.css";
import DashboardPage from "./pages/DashboardPage";
import CreateInvoice from "./pages/CreateInvoice";



function App() {
  return (
    <div className={styles.app}>
      <DashboardPage />
    </div>
  );
}

export default App;
