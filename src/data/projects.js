const projects = [
  {
    id: 1,
    title: 'Globo Arte',
    type: 'FullStack',
    stack: 'Node.js + React',
    description: 'Aplicación completa para mostrar decoraciones realizadas, gestión de usuarios y envio de cotizaciones',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
    demoUrl: 'https://globo-arte.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/globo_arte.git'
  },
  {
    id: 2,
    title: 'Trailers Peliculas',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicacion para ver trailer de peliculas desde youtube',
    technologies: ['React'],
    demoUrl: 'https://peliculas-wzpn.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/peliculas.git'
  },
  {
    id: 3,
    title: 'Landing page',
    type: 'Frontend',
    stack: 'HTML + JavaScript',
    description: 'Maqueta de una landing page',
    technologies: ['HTML', 'JavaScript'],
    demoUrl: 'https://paginawebdos.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/paginaWebDos.git'
  },
  {
    id: 4,
    title: 'Explicación HTML',
    type: 'Frontend',
    stack: 'HTML + CSS',
    description: 'Aplicación web que sirve para explicar lo más basico sobre HTML',
    technologies: ['HTML', 'CSS'],
    demoUrl: 'https://explicacion-gx1p.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/explicacion.git'
  },
  {
    id: 5,
    title: 'Factura',
    type: 'Frontend',
    stack: 'HTML + JavaScript',
    description: 'Aplicativo para realizar facturas y descargarlas en PDF',
    technologies: ['HTML', 'CSS'],
    demoUrl: 'https://factura-k01h.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/factura.git'
  },
  {
    id: 6,
    title: 'App de Gestión de Tareas',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación para gestión de tareas.',
    technologies: ['React'],
    demoUrl: 'https://todolist-main.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/TodoList-main.git'
  },
  {
    id: 7,
    title: 'Landing React',
    type: 'Frontend',
    stack: 'React',
    description: 'Maqueta de landing page hecha en React Js.',
    technologies: ['React'],
    demoUrl: 'https://landing-react-t0oa.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/landing-react.git'
  },
  {
    id: 8,
    title: 'Componente de reservas',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación de reservas para con fecha, hora y cantidad de personas',
    technologies: ['React'],
    demoUrl: 'https://reservation-system-0awg.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/reservation-system.git'
  },
  {
    id: 9,
    title: 'Juego de Preguntas Basico',
    type: 'Frontend',
    stack: 'HTML + CSS + JavaScript',
    description: 'Aplicación de preguntas sobre programación basico para principiantes',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://juegopreguntasbasico.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/juegoPreguntasBasico.git'
  },
  {
    id: 10,
    title: 'Juego de memoria YuGiOh!',
    type: 'Frontend',
    stack: 'React',
    description: 'Juego de cartas para la memoria de recordar el par',
    technologies: ['React'],
    demoUrl: 'https://juegocartasyg.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/juegoCartasYg.git'
  },
  {
    id: 11,
    title: 'Componente de agenda de contactos',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación para crear una lista de contactos con nombre, email y telefono',
    technologies: ['React'],
    demoUrl: 'https://agenda-conactos.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/agenda-conactos.git'
  },
    {
    id: 12,
    title: 'Calculadora BMI',
    type: 'Frontend',
    stack: 'HTML + CSS + JavaScript',
    description: 'Aplicación para determinar si una persona tiene un peso saludable en relación con su estatura.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://calculadorabmi.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/calculadoraBMI.git'
  },
      {
    id: 13,
    title: 'Calculadora BMI',
    type: 'Frontend',
    stack: 'HTML + CSS + JavaScript',
    description: 'Aplicación para determinar si una persona tiene un peso saludable en relación con su estatura.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://calculadoradelamor.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/calculadoraDelAmor.git'
  },
    {
    id: 14,
    title: 'Gallery Itachi',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación para ver las técnicas de Itachi Uchiha y sus detalles.',
    technologies: ['React'],
    demoUrl: 'https://galery-l21v.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/galery.git'
  },
      {
    id: 15,
    title: 'Rick And Morty',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación para traer datos de los personajes de la serie Rick and Morty desde una API.',
    technologies: ['React'],
    demoUrl: 'https://rickandmorty-main.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/rickandmorty-main.git'
  },
      {
    id: 16,
    title: 'Pokedex',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación para traer datos de los pokemones desde una API.',
    technologies: ['React', 'TypeScript'],
    demoUrl: 'https://pokedex-87c3.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/pokedex.git'
  },
      {
    id: 17,
    title: 'Naruto',
    type: 'Frontend',
    stack: 'React',
    description: 'Aplicación para traer datos de los personajes de la serie Naruto desde una API.',
    technologies: ['React'],
    demoUrl: 'https://narutoapi.onrender.com',
    githubUrl: 'https://github.com/RmwormMichael/narutoApi.git'
  }
]

export default projects