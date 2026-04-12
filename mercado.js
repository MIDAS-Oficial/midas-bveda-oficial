/* =========================================
   SISTEMA DE IDIOMAS MIDAS (11 IDIOMAS)
   ========================================= */

// 1. Diccionario de Textos Principales
const textos = {
    "es": { "nav0": "Inicio", "nav1": "Tasador", "nav2": "Tejidos", "nav3": "Probador", "nav4": "Mercado", "nav5": "Comunidad", "titulo": "LA BÓVEDA DE MIDAS", "sub": "Alta Joyería y Tasación Real", "btn": "TASAR AHORA" },
    "en": { "nav0": "Home", "nav1": "Appraiser", "nav2": "Weaves", "nav3": "Try-on", "nav4": "Market", "nav5": "Community", "titulo": "THE MIDAS VAULT", "sub": "High Jewelry & Real Appraisal", "btn": "APPRAISE NOW" },
    "it": { "nav0": "Inizio", "nav1": "Perito", "nav2": "Tessuti", "nav3": "Prova", "nav4": "Mercato", "nav5": "Comunità", "titulo": "IL CAVEAU DI MIDAS", "sub": "Alta Gioielleria e Valutazione Reale", "btn": "VALUTA ORA" },
    "fr": { "nav0": "Accueil", "nav1": "Expert", "nav2": "Tissus", "nav3": "Essayer", "nav4": "Marché", "nav5": "Communauté", "titulo": "LE COFFRE DE MIDAS", "sub": "Haute Joaillerie", "btn": "ÉVALUER" },
    "pt": { "nav0": "Início", "nav1": "Avaliador", "nav2": "Tecidos", "nav3": "Provador", "nav4": "Mercado", "nav5": "Comunidade", "titulo": "O COFRE DE MIDAS", "sub": "Alta Joalheria", "btn": "AVALIAR AGORA" },
    "de": { "nav0": "Start", "nav1": "Gutachter", "nav2": "Gewebe", "nav3": "Anprobe", "nav4": "Markt", "nav5": "Gemeinschaft", "titulo": "DIE MIDAS-TRESOR", "sub": "Echtschmuck-Bewertung", "btn": "JETZT BEWERTEN" },
    "ru": { "nav0": "Главная", "nav1": "Оценщик", "nav2": "Ткани", "nav3": "Примерка", "nav4": "Рынок", "nav5": "Сообщество", "titulo": "ХРАНИЛИЩЕ МИДАСА", "sub": "Ювелирные изделия", "btn": "ОЦЕНИТЬ" },
    "cn": { "nav0": "首页", "nav1": "评估师", "nav2": "编织", "nav3": "试穿", "nav4": "市场", "nav5": "社区", "titulo": "米达斯金库", "sub": "高级珠宝评估", "btn": "立即评估" },
    "jp": { "nav0": "ホーム", "nav1": "鑑定士", "nav2": "織り", "nav3": "試着", "nav4": "市場", "nav5": "コミュニティ", "titulo": "マイダスの金庫", "sub": "高級ジュエリー鑑定", "btn": "今すぐ査定" },
    "ar": { "nav0": "الرئيسية", "nav1": "المثمن", "nav2": "الأنسجة", "nav3": "التجربة", "nav4": "السوق", "nav5": "المجتمع", "titulo": "خزنة ميداس", "sub": "مجوهرات راقية", "btn": "قيم الآن" },
    "hi": { "nav0": "होम", "nav1": "मूल्यांकनकर्ता", "nav2": "बुनाई", "nav3": "ट्रायल", "nav4": "बाजार", "nav5": "समुदाय", "titulo": "मिडास वॉल्ट", "sub": "उच्च आभूषण मूल्यांकन", "btn": "अभी मूल्यांकन करें" }
};

// 2. Función para abrir/cerrar el menú
function toggleMenuIdioma() {
    const menu = document.getElementById("menu-idiomas");
    if (menu) menu.classList.toggle("show");
}

// 3. Limpieza de la interfaz de Google (Oculta la barra azul)
function limpiarBarraGoogle() {
    const banner = document.querySelector(".goog-te-banner-frame");
    const skiptranslate = document.querySelector(".skiptranslate");
    if (banner) banner.remove();
    if (skiptranslate) skiptranslate.style.display = 'none';
    document.body.style.top = "0px";
}

// 4. Función Maestra de Selección
function seleccionarIdioma(lang) {
    // Cambiar texto en el botón principal
    const btnTexto = document.getElementById('idioma-actual');
    if (btnTexto) btnTexto.innerText = "🌐 " + lang.toUpperCase();

    // Guardar en memoria
    localStorage.setItem('idiomaPreferido', lang);

    // Cambiar textos manuales (Navbar y Hero)
    const t = textos[lang];
    if (t) {
        const navIds = ['nav-inicio', 'nav-tasador', 'nav-tejidos', 'nav-probador', 'nav-mercado', 'nav-comunidad'];
        navIds.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) el.innerText = t[`nav${i}`];
        });
        const tit = document.getElementById('bienvenida-titulo');
        const sub = document.getElementById('bienvenida-sub');
        const btn = document.querySelector('.btn-tasar');
        if (tit) tit.innerText = t.titulo;
        if (sub) sub.innerText = t.sub;
        if (btn) btn.innerText = t.btn;
    }

    // Disparar Google Translate en silencio
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        setTimeout(limpiarBarraGoogle, 500);
    }
    
    toggleMenuIdioma();
}

