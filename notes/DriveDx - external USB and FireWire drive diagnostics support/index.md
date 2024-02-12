---
categories:
  - Webseite
status: gefunden
source: https://binaryfruit.com/drivedx/usb-drive-support
project:
  - Homeassistant
---
### You need to install special driver to perform diagnostics of external drives.

Mac OS X does not support diagnosing external drives using S.M.A.R.T. technology “out of the box” . In order to allow your Mac to diagnose external drives, you will need to install a special third party driver. Please note that this is a requirement of Mac OS X, and not DriveDx.

The standalone version of DriveDx includes this driver. But users also can download and install (other version of) driver by themselves. See installation instructions bellow .

Despite that [some](http://sourceforge.net/apps/trac/smartmontools/wiki/Supported_USB-Devices) modern external USB/FireWire drive enclosures correctly send [S.M.A.R.T.](http://en.wikipedia.org/wiki/S.M.A.R.T) data over those interfaces, this technology is named [SAT](http://en.wikipedia.org/wiki/SCSI_/_ATA_Translation) (SCSI / ATA Translation), – **unfortunately Mac OS X doesn’t support this feature out of the box** .

![[DriveDx-dashboard-USB-drives-not-supported.png]]

**If you want to perform external drive diagnostics on OS X – currently there is only one option – you can install 3rd party kernel extension –** [**SAT SMART Driver**](https://github.com/kasbert/OS-X-SAT-SMART-Driver)**.** SAT SMART Driver is free open source project (published under Apple Public Source License) by Jarkko Sonninen. It is hosted on [GitHub](https://github.com/kasbert/OS-X-SAT-SMART-Driver).

Driver installer package availble on our site is specially signed by us, this will simplify installation process and make it “hassle-free” on OS X 10.9 (Mavericks) and later.

macOS High Sierra 10.13 introduces a new feature that requires user approval before loading newly-installed third-party drivers. If you are using macOS High Sierra – please follow our [instructions](https://binaryfruit.com/drivedx/kb) .

### INSTALLATION INSTRUCTIONS

### UNINSTALL INSTRUCTIONS

### IMPORTANT NOTES

- SAT SMART Driver is external 3rd party project and it is not officially supported by BinaryFruit
- Driver installer availble on our site is specially signed by us, this will simplify installation process and make it “hassle-free” on OS X 10.9 (Mavericks) and later
- Installation of kernel extensions potentially may make your Mac unstable (but currently there are no any known serious issues/problems)
- You could check actual list of known issues [here](https://github.com/kasbert/OS-X-SAT-SMART-Driver/issues?page=1&state=open). If you will have any problems with this kernel extension – please submit description of your issue [here](https://github.com/kasbert/OS-X-SAT-SMART-Driver/issues)
- Some external drive enclosures don’t support “SCSI / ATA Translation” technology, so installing of this kernel extension will not help in this case. You can find more information about enclosures compatibility [here](http://www.smartmontools.org/wiki/Supported_USB-Devices)
- Even if drive enclosure allow health diagnostics, current version of SAT SMART Driver may not support it. In this case you could submit [an issue to developer](https://github.com/kasbert/OS-X-SAT-SMART-Driver/issues).