@echo off
rem Inicia el backend (API) en segundo plano, sin ventana
start "" /B cmd /c "cd backend && python server.py"

rem Pequeña pausa para que el backend inicie
timeout /t 2 /nobreak > nul

rem Inicia el frontend (servidor web) en segundo plano, sin ventana
start "" /B cmd /c "cd frontend && python -m http.server 8000"

rem Pequeña pausa para que el frontend inicie
timeout /t 2 /nobreak > nulS

rem Abre el navegador apuntando SOLAMENTE al frontend
start http://localhost:8000

rem Mantiene esta ventana abierta para poder cerrarla al final
pause > nul