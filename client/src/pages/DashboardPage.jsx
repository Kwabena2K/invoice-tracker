    import { useState, useEffect } from "react";
    import InvoiceCard from "../components/InvoiceCard";
    import styles from "../styles/DashboardPage.module.css";
    import NewInvoice from "../components/NewInvoice";

    function DashboardPage() {
        const [invoices, setInvoices] = useState([]);

        const fetchInvoices = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`);
                if (!res.ok) throw new Error("Failed to fetch invoices");
                const data = await res.json();
                setInvoices(data);
                } catch (error) {
                console.error(error);
            }   
        };

        useEffect(() => {
            fetchInvoices();
        }, []);

        

        const handleAddInvoice = async (formData) => {
            try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invoice: {
                        ...formData,
                    amount: parseFloat(formData.amount),} 
                }),
            });
            if (!response.ok) throw new Error("Failed to create invoice");

            const savedInvoice = await response.json();
            setInvoices(prevInvoices => [savedInvoice, ...prevInvoices]);
            } catch (error) {
            console.error(error);
            }
        };

    const totalOpen = invoices.filter(inv => inv.status === 'open').length;
    const totalAmount = invoices.reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalPending = invoices.filter(inv => inv.status === 'pending').length;
    const totalOverdue = invoices.filter(inv => inv.status === 'overdue').length;
    const totalPaid = invoices.filter(inv => inv.status === 'paid').length;
    const totalPaidAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalPendingAmount = invoices.filter(inv => inv.status === "pending").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalOverdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalOpenAmount = invoices.filter(inv => inv.status === "open").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);

    const statusOrder = { overdue: 1, open: 2, pending: 3, paid: 4 };

    return (
        <div className={styles.dashboard}>
            <h1>Invoices</h1>
            <div className={styles.container}>
                <div className={`${styles.summaryCard} ${styles.all}`}>
                    <h4>All invoices ({invoices.length})</h4>
                    <p>Total: ${totalAmount.toFixed(2)}</p>
                </div>
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

            <NewInvoice onAdd={handleAddInvoice} />
            <div className={styles.invoiceList}>
                {[...invoices]
                    .sort((a, b) => {
                        const statusCompare = statusOrder[a.status] - statusOrder[b.status];
                        if (statusCompare !== 0) return statusCompare;
                        return new Date(a.date) - new Date(b.date);
                    })
                    .map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))}
            </div>
        </div>
    );
}

export default DashboardPage;
