import React from "react";
import chplay from "../assets/ch.png";
import appstore from "../assets/ios.jpg";

export default function BookingInfo() {
    return (
        <div className="w-full bg-gradient-to-b from-gray-300 to-white text-gray-800">
            {/* Header */}
            <div className="text-center pt-8 pb-6">
                <h1 className="text-3xl font-bold mb-2">Bảng giá Xe</h1>
                <p className="text-sm max-w-3xl mx-auto leading-relaxed">
                    Bạn đang tìm kiếm phương tiện di chuyển nhanh chóng, tiện lợi và giá rẻ từ Hải Dương đi Hà Nội hoặc Nội Bài?
                    Chúng tôi cung cấp Bảng giá dịch vụ xe ghép Hà Nội – Hải Dương – Nội Bài với nhiều ưu đãi hấp dẫn.
                </p>
            </div>

            {/* Hàng 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-0 w-full mb-6">
                <div className="col-span-1 md:col-span-2 bg-slate-500 text-white rounded-[2rem] px-8 py-6 flex flex-col justify-center">
                    <h2 className="text-lg font-semibold mb-4">Bảng giá xe ghép</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Hải Dương &lt;------&gt; Hà Nội</span>
                            <span>150.000đ - 250.000đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hải Dương &lt;------&gt; Nội Bài</span>
                            <span>250.000đ - 300.000đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hải Dương &lt;------&gt; Quảng Ninh</span>
                            <span>230.000đ - 280.000đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hải Dương &lt;------&gt; Hải Phòng</span>
                            <span>8.000đ/km</span>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-500 rounded-[2rem]"></div>
            </div>

            {/* Hàng 2 */}
            <div className="w-full bg-slate-500 text-white rounded-[2rem] px-8 py-6 mb-12">
                <h2 className="text-lg font-semibold mb-4">Bảng giá bao xe</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                <th className="text-left">Tuyến</th>
                                <th className="text-left">Xe 4 chỗ</th>
                                <th className="text-left">Xe 7 chỗ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hải Dương &lt;------&gt; Hà Nội</td>
                                <td>450.000đ - 500.000đ</td>
                                <td>650.000đ - 750.000đ</td>
                            </tr>
                            <tr>
                                <td>Hải Dương &lt;------&gt; Nội Bài</td>
                                <td>500.000đ - 600.000đ</td>
                                <td>550.000đ - 650.000đ</td>
                            </tr>
                            <tr>
                                <td>Hải Dương &lt;------&gt; Hải Phòng</td>
                                <td>Liên hệ</td>
                                <td>Liên hệ</td>
                            </tr>
                            <tr>
                                <td>Hải Dương &lt;------&gt; Quảng Ninh</td>
                                <td>Liên hệ</td>
                                <td>Liên hệ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Phân biệt dịch vụ */}
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <h2 className="text-lg font-semibold mb-2">Phân biệt dịch vụ xe ghép, xe taxi đi riêng</h2>
                <p className="text-sm mb-2">Điểm chung:</p>
                <ul className="list-disc list-inside text-sm mb-6">
                    <li>Cả 3 dịch vụ đều phục vụ nhu cầu di chuyển từ Hải Dương đến Hà Nội.</li>
                    <li>Cả 3 đều là xe taxi truyền thống.</li>
                    <li>Có thể đặt qua điện thoại hoặc ứng dụng.</li>
                </ul>
                <p className="text-sm mb-2">Điểm khác biệt:</p>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border text-sm border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">Số lượng hành khách</th>
                                <th className="border px-4 py-2">Xe ghép</th>
                                <th className="border px-4 py-2">Xe riêng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Tuyến đường</td>
                                <td className="border px-4 py-2">4 - 7 người</td>
                                <td className="border px-4 py-2">1 - 4 người</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Thời gian khởi hành</td>
                                <td className="border px-4 py-2">Đi theo tuyến cố định, có thể đón trả khách dọc đường</td>
                                <td className="border px-4 py-2">Đi theo yêu cầu của khách hàng</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Giá vé</td>
                                <td className="border px-4 py-2">Có giá cố định, khởi hành khi đủ khách</td>
                                <td className="border px-4 py-2">Khởi hành bất cứ lúc nào</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Sự tiện nghi</td>
                                <td className="border px-4 py-2">Rẻ nhất</td>
                                <td className="border px-4 py-2">Cao nhất</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Sự riêng tư</td>
                                <td className="border px-4 py-2">Ít tiện nghi nhất</td>
                                <td className="border px-4 py-2">Nhiều tiện nghi nhất</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Tiêu chí</td>
                                <td className="border px-4 py-2">Thấp nhất</td>
                                <td className="border px-4 py-2">Cao nhất</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-sm space-y-1">
                    <p>- Xe ghép: Phù hợp với những ai muốn tiết kiệm chi phí, không ngại chia sẻ không gian với người khác và có thời gian linh hoạt.</p>
                    <p>- Xe tiện chuyến: Phù hợp với nhóm bạn, gia đình có nhu cầu di chuyển cùng nhau, muốn tiết kiệm chi phí nhưng vẫn có một chút không gian riêng tư.</p>
                    <p>- Xe taxi đi riêng: Phù hợp với những ai muốn sự riêng tư, thoải mái, di chuyển nhanh chóng và không ngại chi trả thêm tiền.</p>
                </div>
            </div>

            {/* Tải app */}
            <div className="w-full flex flex-col md:flex-row items-stretch">
                {/* Nửa trái: text + nút */}
                <div className="flex-1 flex flex-col justify-center px-10 py-12 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 leading-snug">
                        1 chạm, quét mã<br />Tải áp ngay
                    </h2>
                    <div className="flex flex-col gap-4 mt-6">
                        <img src={chplay} alt="Google Play" className="h-12 object-contain" />
                        <img src={appstore} alt="App Store" className="h-12 object-contain" />
                    </div>
                </div>

                {/* Nửa phải: nền slate + QR */}
                <div className="flex-1 bg-slate-500 rounded-tl-[2rem] relative flex items-center justify-center">
                    <div className="w-28 h-28 bg-white rounded-lg shadow-md absolute -left-14 flex items-center justify-center">
                        {/* <img src={qr} alt="QR Code" className="w-24 h-24 object-contain" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
