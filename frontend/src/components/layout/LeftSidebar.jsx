import {
  ChartNoAxesCombined,
  CalendarRange,
  SquarePlus,
  MessageCircleMore,
  Settings,
  LayoutDashboard,
  Phone,
  Bot,
  X,
  Stethoscope,
  LogOut,
  UserCircle
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LeftSidebar = ({ onCloseMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();

  const handleLogout = () => { logout(); navigate('/login'); };

  const navItemsGeneral = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: CalendarRange, label: "Calendar", path: "/calendar" },
    { icon: SquarePlus, label: "Appointments", path: "/appointments" },
    { icon: ChartNoAxesCombined, label: "Statistics", path: "/statistics" },
  ];

  const navItemsTools = [
    { icon: MessageCircleMore, label: "Generate Report", path: "/chat" },
    { icon: Bot, label: "AI Support", path: "/ai-support" },
    { icon: Phone, label: "Contact a Doctoraxa", path: "#" },
  ];

  return (
    <aside className="bg-[#F6FAFF] w-64 h-screen border-r border-gray-200 p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo and Mobile Close */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-cyan-400">
            Au<span className="text-gray-800">ris.</span>
          </h1>
          {onCloseMobileMenu && (
            <button
              onClick={onCloseMobileMenu}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-3 mb-6 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3835AC] to-cyan-400 flex items-center justify-center flex-shrink-0">
              <UserCircle className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-indigo-500 font-medium capitalize">{user.role}</p>
            </div>
          </div>
        )}

        {/* General Nav */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm font-medium mb-4">General</p>
          <nav className="space-y-2">
            {navItemsGeneral.map((item, index) => {
              const isActive = item.path ? currentPath === item.path : false;
              return item.path ? (
                <Link
                  key={index}
                  to={item.path}
                  onClick={onCloseMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:text-black hover:font-bold transition-all ${isActive ? "text-black font-bold bg-slate-100" : "text-gray-600"
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-black" : ""}`} />
                  <span className={isActive ? "font-bold" : "font-medium"}>{item.label}</span>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-not-allowed opacity-50 text-gray-600"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Tools Nav */}
        <div>
          <p className="text-gray-400 text-sm font-medium mb-4">Tools</p>
          <nav className="space-y-2">
            {navItemsTools.map((item, index) => {
              const isActive = item.path ? currentPath === item.path : false;
              return item.path ? (
                <Link
                  key={index}
                  to={item.path}
                  onClick={onCloseMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:text-black hover:font-bold transition-all ${isActive ? "text-black font-bold bg-slate-100" : "text-gray-600"
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-black" : ""}`} />
                  <span className={isActive ? "font-bold" : "font-medium"}>{item.label}</span>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-not-allowed opacity-50 text-gray-600"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Settings */}
      <div className="pt-4 space-y-1">
        <Link
          to="/settings"
          onClick={onCloseMobileMenu}
          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:text-black hover:font-bold transition-all ${currentPath === "/settings" ? "text-black font-bold bg-slate-100" : "text-gray-600"
            }`}
        >
          <Settings className={`w-5 h-5 ${currentPath === "/settings" ? "text-black" : ""}`} />
          <span className={currentPath === "/settings" ? "font-bold" : "font-medium"}>Setting</span>
        </Link>

        {/* Doctor Portal Entry */}
        <Link
          to="/doctor"
          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all mt-2 ${
            currentPath === '/doctor'
              ? 'bg-[#3835AC] text-white font-bold'
              : 'bg-indigo-50 text-[#3835AC] hover:bg-[#3835AC] hover:text-white'
          }`}
        >
          <Stethoscope className="w-5 h-5 flex-shrink-0" />
          <span className="font-bold text-sm">Doctor Portal</span>
          <span className="ml-auto text-[10px] font-black bg-white/20 border border-current px-1.5 py-0.5 rounded-full">Dr.</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl mt-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;