// API key for currency conversion (would normally be an environment variable)
const EXCHANGE_API_KEY = "demo-key"

// Conversion categories
export function getConversionCategories() {
  return [
    { value: "length", label: "Length" },
    { value: "weight", label: "Weight" },
    { value: "volume", label: "Volume" },
    { value: "temperature", label: "Temperature" },
    { value: "energy", label: "Energy" },
    { value: "time", label: "Time" },
    { value: "timezone", label: "Timezone" },
    { value: "currency", label: "Currency" },
    { value: "data", label: "Digital Data" },
    { value: "number", label: "Number Systems" },
    { value: "angle", label: "Angle" },
    { value: "text", label: "Text" },
    { value: "culinary", label: "Culinary" },
    { value: "color", label: "Color" },
  ]
}

// Get units for a specific category
export function getConversionUnits(category: string) {
  switch (category) {
    case "length":
      return [
        { value: "meter", label: "Meter (m)" },
        { value: "kilometer", label: "Kilometer (km)" },
        { value: "centimeter", label: "Centimeter (cm)" },
        { value: "millimeter", label: "Millimeter (mm)" },
        { value: "mile", label: "Mile (mi)" },
        { value: "yard", label: "Yard (yd)" },
        { value: "foot", label: "Foot (ft)" },
        { value: "inch", label: "Inch (in)" },
      ]
    case "weight":
      return [
        { value: "kilogram", label: "Kilogram (kg)" },
        { value: "gram", label: "Gram (g)" },
        { value: "milligram", label: "Milligram (mg)" },
        { value: "pound", label: "Pound (lb)" },
        { value: "ounce", label: "Ounce (oz)" },
        { value: "ton", label: "Metric Ton (t)" },
      ]
    case "volume":
      return [
        { value: "liter", label: "Liter (L)" },
        { value: "milliliter", label: "Milliliter (mL)" },
        { value: "cubic_meter", label: "Cubic Meter (m³)" },
        { value: "gallon_us", label: "Gallon (US)" },
        { value: "gallon_uk", label: "Gallon (UK)" },
        { value: "quart", label: "Quart (qt)" },
        { value: "pint", label: "Pint (pt)" },
        { value: "cup", label: "Cup" },
      ]
    case "temperature":
      return [
        { value: "celsius", label: "Celsius (°C)" },
        { value: "fahrenheit", label: "Fahrenheit (°F)" },
        { value: "kelvin", label: "Kelvin (K)" },
      ]
    case "energy":
      return [
        { value: "joule", label: "Joule (J)" },
        { value: "calorie", label: "Calorie (cal)" },
        { value: "kilocalorie", label: "Kilocalorie (kcal)" },
        { value: "watt_hour", label: "Watt-hour (Wh)" },
        { value: "kilowatt_hour", label: "Kilowatt-hour (kWh)" },
        { value: "electronvolt", label: "Electronvolt (eV)" },
      ]
    case "time":
      return [
        { value: "second", label: "Second (s)" },
        { value: "minute", label: "Minute (min)" },
        { value: "hour", label: "Hour (h)" },
        { value: "day", label: "Day (d)" },
        { value: "week", label: "Week (wk)" },
        { value: "month", label: "Month (mo)" },
        { value: "year", label: "Year (yr)" },
        { value: "unix_timestamp", label: "Unix Timestamp" },
      ]
    case "timezone":
      return [
        { value: "utc", label: "UTC" },
        { value: "wib", label: "WIB (UTC+7)" },
        { value: "wit", label: "WIT (UTC+9)" },
        { value: "wita", label: "WITA (UTC+8)" },
        { value: "est", label: "EST (UTC-5)" },
        { value: "pst", label: "PST (UTC-8)" },
        { value: "jst", label: "JST (UTC+9)" },
        { value: "cet", label: "CET (UTC+1)" },
      ]
    case "currency":
      return [
        { value: "usd", label: "US Dollar (USD)" },
        { value: "idr", label: "Indonesian Rupiah (IDR)" },
        { value: "eur", label: "Euro (EUR)" },
        { value: "jpy", label: "Japanese Yen (JPY)" },
        { value: "gbp", label: "British Pound (GBP)" },
        { value: "aud", label: "Australian Dollar (AUD)" },
        { value: "cad", label: "Canadian Dollar (CAD)" },
        { value: "sgd", label: "Singapore Dollar (SGD)" },
      ]
    case "data":
      return [
        { value: "byte", label: "Byte (B)" },
        { value: "kilobyte", label: "Kilobyte (KB)" },
        { value: "megabyte", label: "Megabyte (MB)" },
        { value: "gigabyte", label: "Gigabyte (GB)" },
        { value: "terabyte", label: "Terabyte (TB)" },
        { value: "petabyte", label: "Petabyte (PB)" },
        { value: "bit", label: "Bit (b)" },
      ]
    case "number":
      return [
        { value: "decimal", label: "Decimal (Base 10)" },
        { value: "binary", label: "Binary (Base 2)" },
        { value: "octal", label: "Octal (Base 8)" },
        { value: "hexadecimal", label: "Hexadecimal (Base 16)" },
      ]
    case "angle":
      return [
        { value: "degree", label: "Degree (°)" },
        { value: "radian", label: "Radian (rad)" },
        { value: "gradian", label: "Gradian (grad)" },
        { value: "dms", label: "Degrees-Minutes-Seconds" },
      ]
    case "text":
      return [
        { value: "uppercase", label: "Uppercase" },
        { value: "lowercase", label: "Lowercase" },
        { value: "morse", label: "Morse Code" },
        { value: "ascii", label: "ASCII" },
        { value: "base64", label: "Base64" },
      ]
    case "culinary":
      return [
        { value: "teaspoon", label: "Teaspoon (tsp)" },
        { value: "tablespoon", label: "Tablespoon (tbsp)" },
        { value: "cup_us", label: "Cup (US)" },
        { value: "milliliter", label: "Milliliter (mL)" },
        { value: "gram", label: "Gram (g)" },
        { value: "ounce", label: "Ounce (oz)" },
      ]
    case "color":
      return [
        { value: "rgb", label: "RGB" },
        { value: "hex", label: "HEX" },
        { value: "hsl", label: "HSL" },
        { value: "cmyk", label: "CMYK" },
      ]
    default:
      return []
  }
}

