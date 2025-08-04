import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingForm from '../components/BookingForm';
import BookingInfo from '../components/BookingInfo';

export default function Booking() {
    return (
        <div className="font-sans text-gray-100">
            {/* Section Form nằm giữa nửa bên phải */}
            <section className="bg-white">
                <div className="w-full bg-gradient-to-b from-[#090909] to-[#76879F] py-20 px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
                        <div></div>
                        <div className="flex justify-center items-center">
                            <div className="w-full max-w-sm">
                                <BookingForm />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin bảng giá */}
                <div className="bg-white">
                    <BookingInfo />
                </div>
            </section>

            <ToastContainer position="top-center" />
        </div>
    );
}
