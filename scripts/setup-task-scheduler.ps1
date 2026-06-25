# Registers a Windows Task Scheduler job to fetch Vercel logs every hour.
# Run in a normal PowerShell window (no admin needed):
#   cd "C:\Users\urioh\.claude\Projects\self delivering restaurans dashboard\scripts"
#   .\setup-task-scheduler.ps1

$taskName  = "YashirVercelLogs"
$scriptDir = "C:\Users\urioh\.claude\Projects\self delivering restaurans dashboard\scripts"
$logFile   = "C:\Users\urioh\.claude\Projects\self delivering restaurans dashboard\vercel-logs\task-scheduler.log"
$nodeExe   = (Get-Command node -ErrorAction Stop).Source

# Build the action: node fetch-vercel-logs.js >> task-scheduler.log 2>&1
$action = New-ScheduledTaskAction `
    -Execute $nodeExe `
    -Argument "`"$scriptDir\fetch-vercel-logs.js`" >> `"$logFile`" 2>&1" `
    -WorkingDirectory $scriptDir

# Run every hour, starting now
$trigger = New-ScheduledTaskTrigger -RepetitionInterval (New-TimeSpan -Hours 1) -Once -At (Get-Date)

# Runs only when you're logged in (Interactive — no password needed)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest

$settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 5) `
    -RestartCount 1 `
    -RestartInterval (New-TimeSpan -Minutes 2)

# Register (or update if already exists)
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}
try {
    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Principal $principal `
        -Settings $settings `
        -Description "Fetches Vercel runtime logs for yashir-tlv every hour and saves to vercel-logs/" `
        -ErrorAction Stop | Out-Null
} catch {
    Write-Host ""
    Write-Host "FAILED to register task: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Task '$taskName' registered. It will run every hour while you're logged in." -ForegroundColor Green
Write-Host "To run it immediately: Start-ScheduledTask -TaskName '$taskName'"
Write-Host "To check status:       Get-ScheduledTask -TaskName '$taskName' | Get-ScheduledTaskInfo"
Write-Host "To remove it:          Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"
