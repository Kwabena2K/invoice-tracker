import React, { useState } from "react";
import styles from "../styles/NewInvoice.module.css";

function NewInvoice({ onAdd }) {
    const [formData, setFormData] = useState({
        client_name: "",
        amount: "",
        due_date: "",
        status: "pending",
        currency: "",
        purchase_order_number: "",
        number: "",
        notes: "",
        terms: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount),
                }),
            });

            if (!response.ok) throw new Error("Failed to save invoice");

            const savedInvoice = await response.json();

            setFormData({
                client_name: "",
                amount: "",
                due_date: "",
                status: "pending",
                currency: "",
                purchase_order_number: "",
                number: "",
                notes: "",
                terms: "",
            });

            onAdd(savedInvoice);
            await fetchInvoices();
        } catch (error) {
            console.error("Error submitting invoice:", error);
        }
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

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Client</label>
                    <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Invoice Number</label>
                    <input type="text" name="number" value={formData.number} onChange={handleChange} />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Currency</label>
                    <select name="currency" value={formData.currency} onChange={handleChange}>
                        <option value="">Select a currency</option>
                        <option value="CAD">CAD</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label>PO Number</label>
                    <input type="text" name="purchase_order_number" value={formData.purchase_order_number} onChange={handleChange} />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Due Date</label>
                    <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Terms</label>
                    <input type="text" name="terms" value={formData.terms} onChange={handleChange} />
                </div>
            </div>

            <div className={styles.fullWidth}>
                <label>Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} />
            </div>

            <div className={styles.summary}>
                <div>
                    <div>Tax:</div>
                    <div>Discount:</div>
                    <div>Total:</div>
                </div>
            </div>

            <div className={styles.buttonRow}>
                <button type="submit" className={styles.draftButton}>Save Draft</button>
                <button type="submit" className={styles.sendButton}>Send Invoice</button>
            </div>
        </form>
    );
}

export default NewInvoice;
