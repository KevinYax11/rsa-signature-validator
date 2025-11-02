import rsa

with open("clave_publica.pem", "rb") as f:
    public_key = rsa.PublicKey.load_pkcs1(f.read())

with open("mensaje.txt", "rb") as f:
    mensaje_original = f.read()

with open("firma.bin", "rb") as f:
    firma = f.read()

print("Verificando mensaje original:")
try:
    rsa.verify(mensaje_original, firma, public_key)
    print("La firma es valida. El mensaje no fue alterado.\n")
except rsa.VerificationError:
    print("La firma no es valida en el mensaje original.\n")

mensaje_alterado = b"Autorizo el acceso al sistema (modificado por alguien)"

print("Verificando mensaje alterado:")
try:
    rsa.verify(mensaje_alterado, firma, public_key)
    print("Firma valida (esto no deberia pasar).")
except rsa.VerificationError:
    print("Firma no valida. El mensaje fue modificado y la verificacion falla.\n")

print("Mensaje original  :", mensaje_original.decode('utf-8'))
print("Mensaje alterado :", mensaje_alterado.decode('utf-8'))