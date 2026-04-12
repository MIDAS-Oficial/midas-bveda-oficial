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
