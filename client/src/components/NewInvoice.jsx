import React, { useState } from "react";
import styles from "../styles/NewInvoice.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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


    // Making sure all fields are entered before sending invoice
    function isFormValid(formData) {
        return (
            formData.client_name.trim() !== "" &&
            formData.number.trim() !== "" &&
            formData.currency.trim() !== "" &&
            formData.status.trim() !== "" &&
            formData.due_date.trim() !== "" &&
            formData.amount !== "" &&
            !isNaN(parseFloat(formData.amount)) &&
            parseFloat(formData.amount) > 0
        );
    }

    return (
        <>

        <form className="fieldset bg-base-200 border-base-300 rounded-box border p-6 w-4/5 max-w-5xl mx-auto" onSubmit={handleSubmit}>
            <h2>Submit Invoice</h2>
                <div className="flex flex-col gap-6">
                    

                    {/* Client label */}
                        <div className="flex flex-col flex-1">
                            <label>Client</label>
                            <input type="text" placeholder="Enter a Client Name (e.g Apple)" name="client_name" required value={formData.client_name} className="input w-full" onChange={handleChange} />
                        </div>

                    {/* Invoice label */}
                        <div className="flex flex-col flex-1">
                            <label>Invoice Number</label>
                            <input type="text" name="number" placeholder="Enter an Invoice Number (e.g Invoice #12345)" required  value={formData.number} className="input w-full" onChange={handleChange} />
                        </div>

                    {/* Currency and status label */}
                    <div className="flex flex-col flex-1">
                        <div className={styles.inputGroup}>
                            <label>Currency</label>
                                <select className="input w-full" name="currency" required value={formData.currency} onChange={handleChange}>
                                    <option value="">Select a currency</option>
                                    <option value="CAD">CAD</option>
                                    <option value="USD">USD</option>
                                </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label>Status</label>
                                <select className="input w-full" name="status" required value={formData.status} onChange={handleChange}>
                                    <option value="">Select a status</option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="overdue">Overdue</option>
                                    <option value="open">Open</option>
                                </select>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label>PO Number</label>
                            <input type="text" className="input w-full" name="purchase_order_number" required placeholder="PO Number" value={formData.purchase_order_number} onChange={handleChange} />
                        </div>
                        
                    </div>

                    {/* Due date and amount label */}
                    
                        <div className="flex flex-col flex-1">
                            <label>Due Date</label>
                            <input type="date" className="input w-full" name="due_date" required value={formData.due_date} onChange={handleChange} />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label>Amount</label>
                            <input type="number"className="input w-full" placeholder="Please enter an amount" name="amount" min={0} required  value={formData.amount} onChange={handleChange} />
                        </div>
                    

                    {/* Notes label */}
                    <div className="flex flex-col flex-1">
                        <label>Notes</label>
                        <textarea name="notes" className="textarea w-full" placeholder="Please enter any additional notes" value={formData.notes} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col flex-1">
                        <button type="submit" className={styles.sendButton} disabled={!isFormValid(formData)}>Send Invoice</button>
                    </div>
                </div>
        </form>
        </>
        );
    }


export default NewInvoice;
