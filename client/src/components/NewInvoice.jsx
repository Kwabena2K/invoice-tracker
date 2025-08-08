import React, { useState } from "react";
import styles from "../styles/NewInvoice.module.css";


function NewInvoice ({onAdd}){
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
    <>
        <form className={styles.formGroup} onSubmit={handleSubmit}>
            <h2>Submit An Invoice</h2>
            <div className={styles.row}>
                <div className={styles.inputGroup}>
                <label>Client</label>
                <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} />
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
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
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

            
            {/* <div className={styles.itemTable}>
                <div className={styles.itemHeader}>
                <div>Item</div>
                <div>Quantity</div>
                <div>Unit Price</div>
                <div>Total</div>
                </div>
                <div className={styles.itemRow}>
                <input type="text" placeholder="Item" />
                <input type="number" placeholder="Qty" />
                <input type="number" placeholder="Unit Price" />
                <input type="number" placeholder="Total" disabled />
                </div>
                <button type="button" className={styles.addItem}>+ Add Item</button>
            </div> */}

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
    </>
    
    );

}

export default NewInvoice;