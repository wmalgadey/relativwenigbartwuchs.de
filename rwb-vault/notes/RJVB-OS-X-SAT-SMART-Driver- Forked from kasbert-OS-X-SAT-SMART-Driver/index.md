---
categories:
  - Webseite
status: gefunden
source: https://github.com/RJVB/OS-X-SAT-SMART-Driver
project:
  - Homeassistant
---
![[OS-X-SAT-SMART-Driver]]

```
OS X SAT SMART Driver
#####################

This is a kernel driver for Mac OS X external USB or FireWire drives.
It extends the standard driver behaviour by providing access to drive
SMART data. The interface to SMART data is same as with ATA family
driver, so most existing applications should work.

The driver requires a SAT (SCSI ATA Translation) capable external
drive enclosure. Check smartmontools list for supported devices:
http://smartmontools.org/wiki/Supported_USB-Devices
If the Option column contains sat or jmicron, the driver should work.
The driver should work with Snow Leopard and Lion and Mountain Lion.
People have reported problems with Lion and Encrypted volumes.
Some enclosures are reported to work with FireWire but not with USB.
The driver is not compatible to WD Drive Manager, or enclosures
with custom kernel extensions.

Note for Yosemite (Mac OS X 10.10) users:
Try first version 0.8. If it works for you, then just use it.
If not or you want to try newer version or participate on development,
then you must allow unsigned kernel extensions with command:
  sudo nvram boot-args="kext-dev-mode=1"

The code is based on Apple opensource files and is therefore published
under Apple Public Source License. For details see
http://www.opensource.apple.com/license/apsl/

Install
=======

 * Unmount external drives
 * Use the dmg image and the installer
 * Check DiskUtility. The disks should have "S.M.A.R.T. Status: Verified"


Uninstall
=========

 * Remove driver and plugin
    sudo rm -r /System/Library/Extensions/SATSMARTDriver.kext
    sudo rm -r /System/Library/Extensions/SATSMARTLib.plugin
    sudo rm -r /Library/Extensions/SATSMARTDriver.kext
    sudo rm -r /Library/Extensions/SATSMARTLib.plugin
 * Reboot


Adding enclosure identification
===============================

Check, if the enclosure is identified using shell:

ioreg -r -w 0 -c fi_dungeon_driver_IOSATDriver  | egrep 'Enclosure|PassThroughMode|Capable'|grep -v Identifiers
  |   "Enclosure Name" = "Unknown 0928:000a"
  |   "SATSMARTCapable" = Yes
  |   "PassThroughMode" = "sat16"

Add an issue to GitHub.

Compile
=======

 * Compile all targets
    make package
    Or, xcodebuild (use -sdk macosx10.9 on Mac OS X 10.9 to force the use of the platform SDK -
    it may be wise to do the equivalent on other OS versions).

 * Unmount all existing external drives.

 * Load the kernel extension.
    sudo tail -f /private/var/log/kernel.log &
    sudo make install

 * The external drives should mount automatically.

 * Test
    cd SATSMARTDriver/build/Debug/
    ./smart_status
    ./smart_sample -a

 * Check DiskUtility. The disk should have "S.M.A.R.T. Status: Verified"

 * Install the driver to system permanently
    sudo make realinstall

 * Reboot

 * If you want to limit the driver for certain hardware add product
   and vendor identification to SATSMARTDriver/Info.plist.
   Check chapter "Adding enclosure identification"
```