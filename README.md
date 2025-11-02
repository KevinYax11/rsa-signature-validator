# 🛡️ Sistema de Firma Digital RSA

Este es un mini proyecto que demuestra el funcionamiento de las firmas digitales RSA a través de una interfaz web interactiva.

La aplicación permite a un 'remitente' generar un par de claves (pública y privada), firmar un mensaje con su clave privada, y a un 'receptor' verificar la autenticidad de ese mensaje usando la clave pública. También incluye un módulo para demostrar cómo la verificación falla si el mensaje es alterado.

## 🚀 Características

* **Generación de Claves:** Crea un par de claves RSA (pública y privada) de 512 bits.
* **Firma de Mensajes:** Genera una firma digital para un mensaje usando la clave privada y el algoritmo SHA-256.
* **Verificación de Firma:** Comprueba si una firma es válida para un mensaje usando la clave pública.
* **Detección de Alteraciones:** Demuestra cómo una firma se invalida si el contenido del mensaje original es modificado.
* **Interfaz Unificada:** El servidor de backend (Flask) sirve tanto la API como la interfaz web del frontend.

## 📋 Requisitos Previos

Necesitarás tener instalado lo siguiente en tu sistema:
* Python 3.x
* pip (el gestor de paquetes de Python)

## ⚙️ Pasos para la Ejecución

Sigue estos pasos para instalar las dependencias y ejecutar el programa.

### 1. Instalación de Dependencias

El proyecto depende de algunas bibliotecas de Python listadas en `backend/requirements.txt`.

1.  Abre una terminal o línea de comandos.
2.  Navega hasta la carpeta `backend` del proyecto.
    ```sh
    cd ruta/del/proyecto/backend
    ```
3.  Instala las dependencias usando `pip`:
    ```sh
    pip install -r requirements.txt
    ```
    Esto instalará `Flask`, `flask-cors` y `rsa`.

### 2. Ejecutar el Servidor

Para ejecutar el programa, **solo ocupas abrir el archivo `.bat`**. asi se abrira el servidor de la aplicación.

1.  Asegúrate de estar todavía en la carpeta del proyecto.
2.  Ejecuta el archivo `start.bat`.
    ```sh
    start.bat
    ```
3. Esto automáticamente te abrira el navegador con la aplicación web.

## 🕹️ Cómo Usar la Aplicación

La interfaz se divide en tres módulos que simulan el flujo de una firma digital.

1.  **Módulo Remitente:**
    * Haz clic en **"Generar Claves RSA"**. Esto creará los archivos `clave_publica.pem` y `clave_privada.pem` dentro de tu carpeta `backend`.
    * Escribe un mensaje (ej: "Hola Mundo") en el área de texto y haz clic en **"Firmar Mensaje"**. Esto creará los archivos `mensaje.txt` y `firma.bin`.

2.  **Módulo Receptor:**
    * Haz clic en **"Verificar Mensaje"**. El servidor leerá los archivos `mensaje.txt`, `firma.bin` y `clave_publica.pem` para confirmar que la firma es auténtica. Deberías ver un mensaje de éxito.

3.  **Módulo de Detección de Alteración:**
    * Escribe un mensaje **diferente** al que firmaste (ej: "Hola Mundo 2").
    * Haz clic en **"Verificar Mensaje Alterado"**. El servidor intentará verificar este *nuevo* mensaje con la firma *original*. La verificación fallará, demostrando que el mensaje fue alterado.W