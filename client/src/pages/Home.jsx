import logo from "../assets/balanceBookLogo.png";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faClock, faFileInvoice, faFolderOpen} from '@fortawesome/free-solid-svg-icons'

// testing bg images
import backgroundImage from "../assets/hero-bg-2.jpg"
import backgroundImage3 from "../assets/hero-bg-3.jpg"
import backgroundImage2 from "../assets/hero-bg.jpg"





function Home() {

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0, 0, 0, 0.2)), url(${backgroundImage3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        height: '100vh', 
      };


    return (
        <div className="bg-gray-900">
            <div className="navbar bg-gray-800 text-white shadow-sm">
                <div className="flex-1 h-25 flex items-center">
                    <img src={logo} className="h-42 w-auto" />
                </div>
                <div className="flex gap-2">
                    <ul className="menu menu-horizontal gap-8 text-lg md:text-md items-center">
                        <li>
                        <Link to="/dashboard" className="text-white !no-underline">
                            Dashboard
                        </Link>
                        </li>
                        <input type="text" placeholder="Search" className="input bg-white text-black input-success input-bordered w-24 md:w-auto"/>
                    </ul>
                </div>
            </div>
            <div className="hero min-h-screen mb-30 shadow-3xl" style={backgroundStyle}>
                <div className="hero-overlay"></div>
                    <div className="hero-content text-left text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="text-[3rem] leading-none  w font-bold">
                                Track Invoices. <br />See Your Balance. Get Paid Faster.
                            </h1>
                            {/* whitespace-nowrap */}
                            <p className="py-6 ">
                                Simple invoicing with real-time running balances so you always know where you stand.
                            </p>

                           
                            <div className="flex gap-4">
                                <Link to="/dashboard" className="text-white !no-underline"><button className="btn btn-lg btn-primary">Create Your First Invoice</button>
                            </Link>
                            </div>
                        </div>
                    </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="card bg-gray-800 shadow-md p-6 cursor-pointer transition delay-100 duration-100 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-primary">
                        <div className="card-body items-center text-center">
                            <FontAwesomeIcon icon={faFileInvoice} size="3x"/>
                            <h2 className="card-title">Create & Send Invoices</h2>
                            <p>Create professional invoices instantly, with flexible options for manual entry or PDF upload.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-800 shadow-md p-6 cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-primary">
                        <div className="card-body items-center text-center">
                             <FontAwesomeIcon icon={faClock} size="3x"/>
                            <h2 className="card-title">Track Payment Status</h2>
                            <p>Stay on top of deadlines with clear sorting and reminders for upcoming payments.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-800 shadow-md p-6 cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-primary">
                        <div className="card-body items-center text-center">
                            <FontAwesomeIcon icon={faCalculator} size="3x" />
                            <h2 className="card-title">Automatic Running Balance</h2>
                            <p>Always know where you stand with automatic balance updates after every invoice or payment.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-800 shadow-md p-6 cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-primary">
                        <div className="card-body items-center text-center">
                            <FontAwesomeIcon icon={faFolderOpen} size="3x"/>
                            <h2 className="card-title">Organized Records</h2>
                            <p>Keep every invoice and payment neatly organized in one secure dashboard.</p>
                        </div>
                    </div>
            </div>
        </div>
    );
}
export default Home;