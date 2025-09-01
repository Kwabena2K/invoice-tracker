import { useState } from "react";

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

  function isFormValid(formData) {
    return (
      formData.client_name.trim() &&
      formData.number.trim() &&
      formData.currency &&
      formData.status &&
      formData.purchase_order_number &&
      formData.due_date &&
      formData.amount &&
      !isNaN(parseFloat(formData.amount)) &&
      parseFloat(formData.amount) > 0
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(`invoice[${key}]`, value);
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
        method: "POST",
        body: form,
      });

      const savedInvoice = await res.json();

      if (!res.ok) {
        const msg = savedInvoice.errors ? savedInvoice.errors.join(", ") : "Unknown error";
        throw new Error(msg);
      }

      // Reset form
      setFormData(initialFormData);

      // Add the new invoice to state
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

          <input
            type="text"
            name="purchase_order_number"
            placeholder="PO Number"
            value={formData.purchase_order_number}
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
      </div>

      <button
        type="submit"
        className="btn btn-success btn-lg w-full"
        disabled={!isFormValid(formData)}
      >
        Send Invoice
      </button>
    </form>
  );
}

export default NewInvoice;
