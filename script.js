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
    const btnTasar = document.querySelector('.btn-tasar'); // Cambié el nombre para no confundir con la variable 'btn' de idiomas

    if (tit) tit.innerText = t.titulo;
    if (sub) sub.innerText = t.sub;
    if (btnTasar) btnTasar.innerText = t.btn;
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

/* =========================================
   CEREBRO DE ARRANQUE UNIFICADO MIDAS
   ========================================= */
window.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo de Idioma (Selecciona el guardado o Español por defecto)
    const langGuardado = localStorage.getItem('idiomaPreferido') || 'es';
    if (typeof seleccionarIdioma === "function") {
        seleccionarIdioma(langGuardado);
    }

    // 2. Si el usuario está en la página del PROBADOR, iniciarlo
    if (document.getElementById('selector-medida')) {
        cambiarGenero('caballero');
    }

    // 3. Si el usuario está en la página de MERCADO o TASADOR, iniciar precios
    if (typeof actualizarMidas === "function") {
        actualizarMidas(); 
        iniciarCronometro();
    }
    
    // 4. Cargar la gráfica de TradingView con un pequeño delay para que no pese
    if (typeof cargarGraficaMidas === "function") {
        setTimeout(cargarGraficaMidas, 800);
    }

    // 5. Mantener la basura de Google Translate oculta
    setInterval(limpiarInterfazGoogle, 1000);
});

async function calcularTasacion() {
    const display = document.getElementById('resultado-precio');
    const precioUSDGramo = window.precioOroUSD24k; 

    // VALIDACIÓN DE SEGURIDAD: Si la bolsa no ha cargado, intentamos cargarla rápido
    if (!precioUSDGramo || precioUSDGramo === 0) {
        if(display) display.innerText = "RECONECTANDO CON LA BOLSA...";
        await actualizarMidas(); 
        // Si después de reintentar sigue en 0, detenemos
        if (!window.precioOroUSD24k) return;
    }

    const monedaDestino = document.getElementById('select-pais').value;
    const purezas = { "24k": 1, "22k": 0.916, "18k": 0.75, "14k": 0.585, "10k": 0.417 };
    const cantidad = parseFloat(document.getElementById('input-gramos').value);
    const unidad = document.getElementById('select-unidad').value; 
    const ley = document.getElementById('select-quilates').value;

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor ingresa un peso válido.");
        return;
    }

    display.innerText = "CALCULANDO DIVISA...";

    try {
        // 1. Obtener tasa de cambio para la moneda elegida
        const res = await fetch(`https://open.er-api.com/v6/latest/USD`);
        const data = await res.json();
        const tasaCambio = data.rates[monedaDestino];

        // 2. Ajustar peso según unidad
        let gramosReales = (unidad === "kg") ? cantidad * 1000 : (unidad === "oz") ? cantidad * 31.1035 : cantidad;
        
        // 3. Cálculo financiero MIDAS
        let precioGramoEnMonedaLocal = precioUSDGramo * tasaCambio;
        let precioLeyLocal = precioGramoEnMonedaLocal * purezas[ley];

        // Márgenes de compra MIDAS (82% a 90% del spot)
        let totalMin = gramosReales * (precioLeyLocal * 0.82); 
        let totalMax = gramosReales * (precioLeyLocal * 0.90); 

        // 4. Formatear resultado
        const configFormato = (monedaDestino === 'COP') ? { loc: 'es-CO', dec: 0 } : { loc: 'en-US', dec: 2 };
        const fmt = new Intl.NumberFormat(configFormato.loc, {
            style: 'currency',
            currency: monedaDestino,
            minimumFractionDigits: configFormato.dec
        });

        display.innerText = `${fmt.format(totalMin)} - ${fmt.format(totalMax)}`;
        display.style.color = "#00ff88";

    } catch (error) {
        display.innerText = "ERROR DE CONEXIÓN";
        console.error(error);
    }
}
// Asegúrate de que este bloque esté UNA SOLA VEZ
const catalogo = {
    caballero: [
        { label: "45 cm - Medida Corta", file: "caballero45.png" },
        { label: "50 cm - Medida Estándar", file: "caballero50.png" },
        { label: "60 cm - Medida Larga", file: "caballero60.png" },
        { label: "70 cm - Medida Extra Larga", file: "caballero70.png" }
    ],
    dama: [
        { label: "40 cm - Gargantilla", file: "dama40.png" },
        { label: "50 cm - Medida Estándar", file: "dama50.png" },
        { label: "60 cm - Medida Larga", file: "dama60.png" },
        { label: "70 cm - Medida Extra Larga", file: "dama70.png" }
    ]
};

