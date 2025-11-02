const API_URL = 'http://localhost:5000';

document.getElementById('btnGenerarClaves').addEventListener('click', generarClaves);
document.getElementById('btnFirmarMensaje').addEventListener('click', firmarMensaje);
document.getElementById('btnVerificar').addEventListener('click', verificarMensaje);
document.getElementById('btnVerificarAlterado').addEventListener('click', verificarAlterado);

async function generarClaves() {
    const btn = document.getElementById('btnGenerarClaves');
    const result = document.getElementById('resultClaves');
    
    btn.disabled = true;
    btn.textContent = 'Generando...';
    
    try {
        const response = await fetch(`${API_URL}/generar-claves`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            result.className = 'result show success';
            result.innerHTML = `
                <strong>${data.message}</strong>
                <pre>Clave Pública:\n${data.public_key.substring(0, 100)}...</pre>
                <pre>Clave Privada:\n${data.private_key.substring(0, 100)}...</pre>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Generar Claves RSA';
    }
}

async function firmarMensaje() {
    const btn = document.getElementById('btnFirmarMensaje');
    const result = document.getElementById('resultFirma');
    const mensaje = document.getElementById('mensajeRemitente').value;
    
    if (!mensaje.trim()) {
        result.className = 'result show error';
        result.innerHTML = '<strong>Error:</strong> Ingresa un mensaje';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Firmando...';
    
    try {
        const response = await fetch(`${API_URL}/firmar-mensaje`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje })
        });
        
        const data = await response.json();
        
        if (data.success) {
            result.className = 'result show success';
            result.innerHTML = `
                <strong>${data.message}</strong>
                <pre>Firma: ${data.firma.substring(0, 80)}...</pre>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Firmar Mensaje';
    }
}

async function verificarMensaje() {
    const btn = document.getElementById('btnVerificar');
    const result = document.getElementById('resultVerificar');
    
    btn.disabled = true;
    btn.textContent = 'Verificando...';
    
    try {
        const response = await fetch(`${API_URL}/verificar-mensaje`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            result.className = `result show ${data.valida ? 'success' : 'error'}`;
            result.innerHTML = `
                <strong>${data.message}</strong>
                <pre>Mensaje: ${data.mensaje}</pre>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Verificar Mensaje';
    }
}

async function verificarAlterado() {
    const btn = document.getElementById('btnVerificarAlterado');
    const result = document.getElementById('resultAlterado');
    const mensajeAlterado = document.getElementById('mensajeAlterado').value;
    
    if (!mensajeAlterado.trim()) {
        result.className = 'result show error';
        result.innerHTML = '<strong>Error:</strong> Ingresa un mensaje alterado';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Verificando...';
    
    try {
        const response = await fetch(`${API_URL}/verificar-alterado`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje_alterado: mensajeAlterado })
        });
        
        const data = await response.json();
        
        if (data.success) {
            result.className = 'result show info';
            result.innerHTML = `
                <strong>Resultados de la Verificación:</strong>
                <div style="margin-top: 10px;">
                    <strong style="color: ${data.original.valida ? 'var(--success-text)' : 'var(--error-text)'}">Mensaje Original:</strong>
                    <pre>${data.original.estado}</pre>
                    <pre>Mensaje: ${data.original.mensaje}</pre>
                </div>
                <div style="margin-top: 15px;">
                    <strong style="color: ${data.alterado.valida ? 'var(--success-text)' : 'var(--error-text)'}">Mensaje Alterado:</strong>
                    <pre>${data.alterado.estado}</pre>
                    <pre>Mensaje: ${data.alterado.mensaje}</pre>
                </div>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Verificar Mensaje Alterado';
    }
}