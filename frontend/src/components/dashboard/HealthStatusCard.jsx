import { healthMetrics } from "../../data/healthMetrics";
import { FaLungs } from "react-icons/fa";
import { LuBone } from "react-icons/lu";
import { LiaTeethOpenSolid } from "react-icons/lia";

const HealthStatusCards = () => {
  const iconMap = {
    Lungs: FaLungs,
    Teeth: LiaTeethOpenSolid,
    Bone: LuBone,
  };

  return (
    <div className="space-y-4 w-full h-auto flex-grow">
      {healthMetrics.map((card, index) => {
        const IconComponent = iconMap[card.organ];

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
                    card.status === "good"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                  style={{ color: card.status }}
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{card.organ}</h4>
                <p className="text-xs text-gray-500">{card.formattedDate}</p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  card.status === "good" ? "bg-green-500" : "bg-orange-600"
                }`}
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
