import clearPayLogo from "../assets/clearpay.png";
function InvoiceTable({ invoices, onDelete }) {
	let runningBalance = 0;
	return (
		<div className="overflow-x-auto w-3/4 mx-auto rounded-lg border-2 border-info">
			<table className="table w-full bg-white text-black ">
				<thead>
					<tr className="uppercase text-center text-black">
								{/* 
						<th>Logo</th>
						*/}
						<th className="border border-gray-400">Client</th>
						<th className="border border-gray-400">Currency</th>
						<th className="border border-gray-400">PO Number</th>
						<th className="border border-gray-400">Notes</th>
						<th className="border border-gray-400">Invoice #</th>
						<th className="border border-gray-400">Due Date</th>
						<th className="border border-gray-400">Amount</th>
						<th className="border border-gray-400">Status</th>
						<th className="border border-gray-400">Action</th>
						<th className="border border-gray-400">Running Balance</th>
					</tr>
				</thead>
				<tbody>
					{/* Mapping over invoices instead of invoice previously to switch to a shared table instead of card layout */}
					{invoices.map(invoice => {
						// Handle camelCase and snake_case
						const clientName = invoice.clientName || invoice.client_name || "Unknown Client";
						const dueDateValue = invoice.dueDate || invoice.due_date;
						const formattedDueDate = dueDateValue
							? new Date(dueDateValue).toLocaleDateString(undefined, {
								year: "numeric",
								month: "short",
								day: "numeric",
							})
							: "N/A";
						const currencyCode = invoice.currency || "CAD";
						const amountNum = Number(invoice.amount) || 0;
						const displayAmount = new Intl.NumberFormat(
							currencyCode === "USD" ? "en-US" :
								currencyCode === "CAD" ? "en-CA" :
									"en-US",
							{ style: "currency", currency: currencyCode }
						).format(amountNum);
						const handleDeleteClick = () => {
							if (window.confirm(`Delete invoice #${invoice.number || "N/A"}? This action cannot be undone.`)) {
								onDelete(invoice.id);
							}
						};
						// Running balance counter
						const amount = Number(invoice.amount) || 0;
						if (invoice.status !== "paid") {
							runningBalance += amount;
						}
						const statusMap = {
							paid: "badge-success",
							pending: "badge-warning",
							overdue: "badge-error",
							open: "badge-info",
						};
						return (
							<tr key={invoice.id} className="text-center">
								{/* Each client has a their own logo? */}
								{/* <td>
									<img src={clearPayLogo} className="h-12 w-auto" alt="Invoice Logo" />
								</td>
								*/}
								<td className="border border-gray-400">{clientName}</td>
								<td className="border border-gray-400">{invoice.currency || "N/A"}</td>
								<td className="border border-gray-400">{invoice.purchase_order_number || "N/A"}</td>
								<td className="border border-gray-400">{invoice.notes || "None"}</td>
								<td className="border border-gray-400">{invoice.number || "N/A"}</td>
								<td className="border border-gray-400">{formattedDueDate}</td>
								<td className="font-bold border border-gray-400">{displayAmount}</td>
								<td className="border border-gray-400">
									<span className={`badge capitalize ${statusMap[invoice.status] || "badge-warning"}`}>
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
								<td className="border border-gray-400 font-bold">
									${runningBalance.toFixed(2)}
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
