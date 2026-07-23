type locationApiData = {
  country: string;
  city: string;
};

function isValidLocationData(data: unknown): data is locationApiData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;
  
  return (
    typeof obj.country === 'string' && 
    obj.country.trim().length > 0 &&
    typeof obj.city === 'string' && 
    obj.city.trim().length > 0
  );
}

export async function getLocation(ip: string) {
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  if (!response.ok) {
    throw new Error(`Geolocation API responded with ${response.status}`);
  }
  let data = null;
  try {
    data = (await response.json());
  } catch (err) {
    throw new Error("Api sent bad json");
  }
  
  if (!isValidLocationData(data)) {
    throw new Error("Geolocation returned empty fields");
  }
  const result = `${data.country},${data.city}`;
  return result;
}
