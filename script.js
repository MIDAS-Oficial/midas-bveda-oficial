function toggleMenuIdioma() {
    document.getElementById("menu-idiomas").classList.toggle("show");
}

function seleccionarIdioma(lang) {
    
    const btnTexto = document.getElementById('idioma-actual');
    if (btnTexto) btnTexto.innerText = "🌐 " + lang.toUpperCase();

    
    if (typeof textos !== 'undefined' && textos[lang]) {
        cambiarIdiomaManual(lang);
    }

    
    const intentarTraducir = setInterval(() => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));
            clearInterval(intentarTraducir); 
        }
    }, 100); 

    setTimeout(() => clearInterval(intentarTraducir), 5000);

    toggleMenuIdioma();
}

function cambiarIdiomaManual(lang) {
    const t = textos[lang];
    if (!t) return;
    
    localStorage.setItem('idiomaPreferido', lang);

    
    const navIds = ['nav-inicio', 'nav-tasador', 'nav-tejidos', 'nav-probador', 'nav-mercado', 'nav-comunidad'];
    navIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.innerText = t[`nav${i}`] || el.innerText;
    });

    
    const tit = document.getElementById('bienvenida-titulo');
    const sub = document.getElementById('bienvenida-sub');
    if (tit) tit.innerText = t.titulo;
    if (sub) sub.innerText = t.sub;

    const btn = document.querySelector('.btn-tasar');
    if (btn) btn.innerText = t.btn;
}
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, 
        autoDisplay: false, 
        multilanguagePage: true
    }, 'google_translate_element');
}

function limpiarBarraGoogle() {
    const banner = document.querySelector(".goog-te-banner-frame");
    if (banner) {
        banner.style.display = 'none';
    }
    document.body.style.top = "0px";
}


function seleccionarIdioma(lang) {
    const btnTexto = document.getElementById('idioma-actual');
    if (btnTexto) btnTexto.innerText = "🌐 " + lang.toUpperCase();

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        
        
        setTimeout(limpiarBarraGoogle, 500);
    }
    toggleMenuIdioma();
}


window.addEventListener('load', () => {
    setInterval(limpiarBarraGoogle, 1000); 
});


function calcularTasacion() {
    const precio24k = window.precioOroReal24k || 530000; 
    const trmActual = window.trmRealMidas || 0.00025; 
    const margenMin = 0.70;
    const margenMax = 0.90;

    
    const purezas = {
        "24k": 1, "22k": 0.916, "18k": 0.75, "14k": 0.585, "10k": 0.417
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

        if (moneda !== "COP") { 
            totalMin *= trmActual; 
            totalMax *= trmActual; 
        }

        display.innerText = `${totalMin.toLocaleString(undefined, { maximumFractionDigits: 2 })} - ${totalMax.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${moneda}`;
        
       
        display.style.color = "#00ff88"; 
        setTimeout(() => { display.style.color = "#d4af37"; }, 500);

    } else {
        alert("Ingresa una cantidad válida.");
    }
}


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


function cambiarGenero(gen) {
    const sel = document.getElementById('selector-medida');
    const img = document.getElementById('imagen-modelo');
    const btnCab = document.getElementById('btn-caballero');
    const btnDam = document.getElementById('btn-dama');
    
    if (!sel || !catalogo[gen]) return;


    sel.innerHTML = ''; 
    catalogo[gen].forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.file;
        opt.textContent = item.label;
        sel.appendChild(opt);
    });

    
    if (gen === 'caballero') {
        btnCab.classList.add('active');
        btnDam.classList.remove('active');
    } else {
        btnDam.classList.add('active');
        btnCab.classList.remove('active');
    }

    
    if (img) {
        img.style.opacity = "0.4";
        setTimeout(() => { 
            img.src = sel.value; 
            img.style.opacity = "1"; 
        }, 150);
    }
}


window.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página del probador, inicializamos
    if (document.getElementById('selector-medida')) {
        cambiarGenero('caballero');
    }
});

function actualizarImagen() {
    const img = document.getElementById('imagen-modelo');
    const sel = document.getElementById('selector-medida');
    if (img && sel) {
        img.style.opacity = "0.4";
        setTimeout(() => { img.src = sel.value; img.style.opacity = "1"; }, 150);
    }
}


