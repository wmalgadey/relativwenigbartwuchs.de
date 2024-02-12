---
categories:
  - Webseite
status: gefunden
source: https://github.com/microsoft/ApplicationInsights-aspnetcore/issues/822
project:
  - Application-Insight-SQL-Queries
---
[![](https://opengraph.githubassets.com/5e4e9e950953d0f04ac465d77716a62ee6c610af1144ad0701bc0413f4cbd736/microsoft/ApplicationInsights-aspnetcore/issues/822)](https://opengraph.githubassets.com/5e4e9e950953d0f04ac465d77716a62ee6c610af1144ad0701bc0413f4cbd736/microsoft/ApplicationInsights-aspnetcore/issues/822)

---

Since ASP.NET Core 2.2 was released in December 2018 the docs were updated to state that Applicaiton Insights now fully supports SQL Dependencies. See "Application Insights SDK Comparison" section here: [https://docs.microsoft.com/en-us/azure/azure-monitor/app/asp-net-core](https://docs.microsoft.com/en-us/azure/azure-monitor/app/asp-net-core)

Additionally on the same page under troubleshooting for "SQL query not shown in full" it says all that is necessary is " upgrade your application to .NET framework 4.6 or later and install the Application Insights SDK in your app." which I have done.

I am aware that previously you needed status monitor installed as indicated here:

![[50910312-3ca8dd80-1436-11e9-834d-eb9822d995bc.png]]

[#705](https://github.com/microsoft/ApplicationInsights-aspnetcore/issues/705)

However, I would expect that now with ASP.NET core 2.2 this is no longer necessary, based on the explanations in the docs and the above screenshot. Is that correct?

Please see set up below:

## Version Info

SDK Version: rddf:2.8.1-19196 (Microsoft.ApplicationInsights.AspNetCore Version 2.5.1)  
ASP.NET Core Version: 2.2  
  
.NET Version : .NET Framework 4.6.1  
  
How Application was onboarded with SDK(VisualStudio/StatusMonitor/Azure Extension) : Visual Studio  
  
OS : Windows Server 2016  
  
Hosting Info: ASP.NET Core running in Kestrel with IIS Server