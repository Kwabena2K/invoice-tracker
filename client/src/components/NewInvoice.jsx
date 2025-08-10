import React, { useState } from "react";
import styles from "../styles/NewInvoice.module.css";

    const initialFormData = {
        client_name: "",
        amount: "",
        due_date: "",
        status: "pending",
        currency: "",
        purchase_order_number: "",
        number: "",
        notes: "",
    };

    function NewInvoice({ onAdd }) {
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call onAdd to send to (DashboardPage)
        await onAdd(formData);

        // Reset form after submit
        setFormData(initialFormData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };


    return (
        <form className={styles.formGroup} onSubmit={handleSubmit}>
            <h2>Submit An Invoice</h2>

            {/* Client label */}
            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Client</label>
                    <input type="text" name="client_name" required value={formData.client_name} onChange={handleChange} />
                </div>

            {/* Invoice label */}
                <div className={styles.inputGroup}>
                    <label>Invoice Number</label>
                    <input type="text" name="number" required value={formData.number} onChange={handleChange} />
                </div>
            </div>

            {/* Currency and status label */}
            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Currency</label>
                        <select name="currency" required value={formData.currency} onChange={handleChange}>
                            <option value="">Select a currency</option>
                            <option value="CAD">CAD</option>
                            <option value="USD">USD</option>
                        </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Status</label>
                        <select name="status" required value={formData.status} onChange={handleChange}>
                            <option value="">Select a status</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                            <option value="open">Open</option>
                        </select>
                </div>
                <div className={styles.inputGroup}>
                    <label>PO Number</label>
                    <input type="text" name="purchase_order_number" required value={formData.purchase_order_number} onChange={handleChange} />
                </div>
                
            </div>

            {/* Due date and amount label */}
            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Due Date</label>
                    <input type="date" name="due_date" required value={formData.due_date} onChange={handleChange} />
                </div>

                <div className={styles.inputGroup}>
                    <label>Amount</label>
                    <input type="number" name="amount" required value={formData.amount} onChange={handleChange} />
                </div>
            </div>

            {/* Notes label */}
            <div className={styles.fullWidth}>
                <label>Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} />
            </div>

            {/* Summary label */}
            <div className={styles.summary}>
                <div>
                    <div>Tax:</div>
                    <div>Discount:</div>
                    <div>Total:</div>
                </div>
            </div>

            <div className={styles.buttonRow}>
                <button type="submit" className={styles.sendButton}>Send Invoice</button>
            </div>
        </form>
        );
    }


export default NewInvoice;
