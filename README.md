# 🇻🇪 Mapa Interactivo y Cuestionario de Venezuela

> 🌐 **Demo en Vivo (GitHub Pages):** [https://guillearte.github.io/mapa-interactivo-venezuela/](https://guillearte.github.io/mapa-interactivo-venezuela/)

Una aplicación web educativa, interactiva y moderna construida con mapas vectoriales SVG, ilustraciones cartoon en capas con drag & drop, mapa térmico climático, clasificación por macro-zonas (Centro, Occidente y Oriente) y audio sintetizado nativo (Web Audio API).

## 🎯 Dinámica del Cuestionario

Al presionar el botón **"¡Comenzar Cuestionario!"**, la aplicación selecciona estados aleatorios de Venezuela y te guía en una trivia de 3 pasos por cada uno:

1. **¿Dónde está [Estado]? (Ubicación en el mapa):**
   - El mapa de Venezuela se presenta de forma interactiva.
   - Debes hacer clic sobre el estado solicitado.
   - Si te equivocas, la aplicación te avisa qué estado tocaste para que aprendas su ubicación real y puedas reintentarlo.
   - Si aciertas, el estado brilla en verde esmeralda y emite un sonido de confirmación.

2. **¿Cuál es la capital de [Estado]?:**
   - Se despliegan 4 opciones interactivas con capitales venezolanas.
   - Debes pulsar la capital correcta correspondiente al estado seleccionado.

3. **Mecánica Dinámica de Cestas y Ambientes (Drag & Drop en Agricultura, Pesca y Ganadería):**
   - Para cada sector se presentan **6 opciones interactivas**, donde cada producto está colocado dentro de su **cesta, recipiente o ambiente característico según el clima donde se produce**:
     - 🌾 **Agricultura:** 
       - *Papas y Fresas:* colocadas en una **cesta congelada con escarcha de hielo y nieve ❄️🧊** (clima frío andino).
       - *Cacao y Café:* en una **cesta artesanal de mimbre sobre hojas tropicales húmedas 🍃🧺** (trópico húmedo).
       - *Maíz y Arroz:* dentro de un **saco de yute campesino sobre espigas doradas 🌾📦** (sabana llanera).
       - *Naranjas y Cítricos:* en una **caja de madera sobre césped verde 🍊🌱** (valles fértiles).
       - *Sábila y Melón:* en una **vasija de arcilla sobre arena caliente del desierto 🌵🏺** (zona árida y xerófila).
       - *Yuca y Frutos selváticos:* en un **tejido indígena warao sobre palmas de moriche 🌴🧺** (selva amazónica).
     - 🐟 **Pesca:** Productos en sus ambientes acuáticos (redes de alta mar 🌊, cubetas heladas de río de montaña 🏔️🧊, nasas lacustres de madera 🪵, canoas fluviales del Orinoco 🛶, neveras de muelle ⛵🧊).
     - 🐄 **Ganadería:** Especies en sus entornos pecuarios (corrales de trancas con lazo de cuero 🪵, cántaras plateadas de leche con heno 🥛, corrales de piedra con cardones 🌵, bañaderos de lodo para búfalos 🐃💧, establos de piedra en laderas andinas 🏔️).
   - 🎯 **Zona de Confirmación:** Arrastras el producto correcto con el ratón o dedo (o haces clic sobre él) y lo sueltas en la **Zona de Confirmación**. Si es el correcto para ese estado, se acopla con fanfarria y sonido de éxito; si te equivocas, rebota de vuelta y te da una pista para reintentar.

## 🔍 Modo Exploración Libre
También incluye un selector para explorar libremente el mapa:
- Puedes hacer clic en cualquiera de los 23 estados, Distrito Capital y la Guayana Esequiba.
- Visualiza instantáneamente su capital, su región geográfica y su actividad económica destacada con un mapa clasificado por colores temáticos.

## 🚀 Cómo Ejecutar la Aplicación

Puedes abrir la aplicación de dos maneras muy sencillas:

### Opción 1: Directamente en tu navegador
Haz doble clic sobre el archivo `index.html` o ábrelo directamente con Chrome, Edge o Firefox.

### Opción 2: Con servidor local Node.js
Ejecuta en tu terminal:
```bash
node server.js
```
Luego abre tu navegador en: [http://localhost:3000](http://localhost:3000)

## 🛠️ Tecnologías Utilizadas
- **HTML5 & CSS3:** Diseño responsivo con temas oscuros, estética venezolana y efectos glassmorphism.
- **SVG Vectorial Preciso:** Geometría de los estados de Venezuela proyectada a escala equirrectangular a partir de datos geográficos oficiales.
- **Web Audio API:** Efectos de sonido sintetizados en tiempo real (éxito, error, click y fanfarria) sin necesidad de descargar archivos de audio externos.
- **Canvas Confetti:** Animación festiva al completar preguntas y rachas.