/* =========================================
   SISTEMA DE PROBADOR VIRTUAL MIDAS
   ========================================= */
function cambiarGenero(gen) {
    const sel = document.getElementById('selector-medida');
    const img = document.getElementById('imagen-modelo');
    const btnCab = document.getElementById('btn-caballero');
    const btnDam = document.getElementById('btn-dama');
    
    if (!sel || !catalogo[gen]) return;

    // 1. Limpiar y llenar el selector con las medidas del género elegido
    sel.innerHTML = ''; 
    catalogo[gen].forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.file;
        opt.textContent = item.label;
        sel.appendChild(opt);
    });

    // 2. Gestionar estado visual de los botones
    if (gen === 'caballero') {
        btnCab.classList.add('active');
        btnDam.classList.remove('active');
    } else {
        btnDam.classList.add('active');
        btnCab.classList.remove('active');
    }

    // 3. Actualizar la imagen inmediatamente al primer item del catálogo
    if (img) {
        img.style.opacity = "0.4";
        setTimeout(() => { 
            img.src = sel.value; 
            img.style.opacity = "1"; 
        }, 150);
    }
}

function actualizarImagen() {
    const img = document.getElementById('imagen-modelo');
    const sel = document.getElementById('selector-medida');
    if (img && sel) {
        img.style.opacity = "0.4";
        setTimeout(() => { img.src = sel.value; img.style.opacity = "1"; }, 150);
    }
}

/* =========================================
   SISTEMA DE ENVÍO DE CONSULTAS (FORMULARIO)
   ========================================= */
function abrirFormularioDuda() { 
    const modal = document.getElementById('modal-consulta');
    if(modal) {
        modal.style.display = 'block';
        // Configuramos el envío apenas se abre el modal
        const formulario = document.getElementById('mi-formulario-midas');
        if (formulario && !formulario.dataset.listenerActive) {
            formulario.dataset.listenerActive = "true"; // Evita que se repita el envío
            formulario.onsubmit = async function(e) {
                e.preventDefault();
                const btn = document.getElementById('btn-enviar-midas');
                btn.innerText = "SINCRONIZANDO...";
                btn.disabled = true;

                try {
                    const response = await fetch('https://formspree.io/f/goldkingmidas245@gmail.com', {
                        method: 'POST',
                        body: new FormData(this),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        alert("CONSULTA RECIBIDA EN LA BÓVEDA. Midas te responderá pronto.");
                        this.reset();
                        cerrarModales();
                    } else {
                        throw new Error();
                    }
                } catch (err) {
                    alert("Error de conexión. Intenta de nuevo.");
                } finally {
                    btn.innerText = "ENVIAR A LA BÓVEDA";
                    btn.disabled = false;
                }
            };
        }
    }
}

function cerrarModales() { 
    const modal = document.getElementById('modal-consulta');
    if(modal) modal.style.display = 'none'; 
}

function abrirFormularioExperiencia() {
    window.location.href = "https://wa.me/573137918385?text=Hola%20MIDAS";
}

/* =========================================
   EVENTOS DE CARGA Y CIERRE
   ========================================= */
window.addEventListener('DOMContentLoaded', () => {
    // Carga de idioma
    const langGuardado = localStorage.getItem('idiomaPreferido') || 'es';
    const btnTexto = document.getElementById('idioma-actual');
    if (btnTexto) btnTexto.innerText = "🌐 " + langGuardado.toUpperCase();
    seleccionarIdioma(langGuardado);

    // Iniciar probador
    if (document.getElementById('selector-medida')) cambiarGenero('caballero');
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader-midas');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 1500);
    }
    
});

