
export const BREAKPOINTS = {
  // Mobile: 0px - 768px
  mobile: {
    max: 768,
    min: 0,
  },
  // Tablet: 769px - 1024px
  tablet: {
    min: 769,
    max: 1024,
  },
  // Desktop: 1025px+
  desktop: {
    min: 1025,
  },
};

export const RESPONSIVE_VARS = {
  // Tamaños de sidebar
  sidebar: {
    desktop: '260px',
    tablet: '240px',
    mobile: '0px', // Oculto en móvil (menú hamburguesa)
  },

  // Altura de topbar/navbar
  topbar: {
    desktop: '0px', // No visible en desktop (sidebar fijo)
    tablet: '64px',
    mobile: '64px',
  },

  // Padding de contenedor principal
  pagePadding: {
    desktop: '32px 36px 60px',
    tablet: '24px 24px 50px',
    mobile: '20px 16px 50px',
  },

  // Gaps entre elementos
  gap: {
    desktop: '20px',
    tablet: '16px',
    mobile: '12px',
  },

  // Tamaños de fuente
  fontSize: {
    pageTitle: {
      desktop: '22px',
      tablet: '20px',
      mobile: '18px',
    },
    body: {
      desktop: '14px',
      tablet: '13.5px',
      mobile: '13px',
    },
    small: {
      desktop: '12px',
      tablet: '11.5px',
      mobile: '11px',
    },
  },
};

// ─────────────────────────────────────────────────
// MEDIA QUERIES REUTILIZABLES
// ─────────────────────────────────────────────────

export const MEDIA = {
  mobile: `@media (max-width: ${BREAKPOINTS.mobile.max}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet.min}px) and (max-width: ${BREAKPOINTS.tablet.max}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop.min}px)`,
  tabletUp: `@media (min-width: ${BREAKPOINTS.tablet.min}px)`,
  desktopUp: `@media (min-width: ${BREAKPOINTS.desktop.min}px)`,
  mobileDown: `@media (max-width: ${BREAKPOINTS.mobile.max}px)`,
  notMobile: `@media (min-width: ${BREAKPOINTS.tablet.min}px)`,
};

// ─────────────────────────────────────────────────
// FUNCIONES AUXILIARES
// ─────────────────────────────────────────────────

/**
 * Determina el tipo de dispositivo basado en ancho
 * @param {number} width - Ancho de ventana en px
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceType(width) {
  if (width <= BREAKPOINTS.mobile.max) return 'mobile';
  if (width <= BREAKPOINTS.tablet.max) return 'tablet';
  return 'desktop';
}

/**
 * Obtiene variable responsive para el dispositivo actual
 * @param {object} vars - Objeto con { desktop, tablet, mobile }
 * @param {string} deviceType - Tipo de dispositivo
 * @returns {any} Valor para el dispositivo
 */
export function getResponsiveValue(vars, deviceType) {
  return vars[deviceType] || vars.mobile;
}

/**
 * Calcula tamaños de grid responsivo
 * @param {number} containerWidth - Ancho del contenedor
 * @param {number} minColumnWidth - Ancho mínimo de columna
 * @param {number} gap - Espacio entre columnas
 * @returns {number} Número de columnas
 */
export function calculateGridColumns(containerWidth, minColumnWidth, gap = 20) {
  if (containerWidth <= 0) return 1;
  return Math.max(1, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));
}
