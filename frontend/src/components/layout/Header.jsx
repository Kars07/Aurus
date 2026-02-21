import { Search, Bell } from "lucide-react";

const Header = () => {
  return (
   <header className="px-6 py-4 flex items-center">
  {/* Search Bar and bell inside bar */}
  <div className="relative flex-grow max-w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder="Search"
      className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
    />
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#3835AC] rounded-full p-1.5 cursor-pointer">
      <Bell className="w-4 h-4 text-white" />
    </div>
  </div>
</header>

  );
};

export default Header;