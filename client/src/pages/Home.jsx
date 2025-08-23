import clearPayLogo from "../assets/clearpayLogo.png";
import {Routes, Route, Link} from "react-router-dom"

function Home() {



    return (
        <>
        <div className="navbar bg-base-200 text-white shadow-sm">
            
            <div className="flex-1">
                <img src={clearPayLogo} className="h-20 md:h-40" />
            </div>
            <div className="flex gap-2 mr-10">
                <ul className="menu menu-horizontal gap-8 text-lg md:text-md">
                    <li>
                        <Link to="/dashboard" className="text-white !no-underline">
                        Dashboard
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

        </>
    );
}
export default Home;