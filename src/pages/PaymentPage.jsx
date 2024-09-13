import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

const PaymentPage = () => {
    return (
        <div>
            <Navbar />
            {/* Payment Strip */}
            <section className="bg-gradient-to-r from-indigo-900 via-blue-500 to-blue-400  text-white text-center py-24 mt-8 px-6 max-w-6xl mx-auto rounded-none md:rounded-3xl" >
                <h1 className="text-4xl font-bold">Checkout</h1>
            </section>

            <div className="font-sans bg-white p-4 pt-16 pb-32">
                <div className="max-w-4xl mx-auto">

                    <div className="mt-12">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-6xl font-extrabold bg-gradient-to-bl from-indigo-500 to-blue-400 bg-clip-text text-transparent">01</h3>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
                            </div>

                            <div className="md:col-span-2">
                                <form>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" placeholder="First name"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Last name"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <input type="email" placeholder="Email address"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <input type="number" placeholder="Phone number"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mt-12">
                            <div>
                                <h3 className="text-6xl font-extrabold bg-gradient-to-bl from-indigo-500 to-blue-400 bg-clip-text text-transparent">02</h3>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">Billing Address</h3>
                            </div>

                            <div className="md:col-span-2">
                                <form>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" placeholder="Street address"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="City"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="State"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <input type="number" placeholder="Zip Code"
                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mt-12">
                            <div>
                                <h3 className="text-6xl font-extrabold bg-gradient-to-bl from-indigo-500 to-blue-400 bg-clip-text text-transparent">03</h3>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center">
                                        <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                                        <label for="card" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                            <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                            <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                                        <label for="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-4 gap-4 mt-4">
                                    <div className="col-span-2">
                                        <input type="number" placeholder="Card number"
                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <input type="number" placeholder="EXP."
                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <input type="number" placeholder="CVV"
                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-4 mt-12">
                            <button type="button"
                                className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-full hover:bg-gray-100">Pay later</button>
                            <button type="button"
                                className="min-w-min px-8 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">Pay now</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentPage