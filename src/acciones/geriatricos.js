import api from 'api';

const obtenerTodos = () => {
  return api.geriatricos.obtener();
};

export default {
  obtenerTodos
};
