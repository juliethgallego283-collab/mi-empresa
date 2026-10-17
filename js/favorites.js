/**
 * LÚMINA BEAUTY - Módulo de Favoritos (Wishlist)
 * Maneja la persistencia en localStorage y las interacciones con la lista de favoritos
 */

const STORAGE_KEY_FAVORITOS = "lumina_beauty_favoritos_v1";

class FavoritesManager {
  constructor() {
    this.favoritos = this.cargarFavoritos();
    this.suscriptores = [];
  }

  /**
   * Carga los IDs favoritos desde localStorage de manera segura
   */
  cargarFavoritos() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_FAVORITOS);
      if (data) {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.warn("No se pudieron cargar favoritos desde localStorage:", e);
    }
    return [];
  }

  /**
   * Guarda los favoritos en localStorage y notifica a los suscriptores
   */
  guardarFavoritos() {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITOS, JSON.stringify(this.favoritos));
    } catch (e) {
      console.warn("No se pudieron guardar favoritos en localStorage:", e);
    }
    this.notificar();
  }

  /**
   * Suscribe una función para recibir actualizaciones cuando cambie la lista
   */
  suscribir(callback) {
    if (typeof callback === "function") {
      this.suscriptores.push(callback);
      callback(this.obtenerFavoritos());
    }
  }

  notificar() {
    const lista = this.obtenerFavoritos();
    this.suscriptores.forEach(fn => {
      try {
        fn(lista);
      } catch (err) {
        console.error("Error en suscriptor de favoritos:", err);
      }
    });
  }

  /**
   * Alterna el estado de favorito de un producto (toggle)
   * @param {number} productoId
   * @returns {boolean} true si ahora es favorito, false si fue removido
   */
  toggleFavorito(productoId) {
    const id = Number(productoId);
    const index = this.favoritos.indexOf(id);

    if (index > -1) {
      this.favoritos.splice(index, 1);
      this.guardarFavoritos();
      return false;
    } else {
      this.favoritos.push(id);
      this.guardarFavoritos();
      return true;
    }
  }

  /**
   * Verifica si un producto está en favoritos
   */
  esFavorito(productoId) {
    const id = Number(productoId);
    return this.favoritos.includes(id);
  }

  /**
   * Remueve un producto de favoritos
   */
  eliminarFavorito(productoId) {
    const id = Number(productoId);
    const index = this.favoritos.indexOf(id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
      this.guardarFavoritos();
      return true;
    }
    return false;
  }

  /**
   * Obtiene la lista completa de objetos producto favoritos
   */
  obtenerFavoritos() {
    const productsModule = window.LuminaProducts;
    if (!productsModule) return [];
    return this.favoritos
      .map(id => productsModule.obtenerProductoPorId(id))
      .filter(p => p !== null);
  }

  /**
   * Obtiene la cantidad de favoritos
   */
  obtenerTotalItems() {
    return this.favoritos.length;
  }

  /**
   * Limpia todos los favoritos
   */
  vaciarFavoritos() {
    this.favoritos = [];
    this.guardarFavoritos();
  }
}

// Instancia singleton
window.LuminaFavorites = new FavoritesManager();
