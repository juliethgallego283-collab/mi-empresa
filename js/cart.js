/**
 * LÚMINA BEAUTY - Módulo de Carrito de Compras
 * Gestiona ítems, cantidades, cupones, cálculos de totales y persistencia en localStorage
 */

const STORAGE_KEY_CARRITO = "lumina_beauty_carrito_v1";
const UMBRAL_ENVIO_GRATIS = 120000; // COP
const COSTO_ENVIO_ESTANDAR = 12000; // COP

class CartManager {
  constructor() {
    this.items = this.cargarCarrito();
    this.cuponAplicado = null; // { codigo: 'LUMINA10', porcentaje: 10 }
    this.suscriptores = [];
  }

  cargarCarrito() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CARRITO);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Validar que cada ítem tenga estructura correcta
          return parsed.filter(item => item && item.productoId && item.cantidad > 0);
        }
      }
    } catch (e) {
      console.warn("Error cargando carrito de localStorage:", e);
    }
    return [];
  }

  guardarCarrito() {
    try {
      localStorage.setItem(STORAGE_KEY_CARRITO, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Error guardando carrito en localStorage:", e);
    }
    this.notificar();
  }

  suscribir(callback) {
    if (typeof callback === "function") {
      this.suscriptores.push(callback);
      callback(this.obtenerEstado());
    }
  }

  notificar() {
    const estado = this.obtenerEstado();
    this.suscriptores.forEach(fn => {
      try {
        fn(estado);
      } catch (err) {
        console.error("Error en suscriptor del carrito:", err);
      }
    });
  }

  /**
   * Añade un producto al carrito o incrementa su cantidad
   * @param {number} productoId
   * @param {number} cantidad
   */
  agregarProducto(productoId, cantidad = 1) {
    const id = Number(productoId);
    const cant = Math.max(1, parseInt(cantidad, 10) || 1);

    const existente = this.items.find(i => i.productoId === id);
    if (existente) {
      existente.cantidad += cant;
    } else {
      this.items.push({ productoId: id, cantidad: cant });
    }

    this.guardarCarrito();
    return true;
  }

  /**
   * Actualiza la cantidad exacta de un producto
   */
  actualizarCantidad(productoId, cantidad) {
    const id = Number(productoId);
    const nuevaCant = parseInt(cantidad, 10);

    if (isNaN(nuevaCant) || nuevaCant <= 0) {
      return this.eliminarProducto(id);
    }

    const item = this.items.find(i => i.productoId === id);
    if (item) {
      item.cantidad = Math.min(99, nuevaCant); // Límite razonable
      this.guardarCarrito();
      return true;
    }
    return false;
  }

  /**
   * Incrementa en 1 la cantidad de un ítem
   */
  incrementarCantidad(productoId) {
    const id = Number(productoId);
    const item = this.items.find(i => i.productoId === id);
    if (item) {
      return this.actualizarCantidad(id, item.cantidad + 1);
    }
    return false;
  }

  /**
   * Decrementa en 1 la cantidad o lo elimina si llega a 0
   */
  decrementarCantidad(productoId) {
    const id = Number(productoId);
    const item = this.items.find(i => i.productoId === id);
    if (item) {
      if (item.cantidad > 1) {
        return this.actualizarCantidad(id, item.cantidad - 1);
      } else {
        return this.eliminarProducto(id);
      }
    }
    return false;
  }

  /**
   * Elimina un producto por completo del carrito
   */
  eliminarProducto(productoId) {
    const id = Number(productoId);
    const longitudInicial = this.items.length;
    this.items = this.items.filter(i => i.productoId !== id);
    if (this.items.length !== longitudInicial) {
      this.guardarCarrito();
      return true;
    }
    return false;
  }

  /**
   * Aplica un cupón de descuento promocional
   */
  aplicarCupon(codigo) {
    const limpio = (codigo || "").trim().toUpperCase();
    if (!limpio) {
      return { exito: false, mensaje: "Por favor ingresa un código de cupón." };
    }

    if (limpio === "LUMINA10") {
      this.cuponAplicado = { codigo: "LUMINA10", porcentaje: 10 };
      this.notificar();
      return { exito: true, mensaje: "¡Cupón LUMINA10 aplicado con éxito! (10% de descuento)" };
    } else if (limpio === "BELLEZA20") {
      this.cuponAplicado = { codigo: "BELLEZA20", porcentaje: 20 };
      this.notificar();
      return { exito: true, mensaje: "¡Cupón BELLEZA20 aplicado! (20% de descuento especial)" };
    } else {
      return { exito: false, mensaje: "El cupón ingresado no es válido o ha expirado." };
    }
  }

  /**
   * Remueve el cupón activo
   */
  removerCupon() {
    this.cuponAplicado = null;
    this.notificar();
  }

  /**
   * Vacía el carrito por completo
   */
  vaciarCarrito() {
    this.items = [];
    this.cuponAplicado = null;
    this.guardarCarrito();
  }

  /**
   * Calcula y devuelve el estado completo del carrito (ítems enriquecidos, subtotal, envío, total)
   */
  obtenerEstado() {
    const productsModule = window.LuminaProducts;
    let itemsEnriquecidos = [];
    let subtotal = 0;
    let totalItems = 0;

    if (productsModule) {
      this.items.forEach(item => {
        const prod = productsModule.obtenerProductoPorId(item.productoId);
        if (prod) {
          const itemSubtotal = prod.precio * item.cantidad;
          subtotal += itemSubtotal;
          totalItems += item.cantidad;
          itemsEnriquecidos.push({
            ...item,
            producto: prod,
            subtotalItem: itemSubtotal
          });
        }
      });
    }

    // Cálculo de descuento
    let descuentoMonto = 0;
    if (this.cuponAplicado && subtotal > 0) {
      descuentoMonto = Math.round((subtotal * this.cuponAplicado.porcentaje) / 100);
    }

    // Cálculo de envío
    const envioGratisAlcanzado = subtotal >= UMBRAL_ENVIO_GRATIS && subtotal > 0;
    const faltaParaEnvioGratis = Math.max(0, UMBRAL_ENVIO_GRATIS - subtotal);
    const progresoEnvioGratis = Math.min(100, Math.round((subtotal / UMBRAL_ENVIO_GRATIS) * 100));
    const costoEnvio = (subtotal === 0 || envioGratisAlcanzado) ? 0 : COSTO_ENVIO_ESTANDAR;

    // Total final
    const total = Math.max(0, subtotal - descuentoMonto + costoEnvio);

    return {
      items: itemsEnriquecidos,
      totalItems,
      subtotal,
      descuentoMonto,
      cuponAplicado: this.cuponAplicado,
      costoEnvio,
      envioGratisAlcanzado,
      faltaParaEnvioGratis,
      progresoEnvioGratis,
      umbralEnvioGratis: UMBRAL_ENVIO_GRATIS,
      total,
      estaVacio: itemsEnriquecidos.length === 0
    };
  }
}

// Instancia singleton
window.LuminaCart = new CartManager();
