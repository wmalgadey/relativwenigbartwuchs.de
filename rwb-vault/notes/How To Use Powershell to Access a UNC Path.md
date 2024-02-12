---
source: https://www.danielengberg.com/powershell-using-psdrives-to-browse-a-unc-path-from-the-shell/
---
## Introduction

Traditionally, mapping a shared folder on a network drive on a remote computer has been carried out on the local computer through the Windows File Explorer or the net use command in the CMD.

In this blog post, I explain how!

## What are PSDrives?

In Powershell, you can use PSDrives to create temporary drives in the shell.

In this blog post, I explain the scenario if you want to map a UNC drive in the current session.

## How to access a network folder using Powershell

### Method \#1 – Map a temporary network drive using PSDrives

You can browse a UNC path in [Powershell](https://danielengberg.com/powershell-how-to-run-rsop-for-a-user-and-get-a-nice-clean-html-output/) to temporarily map a network drive in the current Powershell session using the PSDrive CMDLet. Note that this method is sessions specific, and the mapping will be lost when you close the Powershell session.

Use this command to mount the network path \\server\share to P:

### Method \#2 – Create a persistent mapped network drive using PSDrives

Suppose you don’t want to map a network drive in the running Powershell session temporarily. In that case, you can also create a mapped drive after closing the current session with the Persistent parameter. This will be similar to mounting a network drive in Windows Explorer.

### Method \#3 – Use the traditional Powershell CMDLet

The other method of working with network paths in [Powershell](https://danielengberg.com/how-to-run-powershell-as-an-administrator/) is to use the regular [Powershell](https://danielengberg.com/powershell-copy-a-file-to-a-directory-that-does-not-exist/) CMDlets.

The following CMDlets work natively with UNC paths:

Examples:

## Conclusion

Which method do you use for browsing and managing network paths in [Powershell](https://danielengberg.com/powershell-tip-quick-command-to-open-current-directory-in-windows-explorer-when-in-powershell/)? Please leave a comment below!

## References