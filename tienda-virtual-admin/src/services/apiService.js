import CONFIG from './Config';

export const getCategorias = async () => {
  const response = await fetch(`${CONFIG.API_URL}/get_data.php?table=categorias`);
  if (!response.ok) {
    throw new Error('Error fetching categories');
  }
  return response.json();
};

export const getGeneros = async () => {
  const response = await fetch(`${CONFIG.API_URL}/get_data.php?table=generos`);
  if (!response.ok) {
    throw new Error('Error fetching genders');
  }
  return response.json();
};

export const getMarcas = async () => {
  const response = await fetch(`${CONFIG.API_URL}/get_data.php?table=marcas`);
  if (!response.ok) {
    throw new Error('Error fetching brands');
  }
  return response.json();
};