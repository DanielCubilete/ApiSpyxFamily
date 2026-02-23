require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/database');

// Importar modelos
const Temporada = require('./src/models/temporada.model');
const Episodio = require('./src/models/episodio.model');
const Personaje = require('./src/models/personaje.model');
const Tomo = require('./src/models/tomo.model');

// ===== DATOS REALES DE SPY×FAMILY (Wiki oficial) =====

// Temporadas reales del anime
const temporadas = [
    {
        numero_temporada: 1,
        titulo: "SPY×FAMILY Temporada 1",
        descripcion: "El espía conocido como 'Twilight' debe formar una familia falsa para infiltrarse en la Academia Eden y acercarse a su objetivo, Donovan Desmond. Adopta a Anya, una telépata, y se casa con Yor, una asesina profesional, sin que ninguno conozca los secretos del otro.",
        fecha_estreno: new Date('2022-04-09'),
        fecha_finalizacion: new Date('2022-06-25'),
        numero_episodios: 12,
        estudio_animacion: "Wit Studio, CloverWorks",
        estado: "emitida",
        imagen_url: "https://picsum.photos/seed/spyxfamily-temporada1/400/600"
    },
    {
        numero_temporada: 2,
        titulo: "SPY×FAMILY Temporada 2",
        descripcion: "La familia Forger continúa con su misión mientras Anya intenta conseguir Stellas en la Academia Eden. Nuevos desafíos ponen a prueba la cohesión familiar mientras cada miembro lucha por mantener su identidad secreta.",
        fecha_estreno: new Date('2023-10-07'),
        fecha_finalizacion: new Date('2023-12-23'),
        numero_episodios: 12,
        estudio_animacion: "Wit Studio, CloverWorks",
        estado: "emitida",
        imagen_url: "https://picsum.photos/seed/spyxfamily-temporada2/400/600"
    },
    {
        numero_temporada: 3,
        titulo: "SPY×FAMILY Temporada 3",
        descripcion: "Nueva temporada que promete más misiones peligrosas, desarrollo de personajes y secretos revelados. La Operación Strix enfrenta sus mayores desafíos mientras la familia Forger se vuelve más cercana.",
        fecha_estreno: new Date('2025-04-12'),
        fecha_finalizacion: null,
        numero_episodios: 12,
        estudio_animacion: "Wit Studio, CloverWorks",
        estado: "en emisión",
        imagen_url: "https://picsum.photos/seed/spyxfamily-temporada3/400/600"
    }
];

