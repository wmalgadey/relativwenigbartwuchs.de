---
source: https://www.mssqltips.com/sqlservertip/5612/getting-started-with-sql-server-2017-express-localdb/
---
### Problem

In a [previous tip](https://www.mssqltips.com/sqlservertip/2694/getting-started-with-sql-server-2012-express-localdb/), I walked through installation and some caveats with the first version of SqlLocalDb, which shipped with SQL Server 2012. Well, it’s been several major releases, and some of the aspects have changed, so I thought I would provide a refresh.

The purpose of SqlLocalDb has remained constant: To provide developers with an easy way to develop with SQL Server locally, on Windows, without the overhead, security, and maintenance of a full-time, proper instance. But for anyone who has used SQL Server and is new to SqlLocalDb, a few of the details are unintuitive.

### Solution

The first step is making sure you’re on a supported operating system (Windows 8 / Server 2012 or above), and then download the SQL Server Express Edition installer [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads-free-trial). I am using Windows 10 in these examples; if you are using Windows 8 or Windows Server 2012, make sure to consult [KB #2681562 : Installing SQL Server on Windows Server 2012 or Windows 8](http://support.microsoft.com/kb/2681562). If you’re using Linux, sorry, but I think you’re out of luck.

## Step 1: Install Microsoft SQL Server Express Localdb

To get just the SqlLocalDb MSI (45 MB) vs. the whole enchilada (700+ MB), choose the “Download Media” option to start downloading:

![[5612_getting-started-with-sql-server-2017-express-localdb.001.png]]

Pick your language, choose the LocalDB option, and pick a location to download the MSI:

![[5612_getting-started-with-sql-server-2017-express-localdb.002.png]]

Then you’ll get a very big dialog to indicate success. Choose the Open Folder option:

![[5612_getting-started-with-sql-server-2017-express-localdb.003.png]]

The folder will open, and you will see SqlLocalDB.msi. Launch this executable to start the wizard:

![[5612_getting-started-with-sql-server-2017-express-localdb.004.png]]

You’ll have to accept a license agreement and then on the next screen click Install:

![[5612_getting-started-with-sql-server-2017-express-localdb.005.png]]

At some point you will probably be prompted by UAC controls:

![[5612_getting-started-with-sql-server-2017-express-localdb.006.png]]

Then it will finish:

![[5612_getting-started-with-sql-server-2017-express-localdb.007.png]]

Alternatively, if you already have a valid SQL Server 2017 install media, you can install SqlLocalDb from that installer, and avoid downloading the media above. Run Setup.exe and from the Installation Center choose “New SQL Server stand-alone installation or add features to an existing SQL Server 2017 instance.”

![[5612_getting-started-with-sql-server-2017-express-localdb.008.png]]

Next, you’ll be offered to include any important updates (you should check this box unless you are on a very slow Internet connection – but don’t worry, we’re going to patch this installation with the latest Cumulative Update anyway):

![[5612_getting-started-with-sql-server-2017-express-localdb.009.png]]

Next, you’ll choose the type of installation to perform; you want “a new installation of SQL Server 2017,” even though that choice may not be the most intuitive:

![[5612_getting-started-with-sql-server-2017-express-localdb.010.png]]

You’ll have to accept the license terms in a new dialog, and then you’ll be asked for a product key. Here, just select the free Express Edition (other editions won’t offer a LocalDB installation):

![[5612_getting-started-with-sql-server-2017-express-localdb.011.png]]

Then on the Feature Selection screen, make sure you un-check the Database Engine Services option, which is selected by default (unless you also want to install a full-on SQL Server 2017 instance).

![[5612_getting-started-with-sql-server-2017-express-localdb.012.png]]

Then scroll down and select the LocalDB option (I also selected Client Tools Connectivity).

![[5612_getting-started-with-sql-server-2017-express-localdb.013.png]]

Click Next, Install, and then you should have this:

![[5612_getting-started-with-sql-server-2017-express-localdb.014.png]]

## Step 2: Patch Microsoft SQL Server 2017

Before you get started using SqlLocalDb, you should patch SQL Server 2017 to the latest Cumulative Update. The reason is that there was initially a critical bug that prevented the creation of database files due to a missing slash in the file path.

This problem was fixed in CU \#6 (see [KB #4096875](https://support.microsoft.com/en-us/help/4096875/fix-access-is-denied-error-when-you-try-to-create-a-database-in-sql-se)), but at the time of writing, the latest Cumulative Update available was CU \#9. You should typically use the latest CU available; you can always [get the latest CU here](https://www.microsoft.com/en-us/download/details.aspx?id=56128).

At the beginning of the install it will not indicate anything about SqlLocalDb, but just check all the boxes you can and proceed. At the end you will see confirmation that SqlLocalDb has been patched (in this case I also updated a SQL Server 2017 instance from CU \#8 to CU \#9):

![[5612_getting-started-with-sql-server-2017-express-localdb.015.png]]

## Step 3: Install client tools and/or SQLCMD and/or PowerShell

If you don’t already have [SSMS](https://www.mssqltips.com/sql-server-tip-category/52/sql-server-management-studio/), or another way to connect to the SQL Server database, you’re not going to get very far. Rather than guide through the full installation I’ll just point you to the locations to get the most recent versions:

- Latest version of Management Studio (17.8.1 at time of writing): [https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
- Latest version of SQLCMD (Command Line Utilities 14.0 at time of writing): [https://www.microsoft.com/en-us/download/details.aspx?id=53591](https://www.microsoft.com/en-us/download/details.aspx?id=53591)
- Installing Windows PowerShell: [https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell](https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell)

## Step 4: Create an localdb instance via SQLLocalDB Command Line

At the command line, you can interact using the SqlLocalDb utility to configure the instance of localdb. Start with getting information about the installation:

Result:

This used to return the localdb version number (in the original article, and with the 2012 release, this returned v11.0.

Next, you can create an instance with the following command:

Result:

Check the info:

Result:

The Instance pipe name may come in handy later, though I’ve found that a lot of the connectivity issues in earlier versions of this feature have gone away. Also, in older versions you had to explicitly start the instance, but it now starts automatically.

If you want to stop and drop the instance, use:

But don’t do that just yet. Evidence that this all works so far:

![[5612_getting-started-with-sql-server-2017-express-localdb.016.png]]

## Connection String for SQLCMD

Locate [SQLCMD](https://www.mssqltips.com/sqlservertip/4923/introduction-to-sql-servers-sqlcmd-utility/), making sure to use the newest version on your machine (your environment path may list an older version first). Look for the highest version in the Binn folders under C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\[version]\Tools\. You can connect to this instance using Windows authentication with the following code at the command line:

Then we’re greeted with a line number prompt and can enter sql code on-demand. So something like:

Yields:

![[5612_getting-started-with-sql-server-2017-express-localdb.017.png]]

## Connect using Microsoft SQL Server Management Studio

Like with [SQLCMD](https://www.mssqltips.com/sqlservertip/4923/introduction-to-sql-servers-sqlcmd-utility/), you can connect using (localdb)\MyInstance from SSMS as well (in older versions you needed the pipe name I mentioned above):

![[5612_getting-started-with-sql-server-2017-express-localdb.018.png]]

When you open Object Explorer, you’ll see the database and table we created, and you can interact with the instance just like any other SQL Server instance (with obvious exceptions, for example there is no SQL Server Agent node under Management):

![[5612_getting-started-with-sql-server-2017-express-localdb.019.png]]

## Connection String using PowerShell

Modern versions of [PowerShell](https://www.mssqltips.com/sql-server-tip-category/81/powershell/) are also able to connect to LocalDB instances using the simple instance name format. With my default installation, though, I found I still needed to manually load SMO before it would connect and interact.

Proof it works:

![[5612_getting-started-with-sql-server-2017-express-localdb.020.png]]

## Conclusion

I hope this gives you a head start into playing with SqlLocalDb for local development. It can be a really useful way to build out a proof of concept or test a query or feature without installing a full-blown SQL Server instance.

Last Updated: 2021-01-29

### About the author