// 5. Inicialización de Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,it,fr,pt,de,ru,zh-CN,ja,ar,hi',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// 6. Carga inicial REFORZADA para persistencia
window.addEventListener('DOMContentLoaded', () => {
    const langGuardado = localStorage.getItem('idiomaPreferido') || 'es';
    
    // Si el idioma no es español, forzamos la traducción tras un breve delay
    if (langGuardado !== 'es') {
        // Esperamos a que el motor de Google cargue en la nueva sección
        const checkGoogle = setInterval(() => {
            const combo = document.querySelector('.goog-te-combo');
            if (combo) {
                seleccionarIdioma(langGuardado);
                clearInterval(checkGoogle);
            }
        }, 500);

        // Seguridad: Si en 5 segundos no carga, dejamos de intentar
        setTimeout(() => clearInterval(checkGoogle), 5000);
    }

    // Mantener la barra de Google oculta permanentemente
    setInterval(limpiarBarraGoogle, 1000);
});

// 1. VARIABLES GLOBALES DE LA BÓVEDA
window.tiempoRestante = 60; 

// 2. FUNCIÓN PARA CARGAR LA GRÁFICA (TradingView)
function cargarGraficaMidas() {
    if (typeof TradingView !== 'undefined' && document.getElementById('tradingview_midas')) {
        new TradingView.widget({
            "autosize": true,
            "symbol": "OANDA:XAUUSD",
            "interval": "15",
            "timezone": "America/Bogota",
            "theme": "dark",
            "style": "3",
            "locale": "es",
            "toolbar_bg": "#111",
            "enable_publishing": false,
            "hide_top_toolbar": false,
            "save_image": false,
            "container_id": "tradingview_midas"
        });
    }
}

// 3. FUNCIÓN PARA ACTUALIZAR PRECIOS EN VIVO
async function actualizarMidas() {
    try {
        const selector = document.getElementById('selector-moneda');
        const monedaSeleccionada = selector ? selector.value : 'COP';

        // Obtener TRM y Oro
        const [resTRM, resOro] = await Promise.all([
            fetch('https://open.er-api.com/v6/latest/USD'),
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT')
        ]);

        const dataTRM = await resTRM.json();
        const dataOro = await resOro.json();

        const trmActual = dataTRM.rates[monedaSeleccionada];
        const precioUSD = parseFloat(dataOro.price);

        // Cálculos
        const onzaLocal = precioUSD * trmActual;
        const gramoLocal = onzaLocal / 31.1035;
        const kiloLocal = gramoLocal * 1000;

        window.precioOroUSD24k = precioUSD / 31.1035; // Guardamos el gramo en USD puro
        window.trmRealMidas = trmActual;

        // Formato de moneda
        const fmt = new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: monedaSeleccionada, 
            minimumFractionDigits: 0 
        });

        // Inyectar en HTML
        if(document.getElementById('trm-valor')) document.getElementById('trm-valor').innerText = fmt.format(trmActual);
        if(document.getElementById('oro-oz')) document.getElementById('oro-oz').innerText = fmt.format(onzaLocal);
        if(document.getElementById('oro-g')) document.getElementById('oro-g').innerText = fmt.format(gramoLocal);
        if(document.getElementById('oro-kg')) document.getElementById('oro-kg').innerText = fmt.format(kiloLocal);

        window.tiempoRestante = 60; 
    } catch (e) { 
        console.error("Error en sincronización:", e); 
    }
}

// 4. CRONÓMETRO
function iniciarCronometro() {
    if (window.relojMidas) clearInterval(window.relojMidas);
    window.relojMidas = setInterval(() => {
        const elementoContador = document.getElementById('cuenta-regresiva');
        if (elementoContador) {
            window.tiempoRestante--;
            elementoContador.innerText = window.tiempoRestante;
            if (window.tiempoRestante <= 0) actualizarMidas();
        }
    }, 1000);
}

// 5. DISPARADOR DE ARRANQUE TOTAL
document.addEventListener('DOMContentLoaded', () => {
    actualizarMidas();
    iniciarCronometro();
    // Esperamos un microsegundo para que el contenedor de la gráfica exista
    setTimeout(cargarGraficaMidas, 500); 
});

// Bloqueo de inspección
setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        console.clear();
        console.log("%cACCESO RESTRINGIDO - BÓVEDA MIDAS", "color: #d4af37; font-size: 30px; font-weight: bold;");
    }
}, 1000);
