import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faFileUpload} from '@fortawesome/free-solid-svg-icons'

const initialFormData = {
    client_name: "",
    amount: "",
    due_date: "",
    status: "",
    currency: "",
    purchase_order_number: "",
    number: "",
    notes: "",
};

function NewInvoice({ onAdd }) {
    const [formData, setFormData] = useState(initialFormData);
    const [file, setFile] = useState(null);

    function isFormValid(formData) {
        return (
            formData.client_name.trim() &&
            formData.number.trim() &&
            formData.currency &&
            formData.status &&
            formData.due_date &&
            formData.amount &&
            !isNaN(parseFloat(formData.amount)) &&
            parseFloat(formData.amount) > 0
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let body;
            let headers = {};

            if (file) {
            // File upload option
            body = new FormData();
            
            Object.entries(formData).forEach(([key, value]) => {
                if (value) body.append(`invoice[${key}]`, value);
            });
            body.append("invoice[file]", file);
            
            } else {
            // Form mode option
            body = JSON.stringify({
                invoice: { ...formData, amount: parseFloat(formData.amount) },
            });
            headers["Content-Type"] = "application/json";
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
            method: "POST",
            headers,
            body,
            });

            if (!res.ok) throw new Error("Failed to create invoice");

            const savedInvoice = await res.json();

            // Reset form & file
            setFormData(initialFormData);
            setFile(null);

            onAdd(savedInvoice);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white rounded-box p-6 w-full max-w-4xl mx-auto flex flex-col gap-6"
        >
            <h2 className="text-2xl mb-4">Submit Invoice</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left side: Form fields */}
                <div className="flex-1 flex flex-col gap-4 bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Fill Form</h3>

                    <input
                        type="text"
                        name="client_name"
                        placeholder="Client Name"
                        value={formData.client_name}
                        onChange={handleChange}
                        className="input w-full"
                    />

                    <input
                        type="text"
                        name="number"
                        placeholder="Invoice Number"
                        value={formData.number}
                        onChange={handleChange}
                        className="input w-full"
                    />

                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="input w-full"
                    >
                        <option value="">Select Currency</option>
                        <option value="CAD">CAD</option>
                        <option value="USD">USD</option>
                    </select>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input w-full"
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="open">Open</option>
                    </select>

                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        className="input w-full"
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="input w-full"
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="textarea w-full"
                    />
                </div>

                {/* Right side: File upload */}
                <div className="flex-1 flex flex-col gap-4 bg-gray-700 p-4 rounded-lg items-center justify-center">
                    <h3 className="text-lg font-semibold mb-2">Upload File</h3>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept=".pdf,image/*"
                        id="invoice-file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                    />

                    {/* Label as button with FontAwesome icon */}
                    <label
                        htmlFor="invoice-file"
                        className="btn btn-primary flex items-center gap-2 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faFileUpload} size="2xl" />
                        <span>Choose File</span> {/* Optional, can remove text */}
                    </label>

                    {/* Show selected file name */}
                    {file && <p className="text-sm mt-2">{file.name}</p>}
                </div>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="btn btn-success btn-lg w-full"
                disabled={!file && !isFormValid(formData)}
            >
                {file ? "Upload Invoice" : "Send Invoice"}
            </button>
        </form>
    );
}

export default NewInvoice;
