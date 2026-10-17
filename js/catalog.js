/**
 * LÚMINA BEAUTY - Módulo de Catálogo
 * Administra búsqueda, filtrado por categorías, rango de precio, ordenamiento y renderizado
 */

class CatalogManager {
  constructor() {
    this.filtros = {
      busqueda: "",
      categoria: "todas",
      precioMaximo: 150000,
      orden: "destacados"
    };

    this.contenedorCatalogo = null;
    this.contadorResultados = null;
    this.estadoVacio = null;
  }

  init(contenedorId = "grid-productos") {
    this.contenedorCatalogo = document.getElementById(contenedorId);
    this.contadorResultados = document.getElementById("contador-productos");
    this.estadoVacio = document.getElementById("estado-vacio-catalogo");

    // Re-renderizar si cambian favoritos
    if (window.LuminaFavorites) {
      window.LuminaFavorites.suscribir(() => {
        this.actualizarEstadosFavoritos();
      });
    }

    this.render();
  }

  setBusqueda(texto) {
    this.filtros.busqueda = (texto || "").trim().toLowerCase();
    this.render();
  }

  setCategoria(categoriaId) {
    this.filtros.categoria = categoriaId;
    this.render();
  }

  setPrecioMaximo(max) {
    const val = Number(max);
    this.filtros.precioMaximo = isNaN(val) ? 150000 : val;
    this.render();
  }

  setOrden(criterio) {
    this.filtros.orden = criterio;
    this.render();
  }

  limpiarFiltros() {
    this.filtros = {
      busqueda: "",
      categoria: "todas",
      precioMaximo: 150000,
      orden: "destacados"
    };

    // Actualizar controles de la UI
    const inputSearch = document.getElementById("input-busqueda-header");
    if (inputSearch) inputSearch.value = "";
    const inputSearchCatalog = document.getElementById("input-busqueda-catalogo");
    if (inputSearchCatalog) inputSearchCatalog.value = "";

    const sliderPrecio = document.getElementById("filtro-precio-slider");
    const valorPrecio = document.getElementById("filtro-precio-valor");
    if (sliderPrecio) sliderPrecio.value = 150000;
    if (valorPrecio) valorPrecio.textContent = window.LuminaProducts.formatearPrecio(150000);

    const selectOrden = document.getElementById("select-orden");
    if (selectOrden) selectOrden.value = "destacados";

    // Píldoras de categoría
    document.querySelectorAll(".categoria-btn").forEach(btn => {
      const cat = btn.getAttribute("data-categoria");
      btn.classList.toggle("activo", cat === "todas");
    });

    this.render();
  }

  obtenerProductosFiltrados() {
    const productsModule = window.LuminaProducts;
    if (!productsModule) return [];

    let lista = [...productsModule.PRODUCTOS];

    // Filtro por categoría
    if (this.filtros.categoria && this.filtros.categoria !== "todas") {
      lista = lista.filter(p => p.categoria.toLowerCase() === this.filtros.categoria.toLowerCase());
    }

    // Filtro por precio máximo
    if (this.filtros.precioMaximo) {
      lista = lista.filter(p => p.precio <= this.filtros.precioMaximo);
    }

    // Filtro por texto (nombre, descripción, ingredientes)
    if (this.filtros.busqueda) {
      const q = this.filtros.busqueda;
      lista = lista.filter(p => {
        const nombreMatch = p.nombre.toLowerCase().includes(q);
        const descMatch = p.descripcion.toLowerCase().includes(q);
        const catMatch = p.categoria.toLowerCase().includes(q);
        const ingMatch = p.ingredientes && p.ingredientes.some(ing => ing.toLowerCase().includes(q));
        return nombreMatch || descMatch || catMatch || ingMatch;
      });
    }

    // Ordenamiento
    switch (this.filtros.orden) {
      case "precio-asc":
        lista.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        lista.sort((a, b) => b.precio - a.precio);
        break;
      case "nombre-asc":
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
        break;
      case "nombre-desc":
        lista.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
        break;
      case "rating-desc":
        lista.sort((a, b) => b.rating - a.rating);
        break;
      case "destacados":
      default:
        lista.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
        break;
    }

    return lista;
  }

