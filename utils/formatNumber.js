"use client";

// Helper function to format numbers based on locale
export const formatNumber = (number, userLanguage) => {
  const formattedNumber = number.toString();
  if (userLanguage === "pl-PL") {
    return formattedNumber.replace(".", ",");
  }
  return formattedNumber;
};
