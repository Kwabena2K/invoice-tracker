import styles from "../styles/InvoiceCard.module.css";
import NewInvoice from "../components/NewInvoice";

function CreateInvoice() {
    return (
        <div>
            <NewInvoice onAdd={(newInvoice) => setInvoices([newInvoice, ...invoices])} />
        </div>
    );
}

export default CreateInvoice;
