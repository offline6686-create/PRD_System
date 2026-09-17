# Script PowerShell de administracion del stack Docker local de C:/PRD_System
param (
    [string]$Action = "status"
)

$DockerFile = Join-Path $PSScriptRoot "docker-compose.yml"

switch ($Action.ToLower()) {
    "up" {
        Write-Host "[PRD-SYSTEM] Levantando contenedores de infraestructura local..." -ForegroundColor Green
        docker-compose -f $DockerFile up -d
    }
    "down" {
        Write-Host "[PRD-SYSTEM] Deteniendo contenedores..." -ForegroundColor Yellow
        docker-compose -f $DockerFile down
    }
    "status" {
        Write-Host "[PRD-SYSTEM] Estado actual de la infraestructura local:" -ForegroundColor Cyan
        docker-compose -f $DockerFile ps
    }
    Default {
        Write-Host "Uso: .\manage_stack.ps1 -Action [up|down|status]" -ForegroundColor White
    }
}
