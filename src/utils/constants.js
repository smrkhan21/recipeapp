export const convertToMinutes = (input) => {
    // Split the input string into value and unit
    const [value, unit] = input.split(" ");
    const numericValue = parseFloat(value);
  
    // Convert to minutes based on the unit
    let result;
  
    switch (unit.toLowerCase()) {
      case "minute":
      case "minutes":
        result = numericValue;
        break;
      case "hour":
      case "hours":
        result = numericValue * 60;
        break;
      // Add more cases for other units if needed
      default:
        throw new Error("Unsupported unit");
    }
  
    // Round to the nearest integer
    return Math.round(result);
  }