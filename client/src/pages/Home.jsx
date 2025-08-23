import clearPayLogo from "../assets/clearpayLogo.png";
import {Link} from "react-router-dom"

function Home() {



    return (
        <div>
            <div className="navbar bg-base-200 text-white shadow-sm">
                
                <div className="flex-1">
                    <img src={clearPayLogo} className="h-20 md:h-40" />
                </div>
                <div className="flex gap-2">
                    <ul className="menu menu-horizontal gap-8 text-lg md:text-md">
                        <li>
                            <Link to="/dashboard" className="text-white !no-underline">
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" className="text-white !no-underline">
                            Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-white !no-underline">
                            About
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-white !no-underline">
                            Login
                            </Link>
                        </li>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input bg-white text-black input-info input-bordered w-24 md:w-auto"
                        />
                        {/* <input type="checkbox" value="synthwave" className="toggle theme-controller" /> */}
                    </ul>
                </div>
            </div>
            <div className="hero min-h-screen">
                <div className="hero-content text-left">
                    <div className="max-w-md">
                    <h1 className="text-5xl text-left font-bold">Track Invoices. <br />See Your Balance. Get Paid Faster.</h1>
                    <p className="py-6">
                        Simple invoicing with real-time running balances so you always know where you stand.
                    </p>
                    <button className="btn btn-primary mx-5">Get Started Free</button>
                    <button className="btn btn-primary">Create Your First Invoice</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="card bg-base-100 shadow-2xl p-6">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Create & Send Invoices</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                        <figure>
                            <img
                            src=""
                            alt="" className="w-1/2"/>
                        </figure>
                    </div>
                    <div className="card bg-base-100 shadow-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Track Payment Status</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                        <figure>
                            <img
                            src=""
                            alt="" className="w-1/2"/>
                        </figure>
                    </div>
                    <div className="card bg-base-100 shadow-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Automatic Running Balance</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                        <figure>
                            <img
                            src=""
                            alt="" className="w-1/2"/>
                        </figure>
                    </div>
                    <div className="card bg-base-100 shadow-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Multiple Currency Support</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        </div>
                        <figure>
                            <img
                            src=""
                            alt="" className="w-1/2"/>
                        </figure>
                    </div>
            </div>


        </div>
    );
}
export default Home;