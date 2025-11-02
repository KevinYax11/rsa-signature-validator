import rsa

with open("clave_publica.pem", "rb") as f:
    public_key = rsa.PublicKey.load_pkcs1(f.read())

with open("mensaje.txt", "rb") as f:
    mensaje = f.read()

with open("firma.bin", "rb") as f:
    firma = f.read()

try:
    rsa.verify(mensaje, firma, public_key)
    print("La firma es valida. El mensaje proviene del remitente autentico.")
except rsa.VerificationError:
    print("La firma no es valida. El mensaje pudo haber sido alterado.")

print("Mensaje recibido:", mensaje.decode('utf-8'))