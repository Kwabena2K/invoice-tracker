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
  const [loading, setLoading] = useState(false);

  function isFormValid(data) {
    return (
      data.client_name.trim() &&
      data.number.trim() &&
      data.currency &&
      data.status &&
      data.purchase_order_number &&
      data.due_date &&
      data.amount &&
      !isNaN(parseFloat(data.amount)) &&
      parseFloat(data.amount) > 0
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid(formData)) return;

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(`invoice[${key}]`, value);
      });

      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const savedInvoice = await res.json();
      if (!res.ok) throw new Error(savedInvoice.errors?.join(", ") || "Unknown error");


      setFormData(initialFormData); // reset form
      onAdd(savedInvoice); // add to dashboard state
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
        disabled={!isFormValid(formData) || loading}
      >
        {loading ? "Sending..." : "Send Invoice"}
      </button>
    </form>
  );
}

export default NewInvoice;
