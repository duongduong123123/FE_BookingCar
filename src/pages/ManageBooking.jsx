// src/components/ManageBooking.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';
import SummaryApi from '../common/SummaryApi';
import Login from '../components/Login';

// Lấy filename từ header RFC5987
const getFilenameFromDisposition = (disp) => {
    const match = /filename\*=(?:UTF-8'')?(.+)$/.exec(disp);
    if (match && match[1]) {
        try {
            return decodeURIComponent(match[1]);
        } catch {
            return match[1];
        }
    }
    return 'bookings.xlsx';
};

export default function ManageBooking() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateFilter, setDateFilter] = useState(null);
    const bookingsPerPage = 10;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setIsLoggedIn(true);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;
        const fetchBookings = async () => {
            setFetching(true);
            try {
                const resp = await SummaryApi.booking.getAll();
                const data = Array.isArray(resp.bookings)
                    ? resp.bookings
                    : Array.isArray(resp.data)
                        ? resp.data
                        : Array.isArray(resp)
                            ? resp
                            : [];
                setBookings(data);
                // toast.success(`Tải ${data.length} booking thành công!`);
                toast.success(`Tải danh sách đặt xe thành công!`);
            } catch {
                toast.error('Không thể tải danh sách đặt xe');
            } finally {
                setFetching(false);
            }
        };
        fetchBookings();
    }, [isLoggedIn]);

    const columns = [
        { label: 'STT', width: 'w-12' },
        { label: 'Họ tên', width: 'w-48' },
        { label: 'Số điện thoại', width: 'w-32' },
        { label: 'Điểm đón', width: 'w-56' },
        { label: 'Điểm đến', width: 'w-56' },
        { label: 'Ngày', width: 'w-24' },
        { label: 'Giờ', width: 'w-24' },
        { label: 'Hành lý', width: 'w-24' },
        { label: 'Thời gian tạo', width: 'w-48' },
    ];

    const filtered = dateFilter
        ? bookings.filter((b) => {
            const dt = b.scheduledTime ? new Date(b.scheduledTime) : null;
            return dt && dt.toDateString() === dateFilter.toDateString();
        })
        : bookings;

    const totalPages = Math.ceil(filtered.length / bookingsPerPage);
    const paginatedBookings = filtered.slice(
        (currentPage - 1) * bookingsPerPage,
        currentPage * bookingsPerPage
    );

    const handleExport = async () => {
        if (!bookings.length) {
            toast.error('Không có dữ liệu để xuất');
            return;
        }
        setFetching(true);
        try {
            let dateParam;
            if (dateFilter) {
                const yyyy = dateFilter.getFullYear();
                const mm = String(dateFilter.getMonth() + 1).padStart(2, '0');
                const dd = String(dateFilter.getDate()).padStart(2, '0');
                dateParam = `${yyyy}-${mm}-${dd}`;
            }
            const { blob, headers } = await SummaryApi.booking.exportBookingsToExcel({ date: dateParam });
            const disposition = headers.get('content-disposition') || '';
            const fileName = getFilenameFromDisposition(disposition);
            saveAs(blob, fileName);
            toast.success('Xuất file Excel thành công!');
        } catch (err) {
            console.error(err);
            toast.error('Xuất file Excel thất bại');
        } finally {
            setFetching(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        toast.success('Đã đăng xuất!');
        setTimeout(() => window.location.reload(), 500);
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            {!isLoggedIn ? (
                <Login onSuccess={() => setIsLoggedIn(true)} />
            ) : (
                <div className="min-h-screen bg-gray-900 p-8 text-gray-100 relative">
                    <div className="fixed bottom-4 right-4 flex space-x-3 z-50">
                        <button
                            onClick={handleExport}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition"
                            disabled={fetching || filtered.length === 0}
                        >
                            {fetching ? 'Đang xử lý...' : 'Xuất file Excel'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
                        >
                            Đăng xuất
                        </button>
                    </div>

                    {fetching && !bookings.length ? (
                        <div>Đang tải...</div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mb-4 text-orange-300">Danh sách Đặt xe</h2>

                            <div className="mb-6 flex items-center space-x-4 flex-wrap">
                                <label className="text-gray-200">Lọc theo ngày:</label>
                                <DatePicker
                                    selected={dateFilter}
                                    onChange={(date) => {
                                        setDateFilter(date);
                                        setCurrentPage(1);
                                    }}
                                    placeholderText="Chọn ngày"
                                    dateFormat="dd/MM/yyyy"
                                    className="p-2 rounded bg-gray-700 text-white"
                                    isClearable
                                />
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow border border-gray-700 bg-gray-800">
                                <table className="min-w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-orange-300 text-gray-900">
                                            {columns.map((col, i) => (
                                                <th
                                                    key={i}
                                                    className={`px-4 py-2 ${col.width} text-center`}
                                                >
                                                    {col.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedBookings.length === 0 ? (
                                            <tr>
                                                <td colSpan={columns.length} className="text-center py-4">
                                                    Không có booking nào
                                                </td>
                                            </tr>
                                        ) : (
                                            paginatedBookings.map((b, i) => {
                                                const dt = b.scheduledTime ? new Date(b.scheduledTime) : null;
                                                const dateStr = dt ? dt.toLocaleDateString('vi-VN') : '';
                                                const timeStr = dt
                                                    ? dt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                                                    : '';
                                                const created = b.createdAt ? new Date(b.createdAt) : null;
                                                const createdStr = created
                                                    ? `${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()} ${created.toLocaleTimeString('vi-VN')}`
                                                    : '';
                                                const serial = (currentPage - 1) * bookingsPerPage + i + 1;
                                                const values = [
                                                    serial,
                                                    b.fullName,
                                                    b.phone,
                                                    b.pickupLocation,
                                                    b.destinationLocation,
                                                    dateStr,
                                                    timeStr,
                                                    b.luggage,
                                                    createdStr,
                                                ];

                                                return (
                                                    <tr
                                                        key={i}
                                                        className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                                                    >
                                                        {values.map((val, j) => (
                                                            <td
                                                                key={j}
                                                                className={`px-4 py-2 ${columns[j].width} text-center`}
                                                            >
                                                                {val}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-800 p-2 rounded-full border border-orange-300">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 bg-gray-700 rounded"
                                    >
                                        &lt;
                                    </button>
                                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setCurrentPage(p)}
                                            className={`px-3 py-1 rounded ${p === currentPage ? 'bg-orange-300 text-gray-900' : 'bg-gray-700'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 bg-gray-700 rounded"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
