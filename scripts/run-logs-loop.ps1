# Runs fetch-vercel-logs.js immediately, then every hour indefinitely.
# Launched hidden at login by YashirVercelLogs.vbs in the startup folder.

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$fetchScript = Join-Path $scriptDir "fetch-vercel-logs.js"
$logDir      = Join-Path (Split-Path $scriptDir) "vercel-logs"
$logFile     = Join-Path $logDir "loop.log"

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

while ($true) {
    $timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    Add-Content -Path $logFile -Value "[$timestamp] Running fetch..."
    & node $fetchScript 2>&1 | Add-Content -Path $logFile
    Start-Sleep -Seconds 3600
}
