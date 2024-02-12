---
categories:
  - Notiz
status: Referenzen
project:
  - Arbeitsplatzorganisation
---
```sh
sudo codesign --remove-signature "/Applications/Microsoft Teams.app"
sudo codesign --remove-signature "/Applications/Microsoft Teams.app/Contents/Frameworks/Microsoft Teams Helper.app"
sudo codesign --remove-signature "/Applications/Microsoft Teams.app/Contents/Frameworks/Microsoft Teams Helper (Renderer).app"
```

```sh
sudo codesign --remove-signature "/Applications/Skype.app"
sudo codesign --remove-signature "/Applications/Skype.app/Contents/Frameworks/Skype Helper.app"
sudo codesign --remove-signature "/Applications/Skype.app/Contents/Frameworks/Skype Helper (Renderer).app"
```

```sh
sudo codesign --remove-signature "/Applications/Discord.app"
sudo codesign --remove-signature "/Applications/Discord.app/Contents/Frameworks/Discord Helper.app"
sudo codesign --remove-signature "/Applications/Discord.app/Contents/Frameworks/Discord Helper (GPU).app"
sudo codesign --remove-signature "/Applications/Discord.app/Contents/Frameworks/Discord Helper (Renderer).app"
```