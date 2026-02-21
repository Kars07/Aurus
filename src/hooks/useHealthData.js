import { useEffect, useState } from "react";
import { healthMetrics } from "../data/healthMetrics";

export const useHealthData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(healthMetrics);
  }, []);

  return { data };
};
