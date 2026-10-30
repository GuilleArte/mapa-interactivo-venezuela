// =========================================================================
// ILUSTRACIONES CARTOON VECTORIALES SVG DE ALTA CALIDAD
// Contenedores (Cestas, Ambientes) + Elementos Arrastrables (Frutas, Peces, Animales)
// =========================================================================

window.CARTOON_ASSETS = {
    // -------------------------------------------------------------------------
    // 1. CONTENEDORES / AMBIENTES (La cesta o base que SE QUEDA en su sitio)
    // -------------------------------------------------------------------------
    containers: {
        // Cesta de mimbre clásica (como en la imagen de referencia del usuario)
        basket_wicker: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <defs>
                <linearGradient id="wickerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#e09e51" />
                    <stop offset="50%" stop-color="#b86f2d" />
                    <stop offset="100%" stop-color="#7a4214" />
                </linearGradient>
                <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#c67e38" />
                    <stop offset="50%" stop-color="#f5ba68" />
                    <stop offset="100%" stop-color="#934e19" />
                </linearGradient>
                <filter id="basketShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="#000" flood-opacity="0.45" />
                </filter>
            </defs>
            <!-- Interior sombreado de la cesta donde descansa la fruta -->
            <ellipse cx="80" cy="38" rx="60" ry="16" fill="#42210b" />
            <!-- Cuerpo de la cesta -->
            <path d="M 20 38 Q 28 100 80 102 Q 132 100 140 38 Z" fill="url(#wickerGrad)" stroke="#4d2508" stroke-width="3" filter="url(#basketShadow)" />
            <!-- Tejido horizontal y vertical de mimbre -->
            <path d="M 26 50 Q 80 62 134 50 M 32 68 Q 80 78 128 68 M 42 86 Q 80 94 118 86" fill="none" stroke="#68340d" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 50 42 L 54 94 M 70 44 L 72 98 M 90 44 L 88 98 M 110 42 L 106 94" fill="none" stroke="#da8f43" stroke-width="2.5" opacity="0.8" />
            <!-- Borde superior / aro tejido -->
            <ellipse cx="80" cy="38" rx="63" ry="12" fill="none" stroke="url(#rimGrad)" stroke-width="6" />
            <ellipse cx="80" cy="38" rx="63" ry="12" fill="none" stroke="#4d2508" stroke-width="2" />
        </svg>`,

        // Cesta congelada con hielo y escarcha (Clima frío andino)
        basket_frozen: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <defs>
                <linearGradient id="iceBasketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#99d6ea" />
                    <stop offset="40%" stop-color="#4a95b8" />
                    <stop offset="100%" stop-color="#244f6a" />
                </linearGradient>
                <linearGradient id="iceFrost" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="100%" stop-color="#c1ebf8" />
                </linearGradient>
                <filter id="iceGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#55c9ea" flood-opacity="0.6" />
                </filter>
            </defs>
            <!-- Interior sombreado con frío -->
            <ellipse cx="80" cy="38" rx="60" ry="16" fill="#122b3b" />
            <!-- Cuerpo helado con escarcha -->
            <path d="M 20 38 Q 28 100 80 102 Q 132 100 140 38 Z" fill="url(#iceBasketGrad)" stroke="#235c7e" stroke-width="3" filter="url(#iceGlow)" />
            <!-- Tejido congelado -->
            <path d="M 26 50 Q 80 62 134 50 M 32 68 Q 80 78 128 68 M 42 86 Q 80 94 118 86" fill="none" stroke="#79c5e5" stroke-width="2" />
            <!-- Borde superior escarchado -->
            <ellipse cx="80" cy="38" rx="63" ry="12" fill="none" stroke="url(#iceFrost)" stroke-width="7" />
            <!-- Carámbanos de hielo colgantes -->
            <polygon points="35,42 40,58 45,42" fill="url(#iceFrost)" />
            <polygon points="65,44 70,68 75,44" fill="url(#iceFrost)" />
            <polygon points="95,44 100,64 105,44" fill="url(#iceFrost)" />
            <polygon points="120,42 125,56 130,42" fill="url(#iceFrost)" />
            <!-- Copos de nieve flotando -->
            <circle cx="28" cy="85" r="2.5" fill="#fff" opacity="0.9" />
            <circle cx="135" cy="80" r="2.5" fill="#fff" opacity="0.9" />
        </svg>`,

        // Saco de yute campesino sobre paja dorada (Llanos)
        sack_burlap: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <defs>
                <linearGradient id="burlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#cf9f65" />
                    <stop offset="60%" stop-color="#9e6d38" />
                    <stop offset="100%" stop-color="#6e461f" />
                </linearGradient>
            </defs>
            <ellipse cx="80" cy="36" rx="55" ry="14" fill="#3d230d" />
            <!-- Saco arrugado de arpillera -->
            <path d="M 25 36 Q 18 85 45 104 Q 80 110 115 104 Q 142 85 135 36 Q 110 44 80 44 Q 50 44 25 36 Z" fill="url(#burlapGrad)" stroke="#4d2f13" stroke-width="3" />
            <!-- Borde doblado del saco -->
            <path d="M 22 36 Q 80 48 138 36 Q 140 28 132 26 Q 80 34 28 26 Q 20 28 22 36 Z" fill="#b88349" stroke="#4d2f13" stroke-width="2" />
            <!-- Espigas de paja dorada saliendo -->
            <path d="M 35 30 L 25 15 M 42 28 L 36 12 M 125 30 L 135 15 M 118 28 L 126 12" stroke="#eec042" stroke-width="2.5" stroke-linecap="round" />
            <!-- Parche llanero cosido -->
            <rect x="55" y="68" width="28" height="22" rx="3" fill="#845524" stroke="#4d2f13" stroke-dasharray="3,2" />
        </svg>`,

        // Caja de madera sobre césped fresco (Valles fértiles)
        crate_grass: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <defs>
                <linearGradient id="woodCrate" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#c18349" />
                    <stop offset="100%" stop-color="#70441d" />
                </linearGradient>
            </defs>
            <!-- Césped verde de base -->
            <ellipse cx="80" cy="102" rx="65" ry="12" fill="#2d7e32" />
            <path d="M 25 100 L 22 88 L 30 96 M 40 102 L 42 86 L 47 98 M 120 100 L 124 88 L 115 96 M 135 102 L 138 88" stroke="#4caf50" stroke-width="3" stroke-linecap="round" />
            <!-- Interior sombreado de la caja -->
            <polygon points="28,38 132,38 126,52 34,52" fill="#301807" />
            <!-- Listones de madera -->
            <rect x="25" y="44" width="110" height="16" rx="2" fill="url(#woodCrate)" stroke="#45240c" stroke-width="2.5" />
            <rect x="28" y="64" width="104" height="16" rx="2" fill="url(#woodCrate)" stroke="#45240c" stroke-width="2.5" />
            <rect x="32" y="84" width="96" height="16" rx="2" fill="url(#woodCrate)" stroke="#45240c" stroke-width="2.5" />
            <!-- Clavos de metal -->
            <circle cx="32" cy="52" r="2" fill="#222" /><circle cx="128" cy="52" r="2" fill="#222" />
            <circle cx="35" cy="72" r="2" fill="#222" /><circle cx="125" cy="72" r="2" fill="#222" />
        </svg>`,

        // Vasija de arcilla sobre arena cálida (Zona árida / Falcón)
        pot_desert: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <defs>
                <linearGradient id="clayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#e27643" />
                    <stop offset="50%" stop-color="#b84d1e" />
                    <stop offset="100%" stop-color="#722b0b" />
                </linearGradient>
            </defs>
            <!-- Arena del desierto -->
            <ellipse cx="80" cy="100" rx="66" ry="12" fill="#d4a359" />
            <ellipse cx="80" cy="38" rx="50" ry="14" fill="#3a1405" />
            <!-- Maceta de arcilla cocida -->
            <path d="M 30 38 Q 35 95 80 98 Q 125 95 130 38 Z" fill="url(#clayGrad)" stroke="#4a1805" stroke-width="3" />
            <ellipse cx="80" cy="38" rx="52" ry="10" fill="none" stroke="#f6996d" stroke-width="4" />
            <ellipse cx="80" cy="38" rx="52" ry="10" fill="none" stroke="#4a1805" stroke-width="1.5" />
            <!-- Grietas y detalles de tierra árida -->
            <path d="M 45 102 L 55 104 M 105 102 L 120 100" stroke="#996a29" stroke-width="2" />
        </svg>`,

        // Cesta artesanal sobre hojas tropicales húmedas (Cacao)
        basket_tropical: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <defs>
                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#2e7d32" />
                    <stop offset="100%" stop-color="#66bb6a" />
                </linearGradient>
                <linearGradient id="tropBasket" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#c98342" />
                    <stop offset="100%" stop-color="#6d3910" />
                </linearGradient>
            </defs>
            <!-- Grandes hojas verdes de plátano detrás -->
            <path d="M 15 70 Q 5 25 45 28 Q 65 30 55 60 Z" fill="url(#leafGrad)" stroke="#1b5e20" stroke-width="2" />
            <path d="M 145 70 Q 155 25 115 28 Q 95 30 105 60 Z" fill="url(#leafGrad)" stroke="#1b5e20" stroke-width="2" />
            <ellipse cx="80" cy="38" rx="58" ry="16" fill="#3a1b05" />
            <!-- Cesta de mimbre rústico -->
            <path d="M 22 38 Q 30 98 80 100 Q 130 98 138 38 Z" fill="url(#tropBasket)" stroke="#452006" stroke-width="3" />
            <ellipse cx="80" cy="38" rx="60" ry="12" fill="none" stroke="#f0aa67" stroke-width="5" />
            <ellipse cx="80" cy="38" rx="60" ry="12" fill="none" stroke="#452006" stroke-width="1.5" />
            <path d="M 30 54 Q 80 66 130 54 M 36 74 Q 80 84 124 74" fill="none" stroke="#522709" stroke-width="2" />
        </svg>`,

        // Canasta playera en arena caribeña con estrella de mar (Nueva Esparta)
        basket_beach: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="100" rx="68" ry="14" fill="#eed9a4" />
            <!-- Estrella de mar decorativa -->
            <polygon points="132,96 136,104 144,104 138,110 140,118 132,112 124,118 126,110 120,104 128,104" fill="#ff7043" stroke="#d84315" stroke-width="1" />
            <ellipse cx="80" cy="38" rx="55" ry="15" fill="#382412" />
            <!-- Canasta de palma tejida -->
            <path d="M 25 38 Q 32 96 80 98 Q 128 96 135 38 Z" fill="#d7a462" stroke="#543715" stroke-width="3" />
            <ellipse cx="80" cy="38" rx="58" ry="11" fill="none" stroke="#fce2aa" stroke-width="5" />
            <ellipse cx="80" cy="38" rx="58" ry="11" fill="none" stroke="#543715" stroke-width="1.5" />
        </svg>`,

        // Cesta indígena de selva con lianas (Amazonas / Bolívar)
        basket_jungle: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="98" rx="60" ry="12" fill="#1b431e" />
            <ellipse cx="80" cy="38" rx="56" ry="15" fill="#2d1d0f" />
            <path d="M 24 38 Q 30 96 80 98 Q 130 96 136 38 Z" fill="#996a3d" stroke="#3d230e" stroke-width="3" />
            <!-- Tejido geométrico indígena -->
            <path d="M 30 52 L 45 68 L 60 52 L 75 68 L 90 52 L 105 68 L 120 52 L 130 68" fill="none" stroke="#d69b5c" stroke-width="2.5" />
            <ellipse cx="80" cy="38" rx="58" ry="11" fill="none" stroke="#c48a4c" stroke-width="5" />
            <ellipse cx="80" cy="38" rx="58" ry="11" fill="none" stroke="#3d230e" stroke-width="1.5" />
        </svg>`,

        // Cuenco de sabana oriental (Anzoátegui / Monagas)
        bowl_savanna: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="100" rx="66" ry="13" fill="#a44c33" />
            <ellipse cx="80" cy="40" rx="56" ry="16" fill="#301407" />
            <path d="M 24 40 Q 32 96 80 98 Q 128 96 136 40 Z" fill="#935728" stroke="#422008" stroke-width="3" />
            <ellipse cx="80" cy="40" rx="58" ry="11" fill="none" stroke="#cf8e51" stroke-width="5" />
        </svg>`,

        // Cesta en bruma de montaña (Distrito Capital / La Guaira)
        basket_cloud: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <!-- Nubes de bruma -->
            <ellipse cx="40" cy="95" rx="30" ry="15" fill="#78909c" opacity="0.6" />
            <ellipse cx="120" cy="95" rx="30" ry="15" fill="#78909c" opacity="0.6" />
            <ellipse cx="80" cy="38" rx="56" ry="15" fill="#263238" />
            <path d="M 24 38 Q 30 96 80 98 Q 130 96 136 38 Z" fill="#b08968" stroke="#4e342e" stroke-width="3" />
            <ellipse cx="80" cy="38" rx="58" ry="11" fill="none" stroke="#ddbea9" stroke-width="5" />
        </svg>`,

        // Red marinera sobre olas oceánicas (Pesca de alta mar)
        net_ocean: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <!-- Olas de mar -->
            <path d="M 10 95 Q 40 80 80 95 Q 120 110 150 95 L 150 115 L 10 115 Z" fill="#1565c0" />
            <path d="M 15 88 Q 50 75 80 88 Q 110 100 145 88" stroke="#64b5f6" stroke-width="3" fill="none" />
            <!-- Boyas flotantes de corcho -->
            <circle cx="30" cy="78" r="6" fill="#ff7043" stroke="#b63816" stroke-width="1.5" />
            <circle cx="130" cy="78" r="6" fill="#ff7043" stroke="#b63816" stroke-width="1.5" />
            <!-- Malla de red de pescar -->
            <ellipse cx="80" cy="50" rx="55" ry="25" fill="#0d47a1" opacity="0.4" />
            <path d="M 30 45 L 130 85 M 50 35 L 140 70 M 130 45 L 30 85 M 110 35 L 20 70" stroke="#e0e0e0" stroke-width="1.8" opacity="0.75" />
        </svg>`,

        // Nasa de madera lacustre (Lago de Maracaibo)
        trap_lake: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="98" rx="66" ry="12" fill="#004d40" />
            <ellipse cx="80" cy="42" rx="54" ry="16" fill="#00251a" />
            <path d="M 26 42 Q 32 94 80 96 Q 128 94 134 42 Z" fill="#5d4037" stroke="#271810" stroke-width="3" />
            <!-- Rejillas de madera -->
            <path d="M 45 46 L 48 92 M 65 48 L 68 94 M 95 48 L 92 94 M 115 46 L 112 92" stroke="#8d6e63" stroke-width="3" />
        </svg>`,

        // Cubeta de agua con hielo de páramo (Mérida / Trucha)
        bucket_ice: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="40" rx="56" ry="15" fill="#01579b" />
            <!-- Cubeta metálica/madera -->
            <path d="M 25 40 L 40 98 L 120 98 L 135 40 Z" fill="#78909c" stroke="#37474f" stroke-width="3" />
            <ellipse cx="80" cy="40" rx="57" ry="12" fill="none" stroke="#b0bec5" stroke-width="5" />
            <!-- Bloques de hielo flotantes -->
            <rect x="50" y="32" width="16" height="12" rx="2" fill="#e1f5fe" stroke="#81d4fa" />
            <rect x="92" y="34" width="18" height="13" rx="2" fill="#e1f5fe" stroke="#81d4fa" />
        </svg>`,

        // Canoa fluvial indígena (Río Orinoco)
        canoe_river: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <!-- Río azul con corriente -->
            <path d="M 10 90 Q 80 80 150 90 L 150 110 L 10 110 Z" fill="#0277bd" />
            <!-- Canoa tallada de madera alargada -->
            <path d="M 15 50 Q 80 75 145 50 Q 80 100 15 50 Z" fill="#5d4037" stroke="#27150c" stroke-width="3" />
            <ellipse cx="80" cy="58" rx="55" ry="10" fill="#2d170b" />
        </svg>`,

        // Cava playera con hielo (Costas / Pargo)
        cooler_beach: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="100" rx="60" ry="12" fill="#d7ccc8" />
            <rect x="30" y="42" width="100" height="54" rx="6" fill="#1976d2" stroke="#0d47a1" stroke-width="3" />
            <rect x="26" y="34" width="108" height="14" rx="4" fill="#ffffff" stroke="#90caf9" stroke-width="2" />
            <!-- Cubos de hielo asomando -->
            <rect x="55" y="28" width="14" height="12" rx="2" fill="#e3f2fd" stroke="#90caf9" />
            <rect x="90" y="26" width="15" height="14" rx="2" fill="#e3f2fd" stroke="#90caf9" />
        </svg>`,

        // Cesta sobre manglares deltaicos (Delta Amacuro)
        basket_mangrove: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="98" rx="64" ry="12" fill="#1b5e20" />
            <ellipse cx="80" cy="40" rx="54" ry="15" fill="#1f3b22" />
            <path d="M 26 40 Q 32 96 80 98 Q 128 96 134 40 Z" fill="#6d8d60" stroke="#1e3e18" stroke-width="3" />
            <ellipse cx="80" cy="40" rx="56" ry="11" fill="none" stroke="#a2c496" stroke-width="5" />
        </svg>`,

        // Ribera de río con juncos llaneros (Cachama)
        reed_river: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <path d="M 10 92 Q 80 82 150 92 L 150 112 L 10 112 Z" fill="#00838f" />
            <ellipse cx="80" cy="40" rx="56" ry="16" fill="#1a3b38" />
            <path d="M 24 40 Q 32 94 80 96 Q 128 94 136 40 Z" fill="#8d6e63" stroke="#3e2723" stroke-width="3" />
            <!-- Juncos verdes -->
            <path d="M 20 85 L 15 45 M 26 88 L 24 50 M 135 85 L 140 45 M 142 88 L 145 52" stroke="#2e7d32" stroke-width="3" stroke-linecap="round" />
        </svg>`,

        // Corral llanero de madera y pasto (Ganadería de carne)
        corral_wood: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="98" rx="66" ry="14" fill="#558b2f" />
            <!-- Trancas de madera rústica -->
            <rect x="25" y="45" width="14" height="52" rx="2" fill="#5d4037" stroke="#2b1a12" stroke-width="2" />
            <rect x="121" y="45" width="14" height="52" rx="2" fill="#5d4037" stroke="#2b1a12" stroke-width="2" />
            <rect x="20" y="55" width="120" height="10" rx="2" fill="#795548" stroke="#2b1a12" stroke-width="2" />
            <rect x="22" y="75" width="116" height="10" rx="2" fill="#795548" stroke="#2b1a12" stroke-width="2" />
        </svg>`,

        // Heno con cántara de leche (Vaca lechera)
        hay_milk: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <!-- Paca redonda de heno -->
            <ellipse cx="80" cy="95" rx="66" ry="16" fill="#fbc02d" stroke="#c49000" stroke-width="2" />
            <!-- Cántara de metal tradicional -->
            <rect x="110" y="55" width="26" height="35" rx="3" fill="#b0bec5" stroke="#455a64" stroke-width="2" />
            <polygon points="113,55 133,55 128,45 118,45" fill="#cfd8dc" stroke="#455a64" stroke-width="1.5" />
            <rect x="116" y="40" width="14" height="6" rx="1" fill="#78909c" />
        </svg>`,

        // Corral de piedra con cactus (Chivo / Falcón)
        pen_cactus: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="98" rx="66" ry="13" fill="#a1887f" />
            <!-- Cactus cardón a un lado -->
            <path d="M 25 95 L 25 45 Q 25 40 30 40 Q 35 40 35 45 L 35 95" fill="#2e7d32" stroke="#1b5e20" stroke-width="2" />
            <path d="M 25 65 L 16 65 L 16 52 Q 16 48 20 48 Q 24 48 24 52 L 24 65" fill="#2e7d32" stroke="#1b5e20" stroke-width="1.5" />
            <!-- Muro de piedras secas -->
            <ellipse cx="60" cy="85" rx="14" ry="9" fill="#795548" stroke="#3e2723" />
            <ellipse cx="85" cy="86" rx="15" ry="9" fill="#8d6e63" stroke="#3e2723" />
            <ellipse cx="110" cy="85" rx="14" ry="9" fill="#795548" stroke="#3e2723" />
            <ellipse cx="72" cy="74" rx="13" ry="8" fill="#a1887f" stroke="#3e2723" />
            <ellipse cx="98" cy="74" rx="13" ry="8" fill="#8d6e63" stroke="#3e2723" />
        </svg>`,

        // Charca de lodo y juncos (Búfalo)
        mud_wetland: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <!-- Charca de lodo húmedo con agua -->
            <ellipse cx="80" cy="85" rx="68" ry="24" fill="#3e2723" />
            <ellipse cx="80" cy="85" rx="55" ry="16" fill="#4e342e" />
            <ellipse cx="80" cy="84" rx="42" ry="10" fill="#2e7d32" opacity="0.4" />
            <!-- Juncos de humedal -->
            <path d="M 25 80 Q 20 40 30 35 M 32 82 Q 35 45 42 40 M 130 80 Q 140 40 128 35 M 122 82 Q 118 45 112 40" stroke="#388e3c" stroke-width="3" stroke-linecap="round" />
        </svg>`,

        // Pradera andina fría con escarcha (Vaca andina)
        pasture_snow: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="92" rx="68" ry="18" fill="#33691e" />
            <!-- Manchas de nieve en la hierba -->
            <ellipse cx="45" cy="94" rx="20" ry="7" fill="#e0f7fa" />
            <ellipse cx="115" cy="92" rx="22" ry="8" fill="#e0f7fa" />
            <!-- Muro de piedra andina -->
            <path d="M 20 80 Q 80 74 140 80" stroke="#455a64" stroke-width="6" stroke-linecap="round" />
        </svg>`,

        // Nido de paja de granja (Cerdo / Granja)
        nest_straw: `
        <svg viewBox="0 0 160 120" class="svg-container-art">
            <ellipse cx="80" cy="88" rx="65" ry="22" fill="#fbc02d" stroke="#f57f17" stroke-width="2.5" />
            <ellipse cx="80" cy="85" rx="50" ry="14" fill="#f57f17" opacity="0.6" />
            <!-- Pajas saliendo en desorden -->
            <path d="M 25 80 L 15 72 M 35 95 L 20 102 M 135 80 L 145 72 M 125 95 L 140 102 M 80 105 L 80 115" stroke="#fbc02d" stroke-width="3" stroke-linecap="round" />
        </svg>`
    },

    // -------------------------------------------------------------------------
    // 2. ELEMENTOS ARRASTRABLES (Fruta, Pez o Animal individual estilo cartoon)
    // -------------------------------------------------------------------------
    items: {
        // Plátano / Banana (exacto al estilo de la imagen del usuario)
        item_banana: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fff575" />
                    <stop offset="60%" stop-color="#ffcc00" />
                    <stop offset="100%" stop-color="#e69500" />
                </linearGradient>
                <filter id="bananaGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.35" />
                </filter>
            </defs>
            <!-- Cuerpo curvo del plátano -->
            <path d="M 16 48 C 22 25 78 20 106 38 C 112 42 110 50 102 54 C 70 70 28 65 16 48 Z" fill="url(#bananaGrad)" stroke="#4a2e05" stroke-width="3" stroke-linejoin="round" filter="url(#bananaGlow)" />
            <!-- Brillo superior brillante -->
            <path d="M 28 42 C 45 28 75 28 98 40" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.8" />
            <!-- Tallo verde oscuro -->
            <path d="M 106 38 L 112 28 C 114 24 108 22 106 25 L 102 36 Z" fill="#7cb342" stroke="#33691e" stroke-width="2" />
            <!-- Punta café -->
            <path d="M 16 48 C 13 47 11 50 13 52 C 16 54 18 51 16 48 Z" fill="#5d4037" />
        </svg>`,

        // Fresa roja brillante con semillas (Clima frío andino)
        item_strawberry: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="strawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff5252" />
                    <stop offset="60%" stop-color="#d50000" />
                    <stop offset="100%" stop-color="#880e4f" />
                </linearGradient>
                <filter id="strawGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.35" />
                </filter>
            </defs>
            <!-- Forma de corazón cónica de la fresa -->
            <path d="M 60 88 C 30 75 25 45 35 32 C 45 20 75 20 85 32 C 95 45 90 75 60 88 Z" fill="url(#strawGrad)" stroke="#4a0007" stroke-width="3" filter="url(#strawGlow)" />
            <!-- Brillo curvo brillante -->
            <path d="M 40 36 Q 48 30 58 32 Q 42 46 44 60" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.75" />
            <!-- Semillitas doradas -->
            <ellipse cx="50" cy="46" rx="1.5" ry="2.5" fill="#fff59d" /><ellipse cx="65" cy="42" rx="1.5" ry="2.5" fill="#fff59d" /><ellipse cx="78" cy="48" rx="1.5" ry="2.5" fill="#fff59d" />
            <ellipse cx="44" cy="62" rx="1.5" ry="2.5" fill="#fff59d" /><ellipse cx="60" cy="60" rx="1.5" ry="2.5" fill="#fff59d" /><ellipse cx="74" cy="64" rx="1.5" ry="2.5" fill="#fff59d" />
            <ellipse cx="55" cy="74" rx="1.5" ry="2.5" fill="#fff59d" /><ellipse cx="66" cy="74" rx="1.5" ry="2.5" fill="#fff59d" />
            <!-- Hojas verdes superiores (cáliz) -->
            <path d="M 60 26 L 46 16 C 54 24 50 28 58 28 L 60 12 L 62 28 C 70 28 66 24 74 16 Z" fill="#4caf50" stroke="#1b5e20" stroke-width="2" />
        </svg>`,

        // Mazorca de Maíz dorada con hojas (Llanos)
        item_corn: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="cornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fff176" />
                    <stop offset="70%" stop-color="#fbc02d" />
                    <stop offset="100%" stop-color="#f57f17" />
                </linearGradient>
            </defs>
            <!-- Mazorca dorada inclinada -->
            <g transform="rotate(-20 60 50)">
                <rect x="42" y="20" width="36" height="60" rx="18" fill="url(#cornGrad)" stroke="#4e342e" stroke-width="3" />
                <!-- Cuadrícula de granos -->
                <path d="M 46 35 H 74 M 44 47 H 76 M 44 59 H 76 M 48 71 H 72" stroke="#e65100" stroke-width="2" stroke-linecap="round" />
                <path d="M 52 24 V 76 M 60 22 V 78 M 68 24 V 76" stroke="#e65100" stroke-width="2" stroke-linecap="round" />
                <!-- Brillo de granos -->
                <ellipse cx="56" cy="32" rx="4" ry="8" fill="#fff" opacity="0.6" />
                <!-- Hojas verdes de la mazorca -->
                <path d="M 38 72 Q 25 50 32 30 Q 36 60 48 76 Z" fill="#7cb342" stroke="#33691e" stroke-width="2" />
                <path d="M 82 72 Q 95 50 88 30 Q 84 60 72 76 Z" fill="#8bc34a" stroke="#33691e" stroke-width="2" />
            </g>
        </svg>`,

        // Mazorca de Cacao marrón rojiza (Chuao / Barlovento)
        item_cacao: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="cacaoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#d87d4a" />
                    <stop offset="60%" stop-color="#8d4018" />
                    <stop offset="100%" stop-color="#4e1a06" />
                </linearGradient>
            </defs>
            <!-- Forma ovalada alargada de cacao -->
            <g transform="rotate(-15 60 50)">
                <path d="M 30 50 C 30 30 60 22 90 40 C 100 48 95 62 80 72 C 60 82 30 75 30 50 Z" fill="url(#cacaoGrad)" stroke="#2b0d03" stroke-width="3" />
                <!-- Surcos longitudinales característicos del cacao -->
                <path d="M 32 50 Q 60 32 88 42 M 34 54 Q 60 52 86 60 M 38 60 Q 62 70 80 70" fill="none" stroke="#2b0d03" stroke-width="2" stroke-linecap="round" />
                <!-- Brillo brillante -->
                <path d="M 45 38 Q 65 32 80 40" fill="none" stroke="#ffb088" stroke-width="3" stroke-linecap="round" />
                <!-- Tallo -->
                <path d="M 28 50 L 18 48 C 16 46 20 44 24 46 Z" fill="#4e342e" stroke="#2b0d03" stroke-width="1.5" />
            </g>
        </svg>`,

        // Naranja jugosa y brillante (Yaracuy / Carabobo)
        item_orange: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffb74d" />
                    <stop offset="60%" stop-color="#ff9800" />
                    <stop offset="100%" stop-color="#e65100" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="52" r="32" fill="url(#orangeGrad)" stroke="#bf360c" stroke-width="3" />
            <!-- Brillo de la cáscara -->
            <ellipse cx="48" cy="38" rx="10" ry="6" transform="rotate(-30 48 38)" fill="#ffffff" opacity="0.65" />
            <!-- Tallo y hoja verde -->
            <path d="M 60 20 Q 75 10 82 18 Q 72 26 60 22 Z" fill="#4caf50" stroke="#1b5e20" stroke-width="2" />
            <circle cx="60" cy="22" r="2.5" fill="#3e2723" />
        </svg>`,

        // Penca de Sábila verde jugosa (Falcón)
        item_aloe: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="aloeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#81c784" />
                    <stop offset="60%" stop-color="#388e3c" />
                    <stop offset="100%" stop-color="#1b5e20" />
                </linearGradient>
            </defs>
            <!-- Pencas de sábila puntiagudas -->
            <path d="M 60 85 Q 40 45 42 18 Q 58 45 68 85 Z" fill="url(#aloeGrad)" stroke="#0d3b10" stroke-width="3" />
            <path d="M 65 85 Q 85 50 84 25 Q 70 52 58 85 Z" fill="#66bb6a" stroke="#0d3b10" stroke-width="2.5" />
            <!-- Espinas en los bordes -->
            <circle cx="42" cy="28" r="1.5" fill="#fff" /><circle cx="43" cy="40" r="1.5" fill="#fff" /><circle cx="48" cy="55" r="1.5" fill="#fff" />
            <!-- Brillo de gel -->
            <path d="M 50 32 Q 54 50 60 70" fill="none" stroke="#e8f5e9" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
        </svg>`,

        // Raíz de Yuca / Casabe (Amazonas / Bolívar)
        item_yuca: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="yucaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#8d6e63" />
                    <stop offset="60%" stop-color="#5d4037" />
                    <stop offset="100%" stop-color="#3e2723" />
                </linearGradient>
            </defs>
            <g transform="rotate(-25 60 50)">
                <path d="M 25 50 Q 60 38 95 48 Q 60 62 25 50 Z" fill="url(#yucaGrad)" stroke="#271810" stroke-width="3" />
                <!-- Corte transversal blanco puro de la pulpa -->
                <ellipse cx="94" cy="48" rx="6" ry="9" fill="#ffffff" stroke="#271810" stroke-width="2" />
                <circle cx="94" cy="48" r="1.5" fill="#4e342e" />
            </g>
        </svg>`,

        // Maní de cáscara dorada (Anzoátegui / Monagas)
        item_peanut: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="nutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffe082" />
                    <stop offset="60%" stop-color="#ffb300" />
                    <stop offset="100%" stop-color="#c67100" />
                </linearGradient>
            </defs>
            <g transform="rotate(-20 60 50)">
                <!-- Forma de cacahuate en 8 -->
                <path d="M 32 50 C 30 35 48 32 58 42 C 68 32 86 35 88 50 C 86 65 68 68 58 58 C 48 68 30 65 32 50 Z" fill="url(#nutGrad)" stroke="#5d4037" stroke-width="3" />
                <!-- Textura reticulada -->
                <path d="M 38 48 Q 48 42 56 50 M 64 48 Q 72 42 82 50" fill="none" stroke="#bf360c" stroke-width="1.8" />
                <ellipse cx="44" cy="40" rx="3" ry="5" fill="#fff" opacity="0.6" />
            </g>
        </svg>`,

        // Ají dulce rojo y brillante (Nueva Esparta)
        item_chili: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="chiliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff5252" />
                    <stop offset="50%" stop-color="#ff1744" />
                    <stop offset="100%" stop-color="#b71c1c" />
                </linearGradient>
            </defs>
            <!-- Forma de ají dulce acampanado -->
            <path d="M 40 40 C 35 60 50 82 60 86 C 70 82 85 60 80 40 C 75 32 45 32 40 40 Z" fill="url(#chiliGrad)" stroke="#4a0000" stroke-width="3" />
            <!-- Brillo reflectivo -->
            <path d="M 46 45 Q 52 38 60 38 Q 48 55 52 70" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75" />
            <!-- Tallo verde curvo -->
            <path d="M 60 34 Q 65 18 78 16" fill="none" stroke="#4caf50" stroke-width="4" stroke-linecap="round" />
            <ellipse cx="60" cy="34" rx="7" ry="3" fill="#388e3c" />
        </svg>`,

        // Durazno aterciopelado (Distrito Capital / Galipán)
        item_peach: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="peachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffcc80" />
                    <stop offset="50%" stop-color="#ff7043" />
                    <stop offset="100%" stop-color="#d84315" />
                </linearGradient>
            </defs>
            <!-- Forma de corazón redondo de durazno -->
            <path d="M 60 80 C 35 80 25 55 35 40 C 45 25 58 35 60 38 C 62 35 75 25 85 40 C 95 55 85 80 60 80 Z" fill="url(#peachGrad)" stroke="#4e1d08" stroke-width="3" />
            <!-- Hendidura del durazno -->
            <path d="M 60 38 Q 58 55 60 76" fill="none" stroke="#bf360c" stroke-width="2" />
            <path d="M 60 36 Q 72 20 82 24 Q 72 34 60 36 Z" fill="#4caf50" stroke="#1b5e20" stroke-width="1.8" />
        </svg>`,

        // Atún azul de alta mar (Sucre / Nueva Esparta)
        item_tuna: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="tunaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1565c0" />
                    <stop offset="50%" stop-color="#42a5f5" />
                    <stop offset="100%" stop-color="#e0e0e0" />
                </linearGradient>
            </defs>
            <!-- Cuerpo hidrodinámico de atún -->
            <path d="M 20 50 C 40 32 80 34 100 48 L 112 36 L 108 50 L 112 64 L 100 52 C 80 66 40 68 20 50 Z" fill="url(#tunaGrad)" stroke="#0d47a1" stroke-width="2.5" />
            <!-- Ojo vivaz -->
            <circle cx="35" cy="46" r="4" fill="#fff" /><circle cx="34" cy="46" r="2" fill="#000" />
            <!-- Aleta dorsal amarilla -->
            <polygon points="55,36 65,22 72,36" fill="#fbc02d" stroke="#f57f17" />
        </svg>`,

        // Cangrejo azul caricaturesco (Zulia / Lago de Maracaibo)
        item_crab: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <!-- Caparazón azul -->
            <ellipse cx="60" cy="55" rx="26" ry="18" fill="#1976d2" stroke="#0d47a1" stroke-width="2.5" />
            <!-- Ojos saltones -->
            <circle cx="52" cy="35" r="5" fill="#fff" stroke="#000" /><circle cx="52" cy="34" r="2.5" fill="#000" />
            <circle cx="68" cy="35" r="5" fill="#fff" stroke="#000" /><circle cx="68" cy="34" r="2.5" fill="#000" />
            <!-- Pinzas rojas/azules -->
            <path d="M 38 48 Q 20 30 18 42 C 22 45 32 54 36 54 Z" fill="#e53935" stroke="#b71c1c" stroke-width="2" />
            <path d="M 82 48 Q 100 30 102 42 C 98 45 88 54 84 54 Z" fill="#e53935" stroke="#b71c1c" stroke-width="2" />
            <!-- Patitas -->
            <path d="M 40 64 Q 30 76 25 82 M 48 68 Q 42 80 38 88 M 80 64 Q 90 76 95 82 M 72 68 Q 78 80 82 88" stroke="#1565c0" stroke-width="3" stroke-linecap="round" fill="none" />
        </svg>`,

        // Trucha andina arcoíris (Mérida / Táchira)
        item_trout: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="troutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2e7d32" />
                    <stop offset="45%" stop-color="#ec407a" />
                    <stop offset="100%" stop-color="#cfd8dc" />
                </linearGradient>
            </defs>
            <path d="M 18 50 C 35 34 75 35 98 48 L 110 38 L 106 50 L 110 62 L 98 52 C 75 65 35 66 18 50 Z" fill="url(#troutGrad)" stroke="#1b5e20" stroke-width="2.5" />
            <circle cx="32" cy="46" r="3.5" fill="#fff" /><circle cx="31" cy="46" r="2" fill="#000" />
            <!-- Puntos de trucha -->
            <circle cx="50" cy="46" r="1.5" fill="#000" /><circle cx="65" cy="44" r="1.5" fill="#000" /><circle cx="80" cy="46" r="1.5" fill="#000" />
        </svg>`,

        // Sapoara dorada del Orinoco (Bolívar / Amazonas)
        item_sapoara: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="sapoaraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#fbc02d" />
                    <stop offset="60%" stop-color="#f57f17" />
                    <stop offset="100%" stop-color="#fff9c4" />
                </linearGradient>
            </defs>
            <path d="M 20 50 C 40 30 80 32 98 48 L 112 36 L 106 50 L 112 64 L 98 52 C 80 68 40 70 20 50 Z" fill="url(#sapoaraGrad)" stroke="#e65100" stroke-width="2.5" />
            <circle cx="36" cy="45" r="4" fill="#fff" /><circle cx="35" cy="45" r="2" fill="#000" />
        </svg>`,

        // Pargo rojo costero (La Guaira / Falcón)
        item_snapper: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="snapperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#e53935" />
                    <stop offset="60%" stop-color="#ef5350" />
                    <stop offset="100%" stop-color="#ffebee" />
                </linearGradient>
            </defs>
            <path d="M 18 50 C 35 30 75 32 98 48 L 112 36 L 106 50 L 112 64 L 98 52 C 75 68 35 70 18 50 Z" fill="url(#snapperGrad)" stroke="#b71c1c" stroke-width="2.5" />
            <circle cx="34" cy="45" r="4" fill="#ffeb3b" /><circle cx="33" cy="45" r="2" fill="#000" />
            <polygon points="50,34 62,20 74,34" fill="#e53935" stroke="#b71c1c" />
        </svg>`,

        // Camarón rosado de manglar (Delta Amacuro)
        item_shrimp: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="shrimpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff8a80" />
                    <stop offset="70%" stop-color="#ff5252" />
                    <stop offset="100%" stop-color="#ff1744" />
                </linearGradient>
            </defs>
            <!-- Cuerpo curvo en C del camarón -->
            <path d="M 35 35 C 65 15 88 35 84 62 C 80 82 55 86 42 76 C 60 76 72 65 68 50 C 65 38 45 42 35 35 Z" fill="url(#shrimpGrad)" stroke="#c62828" stroke-width="2.5" />
            <!-- Ojo y antenas -->
            <circle cx="38" cy="34" r="2.5" fill="#000" />
            <path d="M 35 32 Q 18 20 12 12 M 35 34 Q 18 30 8 32" stroke="#ff8a80" stroke-width="2" fill="none" stroke-linecap="round" />
            <!-- Cola -->
            <polygon points="42,76 30,88 42,84 38,94 48,82" fill="#d32f2f" />
        </svg>`,

        // Cachama de río llanero (Apure / Barinas / Guárico)
        item_cachama: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <defs>
                <linearGradient id="cachamaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#37474f" />
                    <stop offset="50%" stop-color="#78909c" />
                    <stop offset="100%" stop-color="#ffca28" />
                </linearGradient>
            </defs>
            <path d="M 22 50 C 35 25 75 26 96 48 L 110 38 L 105 50 L 110 62 L 96 52 C 75 74 35 75 22 50 Z" fill="url(#cachamaGrad)" stroke="#263238" stroke-width="2.5" />
            <circle cx="36" cy="45" r="4" fill="#fff" /><circle cx="35" cy="45" r="2" fill="#000" />
        </svg>`,

        // Toro vacuno de carne llanero (Apure / Barinas)
        item_bull: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <!-- Cabeza simpática de toro llanero -->
            <ellipse cx="60" cy="55" rx="26" ry="24" fill="#8d6e63" stroke="#3e2723" stroke-width="3" />
            <!-- Cuernos blancos -->
            <path d="M 40 40 Q 20 22 18 12 Q 32 25 44 34 Z" fill="#fffde7" stroke="#3e2723" stroke-width="2" />
            <path d="M 80 40 Q 100 22 102 12 Q 88 25 76 34 Z" fill="#fffde7" stroke="#3e2723" stroke-width="2" />
            <!-- Hocico y nariz -->
            <ellipse cx="60" cy="65" rx="16" ry="10" fill="#d7ccc8" stroke="#3e2723" stroke-width="2" />
            <circle cx="54" cy="65" r="2.5" fill="#3e2723" /><circle cx="66" cy="65" r="2.5" fill="#3e2723" />
            <!-- Ojos -->
            <circle cx="48" cy="46" r="4" fill="#fff" /><circle cx="48" cy="46" r="2" fill="#000" />
            <circle cx="72" cy="46" r="4" fill="#fff" /><circle cx="72" cy="46" r="2" fill="#000" />
            <!-- Orejas -->
            <ellipse cx="32" cy="46" rx="8" ry="4" transform="rotate(-20 32 46)" fill="#8d6e63" stroke="#3e2723" />
            <ellipse cx="88" cy="46" rx="8" ry="4" transform="rotate(20 88 46)" fill="#8d6e63" stroke="#3e2723" />
        </svg>`,

        // Vaca lechera blanca y negra (Zulia / Portuguesa)
        item_cow_dairy: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <ellipse cx="60" cy="54" rx="26" ry="23" fill="#ffffff" stroke="#212121" stroke-width="3" />
            <!-- Manchas negras -->
            <path d="M 42 38 Q 50 34 52 45 Q 40 50 42 38 Z" fill="#212121" />
            <path d="M 74 38 Q 84 44 78 52 Q 68 46 74 38 Z" fill="#212121" />
            <!-- Hocico rosado -->
            <ellipse cx="60" cy="64" rx="16" ry="10" fill="#f8bbd0" stroke="#212121" stroke-width="2" />
            <circle cx="54" cy="64" r="2.5" fill="#ad1457" /><circle cx="66" cy="64" r="2.5" fill="#ad1457" />
            <!-- Ojos tiernos -->
            <circle cx="48" cy="46" r="4" fill="#fff" /><circle cx="48" cy="46" r="2.5" fill="#000" />
            <circle cx="72" cy="46" r="4" fill="#fff" /><circle cx="72" cy="46" r="2.5" fill="#000" />
            <!-- Cuernitos amarillos -->
            <polygon points="44,34 40,24 48,30" fill="#fff9c4" stroke="#212121" />
            <polygon points="76,34 80,24 72,30" fill="#fff9c4" stroke="#212121" />
        </svg>`,

        // Chivo con barba y cuernos (Falcón / Lara)
        item_goat: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <!-- Cabeza de chivo -->
            <path d="M 40 38 Q 60 30 80 38 L 74 72 Q 60 78 46 72 Z" fill="#d7ccc8" stroke="#4e342e" stroke-width="3" />
            <!-- Barba de chivo -->
            <polygon points="54,74 60,92 66,74" fill="#f5f5f5" stroke="#4e342e" stroke-width="2" />
            <!-- Cuernos estriados curvados hacia atrás -->
            <path d="M 46 32 Q 35 15 28 10 Q 42 16 52 28 Z" fill="#8d6e63" stroke="#3e2723" stroke-width="2" />
            <path d="M 74 32 Q 85 15 92 10 Q 78 16 68 28 Z" fill="#8d6e63" stroke="#3e2723" stroke-width="2" />
            <!-- Hocico y ojos horizontales -->
            <ellipse cx="60" cy="66" rx="9" ry="5" fill="#5d4037" />
            <ellipse cx="48" cy="46" rx="3" ry="2" fill="#000" /><ellipse cx="72" cy="46" rx="3" ry="2" fill="#000" />
        </svg>`,

        // Búfalo de agua con grandes cuernos curvados (Delta Amacuro)
        item_buffalo: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <ellipse cx="60" cy="56" rx="26" ry="22" fill="#455a64" stroke="#263238" stroke-width="3" />
            <!-- Grandes cuernos curvados hacia afuera -->
            <path d="M 42 42 Q 10 32 15 16 Q 30 35 48 38 Z" fill="#263238" stroke="#000" stroke-width="2" />
            <path d="M 78 42 Q 110 32 105 16 Q 90 35 72 38 Z" fill="#263238" stroke="#000" stroke-width="2" />
            <!-- Hocico ancho -->
            <ellipse cx="60" cy="65" rx="16" ry="9" fill="#263238" />
            <circle cx="54" cy="65" r="2.5" fill="#37474f" /><circle cx="66" cy="65" r="2.5" fill="#37474f" />
            <circle cx="48" cy="46" r="3" fill="#fff" /><circle cx="48" cy="46" r="1.5" fill="#000" />
            <circle cx="72" cy="46" r="3" fill="#fff" /><circle cx="72" cy="46" r="1.5" fill="#000" />
        </svg>`,

        // Vaca andina con flequillo (Mérida / Páramo)
        item_cow_highland: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <ellipse cx="60" cy="54" rx="26" ry="23" fill="#a1887f" stroke="#4e342e" stroke-width="3" />
            <!-- Flequillo andino lanudo -->
            <path d="M 40 32 Q 50 50 48 56 Q 60 48 60 58 Q 66 48 72 56 Q 70 50 80 32 Z" fill="#6d4c41" stroke="#3e2723" stroke-width="2" />
            <!-- Hocico -->
            <ellipse cx="60" cy="65" rx="15" ry="9" fill="#d7ccc8" stroke="#4e342e" stroke-width="2" />
            <circle cx="54" cy="65" r="2.5" fill="#4e342e" /><circle cx="66" cy="65" r="2.5" fill="#4e342e" />
        </svg>`,

        // Cerdo sonriente de granja (Aragua / Carabobo)
        item_pig: `
        <svg viewBox="0 0 120 100" class="svg-item-art">
            <!-- Cabeza rosada de cerdito -->
            <circle cx="60" cy="52" r="26" fill="#f48fb1" stroke="#c2185b" stroke-width="3" />
            <!-- Nariz / trompa chata ovalada -->
            <ellipse cx="60" cy="56" rx="12" ry="8" fill="#f06292" stroke="#c2185b" stroke-width="2" />
            <circle cx="56" cy="56" r="2" fill="#880e4f" /><circle cx="64" cy="56" r="2" fill="#880e4f" />
            <!-- Ojos -->
            <circle cx="48" cy="44" r="3.5" fill="#fff" /><circle cx="48" cy="44" r="2" fill="#000" />
            <circle cx="72" cy="44" r="3.5" fill="#fff" /><circle cx="72" cy="44" r="2" fill="#000" />
            <!-- Orejitas triangulares -->
            <polygon points="38,36 30,18 48,28" fill="#f06292" stroke="#c2185b" stroke-width="2" />
            <polygon points="82,36 90,18 72,28" fill="#f06292" stroke="#c2185b" stroke-width="2" />
        </svg>`
    }
};