// Get related units for chart visualization
export function getRelatedUnits(category: string, unit: string) {
  switch (category) {
    case "length":
      return ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot"]
    case "weight":
      return ["kilogram", "gram", "pound", "ounce"]
    case "volume":
      return ["liter", "milliliter", "gallon_us", "cup"]
    case "temperature":
      return ["celsius", "fahrenheit", "kelvin"]
    case "energy":
      return ["joule", "calorie", "kilocalorie", "watt_hour"]
    case "data":
      return ["byte", "kilobyte", "megabyte", "gigabyte"]
    case "culinary":
      return ["teaspoon", "tablespoon", "cup_us", "milliliter"]
    default:
      return [unit]
  }
}

// Conversion function
export async function convertValue(category: string, fromUnit: string, toUnit: string, value: number): Promise<number> {
  // If units are the same, return the value
  if (fromUnit === toUnit) {
    return value
  }

  // Handle different conversion categories
  switch (category) {
    case "length":
      return convertLength(fromUnit, toUnit, value)
    case "weight":
      return convertWeight(fromUnit, toUnit, value)
    case "volume":
      return convertVolume(fromUnit, toUnit, value)
    case "temperature":
      return convertTemperature(fromUnit, toUnit, value)
    case "energy":
      return convertEnergy(fromUnit, toUnit, value)
    case "time":
      return convertTime(fromUnit, toUnit, value)
    case "timezone":
      return convertTimezone(fromUnit, toUnit, value)
    case "currency":
      return await convertCurrency(fromUnit, toUnit, value)
    case "data":
      return convertData(fromUnit, toUnit, value)
    case "number":
      return convertNumberSystem(fromUnit, toUnit, value)
    case "angle":
      return convertAngle(fromUnit, toUnit, value)
    case "text":
      return convertText(fromUnit, toUnit, value)
    case "culinary":
      return convertCulinary(fromUnit, toUnit, value)
    case "color":
      return convertColor(fromUnit, toUnit, value)
    default:
      throw new Error("Unsupported conversion category")
  }
}

