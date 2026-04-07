(function() {
    "use strict";
    if (typeof TradingView !== 'undefined') {
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

    async function actualizarMidas() {
        try {
            const selector = document.getElementById('selector-moneda');
            const monedaSeleccionada = selector ? selector.value : 'COP';

            const resTRM = await fetch('https://open.er-api.com/v6/latest/USD');
            const dataTRM = await resTRM.json();
            const trmActual = dataTRM.rates[monedaSeleccionada];

            const resOro = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT');
            const dataOro = await resOro.json();
            const precioUSD = parseFloat(dataOro.price);

            const onzaLocal = precioUSD * trmActual;
            const gramoLocal = onzaLocal / 31.1035;
            const kiloLocal = gramoLocal * 1000;

window.precioOroReal24k = gramoLocal; 
window.trmRealMidas = trmActual;

            const fmt = new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: monedaSeleccionada, 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
            });

            if(document.getElementById('trm-valor')) document.getElementById('trm-valor').innerText = fmt.format(trmActual);
            if(document.getElementById('oro-oz')) document.getElementById('oro-oz').innerText = fmt.format(onzaLocal);
            if(document.getElementById('oro-g')) document.getElementById('oro-g').innerText = fmt.format(gramoLocal);
            if(document.getElementById('oro-kg')) document.getElementById('oro-kg').innerText = fmt.format(kiloLocal);

            tiempoRestante = 60; 

        } catch (e) { 
            console.log("Error en MIDAS GLOBAL:", e); 
        }
    }

let tiempoRestante = 60; 

function iniciarCronometro() {
 
    if (window.relojMidas) clearInterval(window.relojMidas);

    window.relojMidas = setInterval(() => {
        const elementoContador = document.getElementById('cuenta-regresiva');
        
        if (elementoContador) {
            tiempoRestante--;
            
            if (tiempoRestante <= 0) {
                tiempoRestante = 60;
              
                try {
                    actualizarMidas();
                    console.log("Bóveda Sincronizada con Éxito");
                } catch (err) {
                    console.error("Error al sincronizar, reintentando en 60s");
                }
            }
            
            elementoContador.innerText = tiempoRestante;
        }
    }, 1000);
}
    
    function calcularTasacion() {
  
    const precio24k = window.precioOroReal24k || 530972; 
    const trmActual = window.trmRealMidas || 0.00025; 
    
    const margenMin = 0.70;
    const margenMax = 0.90;

    
    const purezas = { 
        "24k": 1, 
        "22k": 0.916, 
        "18k": 0.75, 
        "14k": 0.585, 
        "10k": 0.417 
    };

    const cantidad = parseFloat(document.getElementById('input-gramos').value);
    const unidad = document.getElementById('select-unidad').value; 
    const ley = document.getElementById('select-quilates').value;
    const moneda = document.getElementById('select-pais').value;
    const display = document.getElementById('resultado-precio');

    if (cantidad > 0) {
       
        let gramosReales = (unidad === "kg") ? cantidad * 1000 : (unidad === "oz") ? cantidad * 28.35 : cantidad;
        
       
        const pureza = purezas[ley];
        let precioBase = precio24k * pureza;

        let totalMin = gramosReales * (precioBase * margenMin);
        let totalMax = gramosReales * (precioBase * margenMax);

        // Conversión de moneda usando la TRM real de la API
        if (moneda !== "COP") { 
            totalMin *= trmActual; 
            totalMax *= trmActual; 
        }

        display.innerText = `${totalMin.toLocaleString(undefined, { maximumFractionDigits: 2 })} - ${totalMax.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${moneda}`;
        
       
        display.style.color = "#00ff88"; 
        setTimeout(() => { display.style.color = "#d4af37"; }, 500);
    }
}

    setInterval(() => {
        if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            console.clear();
            console.log("%cACCESO RESTRINGIDO - BÓVEDA MIDAS", "color: #d4af37; font-size: 30px; font-weight: bold;");
        }
    }, 1000);

   
    window.calcularTasacion = calcularTasacion;
    window.actualizarMidas = actualizarMidas;

   
    actualizarMidas();
    iniciarCronometro();
    setInterval(actualizarMidas, 60000); // Actualiza datos cada 60 segundos

})();

