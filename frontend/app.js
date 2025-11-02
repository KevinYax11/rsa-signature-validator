const API_URL = 'http://localhost:5000';

document.getElementById('btnGenerarClaves').addEventListener('click', generarClaves);
document.getElementById('btnFirmarMensaje').addEventListener('click', firmarMensaje);
document.getElementById('btnVerificar').addEventListener('click', verificarMensaje);
document.getElementById('btnVerificarAlterado').addEventListener('click', verificarAlterado);

async function generarClaves() {
    const btn = document.getElementById('btnGenerarClaves');
    const result = document.getElementById('resultClaves');
    
    btn.disabled = true;
    btn.textContent = 'Generating...';
    
    try {
        const response = await fetch(`${API_URL}/generar-claves`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            result.className = 'result show success';
            result.innerHTML = `
                <strong>${data.message}</strong>
                <pre>Public Key:\n${data.public_key.substring(0, 100)}...</pre>
                <pre>Private Key:\n${data.private_key.substring(0, 100)}...</pre>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Generate RSA Keys';
    }
}

async function firmarMensaje() {
    const btn = document.getElementById('btnFirmarMensaje');
    const result = document.getElementById('resultFirma');
    const mensaje = document.getElementById('mensajeRemitente').value;
    
    if (!mensaje.trim()) {
        result.className = 'result show error';
        result.innerHTML = '<strong>Error:</strong> Enter a message';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Signing...';
    
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
                <pre>Signature: ${data.firma.substring(0, 80)}...</pre>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Sign Message';
    }
}

async function verificarMensaje() {
    const btn = document.getElementById('btnVerificar');
    const result = document.getElementById('resultVerificar');
    
    btn.disabled = true;
    btn.textContent = 'Verifying...';
    
    try {
        const response = await fetch(`${API_URL}/verificar-mensaje`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            result.className = `result show ${data.valida ? 'success' : 'error'}`;
            result.innerHTML = `
                <strong>${data.message}</strong>
                <pre>Message: ${data.mensaje}</pre>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        result.className = 'result show error';
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Verify Message';
    }
}

async function verificarAlterado() {
    const btn = document.getElementById('btnVerificarAlterado');
    const result = document.getElementById('resultAlterado');
    const mensajeAlterado = document.getElementById('mensajeAlterado').value;
    
    if (!mensajeAlterado.trim()) {
        result.className = 'result show error';
        result.innerHTML = '<strong>Error:</strong> Enter an altered message';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Verifying...';
    
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
                <strong>Verification Results:</strong>
                <div style="margin-top: 10px;">
                    <strong style="color: ${data.original.valida ? '#22543d' : '#742a2a'}">Original Message:</strong>
                    <pre>${data.original.estado}</pre>
                    <pre>Message: ${data.original.mensaje}</pre>
                </div>
                <div style="margin-top: 15px;">
                    <strong style="color: ${data.alterado.valida ? '#22543d' : '#742a2a'}">Altered Message:</strong>
                    <pre>${data.alterado.estado}</pre>
                    <pre>Message: ${data.alterado.mensaje}</pre>
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
        btn.textContent = 'Verify Altered Message';
    }
}