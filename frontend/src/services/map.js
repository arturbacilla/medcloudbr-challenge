import axios from 'axios';

const mapApi = axios.create({
  baseURL: 'https://api.geoapify.com/v1/geocode/search?text=',
});

const apiKey = process.env.REACT_APP_GEOAPIFY_KEY;

export const getGeoFromAddress = async (address) => {
  try {
    const result = await mapApi.get(`${encodeURIComponent(address)}&apiKey=${apiKey}`);
    return result.data.features[0].geometry.coordinates;
  } catch (error) {
    console.log(error);
    return [0, 0];
  }
};

export default mapApi;
