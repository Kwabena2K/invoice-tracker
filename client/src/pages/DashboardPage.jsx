import { useState, useEffect } from "react";
import InvoiceTable from "../components/InvoiceTable";
import styles from "../styles/DashboardPage.module.css";
import NewInvoice from "../components/NewInvoice";
import { Link } from "react-router-dom";
import clearPayLogo from "../assets/clearpayLogo.png";

function DashboardPage() {
    const [invoices, setInvoices] = useState([]);

    const fetchInvoices = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`);
            if (!res.ok) throw new Error("Failed to fetch invoices");
            const data = await res.json();
            setInvoices(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);


    const handleDeleteInvoice = async (invoiceId) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices/${invoiceId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete invoice");


        setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));

    };

    const handleAddInvoice = async (formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    invoice: {
                        ...formData,
                        amount: parseFloat(formData.amount),
                    }
                }),
            });
            if (!response.ok) throw new Error("Failed to create invoice");

            const savedInvoice = await response.json();
            setInvoices(prevInvoices => [savedInvoice, ...prevInvoices]);
        } catch (error) {
            console.error(error);
        }
    };

    const totalOpen = invoices.filter(inv => inv.status === 'open').length;
    const totalAmount = invoices.reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalPending = invoices.filter(inv => inv.status === 'pending').length;
    const totalOverdue = invoices.filter(inv => inv.status === 'overdue').length;
    const totalPaid = invoices.filter(inv => inv.status === 'paid').length;
    const totalPaidAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalPendingAmount = invoices.filter(inv => inv.status === "pending").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalOverdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);
    const totalOpenAmount = invoices.filter(inv => inv.status === "open").reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);

    const statusOrder = { overdue: 1, open: 2, pending: 3, paid: 4 };

    // Sort by date on load
    const sortedInvoices = [...invoices].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    return (
        <div className="bg-base-200 min-h-screen text-white">
            {/* Navbar */}
            <div className="navbar bg-base-100 text-white shadow-2xl">
                <div className="flex-1">
                    <img src={clearPayLogo} className="h-20 md:h-40" />
                </div>
                <div className="flex gap-2 mr-10">
                    <ul className="menu menu-horizontal gap-8 text-lg md:text-md">
                        <li>
                            <Link to="/home" className="text-white !no-underline">
                                Home
                            </Link>
                        </li>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input bg-white text-black input-info input-bordered w-24 md:w-auto"
                        />
                    </ul>
                </div>
            </div>

            {/* Page Header */}
            <div>
                <h1 className="text-5xl text-left ml-15.5 mt-10 mb-24">Invoices</h1>



                {/* Summary Cards */}
                <div className="flex justify-center mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-6 max-w-6xl w-full">

                        {/* All invoices */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">All Invoices</h5>
                            <p className="text-2xl font-bold">{invoices.length}</p>
                            <p className="text-sm text-gray-500 mt-1">Total: ${totalAmount.toFixed(2)}</p>
                        </div>

                        {/* Open invoices */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 shadow-md hover:bg-info hover:text-white  border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">Open Invoices</h5>
                            <p className="text-2xl font-bold">{totalOpen}</p>
                            <p className="text-sm mt-1">Total: ${totalOpenAmount.toFixed(2)}</p>
                        </div>

                        {/* Overdue */}
                        <div className="col-span-1 sm:col-span-2 p-6 text-center rounded-lg bg-white text-gray-800 shadow-md hover:bg-warning hover:text-white  border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">Overdue</h5>
                            <p className="text-2xl font-bold">{totalOverdue}</p>
                            <p className="text-sm mt-1">Total: ${totalOverdueAmount.toFixed(2)}</p>
                        </div>

                        {/* Pending */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 shadow-md border border-gray-200 hover:bg-error hover:text-white transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2 ">Pending</h5>
                            <p className="text-2xl font-bold">{totalPending}</p>
                            <p className="text-sm hover:text-white mt-1">Total: ${totalPendingAmount.toFixed(2)}</p>
                        </div>

                        {/* Paid */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 hover:bg-green-500 hover:text-white  shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">Paid</h5>
                            <p className="text-2xl font-bold">{totalPaid}</p>
                            <p className="text-sm mt-1">Total: ${totalPaidAmount.toFixed(2)}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Invoice Table & New Invoice */}
            <div className="flex flex-col p-8 gap-8 mx-auto my-0 border border-solid border-black/25">
                <NewInvoice onAdd={handleAddInvoice} />
                <div className={styles.invoiceList}>
                    <InvoiceTable invoices={sortedInvoices} onDelete={handleDeleteInvoice} />
                </div>
            </div>
        </div>
    );

}

export default DashboardPage;
