# Search for recently modified image files across common locations
$locations = @(
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\Pictures",
    "$env:USERPROFILE\Documents",
    "$env:LOCALAPPDATA\Temp",
    "$env:APPDATA",
    "$env:LOCALAPPDATA\Google",
    "$env:LOCALAPPDATA\Programs",
    "C:\Users\niksh\.gemini"
)

$cutoff = (Get-Date).AddMinutes(-30)

foreach ($loc in $locations) {
    if (Test-Path $loc) {
        Get-ChildItem -Path $loc -Include "*.png","*.jpg","*.jpeg","*.webp" -Recurse -Depth 4 -ErrorAction SilentlyContinue |
            Where-Object { $_.LastWriteTime -gt $cutoff -and $_.Length -gt 20000 } |
            Select-Object FullName, Length, LastWriteTime
    }
}
