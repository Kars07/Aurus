import {
  ChartNoAxesCombined,
  CalendarRange,
  SquarePlus,
  MessageCircleMore,
  Settings,
  LayoutDashboard,
  HistoryIcon,
  Phone,
} from "lucide-react";

const LeftSidebar = () => {
  const navItemsGeneral = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: HistoryIcon, label: "History" },
    { icon: CalendarRange, label: "Calendar" },
    { icon: SquarePlus, label: "Appointments" },
    { icon: ChartNoAxesCombined, label: "Statistics" },
  ];

  const navItemsTools = [
    { icon: MessageCircleMore, label: "Chat" },
    { icon: Phone, label: "Support" },
  ];

  return (
    <aside className="bg-[#F6FAFF] w-64 h-screen border-r border-gray-200 p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <h1 className="text-2xl font-bold text-cyan-400 mb-8">
          Health<span className="text-gray-800">care.</span>
        </h1>

        {/* General Nav */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm font-medium mb-4">General</p>
          <nav className="space-y-2">
            {navItemsGeneral.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:text-black hover:font-bold  ${
                  item.active ? "text-black font-bold" : "text-gray-600"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${item.active ? "text-black" : ""}`}
                />
                <span className={item.active ? "font-bold" : "font-medium"}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Tools Nav */}
        <div>
          <p className="text-gray-400 text-sm font-medium mb-4">Tools</p>
          <nav className="space-y-2">
            {navItemsTools.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer  hover:text-black hover:font-bold ${
                  item.active ? "text-black font-bold" : "text-gray-600"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${item.active ? "text-black" : ""}`}
                />
                <span className={item.active ? "font-bold" : "font-medium"}>
                  {item.label}
                </span>
              </div>
            ))}
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
