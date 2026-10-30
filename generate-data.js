const fs = require('fs');

const rawGeo = JSON.parse(fs.readFileSync('venezuela_simplified.geojson', 'utf8'));

// Project coordinates to SVG viewBox (1000 x 760)
const minX = -73.45;
const maxX = -58.10;
const minY = 0.60;
const maxY = 12.35;
const width = 1000;
const height = 760;

function project(lon, lat) {
    const x = ((lon - minX) / (maxX - minX)) * width;
    const y = ((maxY - lat) / (maxY - minY)) * height;
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringToPath(ring) {
    return ring.map((pt, i) => {
        const [x, y] = project(pt[0], pt[1]);
        return (i === 0 ? 'M' : 'L') + x + ' ' + y;
    }).join(' ') + ' Z';
}

function geomToPath(geom) {
    if (geom.type === 'Polygon') {
        return geom.coordinates.map(ringToPath).join(' ');
    } else if (geom.type === 'MultiPolygon') {
        return geom.coordinates.map(poly => poly.map(ringToPath).join(' ')).join(' ');
    }
    return '';
}

function calculateCentroid(geom) {
    let count = 0, sumX = 0, sumY = 0;
    function addPts(coords) {
        if (typeof coords[0][0] === 'number') {
            coords.forEach(pt => {
                const [x, y] = project(pt[0], pt[1]);
                sumX += x;
                sumY += y;
                count++;
            });
        } else {
            coords.forEach(addPts);
        }
    }
    addPts(geom.coordinates);
    return count > 0 ? [Math.round(sumX / count), Math.round(sumY / count)] : [0, 0];
}

// =========================================================================
// CATÁLOGO DE UN SOLO PRODUCTO POR CESTA / AMBIENTE (ESTILO CARTOON)
// =========================================================================

const AGRI_CATALOG = {
    'agri_frio': {
        id: 'agri_frio',
        name: 'Fresa',
        climate: 'Clima Frío de Páramo',
        container: 'Cesta Congelada',
        containerType: 'basket_frozen',
        itemType: 'item_strawberry',
        badge: '❄️ Cesta Congelada'
    },
    'agri_platano': {
        id: 'agri_platano',
        name: 'Plátano',
        climate: 'Tierras Cálidas y Húmedas',
        container: 'Cesta de Mimbre',
        containerType: 'basket_wicker',
        itemType: 'item_banana',
        badge: '🧺 Cesta de Mimbre'
    },
    'agri_maiz': {
        id: 'agri_maiz',
        name: 'Maíz',
        climate: 'Sabana Soleada Llanera',
        container: 'Saco de Yute y Paja',
        containerType: 'sack_burlap',
        itemType: 'item_corn',
        badge: '🌾 Saco de Yute'
    },
    'agri_cacao': {
        id: 'agri_cacao',
        name: 'Cacao',
        climate: 'Bosque Húmedo Costero',
        container: 'Cesta con Hojas Tropicales',
        containerType: 'basket_tropical',
        itemType: 'item_cacao',
        badge: '🍃 Cesta Tropical'
    },
    'agri_citricos': {
        id: 'agri_citricos',
        name: 'Naranja',
        climate: 'Valles Templados Fértiles',
        container: 'Caja sobre Césped',
        containerType: 'crate_grass',
        itemType: 'item_orange',
        badge: '🌱 Césped de Valle'
    },
    'agri_sabila': {
        id: 'agri_sabila',
        name: 'Sábila',
        climate: 'Zona Árida y Desértica',
        container: 'Cesta en Arena Árida',
        containerType: 'pot_desert',
        itemType: 'item_aloe',
        badge: '☀️ Arena Árida'
    },
    'agri_yuca': {
        id: 'agri_yuca',
        name: 'Yuca',
        climate: 'Selva Amazónica',
        container: 'Cesta Indígena de Selva',
        containerType: 'basket_jungle',
        itemType: 'item_yuca',
        badge: '🌿 Selva Húmeda'
    },
    'agri_mani': {
        id: 'agri_mani',
        name: 'Maní',
        climate: 'Mesa Oriental Seca',
        container: 'Cuenco sobre Tierra Rojiza',
        containerType: 'bowl_savanna',
        itemType: 'item_peanut',
        badge: '🏜️ Mesa Oriental'
    },
    'agri_aji': {
        id: 'agri_aji',
        name: 'Ají Dulce',
        climate: 'Isla Soleada del Caribe',
        container: 'Canasta sobre Arena de Playa',
        containerType: 'basket_beach',
        itemType: 'item_chili',
        badge: '🏖️ Arena de Playa'
    },
    'agri_flores': {
        id: 'agri_flores',
        name: 'Durazno',
        climate: 'Montaña con Neblina',
        container: 'Cesta entre Nubes Frías',
        containerType: 'basket_cloud',
        itemType: 'item_peach',
        badge: '☁️ Bruma de Montaña'
    }
};

const FISH_CATALOG = {
    'fish_atun': {
        id: 'fish_atun',
        name: 'Atún',
        climate: 'Mar Caribe Abierto',
        container: 'Red sobre Olas del Mar',
        containerType: 'net_ocean',
        itemType: 'item_tuna',
        badge: '🌊 Red de Alta Mar'
    },
    'fish_cangrejo': {
        id: 'fish_cangrejo',
        name: 'Cangrejo Azul',
        climate: 'Aguas del Lago de Maracaibo',
        container: 'Trampa de Madera Lacustre',
        containerType: 'trap_lake',
        itemType: 'item_crab',
        badge: '🪵 Nasa del Lago'
    },
    'fish_trucha': {
        id: 'fish_trucha',
        name: 'Trucha',
        climate: 'Lagunas Heladas Andinas',
        container: 'Cesta con Hielo de Páramo',
        containerType: 'bucket_ice',
        itemType: 'item_trout',
        badge: '❄️ Hielo Andino'
    },
    'fish_sapoara': {
        id: 'fish_sapoara',
        name: 'Sapoara',
        climate: 'Caudal del Río Orinoco',
        container: 'Canoa de Madera Fluvial',
        containerType: 'canoe_river',
        itemType: 'item_sapoara',
        badge: '🛶 Canoa de Río'
    },
    'fish_costero': {
        id: 'fish_costero',
        name: 'Pargo Rojo',
        climate: 'Costa Caribeña y Arrecifes',
        container: 'Cava Marina con Hielo',
        containerType: 'cooler_beach',
        itemType: 'item_snapper',
        badge: '🧊 Cava Marina'
    },
    'fish_delta': {
        id: 'fish_delta',
        name: 'Camarón',
        climate: 'Caños y Manglares',
        container: 'Cesta sobre Manglar',
        containerType: 'basket_mangrove',
        itemType: 'item_shrimp',
        badge: '🌿 Manglar Deltaico'
    },
    'fish_llanos': {
        id: 'fish_llanos',
        name: 'Cachama',
        climate: 'Ríos y Esteros Llaneros',
        container: 'Cesto en Ribera de Río',
        containerType: 'reed_river',
        itemType: 'item_cachama',
        badge: '🌾 Ribera Llanera'
    }
};

const LIVE_CATALOG = {
    'live_vacuno_carne': {
        id: 'live_vacuno_carne',
        name: 'Toro Vacuno',
        climate: 'Sabanas Llaneras Abiertas',
        container: 'Corral de Madera y Pasto',
        containerType: 'corral_wood',
        itemType: 'item_bull',
        badge: '🪵 Corral Llanero'
    },
    'live_lechero_zulia': {
        id: 'live_lechero_zulia',
        name: 'Vaca Lechera',
        climate: 'Fincas Lecheras Verdes',
        container: 'Heno con Cántara de Leche',
        containerType: 'hay_milk',
        itemType: 'item_cow_dairy',
        badge: '🥛 Vaquera Lechera'
    },
    'live_caprino': {
        id: 'live_caprino',
        name: 'Chivo',
        climate: 'Tierras Secas con Cardones',
        container: 'Corral Árido con Cactus',
        containerType: 'pen_cactus',
        itemType: 'item_goat',
        badge: '🌵 Corral con Cactus'
    },
    'live_bufalos': {
        id: 'live_bufalos',
        name: 'Búfalo',
        climate: 'Humedales y Pantanos',
        container: 'Charca de Lodo y Juncos',
        containerType: 'mud_wetland',
        itemType: 'item_buffalo',
        badge: '💧 Charca de Humedal'
    },
    'live_paramo': {
        id: 'live_paramo',
        name: 'Vaca Andina',
        climate: 'Montañas Frías y Nevadas',
        container: 'Pradera Fría con Escarcha',
        containerType: 'pasture_snow',
        itemType: 'item_cow_highland',
        badge: '🏔️ Pradera Fría'
    },
    'live_granjas': {
        id: 'live_granjas',
        name: 'Cerdo de Granja',
        climate: 'Granjas de Valles Centrales',
        container: 'Nido de Paja de Granero',
        containerType: 'nest_straw',
        itemType: 'item_pig',
        badge: '🌾 Paja de Granja'
    }
};

const statesMetadata = {
    'AMAZONAS': {
        id: 'amazonas',
        name: 'Amazonas',
        capital: 'Puerto Ayacucho',
        region: 'Región Guayana',
        icon: '🌿',
        agriKey: 'agri_yuca',
        fishKey: 'fish_sapoara',
        liveKey: 'live_granjas',
        detail: 'En Amazonas destaca la pesca en el río Orinoco y el cultivo tradicional de yuca en la selva.'
    },
    'ANZOATEGUI': {
        id: 'anzoategui',
        name: 'Anzoátegui',
        capital: 'Barcelona',
        region: 'Región Nororiental',
        icon: '🌾',
        agriKey: 'agri_mani',
        fishKey: 'fish_atun',
        liveKey: 'live_vacuno_carne',
        detail: 'Anzoátegui lidera el cultivo de maní en la Mesa de Guanipa, ganadería en sus sabanas y pesca marítima.'
    },
    'APURE': {
        id: 'apure',
        name: 'Apure',
        capital: 'San Fernando de Apure',
        region: 'Región de los Llanos',
        icon: '🐄',
        agriKey: 'agri_maiz',
        fishKey: 'fish_llanos',
        liveKey: 'live_vacuno_carne',
        detail: 'Apure es el corazón ganadero bovino del país en los llanos, junto a la pesca fluvial de cachama y coporo.'
    },
    'ARAGUA': {
        id: 'aragua',
        name: 'Aragua',
        capital: 'Maracay',
        region: 'Región Central',
        icon: '🍫',
        agriKey: 'agri_cacao',
        fishKey: 'fish_costero',
        liveKey: 'live_granjas',
        detail: 'Hogar del mundialmente célebre cacao de Chuao, pesca costera en Choroní y granjas porcinas y avícolas.'
    },
    'BARINAS': {
        id: 'barinas',
        name: 'Barinas',
        capital: 'Barinas',
        region: 'Región de los Llanos',
        icon: '🍌',
        agriKey: 'agri_platano',
        fishKey: 'fish_llanos',
        liveKey: 'live_vacuno_carne',
        detail: 'Barinas destaca por su gran producción de plátano, ganadería vacuna llanera y pesca de río.'
    },
    'BOLIVAR': {
        id: 'bolivar',
        name: 'Bolívar',
        capital: 'Ciudad Bolívar',
        region: 'Región Guayana',
        icon: '🐟',
        agriKey: 'agri_yuca',
        fishKey: 'fish_sapoara',
        liveKey: 'live_vacuno_carne',
        detail: 'Famoso por la pesca tradicional de la sapoara en el río Orinoco, cultivo de yuca y ganadería en sabanas.'
    },
    'CARABOBO': {
        id: 'carabobo',
        name: 'Carabobo',
        capital: 'Valencia',
        region: 'Región Central',
        icon: '🍊',
        agriKey: 'agri_citricos',
        fishKey: 'fish_costero',
        liveKey: 'live_granjas',
        detail: 'Produce las famosas naranjas de los valles de Montalbán, pesca en Puerto Cabello y granjas tecnificadas.'
    },
    'COJEDES': {
        id: 'cojedes',
        name: 'Cojedes',
        capital: 'San Carlos',
        region: 'Región de los Llanos',
        icon: '🌾',
        agriKey: 'agri_maiz',
        fishKey: 'fish_llanos',
        liveKey: 'live_vacuno_carne',
        detail: 'Tierras llaneras dedicadas a cereales como maíz y arroz, pesca de río y ganadería vacuna.'
    },
    'DELTA AMACURO': {
        id: 'delta_amacuro',
        name: 'Delta Amacuro',
        capital: 'Tucupita',
        region: 'Región Guayana',
        icon: '🦐',
        agriKey: 'agri_yuca',
        fishKey: 'fish_delta',
        liveKey: 'live_bufalos',
        detail: 'Destaca por la pesca en sus caños y manglares, y la cría de búfalos de agua en zonas húmedas.'
    },
    'DISTRITO CAPITAL': {
        id: 'distrito_capital',
        name: 'Distrito Capital',
        capital: 'Caracas',
        region: 'Región Capital',
        icon: '🍑',
        agriKey: 'agri_flores',
        fishKey: 'fish_llanos',
        liveKey: 'live_granjas',
        detail: 'En las zonas altas y frescas de Galipán y El Junquito se cultivan duraznos, fresas y flores.'
    },
    'FALCON': {
        id: 'falcon',
        name: 'Falcón',
        capital: 'Coro',
        region: 'Región Centroccidental',
        icon: '🐐',
        agriKey: 'agri_sabila',
        fishKey: 'fish_costero',
        liveKey: 'live_caprino',
        detail: 'Líder en cultivo de sábila en tierras áridas, cría de chivos (caprinos) y amplia costa pesquera.'
    },
    'GUARICO': {
        id: 'guarico',
        name: 'Guárico',
        capital: 'San Juan de los Morros',
        region: 'Región de los Llanos',
        icon: '🌾',
        agriKey: 'agri_maiz',
        fishKey: 'fish_llanos',
        liveKey: 'live_vacuno_carne',
        detail: 'Gigante cerealero de los llanos en maíz y arroz, pesca de esteros y ganadería vacuna extensiva.'
    },
    'LARA': {
        id: 'lara',
        name: 'Lara',
        capital: 'Barquisimeto',
        region: 'Región Centroccidental',
        icon: '🍊',
        agriKey: 'agri_citricos',
        fishKey: 'fish_llanos',
        liveKey: 'live_lechero_zulia',
        detail: 'Destaca por sus valles agrícolas fértiles y la ganadería lechera de la famosa Raza Carora.'
    },
    'MERIDA': {
        id: 'merida',
        name: 'Mérida',
        capital: 'Mérida',
        region: 'Región de los Andes',
        icon: '🍓',
        agriKey: 'agri_frio',
        fishKey: 'fish_trucha',
        liveKey: 'live_paramo',
        detail: 'Clima frío andino ideal para el cultivo de fresas, pesca de truchas en aguas heladas y vacas de altura.'
    },
    'MIRANDA': {
        id: 'miranda',
        name: 'Miranda',
        capital: 'Los Teques',
        region: 'Región Capital',
        icon: '🍫',
        agriKey: 'agri_cacao',
        fishKey: 'fish_costero',
        liveKey: 'live_granjas',
        detail: 'Célebre por el cacao fino de Barlovento en clima cálido húmedo, pesca costera y granjas.'
    },
    'MONAGAS': {
        id: 'monagas',
        name: 'Monagas',
        capital: 'Maturín',
        region: 'Región Nororiental',
        icon: '🥜',
        agriKey: 'agri_mani',
        fishKey: 'fish_llanos',
        liveKey: 'live_bufalos',
        detail: 'Extensas sabanas orientales con cultivos de mesa, pesca fluvial y rebaños de búfalos.'
    },
    'NUEVA ESPARTA': {
        id: 'nueva_esparta',
        name: 'Nueva Esparta',
        capital: 'La Asunción',
        region: 'Región Insular',
        icon: '🌶️',
        agriKey: 'agri_aji',
        fishKey: 'fish_atun',
        liveKey: 'live_caprino',
        detail: 'Famosa por su ají dulce margariteño, su potente flota pesquera de atún y sardina, y cría caprina en Macanao.'
    },
    'PORTUGUESA': {
        id: 'portuguesa',
        name: 'Portuguesa',
        capital: 'Guanare',
        region: 'Región de los Llanos',
        icon: '🌽',
        agriKey: 'agri_maiz',
        fishKey: 'fish_llanos',
        liveKey: 'live_lechero_zulia',
        detail: 'Conocido como el "Granero de Venezuela" por su inmensa producción de maíz, además de ganadería y pesca fluvial.'
    },
    'SUCRE': {
        id: 'sucre',
        name: 'Sucre',
        capital: 'Cumaná',
        region: 'Región Nororiental',
        icon: '🐟',
        agriKey: 'agri_cacao',
        fishKey: 'fish_atun',
        liveKey: 'live_granjas',
        detail: 'Primer productor pesquero de atún en Venezuela y tierra del famoso cacao de la Península de Paria.'
    },
    'TACHIRA': {
        id: 'tachira',
        name: 'Táchira',
        capital: 'San Cristóbal',
        region: 'Región de los Andes',
        icon: '🍓',
        agriKey: 'agri_frio',
        fishKey: 'fish_trucha',
        liveKey: 'live_paramo',
        detail: 'Tierras frías de montaña productoras de fresas y mora, truchas andinas y ganadería lechera de altura.'
    },
    'TRUJILLO': {
        id: 'trujillo',
        name: 'Trujillo',
        capital: 'Trujillo',
        region: 'Región de los Andes',
        icon: '🍓',
        agriKey: 'agri_frio',
        fishKey: 'fish_llanos',
        liveKey: 'live_paramo',
        detail: 'Montañas andinas donde se cultivan excelentes fresas en clima frío y se cría ganado de altura.'
    },
    'VARGAS': {
        id: 'la_guaira',
        name: 'La Guaira',
        capital: 'La Guaira',
        region: 'Región Capital',
        icon: '🍑',
        agriKey: 'agri_flores',
        fishKey: 'fish_costero',
        liveKey: 'live_granjas',
        detail: 'Combina los cultivos de altura fresca en El Junko y Galipán (duraznos) con la pesca de pargo en el mar Caribe.'
    },
    'YARACUY': {
        id: 'yaracuy',
        name: 'Yaracuy',
        capital: 'San Felipe',
        region: 'Región Centroccidental',
        icon: '🍊',
        agriKey: 'agri_citricos',
        fishKey: 'fish_llanos',
        liveKey: 'live_granjas',
        detail: 'Valles fértiles que lideran la producción nacional de naranjas y cítricos, junto a granjas pecuarias.'
    },
    'ZULIA': {
        id: 'zulia',
        name: 'Zulia',
        capital: 'Maracaibo',
        region: 'Región Zuliana',
        icon: '🍌',
        agriKey: 'agri_platano',
        fishKey: 'fish_cangrejo',
        liveKey: 'live_lechero_zulia',
        detail: 'Gigante productor de plátanos en el Sur del Lago, pesca de cangrejo azul y líder en leche y quesos.'
    },
    'ZONA EN RECLAMACION': {
        id: 'guayana_esequiba',
        name: 'Guayana Esequiba',
        capital: 'Zona en Reclamación',
        region: 'Guayana Esequiba',
        icon: '🇻🇪',
        agriKey: 'agri_yuca',
        fishKey: 'fish_atun',
        liveKey: 'live_vacuno_carne',
        detail: 'Territorio de la Guayana Esequiba con amplios recursos agrícolas, pesqueros y forestales.',
        isTerritory: true
    }
};

const allCapitals = Object.values(statesMetadata)
    .filter(s => !s.isTerritory)
    .map(s => s.capital);

const statesArray = [];

rawGeo.features.forEach(f => {
    const rawKey = f.properties.ESTADO;
    const meta = statesMetadata[rawKey];
    if (!meta) return;

    const path = geomToPath(f.geometry);
    const centroid = calculateCentroid(f.geometry);

    if (meta.id === 'nueva_esparta') {
        centroid[0] = 615;
        centroid[1] = 95;
    } else if (meta.id === 'distrito_capital') {
        centroid[0] = 422;
        centroid[1] = 129;
    } else if (meta.id === 'la_guaira') {
        centroid[0] = 432;
        centroid[1] = 118;
    }

    const agriItem = AGRI_CATALOG[meta.agriKey];
    const fishItem = FISH_CATALOG[meta.fishKey];
    const liveItem = LIVE_CATALOG[meta.liveKey];

    statesArray.push({
        id: meta.id,
        rawKey: rawKey,
        name: meta.name,
        capital: meta.capital,
        region: meta.region,
        icon: meta.icon,
        agriKey: meta.agriKey,
        fishKey: meta.fishKey,
        liveKey: meta.liveKey,
        agriName: agriItem ? agriItem.name : '',
        fishName: fishItem ? fishItem.name : '',
        liveName: liveItem ? liveItem.name : '',
        detail: meta.detail,
        isTerritory: !!meta.isTerritory,
        path: path,
        centroid: centroid
    });
});

const fileContent = `// Archivo generado automáticamente con datos vectoriales y geográficos de Venezuela
window.VENEZUELA_DATA = {
    viewBox: "0 0 1000 760",
    allCapitals: ${JSON.stringify(allCapitals, null, 2)},
    catalogs: {
        agri: ${JSON.stringify(AGRI_CATALOG, null, 2)},
        fish: ${JSON.stringify(FISH_CATALOG, null, 2)},
        live: ${JSON.stringify(LIVE_CATALOG, null, 2)}
    },
    states: ${JSON.stringify(statesArray, null, 2)}
};
`;

fs.writeFileSync('map-data.js', fileContent);
console.log('map-data.js actualizado con cultivos individuales cartoon!');