  render() {
    if (!this.contenedorCatalogo) return;

    const productos = this.obtenerProductosFiltrados();
    const totalDisponibles = window.LuminaProducts ? window.LuminaProducts.PRODUCTOS.length : 0;

    // Actualizar contador
    if (this.contadorResultados) {
      this.contadorResultados.textContent = `Mostrando ${productos.length} de ${totalDisponibles} productos`;
    }

    // Si está vacío
    if (productos.length === 0) {
      this.contenedorCatalogo.innerHTML = "";
      if (this.estadoVacio) {
        this.estadoVacio.style.display = "flex";
      }
      return;
    }

    if (this.estadoVacio) {
      this.estadoVacio.style.display = "none";
    }

    const favorites = window.LuminaFavorites;
    const format = window.LuminaProducts.formatearPrecio;

    const html = productos.map(producto => {
      const esFav = favorites ? favorites.esFavorito(producto.id) : false;
      const tieneDescuento = producto.precioOriginal && producto.precioOriginal > producto.precio;

      // Generar estrellas visuales
      const estrellasEnteras = Math.floor(producto.rating);
      let estrellasHtml = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= estrellasEnteras) {
          estrellasHtml += `<span class="estrella llena" aria-hidden="true">★</span>`;
        } else {
          estrellasHtml += `<span class="estrella vacia" aria-hidden="true">☆</span>`;
        }
      }

      return `
        <article class="tarjeta-producto" data-id="${producto.id}" role="listitem">
          <div class="tarjeta-imagen-wrapper">
            ${producto.badge ? `<span class="producto-badge badge-${producto.badge.toLowerCase().replace(/\s+/g, '-')}">${producto.badge}</span>` : ""}
            
            <button 
              type="button" 
              class="btn-favorito-card ${esFav ? 'activo' : ''}" 
              data-id="${producto.id}"
              aria-label="${esFav ? 'Eliminar de favoritos' : 'Añadir a favoritos'}"
              title="${esFav ? 'En tus favoritos' : 'Añadir a favoritos'}"
            >
              <svg class="icono-corazon" viewBox="0 0 24 24" fill="${esFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <img 
              src="${producto.imagen}" 
              alt="${producto.nombre}" 
              class="producto-imagen"
              loading="lazy"
              onerror="this.onerror=null; this.src='assets/images/hero-banner.jpg';"
            />

            <button 
              type="button" 
              class="btn-vista-rapida" 
              data-id="${producto.id}"
              aria-label="Ver detalles de ${producto.nombre}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icono-ojo">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Vista Rápida</span>
            </button>
          </div>

          <div class="tarjeta-contenido">
            <span class="producto-categoria">${producto.categoria}</span>
            <h3 class="producto-nombre">
              <a href="javascript:void(0)" class="enlace-producto" data-id="${producto.id}">
                ${producto.nombre}
              </a>
            </h3>

            <div class="producto-rating" title="Calificación ${producto.rating} de 5">
              <div class="estrellas-grupo" aria-label="Calificación ${producto.rating} estrellas">
                ${estrellasHtml}
              </div>
              <span class="rating-numero">${producto.rating}</span>
              <span class="rating-total">(${producto.reviewsCount})</span>
            </div>

            <div class="producto-precio-fila">
              <div class="precio-contenedor">
                <span class="precio-actual">${format(producto.precio)}</span>
                ${tieneDescuento ? `<span class="precio-tachado">${format(producto.precioOriginal)}</span>` : ""}
              </div>
            </div>

            <div class="tarjeta-acciones">
              <button 
                type="button" 
                class="btn-agregar-carrito btn-primario-suave" 
                data-id="${producto.id}"
                aria-label="Añadir ${producto.nombre} al carrito"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icono-bolsa">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Añadir</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    this.contenedorCatalogo.innerHTML = html;
  }

  actualizarEstadosFavoritos() {
    if (!this.contenedorCatalogo || !window.LuminaFavorites) return;
    const favs = window.LuminaFavorites;
    const botones = this.contenedorCatalogo.querySelectorAll(".btn-favorito-card");

    botones.forEach(btn => {
      const id = btn.getAttribute("data-id");
      const esFav = favs.esFavorito(id);
      btn.classList.toggle("activo", esFav);
      btn.setAttribute("aria-label", esFav ? "Eliminar de favoritos" : "Añadir a favoritos");
      btn.setAttribute("title", esFav ? "En tus favoritos" : "Añadir a favoritos");
      const svg = btn.querySelector("svg");
      if (svg) {
        svg.setAttribute("fill", esFav ? "currentColor" : "none");
      }
    });
  }
}

// Instancia singleton
window.LuminaCatalog = new CatalogManager();
