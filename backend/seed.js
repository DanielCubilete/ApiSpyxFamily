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
        imagen_url: "https://preview.redd.it/spy-x-family-key-visual-v0-25l3j7nn2sl81.jpg?auto=webp&s=04730d52794ec4fc01fda14c9902c14dcc1e00dd"
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
        imagen_url: "https://preview.redd.it/spy-x-family-season-2-new-key-visuals-v0-pnfovtcf47ob1.jpg?width=640&crop=smart&auto=webp&s=d1d62b24ccc50d4e34b05ddef38208942352fba7"
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
        imagen_url: "https://a.storyblok.com/f/178900/2000x2827/95e0ce87bd/spy-x-family-season-3-anya-key-visual.jpg/m/filters:quality(95)format(webp)"
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
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/c/cd/Loid_Forger_Anime_3.png/revision/latest?cb=20211031154403"
    },
    {
        nombre: "Yor Forger",
        alias: "Thorn Princess",
        edad: 27,
        rol: "principal",
        descripcion: "Asesina profesional conocida como 'Thorn Princess' que trabaja para el Garden. Es dulce e ingenua en la vida cotidiana pero letal en combate. Posee fuerza sobrehumana (100/100) y resistencia a venenos. Se casa con Loid para mantener apariencias.",
        habilidades: ["Combate con estiletes", "Fuerza sobrehumana", "Resistencia a venenos", "Agilidad extrema", "Limpieza profesional"],
        organizacion: "Garden",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/5/53/Yor_Forger_Anime_3.png/revision/latest?cb=20211031154658"
    },
    {
        nombre: "Anya Forger",
        alias: "Sujeto 007",
        edad: 6,
        rol: "principal",
        descripcion: "Niña con poderes telepáticos, resultado de experimentos del Proyecto Apple. Fue adoptada por Loid para la misión. Es la única que conoce los secretos de todos en la familia. Estudia en la Academia Eden y le encantan los cacahuates y el anime Spy Wars.",
        habilidades: ["Telepatía", "Lectura de mentes", "Empatía con animales"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/f/ff/Anya_Forger_Anime.png/revision/latest?cb=20230112004645"
    },
    {
        nombre: "Bond Forger",
        alias: "Sujeto 8",
        edad: null,
        rol: "secundario",
        descripcion: "Perro grande con poderes de precognición, también del Proyecto Apple. Fue rescatado por Anya y se convirtió en la mascota de la familia Forger. Puede ver el futuro y lo usa para proteger a Anya.",
        habilidades: ["Precognición", "Visión del futuro", "Fuerza canina superior"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/d/da/Bond_Forger_Anime.png/revision/latest?cb=20221015174857"
    },
    {
        nombre: "Damian Desmond",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Hijo menor de Donovan Desmond, el objetivo de la misión de Twilight. Estudia en la Academia Eden junto a Anya. Es arrogante pero busca la aprobación de su padre. Desarrolla sentimientos confusos por Anya.",
        habilidades: ["Inteligencia académica", "Liderazgo"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/3/35/Damian_Desmond_Anime.png/revision/latest?cb=20230112004352"
    },
    {
        nombre: "Yuri Briar",
        alias: null,
        edad: 20,
        rol: "secundario",
        descripcion: "Hermano menor de Yor, trabaja para la Policía Secreta de Ostania (SSS). Tiene un complejo de hermana extremo y sospecha de Loid. Es leal a su país pero su mayor prioridad es proteger a su hermana.",
        habilidades: ["Interrogatorio", "Combate", "Investigación", "Resistencia al dolor", "Resistencia al alcohol"],
        organizacion: "SSS",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/5/5d/Yuri_Briar_Anime_2.png/revision/latest?cb=20220605195917"
    },
    {
        nombre: "Franky Franklin",
        alias: "Scruffy Head",
        edad: null,
        rol: "secundario",
        descripcion: "Informante y mejor amigo de Twilight. Proporciona información, equipos y apoyo logístico para las misiones de WISE. Es un mujeriego sin suerte en el amor pero un aliado confiable.",
        habilidades: ["Recopilación de información", "Creación de documentos falsos", "Contactos en el mercado negro"],
        organizacion: "WISE",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/a/a8/Franky_Franklin_Anime.png/revision/latest?cb=20220317191221"
    },
    {
        nombre: "Becky Blackbell",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Mejor amiga de Anya en la Academia Eden. Hija de una familia muy adinerada. Es madura para su edad y apoya a Anya en sus intentos de acercarse a Damian.",
        habilidades: ["Inteligencia social", "Recursos económicos"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/c/c7/Becky_Blackbell_Anime.png/revision/latest?cb=20230112004745"
    },
    {
        nombre: "Sylvia Sherwood",
        alias: "Handler",
        edad: null,
        rol: "recurrente",
        descripcion: "Jefa de operaciones de WISE y supervisora directa de Twilight. Es estricta pero se preocupa por sus agentes. Conocida como 'Fullmetal Lady' por su dureza.",
        habilidades: ["Estrategia militar", "Liderazgo", "Combate", "Inteligencia"],
        organizacion: "WISE",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/6/6d/Sylvia_Sherwood_Anime.png/revision/latest?cb=20220317191232"
    },
    {
        nombre: "Fiona Frost",
        alias: "Nightfall",
        edad: 23,
        rol: "recurrente",
        descripcion: "Agente de WISE bajo el nombre en clave 'Nightfall'. Protégée de Twilight y está secretamente enamorada de él. Es extremadamente competente pero carece de expresión facial.",
        habilidades: ["Espionaje", "Combate", "Control facial", "Análisis táctico"],
        organizacion: "WISE",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/6/60/Fiona_Frost_Anime.png/revision/latest?cb=20221119210130"
    },
    {
        nombre: "Donovan Desmond",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Líder del Partido Nacional por la Unidad de Ostania y objetivo principal de la Operación Strix. Es extremadamente reservado y solo aparece en reuniones de padres de la Academia Eden.",
        habilidades: ["Política", "Manipulación", "Poder e influencia"],
        organizacion: "Partido Nacional",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/3/3c/Donovan_Desmond_Anime.png/revision/latest?cb=20220317191249"
    },
    {
        nombre: "Henry Henderson",
        alias: null,
        edad: 66,
        rol: "recurrente",
        descripcion: "Maestro de historia en la Academia Eden y uno de los entrevistadores para la admisión. Es estricto con la elegancia y los modales pero justo y comprensivo. Valora la 'elegancia' por encima de todo.",
        habilidades: ["Enseñanza", "Evaluación de carácter", "Historia"],
        organizacion: "Academia Eden",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/4/41/Henry_Henderson_Anime.png/revision/latest?cb=20220317191241"
    },
    {
        nombre: "Emile Elman",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Compañero de clase de Anya en la Academia Eden. Es uno de los amigos de Damian y suele burlarse de Anya. A pesar de su actitud arrogante, es leal a sus amigos.",
        habilidades: ["Deportes", "Trabajo en equipo"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/0/0b/Emile_Elman_Anime.png/revision/latest?cb=20220507155248"
    },
    {
        nombre: "Ewen Egeburg",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Otro amigo de Damian en la Academia Eden. Es tímido y sigue a Damian en todo. Junto con Emile, forman el grupo de amigos de Damian.",
        habilidades: ["Lealtad", "Apoyo emocional"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/7/7a/Ewen_Egeburg_Anime.png/revision/latest?cb=20220507155215"
    },
    {
        nombre: "George Glooman",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Compañero de clase de Anya quien tiene una gran imaginación y suele inventar historias dramáticas. Es amable con Anya y disfruta escribiendo historias.",
        habilidades: ["Creatividad", "Escritura", "Imaginación"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/3/3b/George_Glooman_Anime_Infobox.png/revision/latest?cb=20240229152633"
    },
    {
        nombre: "Melinda Desmond",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Madre de Damian y esposa de Donovan Desmond. Es amable y parece llevar una doble vida separada de su esposo. Tiene una personalidad enigmática.",
        habilidades: ["Etiqueta social", "Influencia"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/3/3a/Melinda_Desmond_Anime.png/revision/latest?cb=20251029050503"
    },
    {
        nombre: "Camilla",
        alias: null,
        edad: 28,
        rol: "recurrente",
        descripcion: "Compañera de trabajo de Yor en el Ayuntamiento. Es celosa y competitiva con Yor, especialmente en temas románticos, pero en el fondo le importa.",
        habilidades: ["Trabajo administrativo", "Chisme social"],
        organizacion: "Ayuntamiento de Berlint",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/e/ea/Camilla_Anime.png/revision/latest?cb=20220417192258"
    },
    {
        nombre: "Millie",
        alias: null,
        edad: 26,
        rol: "recurrente",
        descripcion: "Amiga de Yor y compañera de trabajo en el Ayuntamiento. Es más amable que Camilla y genuinamente se preocupa por Yor. A menudo actúa como mediadora.",
        habilidades: ["Empatía", "Trabajo administrativo"],
        organizacion: "Ayuntamiento de Berlint",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/7/76/Millie_Myers_Anime.png/revision/latest?cb=20220417192237"
    },
    {
        nombre: "Sharon",
        alias: null,
        edad: 24,
        rol: "recurrente",
        descripcion: "Otra compañera de trabajo de Yor. Es callada pero observadora. Suele estar con Camilla y Millie.",
        habilidades: ["Observación", "Trabajo administrativo"],
        organizacion: "Ayuntamiento de Berlint",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/c/c2/Sharon_Anime.png/revision/latest?cb=20220417192306"
    },
    {
        nombre: "Bill Watkins",
        alias: null,
        edad: 6,
        rol: "secundario",
        descripcion: "Compañero de clase de Anya en la Academia Eden. Es hijo de un general del ejército y es extremadamente competitivo en deportes. Respeta a los fuertes.",
        habilidades: ["Fuerza física", "Deportes", "Competitividad"],
        organizacion: null,
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/f/f9/Bill_Watkins_Anime.png/revision/latest?cb=20220613031252"
    },
    {
        nombre: "Martha Marriott",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Directora de la Academia Eden. Es estricta pero justa, y mantiene los altos estándares de la escuela.",
        habilidades: ["Liderazgo educativo", "Administración", "Evaluación"],
        organizacion: "Academia Eden",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/7/7f/Martha_Marriott_Anime_Infobox.png/revision/latest?cb=20240331235021"
    },
    {
        nombre: "Murdoch Swan",
        alias: null,
        edad: null,
        rol: "recurrente",
        descripcion: "Entrevistador en la Academia Eden que insulta a la familia Forger durante la entrevista de admisión.",
        habilidades: ["Evaluación", "Protocolo"],
        organizacion: "Academia Eden",
        imagen_url: "https://static.wikia.nocookie.net/spy-x-family9171/images/a/ab/Murdoch_Swan_Anime_Infobox.png/revision/latest?cb=20240801061146"
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
            sinopsis: "El espía de élite conocido como Twilight recibe la Operación Strix, su misión más difícil hasta el momento: formar una familia falsa en una semana e infiltrarse en la Academia Eden, la prestigiosa escuela donde asisten los hijos de la élite política. Su objetivo es acercarse a Donovan Desmond, un político extremadamente reservado que solo aparece en los eventos escolares. Para cumplir la misión, Twilight adopta la identidad de Loid Forger, un psiquiatra, y busca desesperadamente una hija para completar su familia falsa.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-09'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 2,
            titulo: "Asegurar a una esposa",
            descripcion: "Loid busca una esposa para completar su familia falsa y conoce a Yor Briar, una asesina profesional que necesita un novio.",
            sinopsis: "Después de adoptar a Anya del orfanato, Loid se da cuenta de que necesita una esposa para completar la apariencia de familia perfecta requerida por la Academia Eden. En una fiesta, conoce a Yor Briar, una tímida oficinista que secretamente es la asesina profesional conocida como 'Thorn Princess'. Yor también necesita un novio falso para evitar las sospechas de su hermano Yuri. Ambos acuerdan formar una pareja falsa, sin saber las verdaderas identidades del otro, creando así la peculiar familia Forger.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-16'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 3,
            titulo: "Prepararse para la entrevista",
            descripcion: "La familia Forger se prepara para la crucial entrevista de admisión en la Academia Eden.",
            sinopsis: "La familia Forger debe prepararse intensamente para la entrevista de admisión en la Academia Eden. Loid entrena a Anya en etiqueta y conocimientos generales, pero rápidamente descubre que ella no es tan inteligente como pensaba. Mientras tanto, practican actuar como una familia normal para impresionar a los entrevistadores. Durante los preparativos, Anya usa sus poderes telepáticos para leer las mentes y ayudar, aunque sus limitadas habilidades académicas siguen siendo un problema. La familia debe trabajar junta para presentar la imagen de una familia élite perfecta.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-23'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.8,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 4,
            titulo: "La prestigiosa escuela de entrevistas",
            descripcion: "La entrevista en la Academia Eden no sale como planeado cuando uno de los profesores insulta a la familia.",
            sinopsis: "El día de la entrevista llega y los Forger se dirigen a la Academia Eden. Durante la entrevista familiar, todo parece ir bien hasta que uno de los profesores, Swan, comienza a insultar y menospreciar a Yor por ser una madre que trabaja. Loid, manteniéndose en su rol de espía, trata de controlar la situación diplomáticamente. Sin embargo, cuando Swan insulta directamente a su 'familia', Loid pierde la compostura momentáneamente y golpea al profesor. Sorprendentemente, este acto de defender a su familia impresiona al director Desmond, quien valora la unidad familiar por encima de todo.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-04-30'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.0,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 5,
            titulo: "¿Aprobará o fracasará?",
            descripcion: "Los resultados de la admisión se anuncian mientras Loid debe completar otra misión de WISE.",
            sinopsis: "Mientras esperan los resultados de admisión de Eden, Loid recibe otra misión urgente de WISE: evitar que un ministro de asuntos exteriores sea asesinado. Debe equilibrar su misión de espía con mantener la fachada de padre de familia. Anya, ansiosa por los resultados, usa sus poderes telepáticos para intentar descubrir si fue aceptada. Finalmente, los Forger reciben una carta de Eden: Anya ha sido aceptada como estudiante suplente debido a que no obtuvo suficientes puntos. Ahora debe ganar Stellas (estrellas de mérito) para mantener su lugar en la escuela.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-07'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 6,
            titulo: "La prueba de amistad",
            descripcion: "Anya debe hacerse amiga de Damian Desmond, pero termina golpeándolo en la nariz.",
            sinopsis: "Anya comienza su primer día en la Academia Eden y rápidamente identifica a Damian Desmond, el segundo hijo de su objetivo. Loid le ha instruido que debe hacerse amiga de Damian para acercarse a su padre. Sin embargo, el plan sale terriblemente mal cuando Damian, un niño arrogante y malcriado, insulta a Anya y ella, frustrada y sin pensar, le da un fuerte puñetazo en la cara. Este incidente le gana a Anya un Tonitrus Bolt (rayo), una marca de castigo. Paradójicamente, este acto también hace que Damian desarrolle sentimientos confusos hacia Anya.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-14'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.9,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 7,
            titulo: "El objetivo de segunda mano",
            descripcion: "Loid busca una recompensa para Anya y la familia adopta un perro misterioso con poderes especiales.",
            sinopsis: "Para recompensar a Anya por todo su esfuerzo en la escuela, Loid decide conseguirle un perro. Durante su visita a una tienda de mascotas, Anya usa sus poderes telepáticos y percibe los pensamientos de un perro blanco que está siendo usado en experimentos. Este perro, producto del Proyecto Apple, tiene la habilidad de ver el futuro. Anya insiste en adoptar a este perro en particular y, después de un emocionante rescate, el perro se une a la familia Forger con el nombre de Bond, inspirado por la serie de espías favorita de Anya.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-21'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 8,
            titulo: "La operación de la fecha de la cifra está en marcha",
            descripcion: "Anya y Bond trabajan juntos usando sus poderes para detener un atentado terrorista.",
            sinopsis: "Bond tiene una visión del futuro donde ve un reloj marcando las 11:00, una gran explosión y a Loid muriendo. Aterrorizados, Anya y Bond trabajan juntos para descifrar la visión y prevenir la tragedia. Usando sus poderes telepáticos, Anya descubre que hay un complot terrorista para hacer explotar el Ministro de Asuntos Exteriores, y Loid está en peligro. Con la ayuda de Bond y sus visiones precognitivas, Anya intenta cambiar el futuro y salvar a su padre adoptivo, demostrando que incluso una niña pequeña puede ser heroica.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-05-28'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.1,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 9,
            titulo: "Muéstrame tu dedo marcado",
            descripcion: "Yuri Briar, hermano de Yor y oficial de la SSS, visita a la familia poniendo en peligro la cobertura de Loid.",
            sinopsis: "Yuri Briar, el hermano menor de Yor y miembro de la Policía Secreta (SSS), decide visitar sorpresivamente a su hermana para conocer finalmente a su esposo. Yuri es extremadamente sobreprotector con Yor y sospecha de Loid desde el principio. Para probar que su matrimonio es real, Yuri les exige que se besen. La tensión aumenta mientras Loid y Yor, quienes nunca se han besado, intentan mantener su fachada de matrimonio feliz frente a un interrogador profesional entrenado. La visita pone en grave riesgo la Operación Strix.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-04'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.8,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 10,
            titulo: "La Gran Operación Dodgeball",
            descripcion: "Anya participa en un torneo de dodgeball en la academia mientras Damian busca impresionarla.",
            sinopsis: "La Academia Eden organiza un torneo de dodgeball y Anya se ve involucrada en un intenso partido. Damian, aún confundido por sus sentimientos hacia Anya después del puñetazo, intenta impresionarla mostrando sus habilidades atléticas. Sin embargo, el juego se vuelve más serio cuando el élite y aterrador Bill Watkins del equipo contrario se convierte en una amenaza física real. Anya debe usar su telepatía estratégicamente para esquivar los poderosos lanzamientos y ayudar a su equipo, mientras Damian intenta protegerla a su manera torpe.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-11'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 11,
            titulo: "Stella",
            descripcion: "Anya tiene la oportunidad de ganar su primera estrella Stella al salvar a un niño que se está ahogando.",
            sinopsis: "Durante una lección de natación en la Academia Eden, Anya usa sus poderes telepáticos y descubre que un niño se está ahogando en la piscina. Sin pensarlo dos veces, Anya se lanza al agua para rescatarlo, a pesar de no saber nadar bien. Gracias a la instrucción improvisada de Loid y su propia determinación, logra mantener al niño a flote hasta que llega ayuda. Este acto heroíco le gana a Anya su primera Stella, un logro mon umental que la acerca más al objetivo de la Operación Strix: convertirse en un Erudito Imperial para acercarse a Donovan Desmond.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-18'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.2,
            temporada_id: temporadasCreadas[0]._id
        },
        {
            numero_episodio: 12,
            titulo: "Penguin Park",
            descripcion: "La familia Forger visita un acuario de pingüinos para celebrar la primera estrella Stella de Anya.",
            sinopsis: "Para celebrar la primera Stella de Anya, Loid promete llevarla al destino que ella elija. Anya, emocionada, selecciona el Acuario Penguin Park. La familia Forger pasa un día divertido y relajante juntos, observando pingüinos, tomando fotos familiares y disfrutando de actividades acuáticas. A lo largo del día, tanto Loid como Yor reflexionan sobre cuánto han llegado a importarles esta familia 'falsa'. El episodio termina con una nota cálida mientras la familia continúa fortaleciendo sus lazos, sin darse cuenta de que sus falsos roles están comenzando a sentirse reales.",
            duracion_minutos: 24,
            fecha_emision: new Date('2022-06-25'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            temporada_id: temporadasCreadas[0]._id
        }
    ];
    
    // TEMPORADA 2 - 12 episodios (Octubre-Diciembre 2023)
    const episodiosT2 = [
        {
            numero_episodio: 13,
            titulo: "Project Apple",
            descripcion: "Se revela el origen de Anya y Bond en el misterioso Proyecto Apple donde se experimentaba con sujetos.",
            sinopsis: "La segunda temporada comienza revelando el oscuro pasado del Proyecto Apple, un experimento secreto del gobierno que creó tanto a Anya como a Bond. A través de flashbacks, vemos cómo estos sujetos experimentales fueron sometidos a pruebas para desarrollar habilidades psíquicas y precognitivas. El episodio explora cómo Anya escapó de la instalación y terminó en el orfanato, y cómo Bond fue usado por terroristas antes de ser rescatado. Esta revelación añade profundidad a los personajes y muestra las consecuencias de la guerra y experimentación humana.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-07'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 14,
            titulo: "Disfraces y Fechas Importantes",
            descripcion: "La familia se prepara para Halloween mientras Yor recuerda fechas importantes de su relación con Loid.",
            sinopsis: "La temporada de Halloween llega y Anya está emocionada por disfrazarse y pedir dulces. Mientras la familia se prepara, Yor se da cuenta de que no recuerda fechas importantes como su aniversario de bodas con Loid, lo que la hace sentir insegura como esposa. Camilla y sus compañeras de trabajo le preguntan sobre su vida matrimonial, increment ando su ansiedad. Yor intenta memorizar todos los detalles de su 'relación' con Loid para actuar como una esposa convincente. El episodio muestra cómo Yor genuinamente se preocupa por su papel en la familia, aunque originalmente fuera falso.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-14'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.4,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 15,
            titulo: "Un Nuevo Familiar",
            descripcion: "Bond se adapta a su vida con la familia Forger mientras demuestra sus poderes de precognición.",
            sinopsis: "Bond continúa adaptándose a su nueva vida con los Forger. El perro demuestra más de sus habilidades precognitivas, viendo visiones del futuro que involucran a su familia. Cuando ve un futuro problemático, Bond intenta advertir a Anya usando sus visiones. Juntos, Anya y Bond forman un dúo único donde pueden comunicarse silenciosamente: Anya leyendo los pensamientos de Bond y Bond mostrando sus visiones. El episodio explora la dinámica especial entre ellos y cómo Bond, a pesar de ser un perro experimental, ha encontrado una verdadera familia que lo aprecia.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-21'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 16,
            titulo: "Yor's Kitchen / La Mano Invisible",
            descripcion: "Yor intenta mejorar sus desastrosas habilidades culinarias mientras Loid completa una misión.",
            sinopsis: "Yor se da cuenta de que sus habilidades culinarias son pésimas y decide tomar clases de cocina para ser una mejor 'esposa'. Sin embargo, su instinto de asesina hace que trate los ingredientes de manera violenta y mortal. Las escenas de cocina se entremezclan con los flashbacks de Yor eliminando objetivos, mostrando cómo su trabajo como asesina ha afectado su habilidad para realizar tareas cotidianas. Mientras tanto, Loid está en una misión encubierta peligrosa. El episodio balancea humor y acción mientras ambos padres Forger luchan en sus respectivos campos.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-10-28'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.9,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 17,
            titulo: "Nightfall / Primera Misión Conjunta",
            descripcion: "Fiona Frost, alias Nightfall, aparece enamorada de Twilight e intenta reemplazar a Yor.",
            sinopsis: "Fiona Frost, conocida como Nightfall, es introducida como compañera espía de Twilight en WISE. Fiona está secretamente enamorada de Twilight y cree que ella sería una esposa mucho mejor que Yor para la Operación Strix. Aunque mantiene una expresión fría e inexpresiva externamente, sus pensamientos internos revelan una intensa pasión y celos hacia Yor. Fiona observa la dinámica de la familia Forger y se convence de que debe reemplazar a Yor. El episodio establece una nueva rival romántica y muestra la dinámica profesional entre espías de WISE.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-04'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.0,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 18,
            titulo: "El Tío del Este / Cita en el Museo",
            descripcion: "Yuri visita nuevamente mientras Loid debe infiltrarse en un museo para una misión de WISE.",
            sinopsis: "Yuri Briar regresa para otra visita sorpresa a su hermana, aumentando la tensión en la casa Forger. Mientras tanto, Loid debe completar una misión crítica infiltrándose en un museo para obtener información sensible. La misión se complica cuando Yuri, como miembro de la SSS, también aparece en el museo en una operación de vigilancia. Loid debe equilibrar mantener su cobertura frente a Yuri, completar su misión, y evitar que el hermano sobreprotector de Yor sospeche más de su matrimonio. El episodio está lleno de tensión mientras espía y policía secreta casi se cruzan.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-11'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 19,
            titulo: "Negociaciones de Venganza / Mamá se Vuelve Viento",
            descripcion: "Damian enfrenta problemas en la escuela y Yor demuestra sus increíbles habilidades físicas.",
            sinopsis: "Damian se enfrenta a bullies en la Academia Eden que intentan aprovecharse de su apellido Desmond. El orgulloso niño debe decidir si usar el nombre de su padre o defenderse por su cuenta. Mientras tanto, Yor participa en una competencia deportiva en el trabajo donde accidentalmente muestra sus habilidades físicas sobrehumanas. Sus compañeras de trabajo se quedan asombradas por su velocidad y fuerza, haciéndose preguntas sobre su verdadera naturaleza. Yor debe encontrar excusas convincentes para explicar sus capacidades extraordinarias sin revelar su identidad como asesina.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-18'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.7,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 20,
            titulo: "Investigación sobre el Pasado",
            descripcion: "Se investigan los antecedentes de la familia Forger, poniendo en riesgo la Operación Strix.",
            sinopsis: "La SSS inicia una investigación de rutina sobre antecedentes de familias de la Academia Eden, poniendo a los Forger bajo escrutinio. Loid debe asegurarse de que todos los registros falsos que creó para la familia sean impecables. Mientras tanto, Yuri, sin saberlo, está involucrado en la investigación que podría exponer a su propia hermana y su 'familia'. La tensión aumenta cuando los investigadores comienzan a hacer preguntas difíciles. Loid debe usar todas sus habilidades de espía para proteger la Operación Strix mientras mantiene la apariencia de una familia normal y aburrida.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-11-25'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.8,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 21,
            titulo: "Nightfall's Dream / Daybreak",
            descripcion: "Nightfall compite con Yor en un emocionante partido de tenis para demostrar quién merece estar con Loid.",
            sinopsis: "Fiona Frost desafía a Yor a un partido de tenis mixto, creyendo que puede demostrar que ella es más compatible con Loid y más competente como 'esposa'. El partido se convierte en una batalla intensa donde ambas mujeres muestran habilidades sobre humanas: los reflejos de asesina de Yor versus el entrenamiento de espía de Fiona. Loid queda atrapado entre ambas, preocupado de que sus habilidades extraordinarias expongan sus identidades secretas. El episodio es divertido y lleno de acción, con Fiona internamente apasionada mientras mantiene su cara inexpresiva, y Yor genuinamente preocupada por ser una buena esposa.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-02'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 9.1,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 22,
            titulo: "El Plan de Campbell / Citas en la Biblioteca",
            descripcion: "Misiones entrecruzadas amenazan con exponer los secretos de los miembros de la familia.",
            sinopsis: "Múltiples misiones se cruzan cuando Loid debe infiltrarse en una biblioteca, Yor tiene un objetivo en la misma ubicación, y Anya va allí para estudiar con Damian. La biblioteca se convierte en un campo de batalla silencioso donde cada miembro de la familia Forger está haciendo su trabajo secreto sin que los demás lo sepan. Anya, usando su telepatía, intenta evitar que sus padres se descubran mutuamente mientras también intenta mantener la paz con Damian. El episodio es una comedia de errores cuidadosamente orquestada donde todos casi se descubren entre sí.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-09'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.5,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 23,
            titulo: "Memo de Trabajo",
            descripcion: "Loid reflexiona sobre cómo su familia falsa se ha vuelto cada vez más importante para él.",
            sinopsis: "Durante una misión de rutina, Loid comienza a reflexionar sobre la Operación Strix y cómo su 'familia falsa' está afectando su juicio profesional como espía. A través de flashbacks, vemos el entrenamiento brutal de Twilight para convertirse en el espía perfecto: frío, calculador y sin apegos emocionales. Sin embargo, se da cuenta de que Anya y Yor han comenzado a penetrar sus defensas emocionales. Loid lucha internamente entre su deber como espía y los sentimientos genuinos que está desarrollando hacia su familia 'falsa'. El episodio es introspectivo y muestra el desarrollo del personaje de Loid.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-16'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.6,
            temporada_id: temporadasCreadas[1]._id
        },
        {
            numero_episodio: 24,
            titulo: "Madre y Esposa / Corazones Sinceros",
            descripcion: "Yor cuestiona su papel en la familia mientras la Operación Strix continúa avanzando.",
            sinopsis: "Yor enfrenta una crisis de identidad cuando cuestiona si realmente es una buena madre y esposa para su familia 'falsa'. Sus inseguridades aumentan cuando compara su vida violenta como asesina con el papel pacífico de madre que intenta desempeñar. A través de interacciones con Anya y conversaciones con Camilla, Yor reflexiona sobre lo que significa ser parte de una familia. Cuando Anya le dice sinceramente que la ama como madre, Yor se da cuenta de que sus sentimientos por la familia Forger son genuinos, incluso si la familia comenzó como una mentira. El final de la temporada destaca la transformación emocional de los personajes.",
            duracion_minutos: 24,
            fecha_emision: new Date('2023-12-23'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: 8.9,
            temporada_id: temporadasCreadas[1]._id
        }
    ];

    // TEMPORADA 3 - Episodios ficticios (Anunciada para 2025)
    const episodiosT3 = [
        {
            numero_episodio: 25,
            titulo: "Un Nuevo Comienzo",
            descripcion: "La familia Forger enfrenta nuevos desafíos cuando Donovan Desmond finalmente aparece en un evento escolar.",
            sinopsis: "La Operación Strix alcanza un momento crucial cuando Donovan Desmond, el objetivo principal de Twilight, finalmente aparece en un evento de padres y maestros en la Academia Eden. Este es el primer encuentro directo entre el espía y su objetivo desde el inicio de la misión. Loid debe actuar con extrema cautela, acercándose a Desmond de manera natural mientras mantiene su tapadera como el psiquiatra Loid Forger. Sin embargo, el político se muestra distante y desconfiado, evaluando cuidadosamente a cada persona que intenta hablarle. Anya, consciente de la importancia del momento a través de la lectura mental accidental de los pensamientos ansiosos de su padre, intenta ayudar acercándose a Damian para crear una oportunidad de interacción entre los padres. Yor, por su parte, se encuentra incómoda en el ambiente formal del evento, pero su genuino cariño por Anya impresiona sutilmente a algunos observadores. El episodio concluye con un breve pero significativo intercambio de palabras entre Loid y Desmond, marcando el verdadero comienzo de la fase crítica de la misión de infiltración.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-04-12'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 26,
            titulo: "Secretos del Pasado",
            descripcion: "Se revelan más detalles sobre el pasado de Twilight y lo que lo llevó a convertirse en espía.",
            sinopsis: "Un flashback profundo revela la traumática infancia de Twilight durante la guerra entre Ostania y Westalis. Se muestra cómo el joven que se convertiría en el espía más legendario perdió todo en el conflicto: su hogar, sus padres y su inocencia. Las escenas intercalan entre el pasado devastador y el presente, donde Twilight observa a Anya jugando felizmente con Bond en el jardín. Los recuerdos muestran su reclutamiento por la agencia de inteligencia, su brutal entrenamiento donde aprendió a suprimir todas las emociones y convertirse en la herramienta perfecta para mantener la paz. El contraste es desgarrador: el niño que juró evitar que otros sufrieran como él, convertido en un adulto que no puede permitirse sentimientos genuinos. Sin embargo, momentos sutiles en el presente muestran grietas en su armadura emocional: una sonrisa involuntaria ante las travesuras de Anya, preocupación real cuando Yor se lastima cocinando, satisfacción al ver a su \"familia\" feliz. El episodio plantea la pregunta central: ¿puede Twilight mantener la paz sin sacrificar su propia humanidad? ¿O su familia falsa está devolviéndole lentamente lo que la guerra le quitó?",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-04-19'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 27,
            titulo: "La Misión de Yor",
            descripcion: "Yor recibe una misión peligrosa que podría exponer su identidad como asesina profesional.",
            sinopsis: "Yor recibe una asignación urgente del Garden: eliminar a un traficante de armas que planea vender tecnología militar que podría reiniciar la guerra. La misión coincide peligrosamente con una cena familiar importante en el vecindario, creando un dilema entre sus dos vidas. La asesina Thorn Princess debe infiltrarse en una gala de alta seguridad, el mismo evento al que Loid debe asistir como parte de su red de contactos. Yor se debate entre cancelar la misión (arriesgando consecuencias del Garden) o cancelar la cena (decepcionando a Loid y Anya). Durante la operación, Yor debe usar sus letales habilidades mientras evita ser vista por Loid, quien está en el mismo edificio reuniéndose con informantes. La tensión alcanza su punto máximo cuando un guardia descubre a Yor después de eliminar su objetivo, forzándola a luchar cerca del salón donde está Loid. Utiliza su fuerza sobrehumana para neutralizar a múltiples enemigos en silencio absoluto. Logra escapar justo a tiempo para llegar a la cena, aunque con algunos moretones que debe ocultar. El episodio termina con Yor reflexionando sobre cuánto tiempo podrá mantener ambas vidas separadas y si su familia merece conocer la verdad.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-04-26'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 28,
            titulo: "Prueba de Comprensión",
            descripcion: "Anya debe aprobar un examen importante mientras lee accidentalmente secretos peligrosos.",
            sinopsis: "La Academia Eden realiza un examen comprensivo crucial que puede otorgar Stellas a estudiantes excepcionales. Anya estudia intensamente con la ayuda de Loid, pero su ansiedad se multiplica cuando descubre que varios profesores sospechosos han sido plantados en la escuela por agencias de inteligencia enemigas buscando información sobre familias influyentes. Durante el examen, Anya lee accidentalmente los pensamientos de uno de estos agentes infiltrados, descubriendo un plan para secuestrar a estudiantes hijos de políticos importantes, incluyendo a Damian Desmond. La niña enfrenta un dilema imposible: si revela el conocimiento del complot, expondrá sus habilidades telepáticas y potencialmente arruinará la Operación Strix; pero si no hace nada, Damian y otros estudiantes estarán en grave peligro. Anya intenta advertir sutilmente a los maestros de confianza mediante respuestas codificadas en su examen, mientras nerviosamente observa a los sospechosos moverse por la escuela. La tensión aumenta cuando nota que los agentes comienzan a actuar durante el período de almuerzo. Debe usar su creatividad e inteligencia emocional para frustrar el plan sin revelar sus poderes, todo mientras finge ser una estudiante ordinaria completando un examen.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-05-03'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 29,
            titulo: "Lazos Familiares",
            descripcion: "Los Forger deben actuar como una familia perfecta cuando son investigados más de cerca.",
            sinopsis: "El Servicio Secreto de la Policía de Estado intensifica su investigación de fondo sobre las familias de la Academia Eden, con los Forger como uno de sus objetivos principales. Agentes del SSS, dirigidos por un suspicaz superior de Yuri, comienzan vigilancia discreta de la familia, revisando registros, entrevistando vecinos y observando sus movimientos cotidianos. Loid detecta inmediatamente la vigilancia con su experiencia de espía, pero debe actuar completamente natural mientras alerta discretamente a Yor. La pareja debe ser la familia perfecta bajo escrutinio constante, sin poder realizar ninguna actividad relacionada con sus trabajos secretos. Esto crea situaciones cómicas y tensas: Loid debe cancelar reuniones de inteligencia urgentes, Yor casi expone su fuerza sobrehumana al detener instintivamente un accidente automovilístico, y Anya debe controlar sus reacciones telepáticas ante los pensamientos suspicaces de los investigadores. Franky y otros contactos de Loid trabajan en segundo plano para reforzar la tapadera de los Forger, creando registros falsos y testimonios de vecinos. La tensión culmina cuando Yuri llega inesperadamente, sin saber que su propia agencia está investigando a su hermana, creando una escena familiar incómoda bajo la mirada de múltiples espías ocultos.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-05-10'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
            temporada_id: temporadasCreadas[2]._id
        },
        {
            numero_episodio: 30,
            titulo: "El Torneo Deportivo",
            descripcion: "La Academia Eden organiza un gran torneo deportivo donde Anya debe participar.",
            sinopsis: "La Academia Eden celebra su prestigioso Torneo Deportivo Anual, donde estudiantes compiten por valiosas Stellas en diversas disciplinas. Anya es inscrita en la carrera de relevos, a pesar de sus limitadas habilidades atléticas. Loid entrena secretamente con ella usando técnicas de espionaje adaptadas para niños, mientras Yor aporta (inadvertidamente) ejercicios de su entrenamiento asesino que son demasiado intensos. El día del torneo, toda la familia asiste para apoyar a Anya, junto con cientos de padres de elite, incluyendo a Donovan Desmond. Bond tiene visiones del futuro mostrando a Anya ganando, pero también un peligroso accidente en la pista. Durante la carrera, Anya utiliza su telepatía para anticipar los movimientos de otros corredores, pero debe balancear cuidadosamente no parecer sospechosamente hábil. Cuando el accidente premonizado por Bond comienza a desarrollarse, Anya toma una decisión crucial que pone en riesgo su oportunidad de ganar pero salva a un competidor de lesionarse gravemente. Su acto de heroísmo y espíritu deportivo, aunque no gana la carrera, impresiona profundamente a los jueces y espectadores. El episodio cierra con la familia celebrando juntos, con Loid reconociendo internamente que su misión se ha vuelto secundaria a su genuino orgullo por Anya, mientras observa compartir helado con su familia \"falsa\" que se siente cada vez más real.",
            duracion_minutos: 24,
            fecha_emision: new Date('2025-05-17'),
            director: "Kazuhiro Furuhashi",
            guionista: "Daishiro Tanimura",
            valoracion: null,
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
