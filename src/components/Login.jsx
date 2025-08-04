import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../common/SummaryApi";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onSuccess }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputClasses =
        "w-full h-10 px-3 rounded-lg bg-[#71809B] border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition";

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = form;

        if (!username.trim() || !password.trim()) {
            toast.error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
            return;
        }
        if (username.length > 20) {
            toast.error("Tên đăng nhập tối đa 20 ký tự");
            return;
        }
        if (!/^[a-zA-Z0-9_.]+$/.test(username.trim())) {
            toast.error("Tên đăng nhập chỉ gồm chữ, số, dấu _ hoặc .");
            return;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu tối thiểu 6 ký tự");
            return;
        }
        if (password.length > 32) {
            toast.error("Mật khẩu tối đa 32 ký tự");
            return;
        }

        setLoading(true);
        try {
            const { status, ok, payload } = await SummaryApi.admin.loginAdmin(username.trim(), password);
            console.log("[LoginResponse]", status, payload);

            if (ok) {
                toast.success(payload.message || "Đăng nhập thành công!");
                localStorage.setItem("token", payload.token);
                setForm({ username: "", password: "" });
                if (onSuccess) onSuccess(payload);
                setTimeout(() => {
                    navigate("/manage-booking");
                }, 500);
            } else {
                switch (status) {
                    case 400:
                        toast.error(payload.message || "Mật khẩu không hợp lệ");
                        break;
                    case 401:
                        toast.error(payload.message || "Chưa xác thực hoặc sai thông tin đăng nhập");
                        break;
                    case 403:
                        toast.error(payload.message || "Từ chối truy cập: không phải quản trị viên");
                        break;
                    case 404:
                        toast.error(payload.message || "Không tìm thấy người dùng");
                        break;
                    case 500:
                        toast.error(payload.message || "Lỗi máy chủ, vui lòng thử lại sau");
                        break;
                    default:
                        toast.error(payload.message || "Đã có lỗi xảy ra");
                }
            }
        } catch (err) {
            console.error("[LoginError]", err);
            toast.error("Không thể kết nối tới máy chủ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
                <form
                    onSubmit={handleLogin}
                    className="p-4 rounded-lg shadow-md w-full max-w-xs mx-auto bg-gray-800 bg-opacity-90"
                >
                    <h2 className="text-lg font-semibold text-white mb-4 text-center">
                        Đăng nhập quản lý
                    </h2>
                    <div className="mb-3">
                        <label htmlFor="username" className="block text-gray-300 mb-1 text-sm">
                            Tên đăng nhập
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={form.username}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300 mb-1 text-sm">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            value={form.password}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full h-10 bg-[#F2D7BE] hover:bg-[#e0c2a8] text-white text-sm font-medium rounded-lg transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </>
    );
}
