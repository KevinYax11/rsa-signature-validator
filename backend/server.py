from flask import Flask, request, jsonify
from flask_cors import CORS
import rsa
import os
import base64

app = Flask(__name__)
CORS(app)

@app.route('/generar-claves', methods=['POST'])
def generar_claves():
    public_key, private_key = rsa.newkeys(512)
    
    with open("clave_publica.pem", "wb") as f:
        f.write(public_key.save_pkcs1("PEM"))
    
    with open("clave_privada.pem", "wb") as f:
        f.write(private_key.save_pkcs1("PEM"))
    
    return jsonify({
        "success": True,
        "message": "Claves generadas y guardadas",
        "public_key": public_key.save_pkcs1("PEM").decode('utf-8'),
        "private_key": private_key.save_pkcs1("PEM").decode('utf-8')
    })

@app.route('/firmar-mensaje', methods=['POST'])
def firmar_mensaje():
    data = request.json
    mensaje_texto = data.get('mensaje')
    
    if not os.path.exists("clave_privada.pem"):
        return jsonify({"success": False, "message": "Primero genera las claves"}), 400
    
    with open("clave_privada.pem", "rb") as f:
        private_key = rsa.PrivateKey.load_pkcs1(f.read())
    
    mensaje = mensaje_texto.encode('utf-8')
    firma = rsa.sign(mensaje, private_key, "SHA-256")
    
    with open("mensaje.txt", "wb") as f:
        f.write(mensaje)
    
    with open("firma.bin", "wb") as f:
        f.write(firma)
    
    return jsonify({
        "success": True,
        "message": "Mensaje firmado correctamente",
        "firma": base64.b64encode(firma).decode('utf-8')
    })

@app.route('/verificar-mensaje', methods=['POST'])
def verificar_mensaje():
    if not os.path.exists("clave_publica.pem"):
        return jsonify({"success": False, "message": "No existe clave publica"}), 400
    
    with open("clave_publica.pem", "rb") as f:
        public_key = rsa.PublicKey.load_pkcs1(f.read())
    
    with open("mensaje.txt", "rb") as f:
        mensaje = f.read()
    
    with open("firma.bin", "rb") as f:
        firma = f.read()
    
    try:
        rsa.verify(mensaje, firma, public_key)
        return jsonify({
            "success": True,
            "valida": True,
            "message": "La firma es valida. El mensaje proviene del remitente autentico.",
            "mensaje": mensaje.decode('utf-8')
        })
    except rsa.VerificationError:
        return jsonify({
            "success": True,
            "valida": False,
            "message": "La firma no es valida. El mensaje pudo haber sido alterado.",
            "mensaje": mensaje.decode('utf-8')
        })

@app.route('/verificar-alterado', methods=['POST'])
def verificar_alterado():
    data = request.json
    mensaje_alterado_texto = data.get('mensaje_alterado')
    
    if not os.path.exists("clave_publica.pem"):
        return jsonify({"success": False, "message": "No existe clave publica"}), 400
    
    with open("clave_publica.pem", "rb") as f:
        public_key = rsa.PublicKey.load_pkcs1(f.read())
    
    with open("mensaje.txt", "rb") as f:
        mensaje_original = f.read()
    
    with open("firma.bin", "rb") as f:
        firma = f.read()
    
    try:
        rsa.verify(mensaje_original, firma, public_key)
        original_valida = True
        mensaje_original_estado = "La firma es valida. El mensaje no fue alterado."
    except rsa.VerificationError:
        original_valida = False
        mensaje_original_estado = "La firma no es valida en el mensaje original."
    
    mensaje_alterado = mensaje_alterado_texto.encode('utf-8')
    
    try:
        rsa.verify(mensaje_alterado, firma, public_key)
        alterado_valida = True
        mensaje_alterado_estado = "Firma valida (esto no deberia pasar)."
    except rsa.VerificationError:
        alterado_valida = False
        mensaje_alterado_estado = "Firma no valida. El mensaje fue modificado y la verificacion falla."
    
    return jsonify({
        "success": True,
        "original": {
            "valida": original_valida,
            "mensaje": mensaje_original.decode('utf-8'),
            "estado": mensaje_original_estado
        },
        "alterado": {
            "valida": alterado_valida,
            "mensaje": mensaje_alterado_texto,
            "estado": mensaje_alterado_estado
        }
    })