window.onclick = function(event) {
    const modalLegal = document.getElementById('modal-legal');
    const modalConsulta = document.getElementById('modal-consulta');
    if (event.target == modalLegal) cerrarLegal();
    if (event.target == modalConsulta) cerrarModales();
    
    if (!event.target.matches('.btn-idioma') && !event.target.closest('.btn-idioma')) {
        const dropdowns = document.getElementsByClassName("dropdown-idiomas");
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) dropdowns[i].classList.remove('show');
        }
    }
}

/* =========================================
   SISTEMA LEGAL PROFESIONAL MIDAS v2.0
   ========================================= */

const textosLegales = {
    terminos: `
        <div style="font-family: 'Courier New', monospace; text-align: left; line-height: 1.5; color: #ccc; font-size: 0.8em; padding: 10px;">
            <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; letter-spacing: 4px; text-transform: uppercase; text-align: center;">Términos y Condiciones de Uso</h2>
            <p style="text-align: center; color: #666; font-size: 0.9em;">Última actualización: 2026</p>
            
            <p><strong style="color: #d4af37;">1. MARCO OPERATIVO:</strong> El ecosistema digital MIDAS GOLD KING constituye una interfaz de consulta técnica y financiera. Al acceder a la Bóveda, el usuario acepta que los datos proporcionados son de carácter informativo y basados en fluctuaciones de mercados bursátiles internacionales (LBMA/COMEX).</p>
            
            <p><strong style="color: #d4af37;">2. EXENCIÓN DE RESPONSABILIDAD FINANCIERA:</strong> MIDAS no ejerce como entidad de asesoría de inversión. Las tasaciones generadas por el "Tasador Global" son proyecciones matemáticas calculadas sobre el precio spot del oro. MIDAS no garantiza beneficios económicos derivados del uso de su algoritmo en transacciones físicas externas.</p>
            
            <p><strong style="color: #d4af37;">3. PRECISIÓN MECÁNICA:</strong> La exactitud de la tasación depende estrictamente de la veracidad de los datos de entrada (Pureza de ley y Masa en gramos). Cualquier discrepancia resultante de instrumentos de pesaje no calibrados o declaraciones de quilataje erróneas es responsabilidad exclusiva del operador/usuario.</p>
            
            <p><strong style="color: #d4af37;">4. PROPIEDAD INDUSTRIAL:</strong> Queda prohibida la reproducción total o parcial del código fuente, algoritmos de cálculo, renders de joyería y la identidad visual "MIDAS M". El uso no autorizado de estos activos será procesado bajo la legislación de propiedad intelectual vigente en Colombia y tratados internacionales.</p>
            
            <p style="border-top: 1px solid #333; padding-top: 10px; color: #888;">Al utilizar esta plataforma, usted confirma que comprende la volatilidad del mercado de metales preciosos.</p>
        </div>`,
    
    privacidad: `
        <div style="font-family: 'Courier New', monospace; text-align: left; line-height: 1.5; color: #ccc; font-size: 0.8em; padding: 10px;">
            <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; letter-spacing: 4px; text-transform: uppercase; text-align: center;">Protocolo de Seguridad y Privacidad</h2>
            
            <p><strong style="color: #d4af37;">1. CRIPTOGRAFÍA DE DATOS:</strong> Toda interacción dentro de la Bóveda de MIDAS está protegida por protocolos de cifrado simétrico. No almacenamos registros de tasaciones individuales en servidores públicos, garantizando el anonimato de sus activos financieros.</p>
            
            <p><strong style="color: #d4af37;">2. TRATAMIENTO DE METADATOS:</strong> MIDAS captura exclusivamente telemetría técnica (moneda seleccionada, tipo de tejido consultado) con el fin único de optimizar el rendimiento de la interfaz y la precisión del convertidor de divisas en tiempo real.</p>
            
            <p><strong style="color: #d4af37;">3. POLÍTICA DE COOKIES DE MERCADO:</strong> Utilizamos identificadores temporales de sesión para mantener la sincronización con la API de Binance (PAXG) y la TRM local, asegurando que los precios no sufran desajustes durante su navegación activa.</p>
            
            <p><strong style="color: #d4af37;">4. DERECHOS ARCO:</strong> El usuario mantiene pleno control sobre su información técnica, la cual puede ser purgada mediante la limpieza de caché o el cierre de la sesión de navegador, eliminando cualquier rastro de consulta en el dispositivo local.</p>
        </div>`,
        
    faq: `
        <div style="font-family: 'Courier New', monospace; text-align: left; line-height: 1.5; color: #ccc; font-size: 0.8em; padding: 10px;">
            <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; letter-spacing: 4px; text-transform: uppercase; text-align: center;">Centro de Inteligencia (FAQ)</h2>
            
            <p><strong style="color: #d4af37;">¿QUÉ TAN FIABLE ES EL PRECIO MOSTRADO?</strong><br>
            Nuestra infraestructura se conecta directamente con el par PAXG/USDT y APIs de divisas globales. El margen de error es inferior al 0.01% respecto al precio spot de Londres.</p>
            
            <p><strong style="color: #d4af37;">¿EL TASADOR INCLUYE MANO DE OBRA?</strong><br>
            No. El Tasador Global MIDAS calcula exclusivamente el valor del metal puro o ley según el mercado actual. No incluye costos de diseño, fabricación o valor agregado comercial.</p>
            
            <p><strong style="color: #d4af37;">¿QUÉ SIGNIFICA "LEY 750" EN EL SISTEMA?</strong><br>
            Es el estándar internacional para el oro de 18 kilates, indicando que la pieza contiene un 75% de oro puro. El sistema ajusta automáticamente la tasación según este parámetro de pureza.</p>
            
            <p><strong style="color: #d4af37;">¿POR QUÉ EL CRONÓMETRO DE 60 SEGUNDOS?</strong><br>
            Para garantizar que usted nunca opere con precios obsoletos. El mercado del oro es altamente volátil y una actualización de un minuto protege la precisión de su valoración.</p>
        </div>`
};
function abrirLegal(tipo) {
    const modal = document.getElementById('modal-legal');
    const contenido = document.getElementById('contenido-legal');
    
    if (modal && contenido) {
        contenido.innerHTML = textosLegales[tipo];
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    } else {
        console.error("No se encontró el modal legal o el contenedor de contenido.");
    }
}

