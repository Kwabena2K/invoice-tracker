function InvoiceTable({ invoices, onDelete }) {
  let runningBalance = 0;

  return (
    <div className="overflow-x-auto w-3/4 mx-auto rounded-lg border-2 border-success">
      <table className="table w-full bg-white text-black">
        <thead>
          <tr className="uppercase text-center text-black">
            <th className="border border-gray-400">Client</th>
            <th className="border border-gray-400">Currency</th>
            <th className="border border-gray-400">PO Number</th>
            <th className="border border-gray-400">Notes</th>
            <th className="border border-gray-400">Invoice #</th>
            <th className="border border-gray-400">Due Date</th>
            <th className="border border-gray-400">Amount</th>
            <th className="border border-gray-400">Running Balance</th>
            <th className="border border-gray-400">Status</th>
            <th className="border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const clientName = invoice.clientName || invoice.client_name || "Unknown Client";

            const dueDateValue = invoice.dueDate || invoice.due_date;
            const formattedDueDate = dueDateValue
              ? new Date(dueDateValue).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A";

            const currencyCode = ["USD", "CAD", "EUR", "GBP"].includes(invoice.currency)
              ? invoice.currency
              : "CAD";

            const amountNum = Number(invoice.amount) || 0;
            let displayAmount = "$0.00";
            try {
              displayAmount = new Intl.NumberFormat(
                currencyCode === "USD" ? "en-US" : currencyCode === "CAD" ? "en-CA" : "en-US",
                { style: "currency", currency: currencyCode }
              ).format(amountNum);
            } catch (e) {
              console.warn("Invalid currency code:", currencyCode, e);
            }

            if (invoice.status !== "paid") {
              runningBalance += amountNum;
            }

            const handleDeleteClick = () => {
              if (
                window.confirm(
                  `Delete invoice #${invoice.number || "N/A"}? This action cannot be undone.`
                )
              ) {
                onDelete(invoice.id);
              }
            };

            const statusMap = {
              paid: "badge-success",
              pending: "badge-warning",
              overdue: "badge-error",
              open: "badge-info",
            };

            return (
              <tr key={invoice.id} className="text-center">
                <td className="border border-gray-400">{clientName}</td>
                <td className="border border-gray-400">{currencyCode}</td>
                <td className="border border-gray-400">{invoice.purchase_order_number || "N/A"}</td>
                <td className="border border-gray-400">{invoice.notes || "None"}</td>
                <td className="border border-gray-400">{invoice.number || "N/A"}</td>
                <td className="border border-gray-400">{formattedDueDate}</td>
                <td className="font-bold border border-gray-400">{displayAmount}</td>
                <td className="border border-gray-400 font-bold">
                  ${runningBalance.toFixed(2)}
                </td>
                <td className="border border-gray-400">
                  <span
                    className={`badge capitalize ${
                      statusMap[invoice.status] || "badge-warning"
                    }`}
                  >
                    {invoice.status || "pending"}
                  </span>
                </td>
                <td className="border border-gray-400">
                  <button
                    className="btn btn-dash btn-error"
                    onClick={handleDeleteClick}
                    aria-label={`Delete invoice ${invoice.number}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;
