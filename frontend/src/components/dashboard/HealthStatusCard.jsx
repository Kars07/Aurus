import { healthMetrics } from "../../data/healthMetrics";
import { FaWheelchair, FaBed } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";

const HealthStatusCards = () => {
  const iconMap = {
    "Wheelchair Rolls": FaWheelchair,
    "Sleep Quality": FaBed,
    "Pain Level": LuActivity,
  };

  return (
    <div className="space-y-4 w-full h-auto flex-grow">
      {healthMetrics.map((card, index) => {
        const IconComponent = iconMap[card.metric];

        return (
          <div
            key={index}
            className="bg-[#F6FAFF] rounded-xl py-4 px-4 mr-6 shadow-sm healthcare-card"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#dde2f9]`}
              >
                {/* Icon Component */}
                <IconComponent
                  className={`w-4 h-4 ${
                    card.status === "#22B573" // Good / healthy
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                  style={{ color: card.status }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{card.metric}</h4>
                <p className="text-xs text-gray-500">{card.formattedDate}</p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${card.progress}%`,
                  backgroundColor: card.status,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HealthStatusCards;
