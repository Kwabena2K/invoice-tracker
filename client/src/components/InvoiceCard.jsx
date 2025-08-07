import styles from "../styles/InvoiceCard.module.css";

function InvoiceCard({ invoice }) {

    const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: invoice.currency || 'CAD' 
    }).format(invoice.amount);

    return (
        <div className={styles.invoiceCard}>
        <div>
            <p className={styles.invoiceClient}>{invoice.clientName}</p>
            <p><strong>Currency:</strong> {invoice.currency}</p>
            <p><strong>PO Number:</strong> {invoice.purchase_order_number}</p>
            <p><strong>Terms:</strong> {invoice.terms}</p>
            <p><strong>Notes:</strong> {invoice.notes}</p>
            <p><strong>Invoice #:</strong> {invoice.number}</p>
            <p className={styles.invoiceDate}><strong>Due Date:</strong> {invoice.dueDate}</p>
        </div>
        <div>
            <p className={styles.invoiceAmount}>{formattedAmount}</p>
            <span className={`${styles.status} ${styles[invoice.status]}`}>
            {invoice.status}
            </span>
        </div>
        </div>
    );
}

export default InvoiceCard;
