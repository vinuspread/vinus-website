Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\nonte\.gemini\antigravity\brain\17d00a65-fbf8-4cb5-9d24-dd71036a8ebb\about_vertical_glass_1778998756850.png")
$newHeight = [int]($img.Width * 2.5)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)

$bmpOriginal = New-Object System.Drawing.Bitmap($img)
$bgColor = $bmpOriginal.GetPixel(0, 0)

$graphics.Clear($bgColor)
$y = [int](($newHeight - $img.Height) / 2)
$graphics.DrawImage($img, 0, $y, $img.Width, $img.Height)
$img.Dispose()
$bmpOriginal.Dispose()
$bmp.Save("e:\Work\vinus\public\images\about_vertical_glass.png", [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bmp.Dispose()
