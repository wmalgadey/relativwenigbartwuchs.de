---
categories:
  - Webseite
status: gefunden
source: https://stackoverflow.com/questions/65528423/application-insights-in-console-wpf-application-with-dependencytracking
project:
  - Application-Insight-SQL-Queries
---
[![](https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded)](https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded)

---

I have a application insights configuration I am trying to get working in a .NET 4.8 WPF application. Everything seems to be transmitting fine (including the live metrics data) BUT unfortunately I cannot successfully get the system to transmit my SQL queries along with the Dependency information which are being executed by EntityFramework6.

I note that on the [following link](https://docs.microsoft.com/en-us/azure/azure-monitor/app/asp-net-dependencies) it makes reference to

> For ASP.NET applications, full SQL query text is collected with the help of byte code instrumentation, which requires using the instrumentation engine or by using the Microsoft.Data.SqlClient NuGet package instead of the System.Data.SqlClient library.

Obviously this is not possible for me (I dont think?) given that I am using EntityFramework (which depends on System.Data.SqlClient) but I have installed Microsoft.ApplicationInsights.Agent_** which I believe is the workaround for this issue as the link above suggests.

Further when I look at the data being provided in Azure I note that it is marked as rddf:2.17.0-32 which suggests that the agent is not working correctly.

My initialization code looks like this:

![[NLhOk.png]]

```
public static TelemetryConfiguration CreateConfig(string instrumentationKey, string authenticationApiKey)
{
    var config = new TelemetryConfiguration()
    {
        ConnectionString = $"InstrumentationKey={instrumentationKey};IngestionEndpoint=https://australiaeast-0.in.applicationinsights.azure.com/",
        TelemetryChannel = new ServerTelemetryChannel()
        {
            DeveloperMode = true
        },

    };

    var dependencyTrackingModule = new DependencyTrackingTelemetryModule()
    {
        EnableSqlCommandTextInstrumentation = true
    };

    // prevent Correlation Id to be sent to certain endpoints. You may add other domains as needed.
    dependencyTrackingModule.ExcludeComponentCorrelationHttpHeadersOnDomains.Add("core.windows.net");

    // enable known dependency tracking, note that in future versions, we will extend this list.
    dependencyTrackingModule.IncludeDiagnosticSourceActivities.Add("Microsoft.Azure.ServiceBus");
    dependencyTrackingModule.IncludeDiagnosticSourceActivities.Add("Microsoft.Azure.EventHubs");

    // initialize the module
    dependencyTrackingModule.Initialize(config);

    QuickPulseTelemetryProcessor quickPulseProcessor = null;
    config.DefaultTelemetrySink.TelemetryProcessorChainBuilder
        .Use((next) =>
        {
            quickPulseProcessor = new QuickPulseTelemetryProcessor(next);
            return quickPulseProcessor;
        })
        .Build();

    var quickPulseModule = new QuickPulseTelemetryModule()
    {
        AuthenticationApiKey = authenticationApiKey
    };

    quickPulseModule.Initialize(config);
    quickPulseModule.RegisterTelemetryProcessor(quickPulseProcessor);

    config.TelemetryInitializers.Add(new HttpDependenciesParsingTelemetryInitializer());
    config.TelemetryInitializers.Add(new BuildInfoConfigComponentVersionTelemetryInitializer());

    return config;
}
```

Can anyone provide any input on what I might be doing wrong?