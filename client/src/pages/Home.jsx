import clearPayLogo from "../assets/clearpayLogo.png";
import {Routes, Route, Link} from "react-router-dom"

function Home() {



    return (
        <>
        <div className="navbar bg-base-200 text-white shadow-sm">
            
            <div className="logo mb-2 md:mb-0">
                <img src={clearPayLogo} className="h-20 md:h-40" />
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-20 gap-8 text-lg md:text-md">
                    <li>
                        <Link to="/dashboard" className="text-white !no-underline hover:text-black ">
                        Dashboard
                        </Link>
                    </li>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input bg-white text-black input-primary input-bordered w-24 md:w-auto"
                    />
                </ul>
            </div>
        </div>
        {/* <section id="home">
            <header className="relative bg-white bg-center h-screen">
                <div className="absolute inset-0 bg-opacity-50"></div>
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 relative">
                    <div className="logo mb-4 md:mb-0">
                        <img src={clearPayLogo} className="h-25 md:h-30" />
                    </div>
                    <nav className="w-full md:w-auto">
                        <div className="flex justify-end items-center md:hidden">
                            <button onClick={toggleMobileMenu} className="text-white focus:outline-none z-19 mt-2" aria-label="Toggle mobile menu">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className={`fixed top-0 right-0 h-full w-full z-30 bg-gray-800 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:static md:flex md:flex-row md:space-x-10 md:bg-transparent md:translate-x-0 md:transform-none`}>
                            <li className="mt-10 md:mt-0"><a href="#home" className="block hover:underline font-bold text-md text-white hover:text-yellow-500 p-4" onClick={closeMobileMenu}>HOME</a></li>
                            <li><a href="#about" className="block text-white hover:underline hover:text-yellow-500 text-md font-bold p-4" onClick={closeMobileMenu}>ABOUT</a></li>
                            <li><a href="#services" className="block text-white hover:underline hover:text-yellow-500 text-md font-bold p-4" onClick={closeMobileMenu}>OUR SERVICES</a></li>
                            <li><a href="#contact" className="block hover:underline text-white hover:text-yellow-500 text-md font-bold p-4" onClick={closeMobileMenu}>CONTACT</a></li>
                            <li><a href=""><button className="bg-black text-white py-2 px-4 md:py-4 md:px-6 rounded hover:bg-white hover:text-black font-semibold transition ease-out duration-300 cursor-pointer uppercase" onClick={closeMobileMenu} aria-label="Book an Appointment">BOOK NOW</button></a></li>
                        </ul>
                    </nav>
                </div>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 ${isMobileMenuOpen ? 'block' : 'hidden'}`} onClick={closeMobileMenu}></div>
            </header>
        </section> */}
        </>
    );
}
export default Home;