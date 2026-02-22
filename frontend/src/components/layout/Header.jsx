import { Search, Bell, Menu, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  return (
    <header className="px-4 md:px-6 py-4 flex items-center gap-3 md:gap-4 relative z-20 bg-white md:bg-transparent">
      {/* Mobile Hamburger Menu */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Search Bar and icons inside bar */}
      <div className="relative flex-grow max-w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-24 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Link to="/calendar" className="text-slate-400 hover:text-cyan-500 transition-colors hidden sm:block">
            <Calendar className="w-5 h-5" />
          </Link>
          <div className="bg-cyan-400 rounded-full p-1.5 cursor-pointer shadow-sm hover:bg-cyan-500 transition-colors">
            <Bell className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Calendar Icon (outside search bar for better fit on very small screens) */}
      <Link to="/calendar" className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
        <Calendar className="w-6 h-6" />
      </Link>
    </header>
  );
};

export default Header;