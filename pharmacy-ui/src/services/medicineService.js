import axios from "axios";

const API_URL = "https://localhost:7152/api";

export const getMedicines = async () => {
  const response = await axios.get(`${API_URL}/Medicines`);
  return response.data;
};

export const addMedicine = async (medicine) => {
  const response = await axios.post(`${API_URL}/Medicines`, medicine);

  return response.data;
};

export const sellMedicine = async (medicineId) => {
  await axios.post(`${API_URL}/Sales`, {
    medicineId,
    quantitySold: 1,
  });
};
