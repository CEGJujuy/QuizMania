import { Question, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'science',
    name: 'Ciencia',
    icon: '🧪',
    color: 'from-green-500 to-emerald-500',
    unlocked: true,
    requiredPoints: 0,
    description: 'Explora el fascinante mundo de la ciencia'
  },
  {
    id: 'history',
    name: 'Historia',
    icon: '🏛️',
    color: 'from-amber-500 to-orange-500',
    unlocked: false,
    requiredPoints: 100,
    description: 'Viaja a través del tiempo y descubre el pasado'
  },
  {
    id: 'sports',
    name: 'Deportes',
    icon: '⚽',
    color: 'from-blue-500 to-cyan-500',
    unlocked: false,
    requiredPoints: 200,
    description: 'Pon a prueba tus conocimientos deportivos'
  },
  {
    id: 'art',
    name: 'Arte',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    unlocked: false,
    requiredPoints: 300,
    description: 'Sumérgete en el mundo del arte y la cultura'
  },
  {
    id: 'digital',
    name: 'Cultura Digital',
    icon: '💻',
    color: 'from-indigo-500 to-purple-500',
    unlocked: false,
    requiredPoints: 500,
    description: 'Tecnología, internet y cultura digital moderna'
  }
];

export const questions: Question[] = [
  // Ciencia
  {
    id: 'sci_1',
    question: '¿Cuál es el elemento químico más abundante en el universo?',
    options: ['Oxígeno', 'Hidrógeno', 'Carbono', 'Helio'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'science',
    points: 10
  },
  {
    id: 'sci_2',
    question: '¿Cuántos huesos tiene el cuerpo humano adulto?',
    options: ['206', '215', '198', '220'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'science',
    points: 20
  },
  {
    id: 'sci_3',
    question: '¿Qué científico propuso la teoría de la relatividad?',
    options: ['Newton', 'Darwin', 'Einstein', 'Galileo'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'science',
    points: 10
  },
  {
    id: 'sci_4',
    question: '¿Cuál es la velocidad de la luz en el vacío?',
    options: ['300,000 km/s', '299,792,458 m/s', '150,000 km/s', '500,000 km/s'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'science',
    points: 30
  },
  {
    id: 'sci_5',
    question: '¿Qué gas representa aproximadamente el 78% de la atmósfera terrestre?',
    options: ['Oxígeno', 'Dióxido de carbono', 'Nitrógeno', 'Argón'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'science',
    points: 20
  },

  // Historia
  {
    id: 'hist_1',
    question: '¿En qué año comenzó la Segunda Guerra Mundial?',
    options: ['1938', '1939', '1940', '1941'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'history',
    points: 10
  },
  {
    id: 'hist_2',
    question: '¿Quién fue el primer emperador romano?',
    options: ['Julio César', 'Augusto', 'Nerón', 'Trajano'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'history',
    points: 20
  },
  {
    id: 'hist_3',
    question: '¿En qué año cayó el Muro de Berlín?',
    options: ['1987', '1988', '1989', '1990'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'history',
    points: 20
  },
  {
    id: 'hist_4',
    question: '¿Cuál fue la primera civilización en desarrollar la escritura?',
    options: ['Egipcia', 'Sumeria', 'China', 'Maya'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'history',
    points: 30
  },
  {
    id: 'hist_5',
    question: '¿Quién descubrió América en 1492?',
    options: ['Vasco da Gama', 'Cristóbal Colón', 'Fernando de Magallanes', 'Américo Vespucio'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'history',
    points: 10
  },

  // Deportes
  {
    id: 'sport_1',
    question: '¿Cada cuántos años se celebran los Juegos Olímpicos de Verano?',
    options: ['2 años', '3 años', '4 años', '5 años'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'sports',
    points: 10
  },
  {
    id: 'sport_2',
    question: '¿Cuál es el único país que ha participado en todos los Mundiales de Fútbol?',
    options: ['Argentina', 'Brasil', 'Alemania', 'Italia'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'sports',
    points: 20
  },
  {
    id: 'sport_3',
    question: '¿En qué deporte se utiliza el término "slam dunk"?',
    options: ['Voleibol', 'Tenis', 'Baloncesto', 'Bádminton'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'sports',
    points: 10
  },
  {
    id: 'sport_4',
    question: '¿Quién tiene el récord mundial de los 100 metros planos?',
    options: ['Carl Lewis', 'Usain Bolt', 'Justin Gatlin', 'Tyson Gay'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'sports',
    points: 20
  },
  {
    id: 'sport_5',
    question: '¿En qué año se celebraron los primeros Juegos Olímpicos modernos?',
    options: ['1892', '1896', '1900', '1904'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'sports',
    points: 30
  },

  // Arte
  {
    id: 'art_1',
    question: '¿Quién pintó "La Mona Lisa"?',
    options: ['Picasso', 'Van Gogh', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'art',
    points: 10
  },
  {
    id: 'art_2',
    question: '¿En qué museo se encuentra "La Noche Estrellada" de Van Gogh?',
    options: ['Louvre', 'MoMA', 'Prado', 'Tate Modern'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'art',
    points: 30
  },
  {
    id: 'art_3',
    question: '¿Cuál es el movimiento artístico de Pablo Picasso?',
    options: ['Impresionismo', 'Cubismo', 'Surrealismo', 'Expresionismo'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'art',
    points: 20
  },
  {
    id: 'art_4',
    question: '¿Quién esculpió "El David"?',
    options: ['Donatello', 'Bernini', 'Michelangelo', 'Rodin'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'art',
    points: 20
  },
  {
    id: 'art_5',
    question: '¿En qué siglo vivió Leonardo da Vinci?',
    options: ['XIV', 'XV-XVI', 'XVI-XVII', 'XVII'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'art',
    points: 20
  },

  // Cultura Digital
  {
    id: 'dig_1',
    question: '¿En qué año fue fundado Facebook?',
    options: ['2003', '2004', '2005', '2006'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'digital',
    points: 10
  },
  {
    id: 'dig_2',
    question: '¿Qué significa "WWW"?',
    options: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'digital',
    points: 10
  },
  {
    id: 'dig_3',
    question: '¿Quién es el fundador de Microsoft?',
    options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Larry Page'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'digital',
    points: 20
  },
  {
    id: 'dig_4',
    question: '¿Qué significa "AI" en tecnología?',
    options: ['Advanced Internet', 'Artificial Intelligence', 'Automated Interface', 'Application Integration'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'digital',
    points: 10
  },
  {
    id: 'dig_5',
    question: '¿Cuál fue el primer navegador web gráfico?',
    options: ['Internet Explorer', 'Netscape', 'Mosaic', 'Firefox'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'digital',
    points: 30
  }
];