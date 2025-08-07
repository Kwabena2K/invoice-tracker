    import { useState } from "react";
    import InvoiceCard from "../components/InvoiceCard";
    import styles from "../styles/DashboardPage.module.css";
    import NewInvoice from "../components/NewInvoice";
    


    const mockInvoices = [
    {
        id: 1,
        clientName: "Acme Corp",
        amount: 1200,
        dueDate: "2025-08-15",
        status: "pending",
        currency: "AUD",
        purchase_order_number:"12",
        number:"1123",
        notes:"testing note field",
        terms:"testing terms field",
    },
    {
        id: 2,
        clientName: "Test2 Inc.",
        amount: 950,
        dueDate: "2025-08-20",
        status: "overdue",
        currency: "EUR",
        purchase_order_number:"13",
        number:"1123",
        notes:"testing note field",
        terms:"testing terms field",
    },
    {
        id: 3,
        clientName: "Test3 Inc.",
        amount: 350,
        dueDate: "2025-08-20",
        status: "open",
        currency: "GBP",
        purchase_order_number:"14",
        number:"1123",
        notes:"testing note field",
        terms:"testing terms field",
    },
    {
        id: 4,
        clientName: "Test4 Inc.",
        amount: 150,
        dueDate: "2025-08-20",
        status: "open",
        currency: "CAD",
        purchase_order_number:"15",
        number:"1123",
        notes:"testing note field",
        terms:"testing terms field",
    },
    {
        id: 5,
        clientName: "Test5 Inc.",
        amount: 450,
        dueDate: "2025-08-20",
        status: "paid",
        currency: "USD",
        purchase_order_number:"16",
        number:"1123",
        notes:"testing note field",
        terms:"testing terms field",
    },
    ];
    

    function DashboardPage() {
    const [invoices, setInvoices] = useState(mockInvoices);
    console.log("Invoices:", invoices);

    const totalOpen = invoices.filter(inv => inv.status === 'open').length;
    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalPending = invoices.filter(inv => inv.status === 'pending').length;
    const totalOverdue = invoices.filter(inv => inv.status === 'overdue').length;
    const totalPaid = invoices.filter(inv => inv.status === 'paid').length;
    const totalPaidAmount = invoices.filter(
        inv => inv.status === "paid").reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalPendingAmount = invoices.filter(
        inv => inv.status === "pending").reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalOverdueAmount = invoices.filter(
        inv => inv.status === "overdue").reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalOpenAmount = invoices.filter(
        inv => inv.status === "open").reduce((sum, invoice) => sum + invoice.amount, 0);
    
    const statusOrder = { overdue: 1, open: 2, pending: 3, paid: 4,  };
    return (
        <div className={styles.dashboard}>
        <h1>Invoices</h1>
        <div className={styles.container}>
            <div className={`${styles.summaryCard} ${styles.all}`}>
                <h4>All invoices ({invoices.length})</h4> 
                <p>Total: ${totalAmount.toFixed(2)}</p>
            </div>
            {/* <div>
                <h4>Drafts ({invoices.length})</h4> 
                <p>Total: ${totalAmount.toFixed(2)}</p>
            </div> */}
            <div className={`${styles.summaryCard} ${styles.open}`}>
                <h4>Open Invoices ({totalOpen})</h4> 
                <p>Total: ${totalOpenAmount.toFixed(2)}</p>
            </div> 
            <div className={`${styles.summaryCard} ${styles.overdue}`}>
                <h4>Overdue ({totalOverdue})</h4> 
                <p>Total: ${totalOverdueAmount.toFixed(2)}</p>
            </div> 
            <div className={`${styles.summaryCard} ${styles.pending}`}>
                <h4>Pending ({totalPending})</h4> 
                <p>Total: ${totalPendingAmount.toFixed(2)}</p>
            </div>
            <div className={`${styles.summaryCard} ${styles.paid}`}>
                <h4>Paid ({totalPaid})</h4> 
                <p>Total: ${totalPaidAmount.toFixed(2)}</p>
            </div>
            
        </div>
        
        <NewInvoice onAdd={(newInvoice) => setInvoices([newInvoice, ...invoices])} />
        <div className={styles.invoiceList}>
            
            {/* filter out any undefined values before rendering using .map */}
            {[...invoices].sort((a, b) => {
                const statusCompare = statusOrder[a.status] - statusOrder[b.status];
                if (statusCompare !== 0) return statusCompare;
                return new Date(a.date) - new Date(b.date);}).map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
        </div>
        </div>
    );
    }

    export default DashboardPage;