// Length conversion
function convertLength(fromUnit: string, toUnit: string, value: number): number {
  // Convert to meters first (base unit)
  let meters = 0
  switch (fromUnit) {
    case "meter":
      meters = value
      break
    case "kilometer":
      meters = value * 1000
      break
    case "centimeter":
      meters = value * 0.01
      break
    case "millimeter":
      meters = value * 0.001
      break
    case "mile":
      meters = value * 1609.344
      break
    case "yard":
      meters = value * 0.9144
      break
    case "foot":
      meters = value * 0.3048
      break
    case "inch":
      meters = value * 0.0254
      break
    default:
      throw new Error("Unsupported length unit")
  }

  // Convert from meters to target unit
  switch (toUnit) {
    case "meter":
      return meters
    case "kilometer":
      return meters / 1000
    case "centimeter":
      return meters / 0.01
    case "millimeter":
      return meters / 0.001
    case "mile":
      return meters / 1609.344
    case "yard":
      return meters / 0.9144
    case "foot":
      return meters / 0.3048
    case "inch":
      return meters / 0.0254
    default:
      throw new Error("Unsupported length unit")
  }
}

// Weight conversion
function convertWeight(fromUnit: string, toUnit: string, value: number): number {
  // Convert to kilograms first (base unit)
  let kilograms = 0
  switch (fromUnit) {
    case "kilogram":
      kilograms = value
      break
    case "gram":
      kilograms = value * 0.001
      break
    case "milligram":
      kilograms = value * 0.000001
      break
    case "pound":
      kilograms = value * 0.45359237
      break
    case "ounce":
      kilograms = value * 0.0283495231
      break
    case "ton":
      kilograms = value * 1000
      break
    default:
      throw new Error("Unsupported weight unit")
  }

  // Convert from kilograms to target unit
  switch (toUnit) {
    case "kilogram":
      return kilograms
    case "gram":
      return kilograms / 0.001
    case "milligram":
      return kilograms / 0.000001
    case "pound":
      return kilograms / 0.45359237
    case "ounce":
      return kilograms / 0.0283495231
    case "ton":
      return kilograms / 1000
    default:
      throw new Error("Unsupported weight unit")
  }
}

// Volume conversion
function convertVolume(fromUnit: string, toUnit: string, value: number): number {
  // Convert to liters first (base unit)
  let liters = 0
  switch (fromUnit) {
    case "liter":
      liters = value
      break
    case "milliliter":
      liters = value * 0.001
      break
    case "cubic_meter":
      liters = value * 1000
      break
    case "gallon_us":
      liters = value * 3.78541
      break
    case "gallon_uk":
      liters = value * 4.54609
      break
    case "quart":
      liters = value * 0.946353
      break
    case "pint":
      liters = value * 0.473176
      break
    case "cup":
      liters = value * 0.24
      break
    default:
      throw new Error("Unsupported volume unit")
  }

  // Convert from liters to target unit
  switch (toUnit) {
    case "liter":
      return liters
    case "milliliter":
      return liters / 0.001
    case "cubic_meter":
      return liters / 1000
    case "gallon_us":
      return liters / 3.78541
    case "gallon_uk":
      return liters / 4.54609
    case "quart":
      return liters / 0.946353
    case "pint":
      return liters / 0.473176
    case "cup":
      return liters / 0.24
    default:
      throw new Error("Unsupported volume unit")
  }
}

