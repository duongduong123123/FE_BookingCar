// const baseURL = "http://localhost:3000";
const baseURL = "https://be-bookingcar.onrender.com"
const SummaryApi = {
  baseUrl: baseURL,

  // Auth API 
  admin: {
    create: {
      url: "/api/users/create-admin",
      method: "post",
    },
    loginAdmin: async (username, password) => {
      const url = `${baseURL}/api/auth/admin/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      let payload = {};
      try {
        payload = await res.json();
      } catch { /* empty */ }
      return { status: res.status, ok: res.ok, payload };
    },
  },

  // Booking API – dùng /bookings vì server mount ở đó
  booking: {
    create: async (data) => {
      // const token = localStorage.getItem("token");
      const res = await fetch(`${baseURL}/api/bookings/create-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error: " + res.status);
      return res.json();
    },

    getAll: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseURL}/api/bookings/get-all-bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("API error: " + res.status);
      return res.json();
    },

    /**
  * Xuất file Excel.
  * Trả về object { blob, headers } để component đọc header và blob.
  * @param {{ date?: string, month?: number, year?: number }} options
  */
    exportBookingsToExcel: async ({ date } = {}) => {
      const token = localStorage.getItem("token");
      const url = new URL(`${baseURL}/api/bookings/export`);
      if (date) {
        url.searchParams.set("date", date);
      }
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("API error: " + res.status);
      }
      const blob = await res.blob();
      const headers = res.headers;
      return { blob, headers };
    },

  },
};

export default SummaryApi;
export { baseURL };
