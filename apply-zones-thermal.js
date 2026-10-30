const fs = require('fs');

global.window = {};
require('./map-data.js');

const ZONES_AND_THERMAL = {
    'amazonas': {
        zone: 'Zona Oriente',
        temp: 28,
        tempLabel: 'Cálido Selvático (28°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Oriente (Sur de Venezuela), Amazonas destaca por la pesca tradicional en el río Orinoco y el cultivo de yuca en la selva.'
    },
    'anzoategui': {
        zone: 'Zona Oriente',
        temp: 31,
        tempLabel: 'Cálido Oriental (31°C)',
        tempColor: '#ea580c',
        detail: 'Perteneciente a la Zona Oriente, Anzoátegui lidera la producción de maní en la Mesa de Guanipa, ganadería en sus sabanas y pesca marina.'
    },
    'apure': {
        zone: 'Zona Occidente',
        temp: 31,
        tempLabel: 'Cálido de Sabana (31°C)',
        tempColor: '#ea580c',
        detail: 'Perteneciente a la Zona Occidente (Bajo Llano), Apure es el corazón ganadero bovino del país, junto a la pesca fluvial de cachama.'
    },
    'aragua': {
        zone: 'Zona Centro',
        temp: 26,
        tempLabel: 'Cálido de Valle (26°C)',
        tempColor: '#fb923c',
        detail: 'Perteneciente a la Zona Centro, Aragua produce el cacao de Chuao (famoso en el mundo), además de pesca costera y granjas porcinas.'
    },
    'barinas': {
        zone: 'Zona Occidente',
        temp: 28,
        tempLabel: 'Cálido de Sabana (28°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Occidente (Llanos Occidentales), Barinas destaca por su gran producción de plátano, ganadería vacuna y pesca de río.'
    },
    'bolivar': {
        zone: 'Zona Oriente',
        temp: 28,
        tempLabel: 'Cálido Guayanés (28°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Oriente (Región Guayana), Bolívar es célebre por la pesca tradicional de la sapoara en el río Orinoco, cultivo de yuca y ganadería.'
    },
    'carabobo': {
        zone: 'Zona Centro',
        temp: 26,
        tempLabel: 'Cálido Intermedio (26°C)',
        tempColor: '#fb923c',
        detail: 'Perteneciente a la Zona Centro, Carabobo produce cítricos de alta calidad (naranjas de Montalbán), pesca en Puerto Cabello y granjas avícolas y porcinas.'
    },
    'cojedes': {
        zone: 'Zona Centro',
        temp: 28,
        tempLabel: 'Cálido Llanero (28°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Centro (Llanos Centro-Occidentales), Cojedes posee gran producción de maíz, arroz, ganadería de carne y pesca de río.'
    },
    'delta_amacuro': {
        zone: 'Zona Oriente',
        temp: 28,
        tempLabel: 'Cálido y Húmedo (28°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Oriente (Delta del Orinoco), sobresale en pesca de camarones y cangrejos de manglar, cría de búfalos y yuca.'
    },
    'distrito_capital': {
        zone: 'Zona Centro',
        temp: 22,
        tempLabel: 'Templado de Valle (22°C)',
        tempColor: '#fdba74',
        detail: 'Perteneciente a la Zona Centro (Capital de la República), en las alturas frescas del Ávila y Galipán se cultivan duraznos, flores y hortalizas.'
    },
    'falcon': {
        zone: 'Zona Occidente',
        temp: 32,
        tempLabel: 'Cálido y Árido (32°C)',
        tempColor: '#e14d05',
        detail: 'Perteneciente a la Zona Occidente, Falcón es el principal productor nacional de sábila (aloe vera), ganado caprino (chivos) y pesca costera.'
    },
    'guarico': {
        zone: 'Zona Centro',
        temp: 31,
        tempLabel: 'Cálido Llanero (31°C)',
        tempColor: '#ea580c',
        detail: 'Perteneciente a la Zona Centro (Llanos Centrales), Guárico es un gigante cerealero en maíz y arroz, con pesca de embalses y ganadería vacuna.'
    },
    'lara': {
        zone: 'Zona Occidente',
        temp: 27,
        tempLabel: 'Semiseco Cálido (27°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Occidente, Lara destaca por sus valles hortícolas y cítricos, junto a la ganadería lechera de la famosa Raza Carora.'
    },
    'merida': {
        zone: 'Zona Occidente',
        temp: 15,
        tempLabel: 'Frío de Páramo (15°C)',
        tempColor: '#f1f5f9',
        detail: 'Perteneciente a la Zona Occidente (Región Andina), Mérida tiene clima frío de páramo ideal para el cultivo de fresas, papas, truchas y vacas de altura.'
    },
    'miranda': {
        zone: 'Zona Centro',
        temp: 24,
        tempLabel: 'Templado Cálido (24°C)',
        tempColor: '#fdb567',
        detail: 'Perteneciente a la Zona Centro, Miranda es mundialmente célebre por su cacao fino de Barlovento, pesca marítima y granjas de valle.'
    },
    'monagas': {
        zone: 'Zona Oriente',
        temp: 29,
        tempLabel: 'Cálido Oriental (29°C)',
        tempColor: '#f45e0d',
        detail: 'Perteneciente a la Zona Oriente, Monagas cuenta con extensas sabanas cultivadas con maní, caña de azúcar, pesca fluvial y rebaños de búfalos.'
    },
    'nueva_esparta': {
        zone: 'Zona Oriente',
        temp: 30,
        tempLabel: 'Cálido Insular (30°C)',
        tempColor: '#ea580c',
        detail: 'Perteneciente a la Zona Oriente (Región Insular), es famosa por el ají dulce margariteño, su flota atunera y cría caprina en Macanao.'
    },
    'portuguesa': {
        zone: 'Zona Occidente',
        temp: 28,
        tempLabel: 'Cálido Llanero (28°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Occidente, es el Granero de Venezuela por su inmensa producción de maíz y arroz, ganadería de ordeño y pesca de río.'
    },
    'sucre': {
        zone: 'Zona Oriente',
        temp: 30,
        tempLabel: 'Cálido Marítimo (30°C)',
        tempColor: '#ea580c',
        detail: 'Perteneciente a la Zona Oriente, Sucre es el primer productor pesquero y atunero de Venezuela, además de cosechar el fino cacao de Paria.'
    },
    'tachira': {
        zone: 'Zona Occidente',
        temp: 20,
        tempLabel: 'Fresco de Montaña (20°C)',
        tempColor: '#ffedd5',
        detail: 'Perteneciente a la Zona Occidente (Región Andina), Táchira produce hortalizas y fresas de montaña, trucha andina y ganadería lechera de altura.'
    },
    'trujillo': {
        zone: 'Zona Occidente',
        temp: 21,
        tempLabel: 'Templado Andino (21°C)',
        tempColor: '#fed7aa',
        detail: 'Perteneciente a la Zona Occidente (Región Andina), sus tierras altas frías son prolíficas en cultivo de fresas, café y ganadería andina.'
    },
    'la_guaira': {
        zone: 'Zona Centro',
        temp: 29,
        tempLabel: 'Cálido Costero (29°C)',
        tempColor: '#f45e0d',
        detail: 'Perteneciente a la Zona Centro, combina agricultura fresca de altura en Galipán y El Junko (duraznos) con pesca marina de pargo en el litoral.'
    },
    'yaracuy': {
        zone: 'Zona Occidente',
        temp: 27,
        tempLabel: 'Cálido Tropical (27°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Occidente, Yaracuy es el líder nacional indiscutible en producción de cítricos (naranja), plátano y granjas porcinas.'
    },
    'zulia': {
        zone: 'Zona Occidente',
        temp: 34,
        tempLabel: 'Muy Cálido Zuliano (34°C)',
        tempColor: '#c23c00',
        detail: 'Perteneciente a la Zona Occidente, Zulia es la mayor potencia ganadera y lechera de Venezuela, líder en plátano y pesca de cangrejo azul.'
    },
    'guayana_esequiba': {
        zone: 'Zona Oriente',
        temp: 27,
        tempLabel: 'Cálido Tropical (27°C)',
        tempColor: '#f97316',
        detail: 'Perteneciente a la Zona Oriente (Territorio al oriente del río Esequibo), cuenta con abundantes recursos forestales, mineros, pesqueros y agrícolas.'
    }
};

const data = window.VENEZUELA_DATA;

data.states.forEach(st => {
    const meta = ZONES_AND_THERMAL[st.id];
    if (meta) {
        st.zone = meta.zone;
        st.temp = meta.temp;
        st.tempLabel = meta.tempLabel;
        st.tempColor = meta.tempColor;
        st.detail = meta.detail;
    } else {
        console.warn('Sin metadatos para estado:', st.id);
    }
});

const newContent = `// Archivo generado automáticamente con datos vectoriales y geográficos de Venezuela
window.VENEZUELA_DATA = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync('map-data.js', newContent, 'utf8');
console.log('map-data.js actualizado exitosamente con Zonas (Centro, Occidente, Oriente) y mapa térmico (temp, tempLabel, tempColor)!');
