import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Phone, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="w-full bg-black px-6 py-4 flex items-center justify-between shadow-lg">
            <a href="/" className="flex items-center gap-3">
                <img src={logo} alt="Thành Đông" className="h-20 w-auto" />
            </a>

            {/* Mobile Menu Button */}
            <button
                className="block lg:hidden text-white"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Menu for larger screens */}
            <div className="hidden lg:flex flex-1 justify-center space-x-12">
                {[{ href: '#', label: 'Giới Thiệu' }, { href: '/booking', label: 'Vận chuyển hành khách' }, { href: '#', label: 'Chuyển phát nhanh' }, { href: '#', label: 'Tin tức' }, { href: '#', label: 'Liên Hệ' }].map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-white text-base font-medium px-2 py-1 rounded-lg hover:text-[#F2D7BE] transition"
                    >
                        {item.label}
                    </a>
                ))}
            </div>

            {/* Hotline button */}
            <button
                className="flex items-center px-6 py-2 rounded-full bg-[#F2D7BE] text-black font-semibold shadow transition hover:bg-[#e5c8b1] hover:text-white"
            >
                <Phone className="mr-2 w-5 h-5" />
                Hotline
            </button>

            {/* Mobile menu for small screens */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-black text-white">
                    {[{ href: '#', label: 'Giới Thiệu' }, { href: '/booking', label: 'Vận chuyển hành khách' }, { href: '#', label: 'Chuyển phát nhanh' }, { href: '#', label: 'Tin tức' }, { href: '#', label: 'Liên Hệ' }].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="block text-center text-base font-medium px-6 py-2 hover:text-[#F2D7BE] transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
