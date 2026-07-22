type locationApiData = {
  country: string;
  city: string;
  regionName: string;
};

export async function getLocation(ip: string) {
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  if (!response.ok) {
    throw new Error(`Geolocation API responded with ${response.status}`);
  }
  let data: locationApiData | null = null;
  try {
    data = (await response.json()) as locationApiData;
  } catch (err) {
    throw new Error("Api sent bad json");
  }

  if (!data.country || !data.city) {
    throw new Error("Geolocation returned empty fields");
  }
  const result = `${data.country},${data.city}`;
  return result;
}
