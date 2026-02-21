// Get weekday name from a date string
export const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

// Format date based on given format type
export const formatDate = (dateStr, type = "long") => {
  const options =
    type === "short"
      ? { month: "short", day: "numeric", year: "numeric" }   // e.g. Oct 16, 2021
      : { weekday: "long", year: "numeric", month: "long", day: "numeric" }; // e.g. Saturday, October 16, 2021

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options);
};

// Format time as "HH:MM AM/PM"
export const formatTime = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return "";
  }

  const [hour, minute] = time.split(":").map(Number);
  
  if (isNaN(hour) || isNaN(minute)) {
    return "";
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${suffix}`;
};