function cerrarLegal() {
    const modal = document.getElementById('modal-legal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Devuelve scroll
    }
}

const formularioMidas = document.getElementById('form-comunidad-midas');

if (formularioMidas) {
    formularioMidas.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita que se salga de tu web
        
        const btn = document.getElementById('btn-enviar-midas');
        btn.disabled = true;
        btn.innerText = "SINCRONIZANDO...";

        const formData = new FormData(this);

        try {
            // AQUÍ USAMOS TU NUEVO ID
            const response = await fetch('https://formspree.io/f/mzdjnzzn', { 
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert("✓ CONSULTA RECIBIDA EN LA BÓVEDA. Midas te responderá pronto.");
                this.reset(); 
                cerrarModales(); 
            } else {
                alert("Error al conectar con la Bóveda. Intenta de nuevo.");
            }
        } catch (error) {
            alert("Error de conexión. Revisa tu red.");
        } finally {
            btn.disabled = false;
            btn.innerText = "ENVIAR A LA BÓVEDA";
        }
    });
}
/* =========================================
   ACTIVACIÓN MANIFIESTO MIDAS (HERO)
   ========================================= */

// 1. Mostrar el Manifiesto (con el evento para evitar conflictos de links)
function mostrarProposito(event) {
    if (event) event.preventDefault(); // Evita recargas de página
    
    const manifiesto = document.getElementById('seccion-proposito');
    if (manifiesto) {
        manifiesto.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Bloquea el scroll de fondo
        console.log("Accediendo a la Bóveda: Manifiesto Midas Activo.");
    }
}

