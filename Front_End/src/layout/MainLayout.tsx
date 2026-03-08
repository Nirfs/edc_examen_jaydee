import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { IoMenu, IoHome, IoClose } from "react-icons/io5";

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 left-4 z-40 rounded bg-[#1F2937] px-3 py-2 text-white lg:hidden"
      >
        <IoMenu />
      </button>

      {isMenuOpen && (
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-25 transform bg-[#1F2937] p-5 text-center text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-5">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="mb-4 rounded px-2 py-1 text-white lg:hidden"
          >
            <IoClose />
          </button>
          <div className="flex flex-col gap-3">
            <div className="w-15 h-15 rounded-full bg-white"></div>
            <h1 className="text-center">
              Jeedee <br /> kanban
            </h1>
          </div>
          <div className="bg-primary flex items-center justify-center w-10 h-10 m-auto rounded-md">
            <Link
              className="w-full h-full flex items-center justify-center"
              to="/"
            >
              <IoHome className="text-black" />
            </Link>
          </div>
          <div className="bg-primary flex items-center justify-center w-10 h-10 m-auto rounded-md">
            <Link
              className="w-full h-full flex items-center justify-center"
              to="/boards"
            >
              <FaList className="text-black" />
            </Link>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-hidden p-5 pt-20 lg:flex lg:min-h-0 lg:flex-col lg:pt-5">
        <div className="h-full lg:min-h-0 lg:flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
