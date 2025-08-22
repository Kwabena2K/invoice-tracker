// import styles from "../styles/InvoiceCard.module.css";
    import clearPayLogo from "../assets/clearpay.png";


    function InvoiceCard({ invoice, onDelete }) {
        const currencyCode = invoice.currency || "CAD";
        const amountNum = Number(invoice.amount) || 0;
        

        // Format amount with currency symbol
        const formattedAmount = new Intl.NumberFormat( 
            currencyCode === "USD" ? "en-US" : 
            currencyCode === "CAD" ? "en-CA" : 
            "en-US", {
            style: "currency",
            currency: currencyCode,
            currencyDisplay: "symbol",
        }).format(amountNum);

        const displayAmount = `${formattedAmount} ${currencyCode}`;


          const handleDeleteClick = () => {
            if (window.confirm(`Delete invoice #${invoice.number}? This action cannot be undone.`)) {
            onDelete(invoice.id);
            }
        };

        const statusMap = {
            paid: "badge-success",
            pending: "badge-warning",
            overdue: "badge-error",
            open: "badge-info",
        };


        // Handle both camelCase and snake_case for react and rails server
        const clientName = invoice.clientName || invoice.client_name || "Unknown Client";

        const dueDateValue = invoice.dueDate || invoice.due_date;
        const formattedDueDate = dueDateValue
            ? new Date(dueDateValue).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
            : "N/A";

    return (
        <>
        {/* <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                Card Title
                <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div> */}
        <div className="flex flex-row gap-6">
            <div className="card bg-base-100 w-1/2 shadow-sm">
                <figure>
                    <img
                    src={clearPayLogo} className="h-40"
                    alt="Shoes"/>
                </figure>
                <div className="card-body text-black">
                    <h2 className="card-title">{clientName}</h2>
                    <p><strong>Currency:</strong> {invoice.currency || "N/A"}</p>
                    <p><strong>PO Number:</strong> {invoice.purchase_order_number || "N/A"}</p>
                    <p><strong>Notes:</strong> {invoice.notes || "None"}</p>
                    <p><strong>Invoice #:</strong> {invoice.number || "N/A"}</p>
                    <p><strong>Due Date:</strong> {formattedDueDate}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-warning" onClick={handleDeleteClick} aria-label={`Delete invoice ${invoice.number}`}>Delete</button>
                    </div>
                </div>
               <div className="flex flex-col items-center justify-end gap-2">
                    <p className="font-bold text-base w-48 truncate">
                        {displayAmount}
                    </p>
                    <span className={`badge capitalize ${statusMap[invoice.status] || "badge-warning"}`}>
                        {invoice.status || "pending"}
                    </span>
                </div>

            </div>
        </div>
    </>
    );
}

export default InvoiceCard;
