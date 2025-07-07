import { API_BASE_URL } from './api';

export const submitStylistForm = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/ai-stylist/predict`, {
    method: 'POST',
    body: formData
  });
  return await response.json();
};

export const getOutfits = async () => {
  const response = await fetch(`${API_BASE_URL}/outfits`);
  return await response.json();
};

export const getOutfitDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/outfits/${id}`);
  return await response.json();
};
