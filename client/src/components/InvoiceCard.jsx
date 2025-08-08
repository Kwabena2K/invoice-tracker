    import styles from "../styles/InvoiceCard.module.css";

    function InvoiceCard({ invoice }) {
    const currencyCode = invoice.currency || 'CAD';

    // Format amount with currency symbol
    const formattedAmount = `${currencyCode} ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
    }).format(invoice.amount || 0)}`;

    
    const formattedDueDate = invoice.dueDate
        ? new Date(invoice.dueDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : 'N/A';

    return (
        <div className={styles.invoiceCard}>
        <div>
            <p className={styles.invoiceClient}>{invoice.clientName || 'Unknown Client'}</p>
            <p><strong>Currency:</strong> {invoice.currency || 'N/A'}</p>
            <p><strong>PO Number:</strong> {invoice.purchase_order_number || 'N/A'}</p>
            <p><strong>Terms:</strong> {invoice.terms || 'N/A'}</p>
            <p><strong>Notes:</strong> {invoice.notes || 'None'}</p>
            <p><strong>Invoice #:</strong> {invoice.number || 'N/A'}</p>
            <p className={styles.invoiceDate}><strong>Due Date:</strong> {formattedDueDate}</p>
        </div>
        <div>
            <p className={styles.invoiceAmount}>{formattedAmount}</p>
            <span className={`${styles.status} ${styles[invoice.status || 'pending']}`}>
            {invoice.status || 'pending'}
            </span>
        </div>
        </div>
    );
    }

    export default InvoiceCard;
