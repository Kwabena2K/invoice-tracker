import styles from "../styles/InvoiceCard.module.css";

function InvoiceCard({ invoice }) {

    return (
        <div className={styles.card}>
        <div>
            <h3>{invoice.clientName}</h3>
            <p><strong>Currency:</strong> {invoice.currency}</p>
            <p><strong>PO Number:</strong> {invoice.purchase_order_number}</p>
            <p><strong>Terms:</strong> {invoice.terms}</p>
            <p><strong>Notes:</strong> {invoice.notes}</p>
            <p><strong>Invoice Number:</strong> {invoice.number}</p>
            <p><strong>Due:</strong> {invoice.dueDate}</p>
        </div>
        <div>
            <p>${invoice.amount}</p>
            <span className={`${styles.status} ${styles[invoice.status]}`}>
            {invoice.status}
            </span>
        </div>
        </div>
    );
}

export default InvoiceCard;
