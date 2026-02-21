import {
  ChartNoAxesCombined,
  CalendarRange,
  SquarePlus,
  MessageCircleMore,
  Settings,
  LayoutDashboard,
  HistoryIcon,
  Phone,
  Bot
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const LeftSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItemsGeneral = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: HistoryIcon, label: "History" },
    { icon: CalendarRange, label: "Calendar" },
    { icon: SquarePlus, label: "Appointments" },
    { icon: ChartNoAxesCombined, label: "Statistics" },
  ];

  const navItemsTools = [
    { icon: MessageCircleMore, label: "Chat", path: "/chat" },
    { icon: Bot, label: "AI Support", path: "/ai-support" },
    { icon: Phone, label: "Support", path: "#" },
  ];

  return (
    <aside className="bg-[#F6FAFF] w-64 h-screen border-r border-gray-200 p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <h1 className="text-2xl font-bold text-cyan-400 mb-8">
          Au<span className="text-gray-800">ris.</span>
        </h1>

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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:text-black hover:font-bold transition-all ${
                    isActive ? "text-black font-bold bg-slate-100" : "text-gray-600"
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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:text-black hover:font-bold transition-all ${
                    isActive ? "text-black font-bold bg-slate-100" : "text-gray-600"
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
      <div className="pt-4">
        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:text-black hover:font-bold">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Setting</span>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;