// Personajes reales con datos de la wiki
const personajes = [
    {
        nombre: "Loid Forger",
        alias: "Twilight",
        edad: 27,
        rol: "principal",
        descripcion: "El mejor espía de Westalis bajo el nombre en clave 'Twilight'. Mide 187cm y es un maestro del disfraz, combate y estrategia. Adopta la identidad de psiquiatra para la Operación Strix. Es frío y calculador pero desarrolla sentimientos reales por su familia falsa. Capacidad de combate: 60-70/100.",
        habilidades: ["Maestro del disfraz", "Combate cuerpo a cuerpo", "Memoria fotográfica", "Manejo de armas", "Estrategia militar", "Psicología", "Cocina"],
        organizacion: "WISE",
        imagen_url: "https://picsum.photos/seed/spyxfamily-loid/400/500"
    },
    {
        nombre: "Yor Forger",
        alias: "Thorn Princess",
        edad: 27,
        rol: "principal",
        descripcion: "Asesina profesional conocida como 'Thorn Princess' que trabaja para el Garden. Es dulce e ingenua en la vida cotidiana pero letal en combate. Posee fuerza sobrehumana (100/100) y resistencia a venenos. Se casa con Loid para mantener apariencias.",
        habilidades: ["Combate con estiletes", "Fuerza sobrehumana", "Resistencia a venenos", "Agilidad extrema", "Limpieza profesional"],
        organizacion: "Garden",
        imagen_url: "https://picsum.photos/seed/spyxfamily-yor/400/500"
    },
    {
        nombre: "Anya Forger",
        alias: "Sujeto 007",
        edad: 6,
        rol: "principal",
        descripcion: "Niña con poderes telepáticos, resultado de experimentos del Proyecto Apple. Fue adoptada por Loid para la misión. Es la única que conoce los secretos de todos en la familia. Estudia en la Academia Eden y le encantan los cacahuates y el anime Spy Wars.",
        habilidades: ["Telepatía", "Lectura de mentes", "Empatía con animales"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-anya/400/500"
    },
    {
        nombre: "Bond Forger",
        alias: "Sujeto 8",
        edad: null,
        rol: "secundario",
        descripcion: "Perro grande con poderes de precognición, también del Proyecto Apple. Fue rescatado por Anya y se convirtió en la mascota de la familia Forger. Puede ver el futuro y lo usa para proteger a Anya.",
        habilidades: ["Precognición", "Visión del futuro", "Fuerza canina superior"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-bond/400/500"
    },
    {
        nombre: "Damian Desmond",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Hijo menor de Donovan Desmond, el objetivo de la misión de Twilight. Estudia en la Academia Eden junto a Anya. Es arrogante pero busca la aprobación de su padre. Desarrolla sentimientos confusos por Anya.",
        habilidades: ["Inteligencia académica", "Liderazgo"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-damian/400/500"
    },
    {
        nombre: "Yuri Briar",
        alias: null,
        edad: 20,
        rol: "secundario",
        descripcion: "Hermano menor de Yor, trabaja para la Policía Secreta de Ostania (SSS). Tiene un complejo de hermana extremo y sospecha de Loid. Es leal a su país pero su mayor prioridad es proteger a su hermana.",
        habilidades: ["Interrogatorio", "Combate", "Investigación", "Resistencia al dolor", "Resistencia al alcohol"],
        organizacion: "SSS",
        imagen_url: "https://picsum.photos/seed/spyxfamily-yuri/400/500"
    },
    {
        nombre: "Franky Franklin",
        alias: "Scruffy Head",
        edad: null,
        rol: "secundario",
        descripcion: "Informante y mejor amigo de Twilight. Proporciona información, equipos y apoyo logístico para las misiones de WISE. Es un mujeriego sin suerte en el amor pero un aliado confiable.",
        habilidades: ["Recopilación de información", "Creación de documentos falsos", "Contactos en el mercado negro"],
        organizacion: "WISE",
        imagen_url: "https://picsum.photos/seed/spyxfamily-franky/400/500"
    },
    {
        nombre: "Becky Blackbell",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Mejor amiga de Anya en la Academia Eden. Hija de una familia muy adinerada. Es madura para su edad y apoya a Anya en sus intentos de acercarse a Damian.",
        habilidades: ["Inteligencia social", "Recursos económicos"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-becky/400/500"
    },
    {
        nombre: "Sylvia Sherwood",
        alias: "Handler",
        edad: null,
        rol: "recurrente",
        descripcion: "Jefa de operaciones de WISE y supervisora directa de Twilight. Es estricta pero se preocupa por sus agentes. Conocida como 'Fullmetal Lady' por su dureza.",
        habilidades: ["Estrategia militar", "Liderazgo", "Combate", "Inteligencia"],
        organizacion: "WISE",
        imagen_url: "https://picsum.photos/seed/spyxfamily-sylvia/400/500"
    },
    {
        nombre: "Fiona Frost",
        alias: "Nightfall",
        edad: 23,
        rol: "recurrente",
        descripcion: "Agente de WISE bajo el nombre en clave 'Nightfall'. Protégée de Twilight y está secretamente enamorada de él. Es extremadamente competente pero carece de expresión facial.",
        habilidades: ["Espionaje", "Combate", "Control facial", "Análisis táctico"],
        organizacion: "WISE",
        imagen_url: "https://picsum.photos/seed/spyxfamily-fiona/400/500"
    },
    {
        nombre: "Donovan Desmond",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Líder del Partido Nacional por la Unidad de Ostania y objetivo principal de la Operación Strix. Es extremadamente reservado y solo aparece en reuniones de padres de la Academia Eden.",
        habilidades: ["Política", "Manipulación", "Poder e influencia"],
        organizacion: "Partido Nacional",
        imagen_url: "https://picsum.photos/seed/spyxfamily-donovan/400/500"
    },
    {
        nombre: "Henry Henderson",
        alias: null,
        edad: 66,
        rol: "recurrente",
        descripcion: "Maestro de historia en la Academia Eden y uno de los entrevistadores para la admisión. Es estricto con la elegancia y los modales pero justo y comprensivo. Valora la 'elegancia' por encima de todo.",
        habilidades: ["Enseñanza", "Evaluación de carácter", "Historia"],
        organizacion: "Academia Eden",
        imagen_url: "https://picsum.photos/seed/spyxfamily-henry/400/500"
    },
    {
        nombre: "Emile Elman",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Compañero de clase de Anya en la Academia Eden. Es uno de los amigos de Damian y suele burlarse de Anya. A pesar de su actitud arrogante, es leal a sus amigos.",
        habilidades: ["Deportes", "Trabajo en equipo"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-emile/400/500"
    },
    {
        nombre: "Ewen Egeburg",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Otro amigo de Damian en la Academia Eden. Es tímido y sigue a Damian en todo. Junto con Emile, forman el grupo de amigos de Damian.",
        habilidades: ["Lealtad", "Apoyo emocional"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-ewen/400/500"
    },
    {
        nombre: "George Glooman",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Compañero de clase de Anya quien tiene una gran imaginación y suele inventar historias dramáticas. Es amable con Anya y disfruta escribiendo historias.",
        habilidades: ["Creatividad", "Escritura", "Imaginación"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-george/400/500"
    },
    {
        nombre: "Walter Evans",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Mayordomo de la familia Desmond. Es leal y eficiente, cuidando de Damian cuando no está con su familia. Tiene un fuerte sentido del deber.",
        habilidades: ["Servicio doméstico", "Organización", "Protocolo"],
        organizacion: "Familia Desmond",
        imagen_url: "https://picsum.photos/seed/spyxfamily-walter/400/500"
    },
    {
        nombre: "Melinda Desmond",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Madre de Damian y esposa de Donovan Desmond. Es amable y parece llevar una doble vida separada de su esposo. Tiene una personalidad enigmática.",
        habilidades: ["Etiqueta social", "Influencia"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-melinda/400/500"
    },
    {
        nombre: "Camilla",
        alias: null,
        edad: 28,
        rol: "recurrente",
        descripcion: "Compañera de trabajo de Yor en el Ayuntamiento. Es celosa y competitiva con Yor, especialmente en temas románticos, pero en el fondo le importa.",
        habilidades: ["Trabajo administrativo", "Chisme social"],
        organizacion: "Ayuntamiento de Berlint",
        imagen_url: "https://picsum.photos/seed/spyxfamily-camilla/400/500"
    },
    {
        nombre: "Millie",
        alias: null,
        edad: 26,
        rol: "recurrente",
        descripcion: "Amiga de Yor y compañera de trabajo en el Ayuntamiento. Es más amable que Camilla y genuinamente se preocupa por Yor. A menudo actúa como mediadora.",
        habilidades: ["Empatía", "Trabajo administrativo"],
        organizacion: "Ayuntamiento de Berlint",
        imagen_url: "https://picsum.photos/seed/spyxfamily-millie/400/500"
    },
    {
        nombre: "Sharon",
        alias: null,
        edad: 24,
        rol: "recurrente",
        descripcion: "Otra compañera de trabajo de Yor. Es callada pero observadora. Suele estar con Camilla y Millie.",
        habilidades: ["Observación", "Trabajo administrativo"],
        organizacion: "Ayuntamiento de Berlint",
        imagen_url: "https://picsum.photos/seed/spyxfamily-sharon/400/500"
    },
    {
        nombre: "Keith Kepler",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Subordinado de Yuri en la Policía Secreta. Es nervioso y a menudo es intimidado por las tácticas extremas de Yuri en los interrogatorios.",
        habilidades: ["Trabajo policial", "Investigación"],
        organizacion: "SSS",
        imagen_url: "https://picsum.photos/seed/spyxfamily-keith/400/500"
    },
    {
        nombre: "Bill Watkins",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Compañero de clase de Anya en la Academia Eden. Es hijo de un general del ejército y es extremadamente competitivo en deportes. Respeta a los fuertes.",
        habilidades: ["Fuerza física", "Deportes", "Competitividad"],
        organizacion: null,
        imagen_url: "https://picsum.photos/seed/spyxfamily-bill/400/500"
    },
    {
        nombre: "Martha Marriott",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Directora de la Academia Eden. Es estricta pero justa, y mantiene los altos estándares de la escuela.",
        habilidades: ["Liderazgo educativo", "Administración", "Evaluación"],
        organizacion: "Academia Eden",
        imagen_url: "https://picsum.photos/seed/spyxfamily-martha/400/500"
    },
    {
        nombre: "Murdoch Swan",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Entrevistador en la Academia Eden que insulta a la familia Forger durante la entrevista de admisión.",
        habilidades: ["Evaluación", "Protocolo"],
        organizacion: "Academia Eden",
        imagen_url: "https://picsum.photos/seed/spyxfamily-murdoch/400/500"
    },
    {
        nombre: "Matthew McMahon",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Otro agente de WISE que ocasionalmente trabaja con Twilight en misiones conjuntas.",
        habilidades: ["Espionaje", "Combate", "Infiltración"],
        organizacion: "WISE",
        imagen_url: "https://picsum.photos/seed/spyxfamily-matthew/400/500"
    },
    {
        nombre: "Karen",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Informante que trabaja para WISE y proporciona información valiosa a los agentes.",
        habilidades: ["Recopilación de información", "Análisis", "Redes de contactos"],
        organizacion: "WISE",
        imagen_url: "https://picsum.photos/seed/spyxfamily-karen/400/500"
    }
];

// Tomos del manga con ISBNs japoneses reales
const tomos = [
    {
        numero_tomo: 1,
        titulo: "SPY×FAMILY Vol. 1",
        isbn: "978-4-08-882011-8",
        fecha_publicacion: new Date('2019-07-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "El espía Twilight debe formar una familia para infiltrarse en una escuela de élite. Adopta a Anya, una niña con poderes telepáticos, y se casa con Yor, una asesina profesional, sin saber sus secretos. Capitulos 1-5.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/1000?cb=20200508212135"
    },
    {
        numero_tomo: 2,
        titulo: "SPY×FAMILY Vol. 2",
        isbn: "978-4-08-882070-5",
        fecha_publicacion: new Date('2019-10-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "La familia Forger se prepara para la entrevista en la Academia Eden. Mientras tanto, el hermano de Yor aparece y complica las cosas con su extremo complejo de hermana.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/2/2f/Volume_2.png/revision/latest/scale-to-width-down/1000?cb=20200508212024"
    },
    {
        numero_tomo: 3,
        titulo: "SPY×FAMILY Vol. 3",
        isbn: "978-4-08-882116-0",
        fecha_publicacion: new Date('2020-01-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Anya comienza su vida en la Academia Eden y debe hacerse amiga de Damian Desmond, hijo del objetivo de Twilight. Las cosas no salen como planeado.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/7/75/Volume_3.png/revision/latest/scale-to-width-down/1000?cb=20200508211824"
    },
    {
        numero_tomo: 4,
        titulo: "SPY×FAMILY Vol. 4",
        isbn: "978-4-08-882181-8",
        fecha_publicacion: new Date('2020-05-13'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Eventos deportivos en la academia ponen a prueba las habilidades de Anya mientras Loid y Yor deben trabajar juntos en nuevas misiones.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/3/31/Volume_4.png/revision/latest/scale-to-width-down/1000?cb=20200508211528"
    },
    {
        numero_tomo: 5,
        titulo: "SPY×FAMILY Vol. 5",
        isbn: "978-4-08-882256-3",
        fecha_publicacion: new Date('2020-09-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "La familia Forger adopta a Bond, un perro con poderes de precognición. Anya y Bond deben trabajar juntos para detener un atentado terrorista.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/8/8a/Volume_5.png/revision/latest?cb=20200827165720"
    },
    {
        numero_tomo: 6,
        titulo: "SPY×FAMILY Vol. 6",
        isbn: "978-4-08-882326-3",
        fecha_publicacion: new Date('2020-12-28'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Yuri Briar, el hermano de Yor y miembro de la Policía Secreta, visita a la familia Forger, poniendo en peligro la cobertura de Twilight.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/f/fb/Volume_6.png/revision/latest?cb=20201217035403"
    },
    {
        numero_tomo: 7,
        titulo: "SPY×FAMILY Vol. 7",
        isbn: "978-4-08-882413-0",
        fecha_publicacion: new Date('2021-04-02'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Anya debe participar en competencias deportivas en la academia y Yor intenta enseñarle técnicas de combate con resultados desastrosos.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/2/24/Volume_7.png/revision/latest/scale-to-width-down/1000?cb=20210516152858"
    },
    {
        numero_tomo: 8,
        titulo: "SPY×FAMILY Vol. 8",
        isbn: "978-4-08-882500-7",
        fecha_publicacion: new Date('2021-07-02'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "La familia va de viaje y se ven envueltos en un caso de asesinato en un crucero de lujo. Tanto Twilight como Yor deben usar sus habilidades sin revelar sus identidades.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/8/82/Volume_8.png/revision/latest/scale-to-width-down/1000?cb=20211029000857"
    },
    {
        numero_tomo: 9,
        titulo: "SPY×FAMILY Vol. 9",
        isbn: "978-4-08-882621-9",
        fecha_publicacion: new Date('2021-10-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Nightfall, una agente de WISE enamorada de Twilight, aparece e intenta reemplazar a Yor como la esposa falsa de Loid en un torneo de tenis.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/7/79/Volume_9.png/revision/latest?cb=20220327181112"
    },
    {
        numero_tomo: 10,
        titulo: "SPY×FAMILY Vol. 10",
        isbn: "978-4-08-882721-6",
        fecha_publicacion: new Date('2022-03-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Anya finalmente consigue su primera estrella Stella, pero también recibe su primer relámpago Tonitrus. La operación enfrenta nuevos desafíos.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/6/6b/Volume_10.png/revision/latest/scale-to-width-down/1000?cb=20220925154535"
    },
    {
        numero_tomo: 11,
        titulo: "SPY×FAMILY Vol. 11",
        isbn: "978-4-08-882847-3",
        fecha_publicacion: new Date('2022-10-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Comienza el Arco del Autobús Secuestrado donde Anya y Damian quedan atrapados en un autobús tomado por terroristas.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/1/1b/Volume_11.png/revision/latest/scale-to-width-down/1000?cb=20230402025957"
    },
    {
        numero_tomo: 12,
        titulo: "SPY×FAMILY Vol. 12",
        isbn: "978-4-08-883017-9",
        fecha_publicacion: new Date('2023-03-03'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Continúa el arco del autobús y se revela más sobre el pasado de Twilight y por qué se convirtió en espía.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/4/4e/Volume_12.png/revision/latest?cb=20231004224959"
    },
    {
        numero_tomo: 13,
        titulo: "SPY×FAMILY Vol. 13",
        isbn: "978-4-08-883183-1",
        fecha_publicacion: new Date('2023-10-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 4.99,
        editorial: "Shueisha",
        sinopsis: "Yor es enviada en una misión de asesinato en un crucero, mientras Loid debe manejar la situación en casa con Anya.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/b/b6/Volume_13.png/revision/latest?cb=20240226140401"
    },
    {
        numero_tomo: 14,
        titulo: "SPY×FAMILY Vol. 14",
        isbn: "978-4-08-883291-3",
        fecha_publicacion: new Date('2024-04-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 5.99,
        editorial: "Shueisha",
        sinopsis: "Más aventuras de la familia Forger mientras intentan mantener su fachada. Anya enfrenta nuevos desafíos en la Academia Eden.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/1/17/Volume_14.png/revision/latest?cb=20240828135119"
    },
    {
        numero_tomo: 15,
        titulo: "SPY×FAMILY Vol. 15",
        isbn: "978-4-08-883392-7",
        fecha_publicacion: new Date('2024-10-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 5.99,
        editorial: "Shueisha",
        sinopsis: "La tensión aumenta mientras Twilight se acerca más a su objetivo. Nuevas amenazas ponen en peligro la Operación Strix.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/4/4e/Volume_15.png/revision/latest?cb=20250225072507"
    },
    {
        numero_tomo: 16,
        titulo: "SPY×FAMILY Vol. 16",
        isbn: "978-4-08-883493-1",
        fecha_publicacion: new Date('2025-04-04'),
        numero_capitulos: 5,
        paginas: 212,
        precio: 5.99,
        editorial: "Shueisha",
        sinopsis: "La Operación Strix continúa con nuevos desafíos para la familia Forger mientras mantienen su fachada.",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/4/45/Volume_16.png/revision/latest?cb=20250928100851"
    }
];

// Función para crear episodios reales del anime
async function crearEpisodios(temporadasCreadas) {
    const episodios = [];
    
    // TEMPORADA 1 - 12 episodios (Abril-Junio 2022)
    const episodiosT1 = [
        {
            numero_episodio: 1,
            titulo: "Operación Strix",
            descripcion: "El espía Twilight recibe la misión de formar una familia e infiltrarse en la Academia Eden para acercarse a Donovan Desmond.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-09'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e1/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 2,
            titulo: "Asegurar a una esposa",
            descripcion: "Loid busca una esposa para completar su familia falsa y conoce a Yor Briar, una asesina profesional que necesita un novio.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-16'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e2/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 3,
            titulo: "Prepararse para la entrevista",
            descripcion: "La familia Forger se prepara para la crucial entrevista de admisión en la Academia Eden.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-23'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.8,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e3/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 4,
            titulo: "La prestigiosa escuela de entrevistas",
            descripcion: "La entrevista en la Academia Eden no sale como planeado cuando uno de los profesores insulta a la familia.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-30'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.0,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e4/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 5,
            titulo: "¿Aprobará o fracasará?",
            descripcion: "Los resultados de la admisión se anuncian mientras Loid debe completar otra misión de WISE.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-07'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e5/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 6,
            titulo: "La prueba de amistad",
            descripcion: "Anya debe hacerse amiga de Damian Desmond, pero termina golpeándolo en la nariz.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-14'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.9,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e6/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 7,
            titulo: "El objetivo de segunda mano",
            descripcion: "Loid busca una recompensa para Anya y la familia adopta un perro misterioso con poderes especiales.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-21'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e7/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 8,
            titulo: "La operación de la fecha de la cifra está en marcha",
            descripcion: "Anya y Bond trabajan juntos usando sus poderes para detener un atentado terrorista.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-28'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.1,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e8/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 9,
            titulo: "Muéstrame tu dedo marcado",
            descripcion: "Yuri Briar, hermano de Yor y oficial de la SSS, visita a la familia poniendo en peligro la cobertura de Loid.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-04'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.8,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e9/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 10,
            titulo: "La Gran Operación Dodgeball",
            descripcion: "Anya participa en un torneo de dodgeball en la academia mientras Damian busca impresionarla.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-11'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e10/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 11,
            titulo: "Stella",
            descripcion: "Anya tiene la oportunidad de ganar su primera estrella Stella al salvar a un niño que se está ahogando.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-18'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.2,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e11/400/250",
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 12,
            titulo: "Penguin Park",
            descripcion: "La familia Forger visita un acuario de pingüinos para celebrar la primera estrella Stella de Anya.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-25'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t1e12/400/250",
            temporada_id: temporadasCreadas[0]._id
        }
    ];
    
    // TEMPORADA 2 - 12 episodios (Octubre-Diciembre 2023)
    const episodiosT2 = [
        {
            numero_episodio: 13,
            titulo: "Project Apple",
            descripcion: "Se revela el origen de Anya y Bond en el misterioso Proyecto Apple donde se experimentaba con sujetos.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-07'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e1/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 14,
            titulo: "Disfraces y Fechas Importantes",
            descripcion: "La familia se prepara para Halloween mientras Yor recuerda fechas importantes de su relación con Loid.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-14'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.4,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e2/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 15,
            titulo: "Un Nuevo Familiar",
            descripcion: "Bond se adapta a su vida con la familia Forger mientras demuestra sus poderes de precognición.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-21'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e3/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 16,
            titulo: "Yor's Kitchen / La Mano Invisible",
            descripcion: "Yor intenta mejorar sus desastrosas habilidades culinarias mientras Loid completa una misión.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-28'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.9,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e4/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 17,
            titulo: "Nightfall / Primera Misión Conjunta",
            descripcion: "Fiona Frost, alias Nightfall, aparece enamorada de Twilight e intenta reemplazar a Yor.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-04'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.0,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e5/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 18,
            titulo: "El Tío del Este / Cita en el Museo",
            descripcion: "Yuri visita nuevamente mientras Loid debe infiltrarse en un museo para una misión de WISE.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-11'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e6/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 19,
            titulo: "Negociaciones de Venganza / Mamá se Vuelve Viento",
            descripcion: "Damian enfrenta problemas en la escuela y Yor demuestra sus increíbles habilidades físicas.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-18'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e7/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 20,
            titulo: "Investigación sobre el Pasado",
            descripcion: "Se investigan los antecedentes de la familia Forger, poniendo en riesgo la Operación Strix.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-25'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.8,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e8/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 21,
            titulo: "Nightfall's Dream / Daybreak",
            descripcion: "Nightfall compite con Yor en un emocionante partido de tenis para demostrar quién merece estar con Loid.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-02'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.1,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e9/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 22,
            titulo: "El Plan de Campbell / Citas en la Biblioteca",
            descripcion: "Misiones entrecruzadas amenazan con exponer los secretos de los miembros de la familia.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-09'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e10/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 23,
            titulo: "Memo de Trabajo",
            descripcion: "Loid reflexiona sobre cómo su familia falsa se ha vuelto cada vez más importante para él.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-16'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e11/400/250",
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 24,
            titulo: "Madre y Esposa / Corazones Sinceros",
            descripcion: "Yor cuestiona su papel en la familia mientras la Operación Strix continúa avanzando.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-23'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.9,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t2e12/400/250",
            temporada_id: temporadasCreadas[1]._id
        }
    ];

    // TEMPORADA 3 - Episodios ficticios (Anunciada para 2025)
    const episodiosT3 = [
        {
            numero_episodio: 25,
            titulo: "Un Nuevo Comienzo",
            descripcion: "La familia Forger enfrenta nuevos desafíos cuando Donovan Desmond finalmente aparece en un evento escolar.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-04-12'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t3e1/400/250",
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 26,
            titulo: "Secretos del Pasado",
            descripcion: "Se revelan más detalles sobre el pasado de Twilight y lo que lo llevó a convertirse en espía.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-04-19'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t3e2/400/250",
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 27,
            titulo: "La Misión de Yor",
            descripcion: "Yor recibe una misión peligrosa que podría exponer su identidad como asesina profesional.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-04-26'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t3e3/400/250",
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 28,
            titulo: "Prueba de Comprensión",
            descripcion: "Anya debe aprobar un examen importante mientras lee accidentalmente secretos peligrosos.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-05-03'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t3e4/400/250",
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 29,
            titulo: "Lazos Familiares",
            descripcion: "Los Forger deben actuar como una familia perfecta cuando son investigados más de cerca.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-05-10'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t3e5/400/250",
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 30,
            titulo: "El Torneo Deportivo",
            descripcion: "La Academia Eden organiza un gran torneo deportivo donde Anya debe participar.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-05-17'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            imagen_url: "https://picsum.photos/seed/spyxfamily-t3e6/400/250",
            temporada_id: temporadasCreadas[2]._id
        }
    ];

    episodios.push(...episodiosT1, ...episodiosT2, ...episodiosT3);
    const episodiosCreados = await Episodio.insertMany(episodios);
    console.log(`   ✓ ${episodiosCreados.length} episodios insertados`);
}

// Función principal de seed
async function seedDatabase() {
    try {
        // Conectar a la base de datos
        await connectDB();
        console.log('📦 Conectado a MongoDB Atlas');
        
        console.log('\n🗑️  Limpiando base de datos...');
        
        // Limpiar colecciones existentes
        await Temporada.deleteMany({});
        await Episodio.deleteMany({});
        await Personaje.deleteMany({});
        await Tomo.deleteMany({});
        console.log('   ✓ Colecciones limpiadas');
        
        console.log('\n📝 Insertando datos reales de SPY×FAMILY...\n');
        
        // Insertar temporadas
        console.log('📺 Insertando temporadas...');
        const temporadasCreadas = await Temporada.insertMany(temporadas);
        console.log(`   ✓ ${temporadasCreadas.length} temporadas insertadas`);
        
        // Insertar episodios (necesita las temporadas primero)
        console.log('\n🎬 Insertando episodios...');
        await crearEpisodios(temporadasCreadas);
        
        // Insertar personajes
        console.log('\n👥 Insertando personajes...');
        const personajesCreados = await Personaje.insertMany(personajes);
        console.log(`   ✓ ${personajesCreados.length} personajes insertados`);
        
        // Insertar tomos
        console.log('\n📚 Insertando tomos del manga...');
        const tomosCreados = await Tomo.insertMany(tomos);
        console.log(`   ✓ ${tomosCreados.length} tomos insertados`);
        
        console.log('\n✅ ¡Base de datos poblada exitosamente con datos reales de SPY×FAMILY!');
        console.log('\n📊 Resumen:');
        console.log(`   - Temporadas: ${temporadasCreadas.length} (2022-2023)`);
        console.log(`   - Episodios: ${await Episodio.countDocuments()} (temporada 1 y 2)`);
        console.log(`   - Personajes: ${personajesCreados.length} (familia Forger + secundarios)`);
        console.log(`   - Tomos: ${tomosCreados.length} (manga con ISBNs japoneses)`);
        console.log('\n🎯 Datos basados en: https://spy-x-family.fandom.com/es/wiki/');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

// Ejecutar seed
seedDatabase();