function abrirFormularioDuda() { 
    const modal = document.getElementById('modal-consulta');
    if(modal) {
        modal.style.display = 'block';
        
        const formulario = document.getElementById('mi-formulario-midas');
        if (formulario && !formulario.dataset.listenerActive) {
            formulario.dataset.listenerActive = "true"; 
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


window.addEventListener('DOMContentLoaded', () => {
    
    const langGuardado = localStorage.getItem('idiomaPreferido') || 'es';
    const btnTexto = document.getElementById('idioma-actual');
    if (btnTexto) btnTexto.innerText = "🌐 " + langGuardado.toUpperCase();
    cambiarIdioma(langGuardado);

    
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
    if (!localStorage.getItem('cookiesAceptadas')) {
        const cookies = document.getElementById('aviso-cookies');
        if(cookies) setTimeout(() => { cookies.style.display = 'block'; }, 2000);
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

function aceptarCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    const cookies = document.getElementById('aviso-cookies');
    if(cookies) cookies.style.display = 'none';
}


const textosLegales = {
    terminos: `
        <div style="font-family: monospace; text-align: left; line-height: 1.6; color: #bbb; font-size: 0.85em;">
            <h2 style="color: #d4af37; border-bottom: 1px solid #333; padding-bottom: 10px; letter-spacing: 3px; text-transform: uppercase;">Términos de Servicio - MIDAS GOLD KING</h2>
            <p><strong style="color: #d4af37;">1. NATURALEZA DEL SERVICIO:</strong> MIDAS opera como una plataforma de inteligencia de mercado y tasación digital. Los valores de metales preciosos se sincronizan mediante APIs internacionales en tiempo real.</p>
            <p><strong style="color: #d4af37;">2. PRECISIÓN DE DATOS:</strong> El algoritmo de la Bóveda calcula el valor basado en el peso neto y la pureza declarada por el usuario. MIDAS no se hace responsable por errores en el pesaje físico.</p>
            <p><strong style="color: #d4af37;">3. PROPIEDAD INTELECTUAL:</strong> El diseño, logotipos (MIDAS M) y herramientas como el Tasador Global son propiedad exclusiva de MIDAS GOLD KING.</p>
        </div>`,
    
    privacidad: `
        <div style="font-family: monospace; text-align: left; line-height: 1.6; color: #bbb; font-size: 0.85em;">
            <h2 style="color: #d4af37; border-bottom: 1px solid #333; padding-bottom: 10px; letter-spacing: 3px; text-transform: uppercase;">Protocolo de Privacidad - Bóveda Digital</h2>
            <p><strong style="color: #d4af37;">1. RECOLECCIÓN DE DATOS:</strong> El sistema captura únicamente el identificador de usuario y el mensaje técnico para su procesamiento en la Bóveda.</p>
            <p><strong style="color: #d4af37;">2. USO DE LA INFORMACIÓN:</strong> La información se utiliza exclusivamente para resolución de dudas técnicas y mejora del algoritmo MIDAS.</p>
            <p><strong style="color: #d4af37;">3. SEGURIDAD:</strong> MIDAS implementa filtros de cifrado para garantizar que su identidad permanezca resguardada.</p>
        </div>`,
        
    faq: `
        <div style="font-family: monospace; text-align: left; line-height: 1.6; color: #bbb; font-size: 0.85em;">
            <h2 style="color: #d4af37; border-bottom: 1px solid #333; padding-bottom: 10px; letter-spacing: 3px; text-transform: uppercase;">Preguntas Frecuentes (FAQ)</h2>
            <p><strong style="color: #d4af37;">¿POR QUÉ VARÍA EL PRECIO DEL ORO?</strong><br>El mercado cotiza en la bolsa de Londres (LBMA). MIDAS actualiza estos valores cada 60 segundos.</p>
            <p><strong style="color: #d4af37;">¿QUÉ ES EL TASADOR GLOBAL?</strong><br>Es una herramienta matemática avanzada que calcula el valor real de fundición de su pieza según el spot actual.</p>
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
        document.body.style.overflow = "auto";
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
            /
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

function mostrarProposito(event) {
    if (event) event.preventDefault();
    
    const manifiesto = document.getElementById('seccion-proposito');
    if (manifiesto) {
        manifiesto.style.display = 'block';
        document.body.style.overflow = 'hidden'; o
        console.log("Accediendo a la Bóveda: Manifiesto Midas Activo.");
    }
}


function cerrarProposito() {
    const manifiesto = document.getElementById('seccion-proposito');
    if (manifiesto) {
        manifiesto.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}


document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        cerrarProposito();
    }
});

setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        console.clear();
        console.log("%cACCESO RESTRINGIDO - BÓVEDA MIDAS", "color: #d4af37; font-size: 30px; font-weight: bold;");
        console.log("Cualquier modificación no autorizada será reportada.");
    }
}, 1000);


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

    window.calcularTasacion = calcularTasacion;
    window.toggleMenuIdioma = toggleMenuIdioma;
    window.seleccionarIdioma = seleccionarIdioma;
    window.mostrarProposito = mostrarProposito;
    window.cerrarProposito = cerrarProposito;
    window.aceptarCookies = aceptarCookies;

    


document.addEventListener('contextmenu', event => event.preventDefault()); // Bloquea clic derecho

document.onkeydown = function(e) {
    if(e.keyCode == 123) return false; // Bloquea F12
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; 
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false; 
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; 
    if(e.ctrlKey && e.uKey && e.keyCode == 'U'.charCodeAt(0)) return false; 
};


window.addEventListener('DOMContentLoaded', () => {
    iniciarCronometro(); 
    actualizarMidas();
});

document.addEventListener('DOMContentLoaded', () => {
   
    window.tiempoRestante = 60; 
    
   
    iniciarCronometro(); 
    
    
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
