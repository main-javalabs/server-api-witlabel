export const regularExps = {
  // Email
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

  // Teléfono (Ejemplo genérico, ajusta según necesidades específicas)
  telefono: /^\+?[0-9]{10,15}$/,

  // NIT (Ejemplo genérico, ajusta según el formato específico requerido)
  nit: /^[0-9]+[-]?[0-9kK]$/,

  // URL (Expresión regular simple para URLs, puede necesitar ajustes)
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};
