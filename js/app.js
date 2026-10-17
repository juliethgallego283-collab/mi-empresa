/**
 * LÚMINA BEAUTY - Coordinador Principal de la Aplicación (app.js)
 * Inicializa y conecta todos los módulos de la tienda virtual
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  // Elementos DOM en caché
  elementos: {},

  init() {
    this.cachearElementos();
    this.inicializarModulos();
    this.vincularEventosGlobales();
    this.vincularEventosCarrito();
    this.vincularEventosFavoritos();
    this.vincularEventosModalProducto();
    this.vincularEventosCheckout();
    this.vincularFAQ();
    this.vincularNewsletter();

    console.log("✨ LÚMINA BEAUTY inicializado correctamente.");
  },

  cachearElementos() {
    this.elementos = {
      // Header y navegación
      header: document.querySelector(".header-principal"),
      btnMenuMovil: document.getElementById("btn-menu-movil"),
      navMenu: document.getElementById("nav-menu-principal"),
      backdropGlobal: document.getElementById("backdrop-global"),
      
      // Badges contadores
      badgeCarrito: document.querySelectorAll(".badge-carrito-conteo"),
      badgeFavoritos: document.querySelectorAll(".badge-favoritos-conteo"),
      
      // Carrito Drawer
      drawerCarrito: document.getElementById("drawer-carrito"),
      btnAbrirCarrito: document.querySelectorAll(".btn-abrir-carrito"),
      btnCerrarCarrito: document.getElementById("btn-cerrar-carrito"),
      listaCarritoItems: document.getElementById("carrito-items-lista"),
      carritoVacio: document.getElementById("carrito-vacio-mensaje"),
      carritoContenido: document.getElementById("carrito-con-items"),
      carritoSubtotal: document.getElementById("carrito-subtotal-val"),
      carritoDescuentoFila: document.getElementById("carrito-descuento-fila"),
      carritoDescuentoVal: document.getElementById("carrito-descuento-val"),
      carritoEnvioVal: document.getElementById("carrito-envio-val"),
      carritoTotalVal: document.getElementById("carrito-total-val"),
      barraEnvioProgreso: document.getElementById("barra-envio-progreso"),
      textoEnvioRestante: document.getElementById("texto-envio-restante"),
      inputCupon: document.getElementById("input-codigo-cupon"),
      btnAplicarCupon: document.getElementById("btn-aplicar-cupon"),
      cuponActivoTag: document.getElementById("cupon-activo-tag"),
      btnFinalizarCompra: document.getElementById("btn-finalizar-compra"),
      
      // Favoritos Drawer
      drawerFavoritos: document.getElementById("drawer-favoritos"),
      btnAbrirFavoritos: document.querySelectorAll(".btn-abrir-favoritos"),
      btnCerrarFavoritos: document.getElementById("btn-cerrar-favoritos"),
      listaFavoritosItems: document.getElementById("favoritos-items-lista"),
      favoritosVacio: document.getElementById("favoritos-vacio-mensaje"),
      favoritosConItems: document.getElementById("favoritos-con-items"),
      btnVaciarFavoritos: document.getElementById("btn-vaciar-favoritos"),
      
      // Modal Detalle Producto
      modalProducto: document.getElementById("modal-detalle-producto"),
      btnCerrarModalProducto: document.getElementById("btn-cerrar-modal-producto"),
      modalProductoImg: document.getElementById("modal-prod-img"),
      modalProductoBadge: document.getElementById("modal-prod-badge"),
      modalProductoNombre: document.getElementById("modal-prod-nombre"),
      modalProductoCategoria: document.getElementById("modal-prod-categoria"),
      modalProductoPrecio: document.getElementById("modal-prod-precio"),
      modalProductoPrecioOriginal: document.getElementById("modal-prod-precio-original"),
      modalProductoRating: document.getElementById("modal-prod-rating"),
      modalProductoDescripcion: document.getElementById("modal-prod-descripcion"),
      modalProductoModoUso: document.getElementById("modal-prod-modouso"),
      modalProductoIngredientes: document.getElementById("modal-prod-ingredientes"),
      modalProdCantidadInput: document.getElementById("modal-prod-cantidad"),
      modalProdBtnMenos: document.getElementById("modal-prod-btn-menos"),
      modalProdBtnMas: document.getElementById("modal-prod-btn-mas"),
      modalProdBtnAgregar: document.getElementById("modal-prod-btn-agregar"),
      modalProdBtnFavorito: document.getElementById("modal-prod-btn-fav"),
      
      // Modal Checkout Demostrativo
      modalCheckout: document.getElementById("modal-checkout"),
      btnCerrarCheckout: document.getElementById("btn-cerrar-checkout"),
      formCheckout: document.getElementById("form-checkout-demostrativo"),
      checkoutItemsResumen: document.getElementById("checkout-resumen-items"),
      checkoutSubtotalVal: document.getElementById("checkout-subtotal-val"),
      checkoutEnvioVal: document.getElementById("checkout-envio-val"),
      checkoutTotalVal: document.getElementById("checkout-total-val"),
      checkoutConfirmacion: document.getElementById("checkout-confirmacion-exito"),
      checkoutContenidoForm: document.getElementById("checkout-contenido-formulario"),
      checkoutOrdenId: document.getElementById("checkout-orden-id"),
      btnSeguirComprando: document.getElementById("btn-checkout-seguir-comprando"),
      
      // Toast container
      contenedorToast: document.getElementById("contenedor-notificaciones-toast")
    };
  },

  inicializarModulos() {
    // Inicializar catálogo
    if (window.LuminaCatalog) {
      window.LuminaCatalog.init("grid-productos");
    }

    // Suscribir eventos del carrito a cambios de datos
    if (window.LuminaCart) {
      window.LuminaCart.suscribir(estado => {
        this.renderizarCarrito(estado);
      });
    }

    // Suscribir eventos de favoritos
    if (window.LuminaFavorites) {
      window.LuminaFavorites.suscribir(lista => {
        this.renderizarFavoritos(lista);
      });
    }
  },

  vincularEventosGlobales() {
    const { header, btnMenuMovil, navMenu, backdropGlobal } = this.elementos;

    // Scroll header sticky blur
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header?.classList.add("header-scrolled");
      } else {
        header?.classList.remove("header-scrolled");
      }
    });

    // Menú móvil hamburguesa
    btnMenuMovil?.addEventListener("click", () => {
      const activo = navMenu?.classList.toggle("activo");
      btnMenuMovil.setAttribute("aria-expanded", String(activo));
      if (activo) {
        this.abrirBackdrop(() => this.cerrarMenuMovil());
      } else {
        this.cerrarBackdrop();
      }
    });

    // Cerrar menú móvil al hacer clic en enlaces de navegación
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        this.cerrarMenuMovil();
      });
    });

    // Buscador en header
    const inputBusquedaHeader = document.getElementById("input-busqueda-header");
    inputBusquedaHeader?.addEventListener("input", e => {
      const valor = e.target.value;
      if (window.LuminaCatalog) {
        window.LuminaCatalog.setBusqueda(valor);
      }
    });

    // Buscador en barra de filtros del catálogo
    const inputBusquedaCatalogo = document.getElementById("input-busqueda-catalogo");
    inputBusquedaCatalogo?.addEventListener("input", e => {
      const valor = e.target.value;
      if (window.LuminaCatalog) {
        window.LuminaCatalog.setBusqueda(valor);
      }
      if (inputBusquedaHeader) {
        inputBusquedaHeader.value = valor;
      }
    });

    // Filtros de categoría en píldoras
    document.querySelectorAll(".categoria-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const cat = btn.getAttribute("data-categoria");
        document.querySelectorAll(".categoria-btn").forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        if (window.LuminaCatalog) {
          window.LuminaCatalog.setCategoria(cat);
        }
      });
    });

    // Slider de precio
    const sliderPrecio = document.getElementById("filtro-precio-slider");
    const valorPrecio = document.getElementById("filtro-precio-valor");
    sliderPrecio?.addEventListener("input", e => {
      const valor = Number(e.target.value);
      if (valorPrecio && window.LuminaProducts) {
        valorPrecio.textContent = window.LuminaProducts.formatearPrecio(valor);
      }
      if (window.LuminaCatalog) {
        window.LuminaCatalog.setPrecioMaximo(valor);
      }
    });

    // Select de ordenamiento
    const selectOrden = document.getElementById("select-orden");
    selectOrden?.addEventListener("change", e => {
      if (window.LuminaCatalog) {
        window.LuminaCatalog.setOrden(e.target.value);
      }
    });

    // Botón restablecer filtros (en estado vacío y barra)
    document.querySelectorAll(".btn-restablecer-filtros").forEach(btn => {
      btn.addEventListener("click", () => {
        if (window.LuminaCatalog) {
          window.LuminaCatalog.limpiarFiltros();
        }
        this.mostrarToast("Filtros restablecidos al valor predeterminado", "info");
      });
    });

    // Delegación de eventos en las tarjetas de productos
    const contenedorCatalogo = document.getElementById("grid-productos");
    contenedorCatalogo?.addEventListener("click", e => {
      const btnAgregar = e.target.closest(".btn-agregar-carrito");
      if (btnAgregar) {
        const prodId = btnAgregar.getAttribute("data-id");
        this.agregarAlCarritoConFeedback(prodId, 1, btnAgregar);
        return;
      }

      const btnFav = e.target.closest(".btn-favorito-card");
      if (btnFav) {
        const prodId = btnFav.getAttribute("data-id");
        this.toggleFavoritoConFeedback(prodId, btnFav);
        return;
      }

      const btnVistaRapida = e.target.closest(".btn-vista-rapida");
      const enlaceProducto = e.target.closest(".enlace-producto");
      if (btnVistaRapida || enlaceProducto) {
        const elemento = btnVistaRapida || enlaceProducto;
        const prodId = elemento.getAttribute("data-id");
        this.abrirModalDetalleProducto(prodId);
        return;
      }
    });

    // Cerrar cualquier modal/drawer al presionar ESC
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.cerrarTodosLosModales();
      }
    });
  },

  vincularEventosCarrito() {
    const {
      btnAbrirCarrito,
      btnCerrarCarrito,
      drawerCarrito,
      listaCarritoItems,
      inputCupon,
      btnAplicarCupon,
      cuponActivoTag,
      btnFinalizarCompra
    } = this.elementos;

    btnAbrirCarrito.forEach(btn => {
      btn.addEventListener("click", () => this.abrirCarrito());
    });

    btnCerrarCarrito?.addEventListener("click", () => this.cerrarCarrito());

    // Delegación dentro de la lista de ítems del carrito
    listaCarritoItems?.addEventListener("click", e => {
      const btnMas = e.target.closest(".btn-item-cant-mas");
      if (btnMas) {
        const id = btnMas.getAttribute("data-id");
        window.LuminaCart.incrementarCantidad(id);
        return;
      }

      const btnMenos = e.target.closest(".btn-item-cant-menos");
      if (btnMenos) {
        const id = btnMenos.getAttribute("data-id");
        window.LuminaCart.decrementarCantidad(id);
        return;
      }

      const btnEliminar = e.target.closest(".btn-item-eliminar");
      if (btnEliminar) {
        const id = btnEliminar.getAttribute("data-id");
        const prod = window.LuminaProducts.obtenerProductoPorId(id);
        window.LuminaCart.eliminarProducto(id);
        this.mostrarToast(`Se eliminó "${prod ? prod.nombre : 'Producto'}" del carrito`, "info");
        return;
      }
    });

    // Input directo de cantidad en carrito
    listaCarritoItems?.addEventListener("change", e => {
      const inputCant = e.target.closest(".input-item-cantidad");
      if (inputCant) {
        const id = inputCant.getAttribute("data-id");
        const valor = parseInt(inputCant.value, 10);
        window.LuminaCart.actualizarCantidad(id, valor);
      }
    });

    // Aplicar cupón
    btnAplicarCupon?.addEventListener("click", () => {
      if (!inputCupon) return;
      const res = window.LuminaCart.aplicarCupon(inputCupon.value);
      this.mostrarToast(res.mensaje, res.exito ? "success" : "warning");
      if (res.exito) {
        inputCupon.value = "";
      }
    });

    inputCupon?.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        btnAplicarCupon?.click();
      }
    });

    // Remover cupón
    cuponActivoTag?.addEventListener("click", e => {
      const btnRemover = e.target.closest(".btn-remover-cupon");
      if (btnRemover) {
        window.LuminaCart.removerCupon();
        this.mostrarToast("Cupón de descuento removido", "info");
      }
    });

    // Finalizar compra -> abre Checkout Demostrativo
    btnFinalizarCompra?.addEventListener("click", () => {
      this.cerrarCarrito();
      this.abrirCheckout();
    });
  },

  vincularEventosFavoritos() {
    const {
      btnAbrirFavoritos,
      btnCerrarFavoritos,
      listaFavoritosItems,
      btnVaciarFavoritos
    } = this.elementos;

    btnAbrirFavoritos.forEach(btn => {
      btn.addEventListener("click", () => this.abrirFavoritos());
    });

    btnCerrarFavoritos?.addEventListener("click", () => this.cerrarFavoritos());

    // Delegación dentro de la lista de favoritos
    listaFavoritosItems?.addEventListener("click", e => {
      const btnMoverCarrito = e.target.closest(".btn-fav-mover-carrito");
      if (btnMoverCarrito) {
        const id = btnMoverCarrito.getAttribute("data-id");
        window.LuminaCart.agregarProducto(id, 1);
        const prod = window.LuminaProducts.obtenerProductoPorId(id);
        this.mostrarToast(`¡"${prod ? prod.nombre : 'Producto'}" añadido al carrito!`, "success");
        return;
      }

      const btnEliminar = e.target.closest(".btn-fav-eliminar");
      if (btnEliminar) {
        const id = btnEliminar.getAttribute("data-id");
        window.LuminaFavorites.eliminarFavorito(id);
        this.mostrarToast("Producto eliminado de favoritos", "info");
        return;
      }
    });

    btnVaciarFavoritos?.addEventListener("click", () => {
      if (confirm("¿Deseas vaciar tu lista de favoritos?")) {
        window.LuminaFavorites.vaciarFavoritos();
        this.mostrarToast("Lista de favoritos vaciada", "info");
      }
    });
  },

  vincularEventosModalProducto() {
    const {
      modalProducto,
      btnCerrarModalProducto,
      modalProdBtnMenos,
      modalProdBtnMas,
      modalProdCantidadInput,
      modalProdBtnAgregar,
      modalProdBtnFavorito
    } = this.elementos;

    let productoActualId = null;

    btnCerrarModalProducto?.addEventListener("click", () => {
      this.cerrarModalDetalleProducto();
    });

    modalProdBtnMenos?.addEventListener("click", () => {
      if (!modalProdCantidadInput) return;
      const actual = parseInt(modalProdCantidadInput.value, 10) || 1;
      if (actual > 1) {
        modalProdCantidadInput.value = actual - 1;
      }
    });

    modalProdBtnMas?.addEventListener("click", () => {
      if (!modalProdCantidadInput) return;
      const actual = parseInt(modalProdCantidadInput.value, 10) || 1;
      modalProdCantidadInput.value = actual + 1;
    });

    modalProdBtnAgregar?.addEventListener("click", () => {
      const id = modalProdBtnAgregar.getAttribute("data-id");
      const cant = parseInt(modalProdCantidadInput?.value, 10) || 1;
      if (id) {
        this.agregarAlCarritoConFeedback(id, cant, modalProdBtnAgregar);
        this.cerrarModalDetalleProducto();
      }
    });

    modalProdBtnFavorito?.addEventListener("click", () => {
      const id = modalProdBtnFavorito.getAttribute("data-id");
      if (id) {
        this.toggleFavoritoConFeedback(id, modalProdBtnFavorito);
        const esFav = window.LuminaFavorites.esFavorito(id);
        modalProdBtnFavorito.classList.toggle("activo", esFav);
      }
    });
  },

  vincularEventosCheckout() {
    const {
      btnCerrarCheckout,
      formCheckout,
      btnSeguirComprando
    } = this.elementos;

    btnCerrarCheckout?.addEventListener("click", () => this.cerrarCheckout());

    btnSeguirComprando?.addEventListener("click", () => {
      this.cerrarCheckout();
      window.LuminaCart.vaciarCarrito();
      this.restaurarFormularioCheckout();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    formCheckout?.addEventListener("submit", e => {
      e.preventDefault();
      this.procesarCheckoutDemostrativo();
    });
  },

  vincularFAQ() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const btn = item.querySelector(".faq-pregunta");
      btn?.addEventListener("click", () => {
        const abierto = item.classList.contains("activo");
        document.querySelectorAll(".faq-item").forEach(other => other.classList.remove("activo"));
        if (!abierto) {
          item.classList.add("activo");
        }
      });
    });
  },

  vincularNewsletter() {
    const form = document.getElementById("form-newsletter");
    const input = document.getElementById("input-newsletter-email");
    form?.addEventListener("submit", e => {
      e.preventDefault();
      if (!input) return;
      const email = input.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        this.mostrarToast("Por favor ingresa un correo electrónico válido.", "warning");
        return;
      }
      this.mostrarToast("¡Bienvenida a la comunidad LÚMINA! Usa el cupón LUMINA10 en tu compra.", "success");
      input.value = "";
    });
  },

  // ===== MÉTODOS DE RENDERIZADO Y ACCIONES =====

  agregarAlCarritoConFeedback(productoId, cantidad = 1, boton = null) {
    window.LuminaCart.agregarProducto(productoId, cantidad);
    const prod = window.LuminaProducts.obtenerProductoPorId(productoId);
    const nombre = prod ? prod.nombre : "Producto";

    if (boton) {
      boton.classList.add("btn-agregado-anim");
      setTimeout(() => boton.classList.remove("btn-agregado-anim"), 800);
    }

    this.mostrarToast(`✨ "${nombre}" agregado al carrito (+${cantidad})`, "success");
  },

  toggleFavoritoConFeedback(productoId, boton = null) {
    const estadoNuevo = window.LuminaFavorites.toggleFavorito(productoId);
    const prod = window.LuminaProducts.obtenerProductoPorId(productoId);
    const nombre = prod ? prod.nombre : "Producto";

    if (boton) {
      boton.classList.toggle("activo", estadoNuevo);
    }

    if (estadoNuevo) {
      this.mostrarToast(`❤️ "${nombre}" añadido a tus favoritos`, "success");
    } else {
      this.mostrarToast(`"${nombre}" eliminado de tus favoritos`, "info");
    }
  },

  renderizarCarrito(estado) {
    const {
      badgeCarrito,
      listaCarritoItems,
      carritoVacio,
      carritoContenido,
      carritoSubtotal,
      carritoDescuentoFila,
      carritoDescuentoVal,
      carritoEnvioVal,
      carritoTotalVal,
      barraEnvioProgreso,
      textoEnvioRestante,
      cuponActivoTag
    } = this.elementos;

    const format = window.LuminaProducts.formatearPrecio;

    // Actualizar badges
    badgeCarrito.forEach(badge => {
      badge.textContent = estado.totalItems;
      badge.classList.toggle("oculto", estado.totalItems === 0);
    });

    // Actualizar barra de envío gratis
    if (barraEnvioProgreso) {
      barraEnvioProgreso.style.width = `${estado.progresoEnvioGratis}%`;
    }
    if (textoEnvioRestante) {
      if (estado.estaVacio) {
        textoEnvioRestante.innerHTML = `Agrega productos por <strong>${format(estado.umbralEnvioGratis)}</strong> para envío gratis.`;
      } else if (estado.envioGratisAlcanzado) {
        textoEnvioRestante.innerHTML = `🎉 <strong>¡Felicidades!</strong> Tu pedido califica para <strong>Envío Gratis</strong>.`;
      } else {
        textoEnvioRestante.innerHTML = `Te faltan <strong>${format(estado.faltaParaEnvioGratis)}</strong> para <strong>Envío Gratis</strong> nacional.`;
      }
    }

    // Toggle estado vacío / contenido
    if (estado.estaVacio) {
      if (carritoVacio) carritoVacio.style.display = "flex";
      if (carritoContenido) carritoContenido.style.display = "none";
      return;
    }

    if (carritoVacio) carritoVacio.style.display = "none";
    if (carritoContenido) carritoContenido.style.display = "flex";

    // Renderizar lista de productos en el carrito
    if (listaCarritoItems) {
      listaCarritoItems.innerHTML = estado.items.map(item => `
        <li class="carrito-item" data-id="${item.producto.id}">
          <div class="carrito-item-img-wrap">
            <img 
              src="${item.producto.imagen}" 
              alt="${item.producto.nombre}"
              onerror="this.onerror=null; this.src='assets/images/hero-banner.jpg';"
            />
          </div>
          <div class="carrito-item-info">
            <div class="carrito-item-encabezado">
              <h4 class="carrito-item-nombre">${item.producto.nombre}</h4>
              <button 
                type="button" 
                class="btn-item-eliminar" 
                data-id="${item.producto.id}"
                title="Eliminar del carrito"
                aria-label="Eliminar ${item.producto.nombre}"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <span class="carrito-item-precio-unitario">${format(item.producto.precio)} c/u</span>

            <div class="carrito-item-inferior">
              <div class="selector-cantidad-compacto">
                <button 
                  type="button" 
                  class="btn-item-cant-menos" 
                  data-id="${item.producto.id}"
                  aria-label="Disminuir cantidad"
                >−</button>
                <input 
                  type="number" 
                  class="input-item-cantidad" 
                  value="${item.cantidad}" 
                  min="1" 
                  max="99" 
                  data-id="${item.producto.id}"
                  aria-label="Cantidad"
                />
                <button 
                  type="button" 
                  class="btn-item-cant-mas" 
                  data-id="${item.producto.id}"
                  aria-label="Aumentar cantidad"
                >+</button>
              </div>
              <span class="carrito-item-subtotal">${format(item.subtotalItem)}</span>
            </div>
          </div>
        </li>
      `).join("");
    }

    // Actualizar resumen numérico
    if (carritoSubtotal) carritoSubtotal.textContent = format(estado.subtotal);

    if (carritoDescuentoFila) {
      if (estado.cuponAplicado && estado.descuentoMonto > 0) {
        carritoDescuentoFila.style.display = "flex";
        if (carritoDescuentoVal) {
          carritoDescuentoVal.textContent = `-${format(estado.descuentoMonto)} (${estado.cuponAplicado.porcentaje}%)`;
        }
      } else {
        carritoDescuentoFila.style.display = "none";
      }
    }

    if (carritoEnvioVal) {
      carritoEnvioVal.textContent = estado.costoEnvio === 0 ? "¡GRATIS!" : format(estado.costoEnvio);
      carritoEnvioVal.classList.toggle("envio-gratis-badge", estado.costoEnvio === 0);
    }

    if (carritoTotalVal) carritoTotalVal.textContent = format(estado.total);

    // Cupón activo tag
    if (cuponActivoTag) {
      if (estado.cuponAplicado) {
        cuponActivoTag.style.display = "inline-flex";
        cuponActivoTag.innerHTML = `
          <span>🏷️ ${estado.cuponAplicado.codigo} (${estado.cuponAplicado.porcentaje}% OFF)</span>
          <button type="button" class="btn-remover-cupon" title="Remover cupón" aria-label="Remover cupón">&times;</button>
        `;
      } else {
        cuponActivoTag.style.display = "none";
        cuponActivoTag.innerHTML = "";
      }
    }
  },

  renderizarFavoritos(lista) {
    const {
      badgeFavoritos,
      listaFavoritosItems,
      favoritosVacio,
      favoritosConItems
    } = this.elementos;

    const format = window.LuminaProducts.formatearPrecio;

    badgeFavoritos.forEach(badge => {
      badge.textContent = lista.length;
      badge.classList.toggle("oculto", lista.length === 0);
    });

    if (lista.length === 0) {
      if (favoritosVacio) favoritosVacio.style.display = "flex";
      if (favoritosConItems) favoritosConItems.style.display = "none";
      return;
    }

    if (favoritosVacio) favoritosVacio.style.display = "none";
    if (favoritosConItems) favoritosConItems.style.display = "flex";

    if (listaFavoritosItems) {
      listaFavoritosItems.innerHTML = lista.map(prod => `
        <li class="favorito-item">
          <div class="favorito-item-img">
            <img 
              src="${prod.imagen}" 
              alt="${prod.nombre}"
              onerror="this.onerror=null; this.src='assets/images/hero-banner.jpg';"
            />
          </div>
          <div class="favorito-item-info">
            <span class="favorito-item-categoria">${prod.categoria}</span>
            <h4 class="favorito-item-nombre">${prod.nombre}</h4>
            <span class="favorito-item-precio">${format(prod.precio)}</span>
            <div class="favorito-item-acciones">
              <button 
                type="button" 
                class="btn-fav-mover-carrito btn-primario-suave" 
                data-id="${prod.id}"
                aria-label="Mover ${prod.nombre} al carrito"
              >
                Añadir al Carrito
              </button>
              <button 
                type="button" 
                class="btn-fav-eliminar" 
                data-id="${prod.id}"
                title="Quitar de favoritos"
                aria-label="Quitar de favoritos"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      `).join("");
    }
  },

  abrirModalDetalleProducto(productoId) {
    const prod = window.LuminaProducts.obtenerProductoPorId(productoId);
    if (!prod) return;

    const {
      modalProducto,
      modalProductoImg,
      modalProductoBadge,
      modalProductoNombre,
      modalProductoCategoria,
      modalProductoPrecio,
      modalProductoPrecioOriginal,
      modalProductoRating,
      modalProductoDescripcion,
      modalProductoModoUso,
      modalProductoIngredientes,
      modalProdCantidadInput,
      modalProdBtnAgregar,
      modalProdBtnFavorito
    } = this.elementos;

    const format = window.LuminaProducts.formatearPrecio;

    if (modalProductoImg) {
      modalProductoImg.src = prod.imagen;
      modalProductoImg.alt = prod.nombre;
    }
    if (modalProductoBadge) {
      if (prod.badge) {
        modalProductoBadge.style.display = "inline-block";
        modalProductoBadge.textContent = prod.badge;
      } else {
        modalProductoBadge.style.display = "none";
      }
    }
    if (modalProductoNombre) modalProductoNombre.textContent = prod.nombre;
    if (modalProductoCategoria) modalProductoCategoria.textContent = prod.categoria;
    if (modalProductoPrecio) modalProductoPrecio.textContent = format(prod.precio);
    if (modalProductoPrecioOriginal) {
      if (prod.precioOriginal) {
        modalProductoPrecioOriginal.style.display = "inline";
        modalProductoPrecioOriginal.textContent = format(prod.precioOriginal);
      } else {
        modalProductoPrecioOriginal.style.display = "none";
      }
    }

    if (modalProductoRating) {
      modalProductoRating.innerHTML = `
        <span class="estrellas-rating" style="color: #c59b7d;">★★★★★</span>
        <strong>${prod.rating}</strong> (${prod.reviewsCount} reseñas verificadas)
      `;
    }

    if (modalProductoDescripcion) modalProductoDescripcion.textContent = prod.descripcion;
    if (modalProductoModoUso) modalProductoModoUso.textContent = prod.modoUso || "Aplicar de acuerdo a la rutina diaria.";

    if (modalProductoIngredientes) {
      if (prod.ingredientes && prod.ingredientes.length > 0) {
        modalProductoIngredientes.innerHTML = prod.ingredientes.map(ing => `
          <span class="ingrediente-pildora">${ing}</span>
        `).join("");
      } else {
        modalProductoIngredientes.innerHTML = "";
      }
    }

    if (modalProdCantidadInput) modalProdCantidadInput.value = 1;

    if (modalProdBtnAgregar) {
      modalProdBtnAgregar.setAttribute("data-id", prod.id);
    }

    if (modalProdBtnFavorito) {
      modalProdBtnFavorito.setAttribute("data-id", prod.id);
      const esFav = window.LuminaFavorites.esFavorito(prod.id);
      modalProdBtnFavorito.classList.toggle("activo", esFav);
    }

    modalProducto?.classList.add("activo");
    this.abrirBackdrop(() => this.cerrarModalDetalleProducto());
    document.body.style.overflow = "hidden";
  },

  cerrarModalDetalleProducto() {
    this.elementos.modalProducto?.classList.remove("activo");
    this.cerrarBackdrop();
    document.body.style.overflow = "";
  },

  abrirCarrito() {
    this.cerrarFavoritos();
    this.cerrarMenuMovil();
    this.elementos.drawerCarrito?.classList.add("activo");
    this.abrirBackdrop(() => this.cerrarCarrito());
    document.body.style.overflow = "hidden";
  },

  cerrarCarrito() {
    this.elementos.drawerCarrito?.classList.remove("activo");
    this.cerrarBackdrop();
    document.body.style.overflow = "";
  },

  abrirFavoritos() {
    this.cerrarCarrito();
    this.cerrarMenuMovil();
    this.elementos.drawerFavoritos?.classList.add("activo");
    this.abrirBackdrop(() => this.cerrarFavoritos());
    document.body.style.overflow = "hidden";
  },

  cerrarFavoritos() {
    this.elementos.drawerFavoritos?.classList.remove("activo");
    this.cerrarBackdrop();
    document.body.style.overflow = "";
  },

  cerrarMenuMovil() {
    this.elementos.navMenu?.classList.remove("activo");
    this.elementos.btnMenuMovil?.setAttribute("aria-expanded", "false");
    this.cerrarBackdrop();
  },

  abrirCheckout() {
    const estado = window.LuminaCart.obtenerEstado();
    if (estado.estaVacio) {
      this.mostrarToast("Tu carrito está vacío. Agrega productos para iniciar el checkout.", "warning");
      return;
    }

    const {
      modalCheckout,
      checkoutItemsResumen,
      checkoutSubtotalVal,
      checkoutEnvioVal,
      checkoutTotalVal,
      checkoutConfirmacion,
      checkoutContenidoForm
    } = this.elementos;

    const format = window.LuminaProducts.formatearPrecio;

    // Asegurar que el form se muestre y la confirmación se oculte
    if (checkoutConfirmacion) checkoutConfirmacion.style.display = "none";
    if (checkoutContenidoForm) checkoutContenidoForm.style.display = "grid";

    // Llenar resumen de compra
    if (checkoutItemsResumen) {
      checkoutItemsResumen.innerHTML = estado.items.map(i => `
        <div class="checkout-resumen-fila">
          <div class="checkout-resumen-nombre">
            <span>${i.producto.nombre}</span>
            <small>x${i.cantidad}</small>
          </div>
          <span class="checkout-resumen-monto">${format(i.subtotalItem)}</span>
        </div>
      `).join("");
    }

    if (checkoutSubtotalVal) checkoutSubtotalVal.textContent = format(estado.subtotal);
    if (checkoutEnvioVal) {
      checkoutEnvioVal.textContent = estado.costoEnvio === 0 ? "Gratis" : format(estado.costoEnvio);
    }
    if (checkoutTotalVal) checkoutTotalVal.textContent = format(estado.total);

    modalCheckout?.classList.add("activo");
    this.abrirBackdrop(() => this.cerrarCheckout());
    document.body.style.overflow = "hidden";
  },

  cerrarCheckout() {
    this.elementos.modalCheckout?.classList.remove("activo");
    this.cerrarBackdrop();
    document.body.style.overflow = "";
  },

  procesarCheckoutDemostrativo() {
    const form = this.elementos.formCheckout;
    if (!form) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nombre = document.getElementById("checkout-nombre")?.value;
    const email = document.getElementById("checkout-email")?.value;
    const direccion = document.getElementById("checkout-direccion")?.value;
    const ciudad = document.getElementById("checkout-ciudad")?.value;

    const btnSubmit = form.querySelector("button[type='submit']");
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner-mini"></span> Procesando pedido...`;
    }

    // Simular tiempo de respuesta
    setTimeout(() => {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = `Confirmar Pedido Demostrativo`;
      }

      // Generar orden simulada
      const ordenId = "LUM-" + Math.floor(100000 + Math.random() * 900000);
      if (this.elementos.checkoutOrdenId) {
        this.elementos.checkoutOrdenId.textContent = `#${ordenId}`;
      }

      const resumenCliente = document.getElementById("checkout-datos-cliente-confirmados");
      if (resumenCliente) {
        resumenCliente.innerHTML = `
          <p><strong>Cliente:</strong> ${nombre}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Entrega en:</strong> ${direccion}, ${ciudad}</p>
          <p><strong>Tiempo estimado:</strong> 2 a 4 días hábiles</p>
        `;
      }

      if (this.elementos.checkoutContenidoForm) {
        this.elementos.checkoutContenidoForm.style.display = "none";
      }
      if (this.elementos.checkoutConfirmacion) {
        this.elementos.checkoutConfirmacion.style.display = "block";
      }

      this.mostrarToast(`¡Pedido ${ordenId} simulado con éxito!`, "success");
    }, 1000);
  },

  restaurarFormularioCheckout() {
    if (this.elementos.formCheckout) {
      this.elementos.formCheckout.reset();
    }
  },

  cerrarTodosLosModales() {
    this.cerrarCarrito();
    this.cerrarFavoritos();
    this.cerrarModalDetalleProducto();
    this.cerrarCheckout();
    this.cerrarMenuMovil();
  },

  abrirBackdrop(callbackCierre) {
    const backdrop = this.elementos.backdropGlobal;
    if (!backdrop) return;
    backdrop.classList.add("activo");

    const nuevoHandler = () => {
      backdrop.removeEventListener("click", nuevoHandler);
      if (typeof callbackCierre === "function") {
        callbackCierre();
      }
    };

    backdrop.onclick = nuevoHandler;
  },

  cerrarBackdrop() {
    const backdrop = this.elementos.backdropGlobal;
    if (!backdrop) return;
    backdrop.classList.remove("activo");
    backdrop.onclick = null;
  },

  mostrarToast(mensaje, tipo = "info") {
    const contenedor = this.elementos.contenedorToast;
    if (!contenedor) return;

    const iconos = {
      success: "✓",
      warning: "⚠",
      info: "ℹ",
      error: "✕"
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo} toast-anim-entrada`;
    toast.setAttribute("role", "status");
    toast.innerHTML = `
      <span class="toast-icono">${iconos[tipo] || "ℹ"}</span>
      <span class="toast-mensaje">${mensaje}</span>
      <button type="button" class="toast-cerrar" aria-label="Cerrar notificación">&times;</button>
    `;

    contenedor.appendChild(toast);

    const remover = () => {
      toast.classList.remove("toast-anim-entrada");
      toast.classList.add("toast-anim-salida");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    const botonCerrar = toast.querySelector(".toast-cerrar");
    botonCerrar?.addEventListener("click", remover);

    setTimeout(remover, 3800);
  }
};
