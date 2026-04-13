/* =========================================
   LÓGICA DE MERCADO MIDAS GOLD KING v2.0
   ========================================= */

// 1. VARIABLES GLOBALES
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

// 3. FUNCIÓN DE LIMPIEZA VISUAL (Para ocultar basura de Google)
function limpiarInterfazGoogle() {
    const banner = document.querySelector(".goog-te-banner-frame");
    const skiptranslate = document.querySelector(".skiptranslate");
    if (banner) banner.remove();
    if (skiptranslate) {
        skiptranslate.style.visibility = 'hidden';
        skiptranslate.style.display = 'none';
    }
    document.body.style.top = "0px";
    document.documentElement.style.marginTop = "0px";
}

async function actualizarMidas() {
    try {
        const selector = document.getElementById('selector-moneda');
        const monedaSeleccionada = selector ? selector.value : 'COP';

        const [resTRM, resOro] = await Promise.all([
            fetch('https://open.er-api.com/v6/latest/USD'),
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT')
        ]);

        const dataTRM = await resTRM.json();
        const dataOro = await resOro.json();

        const trmActual = dataTRM.rates[monedaSeleccionada];
        const precioUSD = parseFloat(dataOro.price);

        // --- ESTA LÍNEA ES LA QUE FALTA PARA QUE EL TASADOR FUNCIONE ---
        window.precioOroUSD24k = precioUSD / 31.1035; 
        // --------------------------------------------------------------

        const onzaLocal = precioUSD * trmActual;
        const gramoLocal = onzaLocal / 31.1035;
        const kiloLocal = gramoLocal * 1000;

        const fmt = new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: monedaSeleccionada, 
            minimumFractionDigits: 0 
        });

        if(document.getElementById('trm-valor')) document.getElementById('trm-valor').innerText = fmt.format(trmActual);
        if(document.getElementById('oro-oz')) document.getElementById('oro-oz').innerText = fmt.format(onzaLocal);
        if(document.getElementById('oro-g')) document.getElementById('oro-g').innerText = fmt.format(gramoLocal);
        if(document.getElementById('oro-kg')) document.getElementById('oro-kg').innerText = fmt.format(kiloLocal);

        window.tiempoRestante = 60; 
    } catch (e) { 
        console.error("Error en sincronización:", e); 
    }
}

// 5. CRONÓMETRO DE ACTUALIZACIÓN
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

// 6. ARRANQUE INICIAL
document.addEventListener('DOMContentLoaded', () => {
    actualizarMidas();
    iniciarCronometro();
    setTimeout(cargarGraficaMidas, 800);
    // Limpieza constante de la barra de Google cada segundo
    setInterval(limpiarInterfazGoogle, 1000);
});

// 7. PROTECCIÓN DE CÓDIGO (Anti-Inspección)
setInterval(() => {
    if (window.outerHeight - window.innerHeight > 160 || window.outerWidth - window.innerWidth > 160) {
        console.clear();
        console.log("%cACCESO RESTRINGIDO - PROPIEDAD DE MIDAS GOLD KING", "color: #d4af37; font-size: 20px; font-weight: bold;");
    }
}, 2000);