// Temperature conversion
function convertTemperature(fromUnit: string, toUnit: string, value: number): number {
  // Convert to Kelvin first (base unit)
  let kelvin = 0
  switch (fromUnit) {
    case "celsius":
      kelvin = value + 273.15
      break
    case "fahrenheit":
      kelvin = (value - 32) * (5 / 9) + 273.15
      break
    case "kelvin":
      kelvin = value
      break
    default:
      throw new Error("Unsupported temperature unit")
  }

  // Convert from Kelvin to target unit
  switch (toUnit) {
    case "celsius":
      return kelvin - 273.15
    case "fahrenheit":
      return (kelvin - 273.15) * (9 / 5) + 32
    case "kelvin":
      return kelvin
    default:
      throw new Error("Unsupported temperature unit")
  }
}

// Energy conversion
function convertEnergy(fromUnit: string, toUnit: string, value: number): number {
  // Convert to joules first (base unit)
  let joules = 0
  switch (fromUnit) {
    case "joule":
      joules = value
      break
    case "calorie":
      joules = value * 4.184
      break
    case "kilocalorie":
      joules = value * 4184
      break
    case "watt_hour":
      joules = value * 3600
      break
    case "kilowatt_hour":
      joules = value * 3600000
      break
    case "electronvolt":
      joules = value * 1.602176634e-19
      break
    default:
      throw new Error("Unsupported energy unit")
  }

  // Convert from joules to target unit
  switch (toUnit) {
    case "joule":
      return joules
    case "calorie":
      return joules / 4.184
    case "kilocalorie":
      return joules / 4184
    case "watt_hour":
      return joules / 3600
    case "kilowatt_hour":
      return joules / 3600000
    case "electronvolt":
      return joules / 1.602176634e-19
    default:
      throw new Error("Unsupported energy unit")
  }
}

// Time conversion
function convertTime(fromUnit: string, toUnit: string, value: number): number {
  // Special case for Unix timestamp
  if (fromUnit === "unix_timestamp" && toUnit !== "unix_timestamp") {
    const date = new Date(value * 1000) // Unix timestamp is in seconds
    switch (toUnit) {
      case "second":
        return date.getSeconds()
      case "minute":
        return date.getMinutes()
      case "hour":
        return date.getHours()
      case "day":
        return date.getDate()
      case "month":
        return date.getMonth() + 1 // Months are 0-indexed
      case "year":
        return date.getFullYear()
      default:
        throw new Error("Unsupported time unit for Unix timestamp conversion")
    }
  } else if (toUnit === "unix_timestamp" && fromUnit !== "unix_timestamp") {
    // This is a simplified conversion and not accurate for all cases
    const now = new Date()
    const date = new Date(
      fromUnit === "year" ? value : now.getFullYear(),
      fromUnit === "month" ? value - 1 : now.getMonth(),
      fromUnit === "day" ? value : now.getDate(),
      fromUnit === "hour" ? value : now.getHours(),
      fromUnit === "minute" ? value : now.getMinutes(),
      fromUnit === "second" ? value : now.getSeconds(),
    )
    return Math.floor(date.getTime() / 1000)
  }

  // Convert to seconds first (base unit)
  let seconds = 0
  switch (fromUnit) {
    case "second":
      seconds = value
      break
    case "minute":
      seconds = value * 60
      break
    case "hour":
      seconds = value * 3600
      break
    case "day":
      seconds = value * 86400
      break
    case "week":
      seconds = value * 604800
      break
    case "month":
      seconds = value * 2592000 // Approximation: 30 days
      break
    case "year":
      seconds = value * 31536000 // Approximation: 365 days
      break
    default:
      throw new Error("Unsupported time unit")
  }

  // Convert from seconds to target unit
  switch (toUnit) {
    case "second":
      return seconds
    case "minute":
      return seconds / 60
    case "hour":
      return seconds / 3600
    case "day":
      return seconds / 86400
    case "week":
      return seconds / 604800
    case "month":
      return seconds / 2592000
    case "year":
      return seconds / 31536000
    default:
      throw new Error("Unsupported time unit")
  }
}