// 2. Cerrar el Manifiesto (Vincular con tu span de cerrar)
function cerrarProposito() {
    const manifiesto = document.getElementById('seccion-proposito');
    if (manifiesto) {
        manifiesto.style.display = 'none';
        document.body.style.overflow = 'auto'; // Devuelve el scroll normal
    }
}

// 3. Cerrar al presionar la tecla Esc (Toque Pro)
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        cerrarProposito();
    }
});
// Detectar si abren la consola y mandar un aviso de MIDAS
setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        console.clear();
        console.log("%cACCESO RESTRINGIDO - BÓVEDA MIDAS", "color: #d4af37; font-size: 30px; font-weight: bold;");
        console.log("Cualquier modificación no autorizada será reportada.");
    }
}, 1000);

// Asegúrate de que esta variable esté al puro inicio de mercado.js
let tiempoRestante = 60; 

function iniciarCronometro() {
    // Si ya hay un reloj andando, lo matamos para que no se dupliquen
    if (window.relojMidas) clearInterval(window.relojMidas);

    window.relojMidas = setInterval(() => {
        const elementoContador = document.getElementById('cuenta-regresiva');
        
        if (elementoContador) {
            tiempoRestante--;
            
            // --- EL CIERRE DE SEGURIDAD ---
            // Si el tiempo es 0 o menor (negativo), forzamos reinicio
            if (tiempoRestante <= 0) {
                tiempoRestante = 60;
                // Intentamos actualizar, si falla, al menos el reloj sigue
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
// Esto conecta tu código "escondido" con los botones del HTML
    window.calcularTasacion = calcularTasacion;
    window.toggleMenuIdioma = toggleMenuIdioma;
    window.seleccionarIdioma = seleccionarIdioma;
    window.mostrarProposito = mostrarProposito;
    window.cerrarProposito = cerrarProposito;
    window.aceptarCookies = aceptarCookies;

    

// 3. BLOQUE DE PROTECCIÓN TOTAL (Anti-Copia y Anti-Inspección)
document.addEventListener('contextmenu', event => event.preventDefault()); // Bloquea clic derecho

document.onkeydown = function(e) {
    if(e.keyCode == 123) return false; // Bloquea F12
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; // Bloquea Ctrl+Shift+I
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false; // Bloquea Ctrl+Shift+C
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; // Bloquea Ctrl+Shift+J
    if(e.ctrlKey && e.uKey && e.keyCode == 'U'.charCodeAt(0)) return false; // Bloquea Ctrl+U (Ver código fuente)
};

// 4. DISPARADOR DE INICIO (Esto es lo que hace que el 60 empiece a bajar)
window.addEventListener('DOMContentLoaded', () => {
    iniciarCronometro(); 
    actualizarMidas();
});
// --- DISPARADOR DE LA BÓVEDA ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Definimos la variable global si no estaba definida arriba
    window.tiempoRestante = 60; 
    
    // 2. Encendemos el segundero
    iniciarCronometro(); 
    
    // 3. Hacemos la primera carga de precios
    if (typeof actualizarMidas === "function") {
        actualizarMidas();
    }
});

function toggleMenu() {
    const menu = document.getElementById("menuPrincipal");
    if (menu) {
        menu.classList.toggle("active");
    }
}
const enciclopediaMidas = {
    "3x1": {
        titulo: "3x1 (FÍGARO)",
        historia: "Clásico italiano que alterna tres eslabones cortos con uno largo. Diseñado para ofrecer ligereza visual sin perder la elegancia del Oro 18k.",
        fab: "Eslabones electrosoldados.", res: "Alta - Uso diario."
    },
   "balines": {
        titulo: "BALINES DIAMANTADOS",
        historia: "Una pieza de alta ingeniería joyera compuesta por esferas de oro sólido con cortes de precisión geométrica. Estos cortes, realizados con puntas de diamante, actúan como espejos microscópicos que multiplican el destello natural del metal ante cualquier fuente de luz.",
        fab: "Esferas facetadas con punta de diamante.", 
        res: "Media/Alta - Brillo estructural superior."
    },
    "chino": {
        titulo: "TEJIDO CHINO",
        historia: "Patrón de anillos entrelazados de forma compacta. Ofrece una flexibilidad superior, adaptándose perfectamente al contorno del cuello.",
        fab: "Tejido manual circular.", res: "Muy Alta - Flexible."
    },
    "clip": {
        titulo: "CLIP (PAPERCLIP)",
        historia: "Tendencia moderna de eslabones rectangulares alargados. Representa el minimalismo industrial en la alta joyería contemporánea.",
        fab: "Laminado macizo.", res: "Media - Tendencia."
    },
    "cubana": {
        titulo: "CUBANA",
        historia: "Eslabones planos y cerrados de alta densidad. Es el tejido preferido por su durabilidad extrema y su presencia imponente en el mercado.",
        fab: "Torque y aplanado.", res: "Máxima - Indestructible."
    },
    "forzatina": {
        titulo: "FORZATINA",
        historia: "El diseño básico de la joyería. Eslabones entrelazados en ángulos de 90°. Es la cadena más confiable para portar dijes de alto valor.",
        fab: "Eslabón perpendicular.", res: "Alta - Tradicional."
    },
    "franco": {
        titulo: "FRANCO",
        historia: "Tejido denso con un patrón de cuatro lados. Su diseño evita que la cadena se enrede o pierda su forma con el uso intensivo.",
        fab: "Entramado de 4 caras.", res: "Extrema - De carga."
    },
   "gucci": {
        titulo: "GUCCI CLÁSICO",
        historia: "El tejido Gucci es un pilar de la joyería de lujo italiana. Caracterizado por sus eslabones ovalados con una barra de unión central, este diseño combina una estética sofisticada con una estructura de gran estabilidad. Es la elección predilecta para quienes buscan un equilibrio entre la elegancia atemporal y la robustez del oro sólido.",
        fab: "Eslabones de fundición con alma reforzada.", 
        res: "Muy Alta - Estabilidad estructural."
    },
    "ice": {
        titulo: "ICE",
        historia: "Estructura de eslabones anchos diseñada para maximizar la superficie visible de oro. Ideal para acabados con alto brillo o diamantes.",
        fab: "Casting de eslabón ancho.", res: "Media/Alta - Lujo."
    },
    "lazo": {
        titulo: "LAZO (ROPE CHAIN)",
        historia: "Múltiples eslabones pequeños tejidos en espiral. Crea una textura similar a una cuerda de oro con un brillo helicoidal único.",
        fab: "Tejido espiral complejo.", res: "Muy Alta - Robusta."
    },
    "marine_plano": {
        titulo: "MARINE PLANO",
        historia: "Versión suavizada del tejido náutico. Se desliza cómodamente bajo la ropa, manteniendo la estética de los eslabones de ancla.",
        fab: "Prensado plano.", res: "Alta - Confort."
    },
    "marine": {
        titulo: "MARINE TRADICIONAL",
        historia: "Fiel al diseño original de los barcos de lujo. Es una pieza de peso considerable que destaca por su simetría y herencia.",
        fab: "Eslabón de ancla macizo.", res: "Muy Alta - Pesada."
    },
    "militar": {
        titulo: "MILITAR",
        historia: "Diseño de bloque sólido. Pensado para durar generaciones bajo cualquier condición, con un cierre de seguridad reforzado.",
        fab: "Soldadura de punto reforzada.", res: "Máxima - Seguridad."
    },
    "robusto": {
        titulo: "ROBUSTO",
        historia: "Tejido de gran volumen y peso. Diseñado para quienes buscan que su inversión en oro sea evidente al tacto y a la vista.",
        fab: "Vaciado de alta densidad.", res: "Alta - Por peso."
    },
    "veneciana": {
        titulo: "VENECIANA",
        historia: "Eslabones cuadrados que forman una cadena cúbica. Es extremadamente suave al tacto y tiene un brillo lineal ininterrumpido.",
        fab: "Corte cúbico de precisión.", res: "Alta - Elegante."
    },
    "serpiente": {
        titulo: "SERPIENTE ESPEJO",
        historia: "Placas de oro unidas de forma tan estrecha que parecen una superficie sólida de espejo. Es la máxima expresión de elegancia líquida.",
        fab: "Ensamblaje de microplacas.", res: "Media - Delicada."
    },
    "plano": {
        titulo: "PLANO",
        historia: "Tejido de eslabones en 'V' alineados para formar una cinta plana de oro. Ofrece el mayor reflejo de luz posible sobre la piel.",
        fab: "Tejido de cinta plana.", res: "Baja/Media - Estética."
    }
};

/* ============================================================
   1. SISTEMA DE PRECARGA Y ANIMACIONES
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const joyasMidas = [
        '3x1.jpeg', 'balines.jpeg', 'chino.jpeg', 'clip.png', 
        'cubana.jpeg', 'forzatina.jpeg', 'franco.jpeg', 'gucci.jpeg',
        'ice.jpeg', 'lazo.jpeg', 'merine_plano.jpeg', 'marine.jpeg',
        'militar.JPG', 'robusto.jpeg', 'veneciana.jpeg', 'serpiente.jpg', 'plano.jpeg'
    ];
    joyasMidas.forEach(src => {
        const img = new Image();
        img.src = src; 
    });

    const imagenes = document.querySelectorAll(".contenedor-img img");
    const aparecerImagen = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const img = entrada.target;
                img.style.opacity = "1";
                observador.unobserve(img);
            }
        });
    };

    const observador = new IntersectionObserver(aparecerImagen, {
        root: null,
        threshold: 0.1
    });

    imagenes.forEach(img => {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease-in-out";
        observador.observe(img);
    });
});

function abrirDetalles(key) {
    const info = enciclopediaMidas[key];
    const modal = document.getElementById('modal-tejido');
    if (!info) return;

    document.getElementById('titulo-modal').innerText = info.titulo;
    document.getElementById('historia-modal').innerText = info.historia;
    document.getElementById('fab-modal').innerText = info.fab;
    document.getElementById('res-modal').innerText = info.res;
    
    const imgContainer = document.getElementById('img-container-modal');
    
    // Si es Marine Plano, asegúrate que la key sea 'merinep' o como llames al archivo
    let ext = (key === 'serpiente') ? 'jpg' : (key === 'clip') ? 'png' : (key === 'militar') ? 'JPG' : 'jpeg';

    imgContainer.innerHTML = `
        <div class="loader-oro" id="loader-img"></div>
        <img id="img-dinamica" src="${key}.${ext}" 
             style="opacity: 0; max-width: 100%; height: auto; transition: opacity 0.3s;" 
             onload="finalizarCargaMidas(this, true)" 
             onerror="intentarSiguiente(this, '${key}')">
    `;

    // Soporte para celulares (Caché)
    const img = document.getElementById('img-dinamica');
    if (img.complete) finalizarCargaMidas(img, true);

    document.body.style.overflow = "hidden"; 
    modal.style.display = "flex";
}

function finalizarCargaMidas(img, exito) {
    const loader = document.getElementById('loader-img');
    if (loader) loader.style.display = 'none'; // Se va el círculo pase lo que pase
    if (exito) img.style.opacity = '1';
}

function intentarSiguiente(imgElement, nombre) {
    const extensiones = ['jpeg', 'jpg', 'png', 'JPG', 'PNG'];
    let srcActual = imgElement.src;

    for (let ext of extensiones) {
        let ruta = nombre + "." + ext;
        if (!srcActual.includes(ruta)) {
            imgElement.src = ruta;
            return;
        }
    }
    
    // Si llegó aquí es porque no existe la foto. Quitamos el loader y mostramos error.
    finalizarCargaMidas(imgElement, false);
    imgElement.alt = "Imagen no disponible";
    imgElement.style.opacity = "0.5";
}

function quitarLoaderMidas(img) {
    const loader = document.getElementById('loader-img');
    if (loader) loader.style.display = 'none';
    img.style.opacity = '1'; // Aparece suavemente
}

function intentarSiguiente(imgElement, nombre) {
    const extensiones = ['jpeg', 'jpg', 'png', 'JPG', 'PNG'];
    let srcActual = imgElement.src;

    for (let ext of extensiones) {
        let rutaIntento = nombre + "." + ext;
        if (!srcActual.includes(rutaIntento)) {
            imgElement.src = rutaIntento;
            return;
        }
    }
    
    document.getElementById('loader-img').style.display = 'none';
    imgElement.alt = "Imagen no encontrada";
    // Si llega aquí, es porque el archivo NO está en la carpeta de Vercel/Proyecto
    console.error("No se encontró el archivo físico para: " + nombre);
}

function cerrarDetalles() {
    console.log("Cerrando modal..."); // Esto es para que veas en la consola que el clic entró
    
    const modalTejido = document.getElementById('modal-tejido');
    const modalLegal = document.getElementById('modal-legal');

    // Cerramos ambos modales por si acaso
    if (modalTejido) modalTejido.style.display = "none";
    if (modalLegal) modalLegal.style.display = "none";

    // Limpiamos la imagen para que no parpadee al abrir otra
    const imgDinamica = document.getElementById('img-dinamica');
    if (imgDinamica) imgDinamica.src = ""; 

    // DEVOLVEMOS EL SCROLL (Vital para la PC)
    document.body.style.overflow = "auto";
    document.body.style.height = "auto"; 
}

/* Re-vinculamos el clic fuera del modal para que también cierre */
window.onclick = function(event) {
    const modalT = document.getElementById('modal-tejido');
    const modalL = document.getElementById('modal-legal');
    if (event.target == modalT || event.target == modalL) {
        cerrarDetalles();
    }
};

/* =========================================
   PROTECCIÓN DE PROPIEDAD INTELECTUAL MIDAS
   ========================================= */

// 1. Bloquear el clic derecho en las imágenes del probador y catálogo
document.addEventListener('contextmenu', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);

// 2. Bloquear el arrastre de imágenes (para que no las arrastren al escritorio)
document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);

// 3. Aviso en consola (ya tenías uno, vamos a reforzarlo)
console.log("%c¡ALTO! Propiedad de MIDAS GOLD KING", "color: #ffebad; font-size: 20px; font-weight: bold; background: #000; padding: 10px;");
console.log("El contenido de esta boveda está protegido legalmente.");

/* =========================================
   SISTEMA DE COOKIES POR SESIÓN MIDAS
   ========================================= */

function gestionarAvisoCookies() {
    const aviso = document.getElementById('aviso-cookies');
    
    // Al usar sessionStorage, el aviso volverá a salir cada vez que
    // el usuario cierre la pestaña y regrese a MIDAS GOLD KING.
    const cookiesAceptadas = sessionStorage.getItem('midasCookiesSesion');

    if (!cookiesAceptadas) {
        setTimeout(() => {
            if (aviso) {
                aviso.style.display = 'block';
                aviso.style.opacity = '1';
            }
        }, 1000);
    }
}

function aceptarCookies() {
    const aviso = document.getElementById('aviso-cookies');
    
    // Guardamos la aceptación solo para la sesión actual
    sessionStorage.setItem('midasCookiesSesion', 'true');
    
    if (aviso) {
        aviso.style.opacity = '0';
        setTimeout(() => {
            aviso.style.display = 'none';
        }, 500);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', gestionarAvisoCookies);
