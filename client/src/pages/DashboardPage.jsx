import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import InvoiceTable from "../components/InvoiceTable";
import NewInvoice from "../components/NewInvoice";
import logo from "../assets/balanceBookLogo.png";

function DashboardPage({ invoices: propInvoices = [], setUser, setInvoices: setPropInvoices }) {
    const [invoices, setInvoices] = useState(Array.isArray(propInvoices) ? propInvoices : []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch invoices
    const fetchInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
                credentials: "include",
            });

            if (res.status === 401) {
                // Unauthorized
                if (setUser) setUser(null);
                navigate("/login", { replace: true });
                return;
            }

            if (!res.ok) throw new Error("Failed to fetch invoices");

            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("Invalid response from server");

            setInvoices(data);
            if (setPropInvoices) setPropInvoices(data);
        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    // Add invoice
    const handleAddInvoice = (newInvoice) => {
        setInvoices((prev) => [newInvoice, ...prev]);
        if (setPropInvoices) setPropInvoices((prev) => [newInvoice, ...prev]);
    };

    // Delete invoice
    const handleDeleteInvoice = async (invoiceId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/invoices/${invoiceId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to delete invoice");

            setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
            if (setPropInvoices) setPropInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/sign_out`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to log out");

            setUser(null); // clear user state in App
            navigate("/login", { replace: true }); // redirect to login
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    // Safe invoices array
    const safeInvoices = Array.isArray(invoices) ? invoices : [];


    const totalAmount = useMemo(
        () => safeInvoices.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0),
        [safeInvoices]
    );
    const totalOpen = useMemo(() => safeInvoices.filter((inv) => inv.status === "open").length, [safeInvoices]);
    const totalPending = useMemo(() => safeInvoices.filter((inv) => inv.status === "pending").length, [safeInvoices]);
    const totalOverdue = useMemo(() => safeInvoices.filter((inv) => inv.status === "overdue").length, [safeInvoices]);
    const totalPaid = useMemo(() => safeInvoices.filter((inv) => inv.status === "paid").length, [safeInvoices]);

    const totalOpenAmount = useMemo(() =>
        safeInvoices.filter((inv) => inv.status === "open").reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0),
        [safeInvoices]
    );
    const totalPendingAmount = useMemo(() =>
        safeInvoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0),
        [safeInvoices]
    );
    const totalOverdueAmount = useMemo(() =>
        safeInvoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0),
        [safeInvoices]
    );
    const totalPaidAmount = useMemo(() =>
        safeInvoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0),
        [safeInvoices]
    );

    // sort by due date
    const sortedInvoices = useMemo(() =>
        [...safeInvoices].sort((a, b) => new Date(a.due_date || 0) - new Date(b.due_date || 0)),
        [safeInvoices]
    );

    if (loading) return <p className="text-white text-center mt-20">Loading invoices...</p>;
    if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Navbar */}
            <div className="navbar bg-gray-800 text-white shadow-sm">
                <div className="flex-1 h-25 flex items-center">
                    <img src={logo} className="h-42 w-auto" />
                </div>
                <div className="flex gap-2">
                    <ul className="menu menu-horizontal gap-2 text-lg md:text-md items-center">
                        <li>
                            <Link to="/home" className="text-white !no-underline">Home</Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="btn btn-active btn-error"
                            >
                                Logout
                            </button>
                        </li>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input bg-white text-black input-success input-bordered w-24 md:w-auto"
                        />
                    </ul>
                </div>
            </div>

            {/* Page Header */}
            <div>
                <h1 className="text-5xl text-left ml-15.5 mt-10 mb-24">Invoicing</h1>

                {/* Summary Cards */}
                <div className="flex justify-center mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-6 max-w-6xl w-full">

                        {/* All invoices */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 shadow-md border-4 border-black hover:text-white hover:bg-gray-400 transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">All Invoices</h5>
                            <p className="text-2xl font-bold">{invoices.length}</p>
                            <p className="text-sm mt-1">Total: ${totalAmount.toFixed(2)}</p>
                        </div>

                        {/* Open invoices */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 shadow-md hover:bg-info hover:text-white border-4 border-black hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">Open Invoices</h5>
                            <p className="text-2xl font-bold">{totalOpen}</p>
                            <p className="text-sm mt-1">Total: ${totalOpenAmount.toFixed(2)}</p>
                        </div>

                        {/* Overdue */}
                        <div className="col-span-1 sm:col-span-2 p-6 text-center rounded-lg bg-white text-gray-800 shadow-md hover:bg-warning hover:text-white border-4 border-black hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">Overdue</h5>
                            <p className="text-2xl font-bold">{totalOverdue}</p>
                            <p className="text-sm mt-1">Total: ${totalOverdueAmount.toFixed(2)}</p>
                        </div>

                        {/* Pending */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 shadow-md border-4 border-black hover:bg-error hover:text-white transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2 ">Pending</h5>
                            <p className="text-2xl font-bold">{totalPending}</p>
                            <p className="text-sm hover:text-white mt-1">Total: ${totalPendingAmount.toFixed(2)}</p>
                        </div>

                        {/* Paid */}
                        <div className="p-6 text-center col-span-1 sm:col-span-2 rounded-lg bg-white text-gray-800 hover:bg-green-500 hover:text-white  shadow-md border-4 border-black hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <h5 className="text-lg font-semibold mb-2">Paid</h5>
                            <p className="text-2xl font-bold">{totalPaid}</p>
                            <p className="text-sm mt-1">Total: ${totalPaidAmount.toFixed(2)}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-col p-8 gap-8 mx-auto my-0">
                <NewInvoice onAdd={handleAddInvoice} />
                <InvoiceTable invoices={sortedInvoices} onDelete={handleDeleteInvoice} />
            </div>
        </div>
    );
}

export default DashboardPage;
