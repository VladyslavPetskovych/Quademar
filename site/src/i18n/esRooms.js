/** Spanish copy for suite / room categories (merged onto English structure from `rooms.js`). */
export const roomsEs = {
  presidential: {
    title: 'Suite Presidencial',
    images: [{ alt: 'Interior dormitorio Suite Presidencial' }],
    features: [
      { label: '4 unidades', icon: 'units' },
      { label: '4 huéspedes', icon: 'guests' },
      { label: '40 m²', icon: 'size' },
    ],
    description:
      'Amplia y elegante suite con cama doble, sofá lounge, jacuzzi, bañera y ducha. Incluye dos balcones privados; ideal para estancias premium en Guardamar.',
    ctaLabel: 'Ver habitación',
    detailSection: {
      headline: 'Confort presidencial en Guardamar',
      intro:
        'Una categoría premium pensada para quienes buscan espacio, intimidad y un nivel superior de confort en la Costa Blanca.',
      left: [
        { label: 'Unidades disponibles', icon: 'features', text: '4 suites' },
        { label: 'Capacidad', icon: 'guests', text: 'Hasta 4 huéspedes' },
        { label: 'Superficie', icon: 'size', text: '40 m²' },
      ],
      right: [
        { label: 'Distribución del descanso', icon: 'bed', text: 'Cama doble + sofá cama' },
        { label: 'Baño', icon: 'bathroom', text: 'Bañera y ducha' },
        {
          label: 'Destacados',
          icon: 'features',
          bullets: ['Jacuzzi privado', 'Dos balcones', 'Zona de estar con sofá'],
        },
      ],
    },
  },

  family: {
    title: 'Suite Familiar',
    images: [{ alt: 'Suite familiar luminosa con ventanal y banco de madera' }],
    features: [
      { label: '4 unidades', icon: 'units' },
      { label: '4 huéspedes', icon: 'guests' },
      { label: '20 m²', icon: 'size' },
    ],
    description:
      'Suite equilibrada para familias o grupos pequeños, con cama doble, sofá cama y baño con ducha.',
    ctaLabel: 'Ver habitación',
    detailSection: {
      headline: 'Práctica y familiar',
      intro:
        'Distribución cómoda para familias y acompañantes que buscan una base elegante y funcional cerca de las playas y del centro de Guardamar.',
      left: [
        { label: 'Unidades disponibles', icon: 'features', text: '4 suites' },
        { label: 'Capacidad', icon: 'guests', text: 'Hasta 4 huéspedes' },
        { label: 'Superficie', icon: 'size', text: '20 m²' },
      ],
      right: [
        { label: 'Distribución del descanso', icon: 'bed', text: 'Cama doble + sofá cama' },
        { label: 'Baño', icon: 'bathroom', text: 'Ducha' },
        {
          label: 'Destacados',
          icon: 'features',
          bullets: [
            'Distribución orientada a familias',
            'Plaza extra en sofá cama',
            'Baño funcional',
          ],
        },
      ],
    },
  },

  junior: {
    title: 'Junior Suite',
    images: [{ alt: 'Junior Suite moderna con butacas y lámpara colgante' }],
    features: [
      { label: '4 unidades', icon: 'units' },
      { label: '3 huéspedes', icon: 'guests' },
      { label: '20 m²', icon: 'size' },
    ],
    description:
      'Suite elegante con cama doble, butaca y baño con ducha. Una opción refinada para parejas o grupos reducidos.',
    ctaLabel: 'Ver habitación',
    detailSection: {
      headline: 'Suite compacta con estilo',
      intro:
        'Una categoría contemporánea que equilibra confort y uso inteligente del espacio para unas vacaciones relajadas en Guardamar.',
      left: [
        { label: 'Unidades disponibles', icon: 'features', text: '4 suites' },
        { label: 'Capacidad', icon: 'guests', text: 'Hasta 3 huéspedes' },
        { label: 'Superficie', icon: 'size', text: '20 m²' },
      ],
      right: [
        { label: 'Distribución del descanso', icon: 'bed', text: 'Cama doble + butaca' },
        { label: 'Baño', icon: 'bathroom', text: 'Ducha' },
        {
          label: 'Destacados',
          icon: 'features',
          bullets: [
            'Plan moderno y compacto',
            'Baño fácil de mantener',
            'Toque lounge confortable',
          ],
        },
      ],
    },
  },

  'standard-view-double': {
    title: 'Doble con vistas',
    images: [{ alt: 'Habitación estándar con vistas y cama doble' }],
    features: [
      { label: '31 unidades', icon: 'units' },
      { label: '2 huéspedes', icon: 'guests' },
      { label: '18 m²', icon: 'size' },
    ],
    description:
      'La categoría más solicitada, con vistas exteriores. Incluye una cama doble (160×200) y baño con ducha.',
    ctaLabel: 'Ver habitación',
    detailSection: {
      headline: 'Estándar con vistas abiertas',
      intro:
        'Habitación luminosa y práctica para parejas que prefieren una sola cama grande y acceso sencillo a todas las instalaciones del hotel.',
      left: [
        { label: 'Unidades disponibles', icon: 'features', text: '31 habitaciones' },
        { label: 'Capacidad', icon: 'guests', text: 'Hasta 2 huéspedes' },
        { label: 'Superficie', icon: 'size', text: '18 m²' },
      ],
      right: [
        {
          label: 'Distribución del descanso',
          icon: 'bed',
          text: 'Una cama doble (160×200)',
        },
        { label: 'Baño', icon: 'bathroom', text: 'Ducha' },
        {
          label: 'Destacados',
          icon: 'features',
          bullets: ['Categoría con vistas exteriores', 'Distribución eficiente', 'Ideal para parejas'],
        },
      ],
    },
  },

  'standard-partial-double': {
    title: 'Doble con vistas parciales',
    images: [{ alt: 'Habitación estándar con vistas parciales y cama doble' }],
    features: [
      { label: '5 unidades', icon: 'units' },
      { label: '2 huéspedes', icon: 'guests' },
      { label: '15 m²', icon: 'size' },
    ],
    description:
      'Habitación compacta con cama doble y vistas parciales. Baño práctico con ducha.',
    ctaLabel: 'Ver habitación',
    detailSection: {
      headline: 'Doble compacta con vistas parciales',
      intro:
        'Una categoría inteligente para quienes valoran ubicación y confort con una huella más reducida.',
      left: [
        { label: 'Unidades disponibles', icon: 'features', text: '5 habitaciones' },
        { label: 'Capacidad', icon: 'guests', text: 'Hasta 2 huéspedes' },
        { label: 'Superficie', icon: 'size', text: '15 m²' },
      ],
      right: [
        { label: 'Distribución del descanso', icon: 'bed', text: 'Una cama doble' },
        { label: 'Baño', icon: 'bathroom', text: 'Ducha' },
        {
          label: 'Destacados',
          icon: 'features',
          bullets: [
            'Categoría con vistas parciales',
            'Plano de habitación eficiente',
            'Ideal para estancias cortas ciudad-playa',
          ],
        },
      ],
    },
  },
}
