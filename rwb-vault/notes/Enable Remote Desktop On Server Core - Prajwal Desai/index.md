---
categories:
  - Webseite
status: gefunden
source: https://www.prajwaldesai.com/enable-remote-desktop-on-server-core/
project:
  - Portfolio-von-Software-definieren
---
![[SCCM-Console-Install-Failed-with-Error-1618_ftimg.png]]

Enable Remote Desktop on Server Core 1

After you install Windows Server core, you may want to enable remote desktop on Server. By default, Remote Desktop feature is disabled on Windows Server core. We will look at the steps to enable it.

While the Windows Server core doesn’t have a GUI, you can still enable RDP on it. On Windows Server core, you can use the Server Configuration tool (Sconfig.cmd) to configure and manage several aspects of Server Core installations. However note that you must be a member of the Administrators group to use the tool.

One of previous post talks about Windows Server Core [SConfig Options](https://www.prajwaldesai.com/windows-server-core-sconfig-options/) and joining [windows server core to domain](https://www.prajwaldesai.com/how-to-join-a-windows-server-core-to-domain/). It might be worth reading those post as they are related to [Windows Server 2019](https://www.prajwaldesai.com/install-configure-wsus-on-windows-server-2019/) core.

## Enable Remote Desktop on Server Core

Following are the steps to enable remote desktop on Windows Server core.

Start the Server Configuration Tool, login to your Windows Server ([2016/2019](https://docs.microsoft.com/en-us/windows-server/get-started/sconfig-on-ws2016)) core. Type **SConfig** and press Enter.

You will find a list of options under Server Configuration. From the list, take a look at option 7 which is for Remote Desktop. Notice that Remote Desktop is currently **Disabled**.

Press 7 and hit enter. The next line that you see lets you **Enable** or **Disable** remote desktop. To enable the remote desktop, type **E** and press enter key.

Now you see two options :-

- Allow only clients running Remote Desktop with Network Level Authentication (more secure)
- Allow clients running any version of Remote Desktop (less secure)

Type **1** and press **Enter**. You get a confirmation box for enabling Remote Desktop. Click **OK**.

Now take a look at option 7, it shows **Remote Desktop Enabled (more secure clients only)**.

In the next step we will enable the firewall to allow the remote desktop. Type 15 which is an exit to command line.

Now type the below command and press enter key.

**netsh advfirewall firewall set rule group=”remote desktop” new enable=Yes**

You get a line that reads Updated 3 rules.