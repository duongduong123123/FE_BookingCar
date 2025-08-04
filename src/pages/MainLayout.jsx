import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      {/* Fixed Header */}
      <header className="w-full sticky top-0 z-50 bg-white">
        <Header />
      </header>
      <main className="flex-grow">
        <Outlet context={{ collapsed }} />
      </main>
      {/* Footer */}
    </div>
  );
}

export default MainLayout;