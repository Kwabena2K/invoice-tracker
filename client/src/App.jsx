import React from "react";
import styles from "./App.module.css";
import DashboardPage from "./pages/DashboardPage";
import CreateInvoice from "./pages/CreateInvoice";



function App() {
  return (
    <div className={styles.app}>
      <h1>Invoices</h1>
      <DashboardPage />
      {/* <CreateInvoice /> */}
    </div>
  );
}

export default App;
