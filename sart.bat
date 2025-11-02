@echo off
echo Iniciando RSA Signature Validator...
echo.

start cmd /k "cd backend && python server.py"

timeout /t 2 /nobreak > nul

start cmd /k "cd frontend && python -m http.server 8000"

timeout /t 2 /nobreak > nul

start http://localhost:8000

echo.
echo Aplicacion iniciada!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:8000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul