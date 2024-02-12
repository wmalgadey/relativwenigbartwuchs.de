---
categories:
  - Webseite
status: gefunden
source: https://docs.microsoft.com/en-us/azure/azure-monitor/app/asp-net-dependencies#advanced-sql-tracking-to-get-full-sql-query
---
[![](https://docs.microsoft.com/en-us/media/logos/logo-ms-social.png)](https://docs.microsoft.com/en-us/media/logos/logo-ms-social.png)

---

## Tracking AJAX calls from Web Pages

For web pages, Application Insights JavaScript SDK automatically collects AJAX calls as dependencies.

## Advanced SQL tracking to get full SQL Query

For SQL calls, the name of the server and database is always collected and stored as name of the collected `DependencyTelemetry`. There's an additional field called 'data', which can contain the full SQL query text.

For ASP.NET Core applications, It is now required to opt-in to SQL Text collection by using

```
services.ConfigureTelemetryModule<DependencyTrackingTelemetryModule>((module, o) => { module. EnableSqlCommandTextInstrumentation = true; });
```

For ASP.NET applications, full SQL query text is collected with the help of byte code instrumentation, which requires using the instrumentation engine or by using the [Microsoft.Data.SqlClient](https://www.nuget.org/packages/Microsoft.Data.SqlClient) NuGet package instead of the System.Data.SqlClient library. Platform specific steps to enable full SQL Query collection are described below:

In addition to the platform specific steps above, you **must also explicitly opt-in to enable SQL command collection** by modifying the applicationInsights.config file with the following:

```
<TelemetryModules>
  <Add Type="Microsoft.ApplicationInsights.DependencyCollector.DependencyTrackingTelemetryModule, Microsoft.AI.DependencyCollector">
    <EnableSqlCommandTextInstrumentation>true</EnableSqlCommandTextInstrumentation>
  </Add>
```

In the above cases, the correct way of validating that instrumentation engine is correctly installed is by validating that the SDK version of collected `DependencyTelemetry` is 'rddp'. 'rdddsd' or 'rddf' indicates dependencies are collected via DiagnosticSource or EventSource callbacks, and hence full SQL query won't be captured.

## Where to find dependency data

- [Application Map](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-map) visualizes dependencies between your app and neighboring components.
- [Transaction Diagnostics](https://docs.microsoft.com/en-us/azure/azure-monitor/app/transaction-diagnostics) shows unified, correlated server data.
- [Browsers tab](https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript) shows AJAX calls from your users' browsers.
- Click through from slow or failed requests to check their dependency calls.
- [Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/app/asp-net-dependencies#logs-analytics) can be used to query dependency data.

## Diagnose slow requests

Each request event is associated with the dependency calls, exceptions, and other events that are tracked while your app is processing the request. So if some requests are doing badly, you can find out whether it's because of slow responses from a dependency.

### Tracing from requests to dependencies

Open the **Performance** tab and navigate to the **Dependencies** tab at the top next to operations.

Click on a **Dependency Name** under overall. After you select a dependency a graph of that dependency's distribution of durations will show up on the right.

![[2-perf-dependencies.png]]

Click on the blue **Samples** button on the bottom right and then on a sample to see the end-to-end transaction details.

![[3-end-to-end.png]]

### Profile your live site

No idea where the time goes? The [Application Insights profiler](https://docs.microsoft.com/en-us/azure/azure-monitor/app/profiler) traces HTTP calls to your live site and shows you the functions in your code that took the longest time.

## Failed requests

Failed requests might also be associated with failed calls to dependencies.

We can go to the **Failures** tab on the left and then click on the **dependencies** tab at the top.

![[4-fail.png]]

Here you will be able to see the failed dependency count. To get more details about a failed occurrence trying clicking on a dependency name in the bottom table. You can click on the blue **Dependencies** button at the bottom right to get the end-to-end transaction details.

## Logs (Analytics)

You can track dependencies in the [Kusto query language](https://docs.microsoft.com/en-us/azure/kusto/query/). Here are some examples.

- Find any failed dependency calls:

```

    dependencies | where success != "True" | take 10
```

- Find AJAX calls:

```

    dependencies | where client_Type == "Browser" | take 10
```

- Find dependency calls associated with requests:

```

    dependencies
    | where timestamp > ago(1d) and  client_Type != "Browser"
    | join (requests | where timestamp > ago(1d))
      on operation_Id
```

- Find AJAX calls associated with page views:

```

    dependencies
    | where timestamp > ago(1d) and  client_Type == "Browser"
    | join (browserTimings | where timestamp > ago(1d))
      on operation_Id
```

## Frequently asked questions

### _How does automatic dependency collector report failed calls to dependencies?_

- Failed dependency calls will have 'success' field set to False. `DependencyTrackingTelemetryModule` does not report `ExceptionTelemetry`. The full data model for dependency is described [here](https://docs.microsoft.com/en-us/azure/azure-monitor/app/data-model-dependency-telemetry).

### _How do I calculate ingestion latency for my dependency telemetry?_

```
dependencies
| extend E2EIngestionLatency = ingestion_time() - timestamp
| extend TimeIngested = ingestion_time()
```

### _How do I determine the time the dependency call was initiated?_

In the Log Analytics query view `timestamp` represents the moment the TrackDependency() call was initiated which occurs immediately after the dependency call response is received. To calculate the time when the dependency call began, you would take `timestamp` and subtract the recorded `duration` of the dependency call.

## Open-source SDK

Like every Application Insights SDK, dependency collection module is also open-source. Read and contribute to the code, or report issues at [the official GitHub repo](https://github.com/Microsoft/ApplicationInsights-dotnet).

## Next steps

- [User & page data](https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript)
- [Availability](https://docs.microsoft.com/en-us/azure/azure-monitor/app/monitor-web-app-availability)