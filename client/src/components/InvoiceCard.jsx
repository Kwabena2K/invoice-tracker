import styles from "../styles/InvoiceCard.module.css";


    function InvoiceCard({ invoice, onDelete }) {
        const currencyCode = invoice.currency || "CAD";
        const amountNum = Number(invoice.amount) || 0;
        

        // Format amount with currency symbol
        const formattedAmount = new Intl.NumberFormat( 
            currencyCode === "USD" ? "en-US" : 
            currencyCode === "CAD" ? "en-CA" : 
            "en-US", {
            style: "currency",
            currency: currencyCode,
            currencyDisplay: "symbol",
        }).format(amountNum);

        const displayAmount = `${formattedAmount} ${currencyCode}`;


          const handleDeleteClick = () => {
            if (window.confirm(`Delete invoice #${invoice.number}? This action cannot be undone.`)) {
            onDelete(invoice.id);
            }
        };


        // Handle both camelCase and snake_case for react and rails server
        const clientName = invoice.clientName || invoice.client_name || "Unknown Client";

        const dueDateValue = invoice.dueDate || invoice.due_date;
        const formattedDueDate = dueDateValue
            ? new Date(dueDateValue).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
            : "N/A";

    return (
        <div className={styles.invoiceCard}>
            <div>
                <button className={styles.deleteButton} onClick={handleDeleteClick} aria-label={`Delete invoice ${invoice.number}`}>Delete</button>
                <p className={styles.invoiceClient}>{clientName}</p>
                <p><strong>Currency:</strong> {invoice.currency || "N/A"}</p>
                <p><strong>PO Number:</strong> {invoice.purchase_order_number || "N/A"}</p>
                <p><strong>Notes:</strong> {invoice.notes || "None"}</p>
                <p><strong>Invoice #:</strong> {invoice.number || "N/A"}</p>
                <p className={styles.invoiceDate}><strong>Due Date:</strong> {formattedDueDate}</p>
            </div>
            <div className={styles.moneyBadge}>
                <p className={styles.invoiceAmount}>{displayAmount}</p>
                <div className={styles.moneyBadge}>
                    <span className={`${styles.status} ${styles[invoice.status || "pending"]}`}>
                        {invoice.status || "pending"}
                    </span>  
                </div>
                
            </div>
        </div>
    );
}

export default InvoiceCard;
