// src/components/BookingForm.jsx
import React, { useState, forwardRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import { toast } from 'react-toastify';
import SummaryApi from '../common/SummaryApi';

// Đăng ký locale 'vi'
registerLocale('vi', vi);

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="relative">
    <input
      type="text"
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      placeholder={placeholder}
      className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#71809B] border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
    />
    <Calendar
      size={20}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
      onClick={onClick}
    />
  </div>
));

export default function BookingForm() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    pickupLocation: '',
    destinationLocation: '',
    luggage: '',
  });
  const [scheduledTime, setScheduledTime] = useState(null);

  const inputClasses =
    'w-full h-12 pl-4 pr-4 rounded-xl bg-[#71809B] border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition';

  const luggageOptions = [
    { label: 'Vali', value: 'vali' },
    { label: 'Hồ sơ', value: 'hồ sơ' },
    { label: 'Khác', value: 'khác' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleLuggageChange = (val) => {
    setForm(prev => ({ ...prev, luggage: val }));
  };

  const handleDateChange = (date) => {
    if (!date) {
      setScheduledTime(null);
      return;
    }

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday && date.getHours() === 0 && date.getMinutes() === 0) {
      const interval = 15;
      let snappedMinute = Math.ceil(now.getMinutes() / interval) * interval;
      let snappedHour = now.getHours();
      if (snappedMinute >= 60) {
        snappedMinute = 0;
        snappedHour += 1;
      }
      const snapped = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        snappedHour,
        snappedMinute,
        0,
        0
      );
      setScheduledTime(snapped);
    } else {
      setScheduledTime(date);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phone, pickupLocation, destinationLocation, luggage } = form;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !pickupLocation.trim() ||
      !destinationLocation.trim() ||
      !scheduledTime ||
      !luggage
    ) {
      toast.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }

    if (fullName.length > 30) {
      toast.warning('Họ tên không được dài quá 30 ký tự!');
      return;
    }

    if (!/^[A-Za-zÀ-ỹà-ỹ\s']+$/u.test(fullName.trim())) {
      toast.warning('Họ tên chỉ được chứa chữ cái và khoảng trắng!');
      return;
    }

    if (!/^0\d{9}$/.test(phone.trim())) {
      toast.warning('Số điện thoại không hợp lệ!');
      return;
    }

    if (scheduledTime < new Date()) {
      toast.warning('Thời gian đón phải ở hiện tại hoặc tương lai!');
      return;
    }

    try {
      await SummaryApi.booking.create({
        fullName: fullName.trim(),
        phone: phone.trim(),
        pickupLocation: pickupLocation.trim(),
        destinationLocation: destinationLocation.trim(),
        scheduledTime: scheduledTime.toISOString(),
        luggage,
      });
      toast.success('Đặt xe thành công!');
      setForm({ fullName: '', phone: '', pickupLocation: '', destinationLocation: '', luggage: '' });
      setScheduledTime(null);
    } catch (err) {
      console.error(err);
      toast.error('Đặt xe thất bại. Vui lòng thử lại.');
    }
  };

  const getMinTime = () => {
    if (!scheduledTime) return new Date(0, 0, 0, 0, 0);
    const today = new Date();
    return scheduledTime.toDateString() === today.toDateString()
      ? scheduledTime
      : new Date(0, 0, 0, 0, 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg sm:max-w-md lg:max-w-lg"
    >
      {/* Họ & tên */}
      <div>
        <input
          type="text"
          name="fullName"
          placeholder="Họ & tên"
          value={form.fullName}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {/* Số điện thoại */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {/* Điểm đón */}
      <div className="relative">
        <MapPin size={20} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Điểm đón"
          value={form.pickupLocation}
          onChange={handleChange}
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#71809B] border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>

      {/* Điểm đến */}
      <div className="relative">
        <MapPin size={20} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        <input
          type="text"
          name="destinationLocation"
          placeholder="Điểm đến"
          value={form.destinationLocation}
          onChange={handleChange}
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#71809B] border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>

      {/* Ngày & Giờ */}
      <div>
        <DatePicker
          selected={scheduledTime}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={15}
          locale="vi"
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date()}
          minTime={getMinTime()}
          maxTime={new Date(0, 0, 0, 23, 45)}
          placeholderText="Chọn ngày giờ"
          timeCaption="Giờ"
          customInput={<CustomInput />}
          wrapperClassName="w-full"
        />
      </div>

      {/* Hành lý */}
      <div className="space-y-2">
        <p className="text-white font-medium">Hành lý</p>
        <div className="flex gap-4">
          {luggageOptions.map(opt => (
            <label key={opt.value} className="inline-flex items-center text-white">
              <input
                type="radio"
                name="luggage"
                value={opt.value}
                className="form-radio h-5 w-5 text-orange-400"
                checked={form.luggage === opt.value}
                onChange={() => handleLuggageChange(opt.value)}
              />
              <span className="ml-2">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nút gửi */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="h-12 px-6 rounded-full border-2 text-white transition font-semibold shadow sm:h-10 sm:text-sm"
        >
          Đặt xe
        </button>
      </div>
    </form>
  );
}
