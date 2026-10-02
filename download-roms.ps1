# Download free homebrew ROM files from legal sources
# Run this script to populate the roms/ directory

$romsDir = "roms"
if (!(Test-Path $romsDir)) { New-Item -ItemType Directory -Path $romsDir }

Write-Host "Downloading free homebrew games..."
Write-Host "Source: Internet Archive (legal, free distribution)"

# Tobu Tobu Girl Deluxe - MIT + CC BY 4.0 license
# Source: https://archive.org/details/tobudx
$tobuUrl = "https://archive.org/download/tobudx/tobudx.gb"
$tobuPath = Join-Path $romsDir "tobutobugirl-dx.gb"

Write-Host "Downloading Tobu Tobu Girl Deluxe..."
try {
    Invoke-WebRequest -Uri $tobuUrl -OutFile $tobuPath -ErrorAction Stop
    Write-Host "Downloaded: $tobuPath"
} catch {
    Write-Host "Failed to download. Please download manually from:"
    Write-Host "https://archive.org/details/tobudx"
    Write-Host "and save as: $tobuPath"
}

Write-Host ""
Write-Host "Done! Check the roms/ directory."
Write-Host ""
Write-Host "Legal reminder:"
Write-Host "- Only free and open source games are allowed"
Write-Host "- Keep license documentation for each game"
Write-Host "- Remove games immediately upon creator request"
