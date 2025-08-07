import React, { useState } from "react";
import styles from "../styles/NewInvoice.module.css";

function NewInvoiceForm ({onAdd}){
    const [formData, setFormData] = useState({
            clientName: "",
            amount: "",
            dueDate: "",
            status: "pending",
            currency: "",
            purchase_order_number:"",
            number:"",
            notes:"",
            terms:"",

    })

    const handleSubmit = (e) => {
        e.preventDefault(); 

    const newInvoice = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount),
    };
    
    setFormData({
            clientName: "",
            amount: "",
            dueDate: "",
            status: "pending",
            currency: "",
            purchase_order_number:"",
            number:"",
            notes:"",
            terms:"",
        })

    onAdd(newInvoice); 
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    
    return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Client</h3>
        <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            required
        />
        <h3>Invoice Number</h3>
        <input
            type="text"
            name="number"
            placeholder="Invoice Number"
            value={formData.number}
            onChange={handleChange}
            required
        />
        <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
        />
        <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="">Select a currency</option>
            <option value="CAD">CAD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
        </select>
        <h3>PO Number</h3>
        <input
            type="text"
            name="purchase_order_number"
            placeholder="PO Number"
            value={formData.purchase_order_number}
            onChange={handleChange}
            required
        />
        <h3>Terms</h3>
        <input
            type="text"
            name="terms"
            placeholder="Terms"
            value={formData.terms}
            onChange={handleChange}
            
        />
        <h3>Date</h3>
        <input
            type="date"
            min="2025-05-01" 
            max="2025-12-31"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="open">Open</option>
            <option value="overdue">Overdue</option>
            <option value="paid">Paid</option>
        </select>
        <button type="submit">Add Invoice</button>
    </form>
    );

}

export default NewInvoiceForm;