// Timezone conversion
function convertTimezone(fromUnit: string, toUnit: string, value: number): number {
  // Get timezone offsets in hours
  const timezoneOffsets: { [key: string]: number } = {
    utc: 0,
    wib: 7,
    wit: 9,
    wita: 8,
    est: -5,
    pst: -8,
    jst: 9,
    cet: 1,
  }

  // Calculate the time difference
  const fromOffset = timezoneOffsets[fromUnit] || 0
  const toOffset = timezoneOffsets[toUnit] || 0
  const hourDifference = toOffset - fromOffset

  // Add the difference to the value
  return (value + hourDifference + 24) % 24
}

// Currency conversion (using API)
async function convertCurrency(fromUnit: string, toUnit: string, value: number): Promise<number> {
  try {
    // For demo purposes, we'll use fixed rates
    // In a real app, you would use an API like this:
    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromUnit.toUpperCase()}`, {
    //   headers: { 'Authorization': `Bearer ${EXCHANGE_API_KEY}` }
    // });
    // const data = await response.json();
    // const rate = data.rates[toUnit.toUpperCase()];

    // Fixed rates for demo (as of May 2023)
    const rates: { [key: string]: { [key: string]: number } } = {
      usd: { idr: 15500, eur: 0.92, jpy: 140, gbp: 0.79, aud: 1.5, cad: 1.35, sgd: 1.34 },
      idr: { usd: 0.000065, eur: 0.000059, jpy: 0.0091, gbp: 0.000051, aud: 0.000097, cad: 0.000087, sgd: 0.000087 },
      eur: { usd: 1.09, idr: 16900, jpy: 152, gbp: 0.86, aud: 1.63, cad: 1.47, sgd: 1.46 },
      jpy: { usd: 0.0071, idr: 110, eur: 0.0066, gbp: 0.0057, aud: 0.011, cad: 0.0097, sgd: 0.0096 },
      gbp: { usd: 1.26, idr: 19600, eur: 1.16, jpy: 177, aud: 1.9, cad: 1.71, sgd: 1.7 },
      aud: { usd: 0.67, idr: 10300, eur: 0.61, jpy: 93, gbp: 0.53, cad: 0.9, sgd: 0.89 },
      cad: { usd: 0.74, idr: 11500, eur: 0.68, jpy: 104, gbp: 0.58, aud: 1.11, sgd: 0.99 },
      sgd: { usd: 0.75, idr: 11600, eur: 0.69, jpy: 105, gbp: 0.59, aud: 1.12, cad: 1.01 },
    }

    // If converting to the same currency, return the value
    if (fromUnit === toUnit) {
      return value
    }

    // Get the conversion rate
    const rate = rates[fromUnit]?.[toUnit]
    if (!rate) {
      throw new Error("Currency conversion rate not available")
    }

    // Apply the conversion rate
    return value * rate
  } catch (error) {
    console.error("Currency conversion error:", error)
    throw new Error("Failed to convert currency. Please try again later.")
  }
}

// Digital data conversion
function convertData(fromUnit: string, toUnit: string, value: number): number {
  // Convert to bytes first (base unit)
  let bytes = 0
  switch (fromUnit) {
    case "bit":
      bytes = value / 8
      break
    case "byte":
      bytes = value
      break
    case "kilobyte":
      bytes = value * 1024
      break
    case "megabyte":
      bytes = value * 1024 * 1024
      break
    case "gigabyte":
      bytes = value * 1024 * 1024 * 1024
      break
    case "terabyte":
      bytes = value * 1024 * 1024 * 1024 * 1024
      break
    case "petabyte":
      bytes = value * 1024 * 1024 * 1024 * 1024 * 1024
      break
    default:
      throw new Error("Unsupported data unit")
  }

  // Convert from bytes to target unit
  switch (toUnit) {
    case "bit":
      return bytes * 8
    case "byte":
      return bytes
    case "kilobyte":
      return bytes / 1024
    case "megabyte":
      return bytes / (1024 * 1024)
    case "gigabyte":
      return bytes / (1024 * 1024 * 1024)
    case "terabyte":
      return bytes / (1024 * 1024 * 1024 * 1024)
    case "petabyte":
      return bytes / (1024 * 1024 * 1024 * 1024 * 1024)
    default:
      throw new Error("Unsupported data unit")
  }
}

// Number system conversion
function convertNumberSystem(fromUnit: string, toUnit: string, value: number): number {
  let decimalValue: number

  // Convert to decimal first
  switch (fromUnit) {
    case "decimal":
      decimalValue = value
      break
    case "binary":
      decimalValue = Number.parseInt(value.toString(), 2)
      break
    case "octal":
      decimalValue = Number.parseInt(value.toString(), 8)
      break
    case "hexadecimal":
      decimalValue = Number.parseInt(value.toString(), 16)
      break
    default:
      throw new Error("Unsupported number system")
  }

  // For number system conversions, we return a string representation
  // but since our function expects a number, we'll return the decimal value
  // and let the UI handle the display
  return decimalValue
}

// Angle conversion
function convertAngle(fromUnit: string, toUnit: string, value: number): number {
  // Convert to radians first (base unit)
  let radians = 0
  switch (fromUnit) {
    case "degree":
      radians = value * (Math.PI / 180)
      break
    case "radian":
      radians = value
      break
    case "gradian":
      radians = value * (Math.PI / 200)
      break
    case "dms":
      // Assuming DMS is in format: degrees.minutesSeconds (e.g., 45.3025 for 45° 30' 25")
      const degrees = Math.floor(value)
      const minutesSeconds = (value - degrees) * 100
      const minutes = Math.floor(minutesSeconds)
      const seconds = (minutesSeconds - minutes) * 100
      radians = (degrees + minutes / 60 + seconds / 3600) * (Math.PI / 180)
      break
    default:
      throw new Error("Unsupported angle unit")
  }

  // Convert from radians to target unit
  switch (toUnit) {
    case "degree":
      return radians * (180 / Math.PI)
    case "radian":
      return radians
    case "gradian":
      return radians * (200 / Math.PI)
    case "dms":
      // Convert to degrees first
      const degrees = radians * (180 / Math.PI)
      const wholeDegrees = Math.floor(degrees)
      const decimalPart = degrees - wholeDegrees
      const minutes = Math.floor(decimalPart * 60)
      const seconds = Math.floor((decimalPart * 60 - minutes) * 60)
      // Return in format degrees.minutesSeconds
      return wholeDegrees + minutes / 100 + seconds / 10000
    default:
      throw new Error("Unsupported angle unit")
  }
}

// Text conversion
function convertText(fromUnit: string, toUnit: string, value: number): number {
  // For text conversions, we'll use a special approach
  // Since our function expects a number return type, we'll return a code
  // that the UI can interpret
  return 1 // Placeholder, actual text conversion happens in UI
}

// Culinary conversion
function convertCulinary(fromUnit: string, toUnit: string, value: number): number {
  // Convert to milliliters first (base unit)
  let milliliters = 0
  switch (fromUnit) {
    case "teaspoon":
      milliliters = value * 4.93
      break
    case "tablespoon":
      milliliters = value * 14.79
      break
    case "cup_us":
      milliliters = value * 236.59
      break
    case "milliliter":
      milliliters = value
      break
    case "gram":
      // This is an approximation, as the conversion depends on the ingredient
      milliliters = value // Assuming water (1g = 1ml)
      break
    case "ounce":
      milliliters = value * 29.57
      break
    default:
      throw new Error("Unsupported culinary unit")
  }

  // Convert from milliliters to target unit
  switch (toUnit) {
    case "teaspoon":
      return milliliters / 4.93
    case "tablespoon":
      return milliliters / 14.79
    case "cup_us":
      return milliliters / 236.59
    case "milliliter":
      return milliliters
    case "gram":
      // This is an approximation, as the conversion depends on the ingredient
      return milliliters // Assuming water (1ml = 1g)
    case "ounce":
      return milliliters / 29.57
    default:
      throw new Error("Unsupported culinary unit")
  }
}

// Color conversion
function convertColor(fromUnit: string, toUnit: string, value: number): number {
  // For color conversions, we'll use a special approach
  // Since our function expects a number return type, we'll return a code
  // that the UI can interpret
  return 1 // Placeholder, actual color conversion happens in UI
}
