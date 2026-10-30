/**
 * Quiz y Mapa Interactivo de Venezuela
 * Maneja la interacción SVG, flujo de cuestionario (ubicación -> capital -> actividad económica),
 * sonidos sintetizados con Web Audio API y modo exploración libre.
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. ESTADO DE LA APLICACIÓN
    // =========================================================================
    const state = {
        mode: 'quiz', // 'quiz' | 'explore'
        soundEnabled: true,
        showLabels: true,

        // Cuestionario
        quizLength: 10,
        currentRoundIndex: 0,
        questionsQueue: [],
        currentState: null,
        currentStep: 1, // 1: Ubicación en Mapa | 2: Capital | 3: Actividad Económica
        mapAttempts: 0,
        capitalAttempts: 0,
        economyAttempts: 0,

        // Puntuaciones
        score: 0,
        streak: 0,
        bestStreak: 0,
        totalCorrectSteps: 0,
        totalStepsAttempted: 0,

        // Transformaciones del Mapa (Pan & Zoom)
        zoom: 1,
        panX: 0,
        panY: 0,
        isDragging: false,
        startX: 0,
        startY: 0
    };

    // =========================================================================
    // 2. REFERENCIAS AL DOM
    // =========================================================================
    const DOM = {
        // SVG
        svg: document.getElementById('venezuela-svg'),
        panContainer: document.getElementById('svg-pan-container'),
        statesGroup: document.getElementById('states-group'),
        labelsGroup: document.getElementById('labels-group'),
        pinsGroup: document.getElementById('pins-group'),
        mapToast: document.getElementById('map-toast'),
        toastText: document.getElementById('toast-text'),
        tooltip: document.getElementById('map-tooltip'),

        // Controles de cabecera
        btnModeQuiz: document.getElementById('btn-mode-quiz'),
        btnModeExplore: document.getElementById('btn-mode-explore'),
        btnSound: document.getElementById('btn-sound'),
        soundIcon: document.getElementById('sound-icon'),
        btnToggleLabels: document.getElementById('btn-toggle-labels'),
        btnInfo: document.getElementById('btn-info'),
        infoModal: document.getElementById('info-modal'),
        btnCloseModal: document.getElementById('btn-close-modal'),

        // Barra de estado
        statusBar: document.getElementById('quiz-status-bar'),
        statProgress: document.getElementById('stat-progress'),
        statScore: document.getElementById('stat-score'),
        statStreak: document.getElementById('stat-streak'),
        statAccuracy: document.getElementById('stat-accuracy'),

        // Zoom
        btnZoomIn: document.getElementById('btn-zoom-in'),
        btnZoomOut: document.getElementById('btn-zoom-out'),
        btnZoomReset: document.getElementById('btn-zoom-reset'),

        // Tarjetas del Panel
        cardQuizStart: document.getElementById('quiz-start-card'),
        cardQuizActive: document.getElementById('quiz-active-card'),
        cardQuizResults: document.getElementById('quiz-results-card'),
        cardExplore: document.getElementById('explore-card'),

        // Elementos de Cuestionario Inicio
        quizLengthSelect: document.getElementById('quiz-length-select'),
        btnStartQuiz: document.getElementById('btn-start-quiz'),

        // Fases del Cuestionario
        phaseMap: document.getElementById('quiz-phase-map'),
        targetStateName: document.getElementById('target-state-name'),
        targetStateRegion: document.getElementById('target-state-region'),
        mapFeedback: document.getElementById('map-feedback'),

        phaseCapital: document.getElementById('quiz-phase-capital'),
        capitalTargetState: document.getElementById('capital-target-state'),
        capitalOptionsContainer: document.getElementById('capital-options-container'),
        capitalFeedback: document.getElementById('capital-feedback'),

        phaseEconomy: document.getElementById('quiz-phase-economy'),
        economyTargetState: document.getElementById('economy-target-state'),
        productionCategoryTitle: document.getElementById('production-category-title'),
        productionInstruction: document.getElementById('production-instruction'),
        stepPillAgri: document.getElementById('step-pill-agri'),
        stepPillFish: document.getElementById('step-pill-fish'),
        stepPillLive: document.getElementById('step-pill-live'),
        productionItemsGrid: document.getElementById('production-items-grid'),
        dropConfirmZone: document.getElementById('drop-confirm-zone'),
        dropZoneIcon: document.getElementById('drop-zone-icon'),
        dropZoneTitle: document.getElementById('drop-zone-title'),
        dropZoneSub: document.getElementById('drop-zone-sub'),
        productionSummaryBox: document.getElementById('production-summary-box'),
        sumAgriVal: document.getElementById('sum-agri-val'),
        sumFishVal: document.getElementById('sum-fish-val'),
        sumLiveVal: document.getElementById('sum-live-val'),
        sumDetailText: document.getElementById('sum-detail-text'),
        economyFeedback: document.getElementById('economy-feedback'),
        btnNextQuestion: document.getElementById('btn-next-question'),

        // Resultados
        resScore: document.getElementById('res-score'),
        resAccuracy: document.getElementById('res-accuracy'),
        resStreak: document.getElementById('res-streak'),
        resCount: document.getElementById('res-count'),
        resMedal: document.getElementById('results-medal'),
        resRankBadge: document.getElementById('results-rank-badge'),
        btnRestartQuiz: document.getElementById('btn-restart-quiz'),
        btnExploreAfterQuiz: document.getElementById('btn-explore-after-quiz'),

        // Modo Explorar
        exploreEmptyPrompt: document.getElementById('explore-empty-prompt'),
        exploreDetails: document.getElementById('explore-details'),
        expIcon: document.getElementById('exp-icon'),
        expName: document.getElementById('exp-name'),
        expRegion: document.getElementById('exp-region'),
        expCapital: document.getElementById('exp-capital'),
        expAgri: document.getElementById('exp-agri'),
        expFish: document.getElementById('exp-fish'),
        expLive: document.getElementById('exp-live'),
        expDetail: document.getElementById('exp-detail'),
        btnQuizThisState: document.getElementById('btn-quiz-this-state'),

        // Confeti Canvas
        confettiCanvas: document.getElementById('confetti-canvas')
    };

    // =========================================================================
    // 3. SISTEMA DE AUDIO (Web Audio API)
    // =========================================================================
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    const soundEffects = {
        click: function () {
            if (!state.soundEnabled) return;
            try {
                const ctx = getAudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } catch (e) { }
        },
        success: function () {
            if (!state.soundEnabled) return;
            try {
                const ctx = getAudioContext();
                const now = ctx.currentTime;
                // Acorde brillante ascendente (Do - Mi - Sol - Do alta)
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                    gain.gain.setValueAtTime(0.12, now + idx * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.07);
                    osc.stop(now + idx * 0.07 + 0.25);
                });
            } catch (e) { }
        },
        error: function () {
            if (!state.soundEnabled) return;
            try {
                const ctx = getAudioContext();
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.2);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.2);
            } catch (e) { }
        },
        fanfare: function () {
            if (!state.soundEnabled) return;
            try {
                const ctx = getAudioContext();
                const notes = [
                    { f: 523.25, t: 0.0, d: 0.15 },
                    { f: 659.25, t: 0.15, d: 0.15 },
                    { f: 783.99, t: 0.30, d: 0.2 },
                    { f: 1046.50, t: 0.50, d: 0.45 }
                ];
                notes.forEach(n => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + n.t);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + n.t);
                    osc.stop(ctx.currentTime + n.t + n.d);
                });
            } catch (e) { }
        }
    };

    // =========================================================================
    // 4. INICIALIZACIÓN DEL MAPA SVG
    // =========================================================================
    const data = window.VENEZUELA_DATA;
    const statesMap = new Map();

    function initMap() {
        if (!data || !data.states) {
            console.error('Datos de mapa no encontrados en window.VENEZUELA_DATA');
            return;
        }

        DOM.statesGroup.innerHTML = '';
        DOM.labelsGroup.innerHTML = '';

        data.states.forEach(st => {
            statesMap.set(st.id, st);

            // 1. Path SVG del Estado
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', st.path);
            pathEl.setAttribute('id', `state-${st.id}`);
            pathEl.setAttribute('data-id', st.id);
            pathEl.classList.add('state-path');
            
            // Asignar color térmico oficial (blanco los fríos -> naranja los cálidos)
            const color = st.tempColor || '#f97316';
            pathEl.style.fill = color;
            pathEl.setAttribute('fill', color);
            pathEl.setAttribute('data-temp', st.temp || '');
            pathEl.setAttribute('data-zone', st.zone || '');

            if (st.isTerritory) {
                pathEl.classList.add('territory');
            }
            DOM.statesGroup.appendChild(pathEl);

            // 2. Etiqueta de Texto (Centroid)
            const [cx, cy] = st.centroid;
            const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textEl.setAttribute('x', cx);
            textEl.setAttribute('y', cy);
            textEl.setAttribute('id', `label-${st.id}`);
            textEl.classList.add('state-label');
            textEl.textContent = st.name;
            DOM.labelsGroup.appendChild(textEl);

            // Eventos del Estado
            pathEl.addEventListener('mouseenter', (e) => onStateHover(e, st));
            pathEl.addEventListener('mousemove', (e) => onStateMouseMove(e));
            pathEl.addEventListener('mouseleave', () => onStateLeave());
            pathEl.addEventListener('click', () => onStateClick(st));
        });

        setupPanAndZoom();
    }

    // =========================================================================
    // 5. EVENTOS DEL MOUSE Y TOOLTIP
    // =========================================================================
    function onStateHover(e, st) {
        const zoneBadge = st.zone ? `<span style="color:#f59e0b;font-weight:700;">${st.zone}</span>` : '';
        const tempText = st.tempLabel ? `🌡️ ${st.tempLabel}` : (st.temp ? `🌡️ ${st.temp}°C` : '');

        if (state.mode === 'explore') {
            DOM.tooltip.innerHTML = `<strong>${st.icon || '📍'} ${st.name}</strong> • ${zoneBadge} • ${tempText}<br><small>Capital: ${st.capital}</small>`;
            DOM.tooltip.classList.add('show');
        } else if (state.mode === 'quiz') {
            if (state.currentStep === 1) {
                // Pista climática y de zona sin revelar el nombre del estado en el paso de ubicación
                DOM.tooltip.innerHTML = `🧭 ${zoneBadge} • ${tempText} • Toca para seleccionar`;
            } else {
                DOM.tooltip.innerHTML = `<strong>${st.name}</strong> • ${zoneBadge} • ${tempText}`;
            }
            DOM.tooltip.classList.add('show');
        }
    }

    function onStateMouseMove(e) {
        DOM.tooltip.style.left = `${e.clientX}px`;
        DOM.tooltip.style.top = `${e.clientY}px`;
    }

    function onStateLeave() {
        DOM.tooltip.classList.remove('show');
    }

    function showToast(message, type = 'info', duration = 2500) {
        DOM.toastText.textContent = message;
        DOM.mapToast.className = `map-toast show ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;

        clearTimeout(DOM.mapToast._timeout);
        DOM.mapToast._timeout = setTimeout(() => {
            DOM.mapToast.classList.remove('show');
        }, duration);
    }

    // =========================================================================
    // 6. PAN & ZOOM DEL MAPA
    // =========================================================================
    function setupPanAndZoom() {
        function updateTransform() {
            DOM.svg.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
        }

        DOM.btnZoomIn.addEventListener('click', () => {
            soundEffects.click();
            state.zoom = Math.min(state.zoom + 0.25, 3.5);
            updateTransform();
        });

        DOM.btnZoomOut.addEventListener('click', () => {
            soundEffects.click();
            state.zoom = Math.max(state.zoom - 0.25, 0.8);
            updateTransform();
        });

        DOM.btnZoomReset.addEventListener('click', () => {
            soundEffects.click();
            state.zoom = 1;
            state.panX = 0;
            state.panY = 0;
            updateTransform();
        });

        // Arrastre con ratón (Pan)
        DOM.panContainer.addEventListener('mousedown', (e) => {
            if (e.target.tagName.toLowerCase() === 'path') {
                // Permitir clic pero permitir también arrastrar si se mueve
            }
            state.isDragging = true;
            state.startX = e.clientX - state.panX;
            state.startY = e.clientY - state.panY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!state.isDragging) return;
            state.panX = e.clientX - state.startX;
            state.panY = e.clientY - state.startY;
            updateTransform();
        });

        window.addEventListener('mouseup', () => {
            state.isDragging = false;
        });

        // Rueda del ratón para Zoom
        DOM.panContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.15 : -0.15;
            state.zoom = Math.min(Math.max(state.zoom + delta, 0.8), 3.5);
            updateTransform();
        }, { passive: false });
    }

    function highlightState(stateId, className = 'state-selected', clearOthers = true) {
        if (clearOthers) {
            document.querySelectorAll('.state-path').forEach(el => {
                el.classList.remove('state-selected', 'state-correct', 'state-wrong');
            });
        }
        const el = document.getElementById(`state-${stateId}`);
        if (el) {
            el.classList.add(className);
        }
    }

    // =========================================================================
    // 7. FLUJO DEL CUESTIONARIO (3 PASOS)
    // =========================================================================

    // Iniciar Cuestionario
    function startQuiz() {
        soundEffects.click();
        state.mode = 'quiz';
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.totalCorrectSteps = 0;
        state.totalStepsAttempted = 0;
        state.currentRoundIndex = 0;

        state.quizLength = parseInt(DOM.quizLengthSelect.value, 10) || 10;

        // En modo cuestionario ocultamos las etiquetas por defecto para mayor reto
        state.showLabels = false;
        document.querySelectorAll('.state-label').forEach(el => el.classList.add('hidden'));

        // Obtener estados elegibles (excluir Guayana Esequiba de preguntas con capital oficial)
        const playableStates = data.states.filter(s => !s.isTerritory);

        // Mezclar aleatoriamente (Fisher-Yates)
        const shuffled = [...playableStates];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        state.questionsQueue = shuffled.slice(0, state.quizLength);

        // Cambiar vista a tarjeta activa
        DOM.cardQuizStart.style.display = 'none';
        DOM.cardQuizResults.style.display = 'none';
        DOM.cardExplore.style.display = 'none';
        DOM.cardQuizActive.style.display = 'flex';
        DOM.statusBar.style.display = 'grid';

        loadQuestion(0);
    }

    // Cargar Pregunta para el Estado Actual
    function loadQuestion(roundIndex) {
        state.currentRoundIndex = roundIndex;
        state.currentState = state.questionsQueue[roundIndex];
        state.currentStep = 1;
        state.mapAttempts = 0;
        state.capitalAttempts = 0;
        state.economyAttempts = 0;

        updateStatusBar();

        // Limpiar estilos en el mapa
        document.querySelectorAll('.state-path').forEach(p => {
            p.classList.remove('state-selected', 'state-correct', 'state-wrong');
        });

        // PASO 1: Ubicación en el Mapa
        DOM.phaseMap.style.display = 'flex';
        DOM.phaseCapital.style.display = 'none';
        DOM.phaseEconomy.style.display = 'none';
        DOM.btnNextQuestion.style.display = 'none';

        DOM.targetStateName.textContent = state.currentState.name;
        DOM.targetStateRegion.textContent = `🧭 ${state.currentState.zone} • ${state.currentState.region || 'Venezuela'} • 🌡️ ${state.currentState.tempLabel || state.currentState.temp + '°C'}`;
        DOM.mapFeedback.innerHTML = '';

        showToast(`¿Dónde está ${state.currentState.name}? (${state.currentState.zone}) - Haz clic en el mapa`, 'info', 3000);
    }

    // Clic en el Mapa (Evaluación del Paso 1)
    function onStateClick(clickedState) {
        soundEffects.click();

        // En modo Explorar:
        if (state.mode === 'explore') {
            displayExploreState(clickedState);
            highlightState(clickedState.id, 'state-selected', true);
            return;
        }

        // En modo Cuestionario: solo interactúa durante el Paso 1
        if (state.mode === 'quiz' && state.currentStep === 1) {
            state.mapAttempts++;
            state.totalStepsAttempted++;

            const target = state.currentState;
            const clickedPath = document.getElementById(`state-${clickedState.id}`);

            if (clickedState.id === target.id) {
                // ¡Acierto de mapa!
                soundEffects.success();
                clickedPath.classList.remove('state-wrong');
                clickedPath.classList.add('state-correct');

                // Mostrar su etiqueta en el mapa al acertar
                const lbl = document.getElementById(`label-${target.id}`);
                if (lbl) lbl.classList.remove('hidden');

                // Puntuación
                const points = state.mapAttempts === 1 ? 100 : Math.max(30, 100 - state.mapAttempts * 20);
                state.score += points;
                state.streak++;
                if (state.streak > state.bestStreak) state.bestStreak = state.streak;
                state.totalCorrectSteps++;

                updateStatusBar();

                showToast(`¡Excelente! Has encontrado ${target.name}`, 'success', 2200);

                DOM.mapFeedback.innerHTML = `
                    <div class="feedback-msg feedback-correct">
                        ✓ ¡Correcto! Has ubicado <strong>${target.name}</strong> (${target.zone}) (+${points} pts).
                    </div>
                `;

                // Avanzar al Paso 2 tras una breve pausa
                setTimeout(() => {
                    initStep2Capital();
                }, 900);

            } else {
                // Error de mapa
                soundEffects.error();
                state.streak = 0;
                updateStatusBar();

                clickedPath.classList.add('state-wrong');
                setTimeout(() => {
                    clickedPath.classList.remove('state-wrong');
                }, 600);

                const clickedName = clickedState.name;
                showToast(`Ese es ${clickedName} (${clickedState.zone}). ¡Busca ${target.name}!`, 'error', 2500);

                DOM.mapFeedback.innerHTML = `
                    <div class="feedback-msg feedback-wrong">
                        ✗ Ese es el estado <strong>${clickedName}</strong> (${clickedState.zone}). Busca <strong>${target.name}</strong> (${target.zone}).
                    </div>
                `;
            }
        }
    }

    // PASO 2: ¿Cuál es la Capital?
    function initStep2Capital() {
        state.currentStep = 2;
        state.capitalAttempts = 0;

        DOM.phaseMap.style.display = 'none';
        DOM.phaseCapital.style.display = 'flex';
        DOM.phaseEconomy.style.display = 'none';

        const target = state.currentState;
        DOM.capitalTargetState.textContent = target.name;
        DOM.capitalFeedback.innerHTML = '';
        DOM.capitalOptionsContainer.innerHTML = '';

        // Generar 4 opciones: 1 correcta + 3 distractoras de otros estados
        const correctCapital = target.capital;
        const otherCapitals = data.allCapitals.filter(c => c !== correctCapital && c !== 'Zona en Reclamación');

        // Barajar distractores
        const shuffledDistractors = [...otherCapitals].sort(() => Math.random() - 0.5);
        const selectedOptions = [correctCapital, ...shuffledDistractors.slice(0, 3)];
        // Barajar el conjunto de las 4 opciones
        selectedOptions.sort(() => Math.random() - 0.5);

        selectedOptions.forEach(cap => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = cap;
            btn.addEventListener('click', () => handleCapitalAnswer(cap, correctCapital, btn));
            DOM.capitalOptionsContainer.appendChild(btn);
        });
    }

    function handleCapitalAnswer(chosenCapital, correctCapital, clickedBtn) {
        soundEffects.click();
        state.capitalAttempts++;
        state.totalStepsAttempted++;

        // Deshabilitar todos los botones para evitar multi-clic
        const allBtns = DOM.capitalOptionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.disabled = true);

        if (chosenCapital === correctCapital) {
            // Acierto de capital
            soundEffects.success();
            clickedBtn.classList.add('opt-correct');

            const points = state.capitalAttempts === 1 ? 75 : 30;
            state.score += points;
            state.streak++;
            if (state.streak > state.bestStreak) state.bestStreak = state.streak;
            state.totalCorrectSteps++;

            updateStatusBar();

            DOM.capitalFeedback.innerHTML = `
                <div class="feedback-msg feedback-correct">
                    ✓ ¡Correcto! La capital de <strong>${state.currentState.name}</strong> es <strong>${correctCapital}</strong> (+${points} pts).
                </div>
            `;

            // Avanzar al Paso 3
            setTimeout(() => {
                initStep3Economy();
            }, 1000);

        } else {
            // Error de capital
            soundEffects.error();
            state.streak = 0;
            updateStatusBar();

            clickedBtn.classList.add('opt-wrong');
            // Revelar la correcta
            allBtns.forEach(b => {
                if (b.textContent === correctCapital) {
                    b.classList.add('opt-correct');
                }
            });

            DOM.capitalFeedback.innerHTML = `
                <div class="feedback-msg feedback-wrong">
                    ✗ Incorrecto. La capital oficial de <strong>${state.currentState.name}</strong> es <strong>${correctCapital}</strong>.
                </div>
            `;

            // Avanzar al Paso 3 para continuar el aprendizaje
            setTimeout(() => {
                initStep3Economy();
            }, 1600);
        }
    }

    // =========================================================================
    // PASO 3: PRODUCCIÓN DINÁMICA (6 OPCIONES EN CESTAS/AMBIENTES + DROP ZONE)
    // =========================================================================
    const PRODUCTION_CATEGORIES = [
        {
            catKey: 'agri',
            stateKey: 'agriKey',
            title: 'Agricultura',
            icon: '🌾',
            instruction: 'Arrastra el cultivo en su ambiente característico hacia la Zona de Confirmación:'
        },
        {
            catKey: 'fish',
            stateKey: 'fishKey',
            title: 'Pesca',
            icon: '🐟',
            instruction: 'Arrastra el tipo de pesca en su ambiente característico hacia la Zona de Confirmación:'
        },
        {
            catKey: 'live',
            stateKey: 'liveKey',
            title: 'Ganadería',
            icon: '🐄',
            instruction: 'Arrastra la cría ganadera en su ambiente característico hacia la Zona de Confirmación:'
        }
    ];

    function initStep3Economy() {
        state.currentStep = 3;
        state.productionIndex = 0;
        state.economyAttempts = 0;

        DOM.phaseMap.style.display = 'none';
        DOM.phaseCapital.style.display = 'none';
        DOM.phaseEconomy.style.display = 'flex';

        DOM.economyFeedback.innerHTML = '';
        DOM.productionSummaryBox.style.display = 'none';
        DOM.btnNextQuestion.style.display = 'none';

        loadProductionSubStep(0);
    }

    function getCartoonContainerSvg(containerType) {
        if (window.CARTOON_ASSETS && window.CARTOON_ASSETS.containers && window.CARTOON_ASSETS.containers[containerType]) {
            return window.CARTOON_ASSETS.containers[containerType];
        }
        return '';
    }

    function getCartoonItemSvg(itemType) {
        if (window.CARTOON_ASSETS && window.CARTOON_ASSETS.items && window.CARTOON_ASSETS.items[itemType]) {
            return window.CARTOON_ASSETS.items[itemType];
        }
        return '';
    }

    function renderCartoonCombo(containerType, itemType, size = 'sm') {
        const cSvg = getCartoonContainerSvg(containerType);
        const iSvg = getCartoonItemSvg(itemType);
        return `
            <div class="cartoon-combo-thumb size-${size}">
                <div class="combo-container">${cSvg}</div>
                <div class="combo-item">${iSvg}</div>
            </div>
        `;
    }

    function loadProductionSubStep(subIndex) {
        state.productionIndex = subIndex;
        const target = state.currentState;
        const catConfig = PRODUCTION_CATEGORIES[subIndex];

        // Actualizar Stepper Pills
        DOM.stepPillAgri.className = 'prod-pill ' + (subIndex === 0 ? 'active' : subIndex > 0 ? 'completed' : '');
        DOM.stepPillFish.className = 'prod-pill ' + (subIndex === 1 ? 'active' : subIndex > 1 ? 'completed' : '');
        DOM.stepPillLive.className = 'prod-pill ' + (subIndex === 2 ? 'active' : '');

        DOM.economyTargetState.textContent = target.name;
        DOM.productionCategoryTitle.textContent = `${catConfig.icon} ${catConfig.title}`;
        DOM.productionInstruction.textContent = catConfig.instruction;
        DOM.economyFeedback.innerHTML = '';
        DOM.productionItemsGrid.innerHTML = '';
        DOM.productionItemsGrid.style.display = 'grid';
        DOM.dropConfirmZone.style.display = 'flex';

        // Restablecer estado de la Zona de Confirmación
        DOM.dropConfirmZone.className = 'drop-confirm-zone';
        DOM.dropConfirmZone.innerHTML = `
            <div class="drop-zone-content">
                <div class="drop-zone-icon">🎯</div>
                <div class="drop-zone-text">
                    <strong>Zona de Confirmación</strong>
                    <span>Arrastra aquí el producto de ${target.name} o haz clic sobre él</span>
                </div>
            </div>
        `;

        const catalog = data.catalogs[catConfig.catKey];
        const correctItemKey = target[catConfig.stateKey];
        const correctItem = catalog[correctItemKey];

        // Obtener 5 distractores de los otros productos del mismo catálogo
        const otherKeys = Object.keys(catalog).filter(k => k !== correctItemKey);
        const shuffledOther = [...otherKeys].sort(() => Math.random() - 0.5);
        const selectedKeys = [correctItemKey, ...shuffledOther.slice(0, 5)];
        // Barajar las 6 opciones
        selectedKeys.sort(() => Math.random() - 0.5);

        // Crear las 6 opciones cartoon (La cesta se queda fija, solo la fruta/pez/animal se arrastra)
        selectedKeys.forEach(itemKey => {
            const item = catalog[itemKey];
            const containerSvg = getCartoonContainerSvg(item.containerType);
            const itemSvg = getCartoonItemSvg(item.itemType);

            const slot = document.createElement('div');
            slot.className = 'cartoon-option-slot';
            slot.setAttribute('data-id', item.id);
            slot.setAttribute('title', `${item.name} (${item.container} • ${item.climate})`);

            slot.innerHTML = `
                <div class="cartoon-nest">
                    <div class="cartoon-container-base">
                        ${containerSvg}
                    </div>
                    <div class="cartoon-draggable-item" data-id="${item.id}" title="Arrastra ${item.name}">
                        ${itemSvg}
                    </div>
                </div>
                <div class="cartoon-label-box">
                    <span class="cartoon-label-name">${item.name}</span>
                    <span class="cartoon-label-container">${item.container}</span>
                </div>
            `;

            const itemEl = slot.querySelector('.cartoon-draggable-item');

            // ARRASTRE FLUIDO (SOLO EL ELEMENTO SE DESPRENDE Y VUELA, LA CESTA PERMANECE EN SU LUGAR)
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let proxyEl = null;

            function onPointerDown(e) {
                if (e.button !== undefined && e.button !== 0) return;

                startX = e.clientX;
                startY = e.clientY;
                isDragging = false;

                function onPointerMove(moveEvent) {
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;

                    if (!isDragging && Math.hypot(dx, dy) > 6) {
                        isDragging = true;
                        state.draggedItemId = item.id;
                        itemEl.classList.add('is-ghost-hidden');

                        // Clon flotante que sigue el dedo o cursor
                        proxyEl = document.createElement('div');
                        proxyEl.className = 'cartoon-flying-proxy';
                        proxyEl.innerHTML = itemSvg;
                        proxyEl.style.left = `${moveEvent.clientX}px`;
                        proxyEl.style.top = `${moveEvent.clientY}px`;
                        document.body.appendChild(proxyEl);
                    }

                    if (isDragging && proxyEl) {
                        proxyEl.style.left = `${moveEvent.clientX}px`;
                        proxyEl.style.top = `${moveEvent.clientY}px`;

                        const dropRect = DOM.dropConfirmZone.getBoundingClientRect();
                        if (moveEvent.clientX >= dropRect.left && moveEvent.clientX <= dropRect.right &&
                            moveEvent.clientY >= dropRect.top && moveEvent.clientY <= dropRect.bottom) {
                            DOM.dropConfirmZone.classList.add('drag-over');
                        } else {
                            DOM.dropConfirmZone.classList.remove('drag-over');
                        }
                    }
                }

                function onPointerUp(upEvent) {
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('pointercancel', onPointerUp);
                    DOM.dropConfirmZone.classList.remove('drag-over');

                    if (isDragging && proxyEl) {
                        const dropRect = DOM.dropConfirmZone.getBoundingClientRect();
                        const isOverDrop = (
                            upEvent.clientX >= dropRect.left && upEvent.clientX <= dropRect.right &&
                            upEvent.clientY >= dropRect.top && upEvent.clientY <= dropRect.bottom
                        );

                        if (isOverDrop) {
                            if (proxyEl.parentNode) proxyEl.parentNode.removeChild(proxyEl);
                            proxyEl = null;
                            itemEl.classList.remove('is-ghost-hidden');
                            handleConfirmItem(item.id, correctItemKey, subIndex, catalog);
                        } else {
                            // Efecto elástico de regreso a su cesta
                            const origRect = itemEl.getBoundingClientRect();
                            proxyEl.style.transition = 'all 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            proxyEl.style.left = `${origRect.left + origRect.width / 2}px`;
                            proxyEl.style.top = `${origRect.top + origRect.height / 2}px`;
                            proxyEl.style.transform = 'translate(-50%, -50%) scale(0.9)';
                            proxyEl.style.opacity = '0.7';

                            setTimeout(() => {
                                if (proxyEl && proxyEl.parentNode) proxyEl.parentNode.removeChild(proxyEl);
                                proxyEl = null;
                                itemEl.classList.remove('is-ghost-hidden');
                            }, 280);
                        }
                    } else if (!isDragging) {
                        // Clic o toque directo sin arrastre
                        handleConfirmItem(item.id, correctItemKey, subIndex, catalog);
                    }
                }

                window.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);
            }

            itemEl.addEventListener('pointerdown', onPointerDown);

            // Clic directo en cualquier parte de la tarjeta
            slot.addEventListener('click', (e) => {
                if (e.target.closest('.cartoon-draggable-item')) return;
                handleConfirmItem(item.id, correctItemKey, subIndex, catalog);
            });

            DOM.productionItemsGrid.appendChild(slot);
        });

        // Eventos de la Zona de Confirmación (HTML5 Drop de respaldo)
        DOM.dropConfirmZone.ondragover = (e) => {
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
            DOM.dropConfirmZone.classList.add('drag-over');
        };

        DOM.dropConfirmZone.ondragleave = () => {
            DOM.dropConfirmZone.classList.remove('drag-over');
        };

        DOM.dropConfirmZone.ondrop = (e) => {
            e.preventDefault();
            DOM.dropConfirmZone.classList.remove('drag-over');
            const droppedId = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || state.draggedItemId;
            if (droppedId) {
                handleConfirmItem(droppedId, correctItemKey, subIndex, catalog);
            }
        };
    }

    function handleConfirmItem(selectedId, correctId, subIndex, catalog) {
        soundEffects.click();
        const correctItem = catalog[correctId];
        const selectedItem = catalog[selectedId];
        const target = state.currentState;
        const catConfig = PRODUCTION_CATEGORIES[subIndex];
        state.totalStepsAttempted++;

        // Deshabilitar temporalmente interacción para evitar dobles clics
        const allSlots = DOM.productionItemsGrid.querySelectorAll('.cartoon-option-slot');
        allSlots.forEach(c => c.style.pointerEvents = 'none');

        if (selectedId === correctId) {
            // ¡Acierto!
            soundEffects.success();
            triggerConfettiSmall();

            DOM.dropConfirmZone.className = 'drop-confirm-zone drop-success';
            DOM.dropConfirmZone.innerHTML = `
                <div class="drop-confirmed-wrapper">
                    ${renderCartoonCombo(correctItem.containerType, correctItem.itemType, 'md')}
                    <div class="drop-zone-text">
                        <strong style="color:#2ed573; font-size:0.95rem;">✓ ¡Correcto! ${correctItem.name}</strong>
                        <span>${correctItem.container} • ${correctItem.climate}</span>
                    </div>
                </div>
            `;

            const points = 45;
            state.score += points;
            state.streak++;
            if (state.streak > state.bestStreak) state.bestStreak = state.streak;
            state.totalCorrectSteps++;
            updateStatusBar();
            DOM.economyFeedback.innerHTML = '';

            setTimeout(() => {
                if (subIndex < 2) {
                    loadProductionSubStep(subIndex + 1);
                } else {
                    finishStateProductions();
                }
            }, 1100);

        } else {
            // Error
            soundEffects.error();
            state.streak = 0;
            updateStatusBar();

            DOM.dropConfirmZone.className = 'drop-confirm-zone drop-error';
            DOM.dropConfirmZone.innerHTML = `
                <div class="drop-confirmed-wrapper">
                    ${renderCartoonCombo(selectedItem.containerType, selectedItem.itemType, 'md')}
                    <div class="drop-zone-text">
                        <strong style="color:#ff6b6b; font-size:0.95rem;">✗ ${selectedItem.name} no es de ${target.name}</strong>
                        <span>Intenta con otra opción</span>
                    </div>
                </div>
            `;
            DOM.economyFeedback.innerHTML = '';

            setTimeout(() => {
                allSlots.forEach(c => c.style.pointerEvents = 'auto');
                DOM.dropConfirmZone.className = 'drop-confirm-zone';
                DOM.dropConfirmZone.innerHTML = `
                    <div class="drop-zone-content">
                        <div class="drop-zone-icon">🎯</div>
                        <div class="drop-zone-text">
                            <strong>Zona de Confirmación</strong>
                            <span>Arrastra aquí el producto correcto de ${target.name}</span>
                        </div>
                    </div>
                `;
            }, 1300);
        }
    }

    function finishStateProductions() {
        const target = state.currentState;
        DOM.stepPillAgri.className = 'prod-pill completed';
        DOM.stepPillFish.className = 'prod-pill completed';
        DOM.stepPillLive.className = 'prod-pill completed';

        DOM.productionItemsGrid.style.display = 'none';
        DOM.dropConfirmZone.style.display = 'none';
        DOM.economyFeedback.innerHTML = '';

        const agriObj = data.catalogs.agri[target.agriKey] || {};
        const fishObj = data.catalogs.fish[target.fishKey] || {};
        const liveObj = data.catalogs.live[target.liveKey] || {};

        DOM.sumAgriVal.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;">
                ${renderCartoonCombo(agriObj.containerType, agriObj.itemType, 'sm')}
                <div><strong>${agriObj.name}</strong><br><span style="font-size:0.75rem;opacity:0.8;">${agriObj.container}</span></div>
            </div>
        `;
        DOM.sumFishVal.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;">
                ${renderCartoonCombo(fishObj.containerType, fishObj.itemType, 'sm')}
                <div><strong>${fishObj.name}</strong><br><span style="font-size:0.75rem;opacity:0.8;">${fishObj.container}</span></div>
            </div>
        `;
        DOM.sumLiveVal.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;">
                ${renderCartoonCombo(liveObj.containerType, liveObj.itemType, 'sm')}
                <div><strong>${liveObj.name}</strong><br><span style="font-size:0.75rem;opacity:0.8;">${liveObj.container}</span></div>
            </div>
        `;
        DOM.sumDetailText.textContent = target.detail;

        DOM.productionSummaryBox.style.display = 'flex';
        DOM.btnNextQuestion.style.display = 'flex';
        DOM.btnNextQuestion.focus();
        triggerConfettiGrand();
    }

    // Avanzar al Siguiente Estado o Finalizar
    DOM.btnNextQuestion.addEventListener('click', () => {
        soundEffects.click();
        const nextIndex = state.currentRoundIndex + 1;
        if (nextIndex < state.questionsQueue.length) {
            loadQuestion(nextIndex);
        } else {
            showQuizResults();
        }
    });

    // =========================================================================
    // 8. FINALIZACIÓN Y RESULTADOS
    // =========================================================================
    function showQuizResults() {
        soundEffects.fanfare();
        triggerConfettiGrand();

        DOM.cardQuizActive.style.display = 'none';
        DOM.cardQuizResults.style.display = 'flex';

        const totalSteps = state.totalStepsAttempted || 1;
        const accuracy = Math.round((state.totalCorrectSteps / totalSteps) * 100);

        DOM.resScore.textContent = state.score;
        DOM.resAccuracy.textContent = `${accuracy}%`;
        DOM.resStreak.textContent = `🔥 ${state.bestStreak}`;
        DOM.resCount.textContent = state.questionsQueue.length;

        // Medalla y Título honorífico
        if (accuracy >= 85) {
            DOM.resMedal.textContent = '🥇';
            DOM.resRankBadge.textContent = '¡Maestro Supremo de la Geografía Venezolana!';
            DOM.resRankBadge.style.borderColor = '#f5b000';
            DOM.resRankBadge.style.color = '#f5b000';
        } else if (accuracy >= 65) {
            DOM.resMedal.textContent = '🥈';
            DOM.resRankBadge.textContent = '¡Gran Conocedor del Territorio Nacional!';
            DOM.resRankBadge.style.borderColor = '#00a8ff';
            DOM.resRankBadge.style.color = '#00a8ff';
        } else {
            DOM.resMedal.textContent = '🥉';
            DOM.resRankBadge.textContent = '¡Explorador en Formación! ¡Sigue Practicando!';
            DOM.resRankBadge.style.borderColor = '#2ecc71';
            DOM.resRankBadge.style.color = '#2ecc71';
        }
    }

    function updateStatusBar() {
        const current = state.currentRoundIndex + 1;
        const total = state.questionsQueue.length || state.quizLength;
        DOM.statProgress.textContent = `${current} / ${total}`;
        DOM.statScore.textContent = state.score;
        DOM.statStreak.textContent = `🔥 ${state.streak}`;

        const totalAttempts = state.totalStepsAttempted;
        if (totalAttempts > 0) {
            const acc = Math.round((state.totalCorrectSteps / totalAttempts) * 100);
            DOM.statAccuracy.textContent = `${acc}%`;
        } else {
            DOM.statAccuracy.textContent = `100%`;
        }
    }

    // =========================================================================
    // 9. MODO EXPLORACIÓN LIBRE
    // =========================================================================
    function switchToExploreMode() {
        soundEffects.click();
        state.mode = 'explore';
        DOM.btnModeExplore.classList.add('active');
        DOM.btnModeQuiz.classList.remove('active');

        // En modo exploración mostramos las etiquetas
        state.showLabels = true;
        document.querySelectorAll('.state-label').forEach(el => el.classList.remove('hidden'));

        DOM.cardQuizStart.style.display = 'none';
        DOM.cardQuizActive.style.display = 'none';
        DOM.cardQuizResults.style.display = 'none';
        DOM.cardExplore.style.display = 'flex';
        DOM.statusBar.style.display = 'none';

        // Mantener el mapa térmico visible en modo exploración
        document.querySelectorAll('.state-path').forEach(p => {
            p.classList.remove('state-correct', 'state-wrong', 'state-selected', 'eco-agri', 'eco-fish', 'eco-live');
        });

        showToast('Modo Exploración: Toca cualquier estado para ver su temperatura y producción', 'info', 3000);
    }

    function switchToQuizMode() {
        soundEffects.click();
        state.mode = 'quiz';
        DOM.btnModeQuiz.classList.add('active');
        DOM.btnModeExplore.classList.remove('active');

        // Limpiar colores de economía del mapa
        document.querySelectorAll('.state-path').forEach(p => {
            p.classList.remove('eco-agri', 'eco-fish', 'eco-live', 'state-selected', 'state-correct', 'state-wrong');
        });

        DOM.cardExplore.style.display = 'none';
        DOM.cardQuizResults.style.display = 'none';
        DOM.cardQuizActive.style.display = 'none';
        DOM.cardQuizStart.style.display = 'flex';
        DOM.statusBar.style.display = 'grid';
    }

    function displayExploreState(st) {
        DOM.exploreEmptyPrompt.style.display = 'none';
        DOM.exploreDetails.style.display = 'flex';

        const agriObj = (data.catalogs && data.catalogs.agri && data.catalogs.agri[st.agriKey]) || {};
        const fishObj = (data.catalogs && data.catalogs.fish && data.catalogs.fish[st.fishKey]) || {};
        const liveObj = (data.catalogs && data.catalogs.live && data.catalogs.live[st.liveKey]) || {};

        DOM.expIcon.textContent = st.icon || '📍';
        DOM.expName.textContent = st.name;
        DOM.expRegion.textContent = `🧭 ${st.zone || ''} • ${st.region || 'Venezuela'} • 🌡️ ${st.tempLabel || (st.temp ? st.temp + '°C' : '')}`;
        DOM.expCapital.textContent = st.capital;
        DOM.expAgri.innerHTML = agriObj.name ? `
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                ${renderCartoonCombo(agriObj.containerType, agriObj.itemType, 'sm')}
                <div><strong>${agriObj.name}</strong><br><span style="font-size:0.75rem;opacity:0.8;">${agriObj.container}</span></div>
            </div>
        ` : 'Sin registro';
        DOM.expFish.innerHTML = fishObj.name ? `
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                ${renderCartoonCombo(fishObj.containerType, fishObj.itemType, 'sm')}
                <div><strong>${fishObj.name}</strong><br><span style="font-size:0.75rem;opacity:0.8;">${fishObj.container}</span></div>
            </div>
        ` : 'Sin registro';
        DOM.expLive.innerHTML = liveObj.name ? `
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                ${renderCartoonCombo(liveObj.containerType, liveObj.itemType, 'sm')}
                <div><strong>${liveObj.name}</strong><br><span style="font-size:0.75rem;opacity:0.8;">${liveObj.container}</span></div>
            </div>
        ` : 'Sin registro';
        DOM.expDetail.textContent = st.detail;
    }

    DOM.btnQuizThisState.addEventListener('click', () => {
        switchToQuizMode();
        startQuiz();
    });

    // =========================================================================
    // 10. EFECTOS DE CONFETI EN CANVAS (Liviano & Nativo)
    // =========================================================================
    const canvas = DOM.confettiCanvas;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function triggerConfettiSmall() {
        createConfettiParticles(45);
    }

    function triggerConfettiGrand() {
        createConfettiParticles(180);
    }

    function createConfettiParticles(count) {
        const colors = ['#f5b000', '#0099ff', '#e63946', '#2ecc71', '#ff9f43', '#ffffff'];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
                y: canvas.height * 0.4,
                vx: (Math.random() - 0.5) * 12,
                vy: Math.random() * -12 - 4,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 10,
                alpha: 1
            });
        }
        if (!animationId) {
            updateConfetti();
        }
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // Gravedad
            p.rotation += p.vRot;
            p.alpha -= 0.012;

            if (p.alpha <= 0 || p.y > canvas.height) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        }

        if (particles.length > 0) {
            animationId = requestAnimationFrame(updateConfetti);
        } else {
            animationId = null;
        }
    }

    // =========================================================================
    // 11. EVENT LISTENERS GENERALES
    // =========================================================================
    DOM.btnStartQuiz.addEventListener('click', startQuiz);
    DOM.btnRestartQuiz.addEventListener('click', startQuiz);
    DOM.btnExploreAfterQuiz.addEventListener('click', switchToExploreMode);

    DOM.btnModeQuiz.addEventListener('click', switchToQuizMode);
    DOM.btnModeExplore.addEventListener('click', switchToExploreMode);

    // Sonido On / Off
    DOM.btnSound.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        DOM.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
        if (state.soundEnabled) soundEffects.click();
    });

    // Etiquetas On / Off
    DOM.btnToggleLabels.addEventListener('click', () => {
        soundEffects.click();
        state.showLabels = !state.showLabels;
        document.querySelectorAll('.state-label').forEach(el => {
            if (state.showLabels) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
        showToast(state.showLabels ? 'Nombres de estados visibles' : 'Nombres de estados ocultos', 'info', 1800);
    });

    // Modal de Información
    DOM.btnInfo.addEventListener('click', () => {
        soundEffects.click();
        DOM.infoModal.classList.add('show');
    });
    DOM.btnCloseModal.addEventListener('click', () => {
        soundEffects.click();
        DOM.infoModal.classList.remove('show');
    });
    DOM.infoModal.addEventListener('click', (e) => {
        if (e.target === DOM.infoModal) {
            DOM.infoModal.classList.remove('show');
        }
    });

    // =========================================================================
    // 12. ARRANQUE
    // =========================================================================
    initMap();

})();
