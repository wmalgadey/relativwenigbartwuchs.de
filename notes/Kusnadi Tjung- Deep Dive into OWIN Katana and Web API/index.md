[http://kusnaditjung.blogspot.com/2017/08/owin-katana.html](http://kusnaditjung.blogspot.com/2017/08/owin-katana.html)

  

Topic Outline:

- [Part 5 - Web API Development with OWIN Katana](http://kusnaditjung.blogspot.com/2017/08/owin-katana.html?view=classic)

I was asked to give a presentation about OWIN and Web API to a different development team, as they wanted an introduction to the technology and no one in the team had exposure to that technology before. Prior to that, I have developed a number of internal API for our company. With the presentation slides and materials, I decide to write them down as a blog post as well, so it will be documented properly. I put a lot of extra information compared to the original presentation to cover a broader audience in the internet.

Even with recent revolutionary changes in the ASP.NET Core, I found out that understanding OWIN is fundamental to understand the framework and features of the ASP.NET Core. There are many concepts, and architectural designs in OWIN which still apply to ASP.NET Core. This post mostly focuses on OWIN and Katana which is an implementation of OWIN. The inner working of OWIN Katana is explained in details. After that, a short chapter is allocated to discuss the Web API development with OWIN Katana, followed by a brief introduction to the ASP.NET Core at the end.

OWIN stands for Open Web Interface for .NET. OWIN is a open standard specification which defines a standard interface between .NET web servers and web applications. The aims is to provide a standard interface which is simple, pluggable and lightweight.  
OWIN is motivated by the development of web frameworks in other coding languages such Node.js for JavaScript, Rack for Ruby, and WSGI for Phyton. All these web frameworks are designed to be fast, simple and they enable the development of web applications in a modular way. In contrast, prior to OWIN, every .NET web application required a dependency on  
**System.Web.dll**, which tightly coupled with Microsoft's IIS (Internet Information Services). This meant that .NET web applications came with a number of application component stacks from IIS, whether they were actually required or not. This made .NET web applications, as a whole, heavier and they performed slower than their counterparts in other coding languages in many benchmarks

OWIN was initiated by members of Microsoft's communities; such as C#, F# and dynamic programming communities. Thus, the specification is largely influenced by the programming paradigm of those communities. From initial prototyping, OWIN was then reduced to just a common specification. It basically specifies, as shown in Figure 1:

1. Type of object to be passed around, between web servers and web applications, and between web application components. This is also called the environment object
2. The structure of web application components. The structure should be simple and is represented in a consistent way.

Other constrains include having no dependency, except for Foundation Class Language (FCL) types and the need to support async processing.

Figure 1. Scope of OWIN

![[Figure1.png]]

Figure 2. OWIN Specifications (Interaction between web server and web application)

![[Figure2.png]]

Figure 2 shows OWIN overview of web servers and web applications interaction, which contains at least 4 important aspects:

1. OWIN introduces a key value pair dictionary, **Dictionary<string, object>**, as the environment object to be passed between web servers. and web applications, and in-between web application components. OWIN also specifies the following keys : All these key values are not nullable, and should only be compared by their ordinal code (case sensitive). Web servers are responsible to construct this environment object on receipt of a http request, and pass it to a web application.
    
    |Required|Key|Type (Default)|
    |---|---|---|
    |[x]|[[owin.RequestBody]]|Stream|
    |[x]|[[owin.RequestHeaders]]|IDictionary<string, string[]>|
    |[x]|[[owin.RequestMethod]]|string|
    |[x]|[[owin.RequestPath]]|string|
    |[x]|[[owin.RequestPathBase]]|string|
    |[x]|[[owin.RequestProtocol]]|string|
    |[x]|[[owin.RequestQueryString]]|string|
    |[x]|[[owin.RequestSchemd]]|string|
    |[x]|[[owin.ResponseBody]]|Stream|
    |[x]|[[owin.ResponseHeaders]]|IDictionary<string, string[]>|
    |[ ]|[[owin.ResponseStatusCode]]|int(200)|
    |[ ]|[[owin.ResponseReasonPhrase]]|string (OK)|
    |[ ]|[[owin.ResponseProtocol]]|string (HTTP/1.1)|
    |[x]|[[owin.CallCancelled]]|CancellationToken|
    |[x]|[[owin.Version]]|string|
    
      
      
    
    (Source: http://owin.org)
    
2. Each web application component is modelled as a delegate function, **Func<IDictionary<string, object>,Task>** which means the component accepts an environment object **IDictionary<string, object>**, and returns an **Task**. This also means that the delegate supports asynchronous calls. The delegate function is given a name **AppFunc**, and web application components in OWIN are called middleware.
    
    awaitable
    
3. A pipeline model is used to structure middleware. Unfortunately, OWIN 1.0 does not specify how middleware should be chained into a pipeline. A later draft attempted, targeting OWIN 1.0, to include specification for middleware and pipeline builder. It is now an expired working in progress draft since 1 March 2016 and seems to be abandon. Even though it is not specified, there will be always a need for a pipeline/middleware/application builder in a real implementation. So what is the requirement for the builder to be able to register middleware? The pipeline structure implicates that the implementation of a middleware can optionally call other or 'next' middleware. For example, the first middleware calls the next middleware and so on, until the last one which terminates or returns the call directly (The first middleware is normally called a pass-through middleware, and the last one is named a terminating middleware). In order to be able to chain middleware into a pipeline as a 'delegate' function(delegate is a first class citizen in OWIN, mostly influenced by functional programming paradigm), the builder needs a delegate with the signature of **Func<AppFunc, AppFunc>**. The first, or the argument, **AppFunc** is the placeholder for the 'next' middleware, while the second one, or the return, is the middleware body. The middleware body calls the 'next' middleware if it is a pass-through middleware. When the builder builds the pipeline, it executes the registered delegate functions in a reversed order, one after another and passes the result of the last execution (a middleware body) as the argument of the next execution ('next' argument of the executed delegate function), until the first middleware body (**AppFunc**) is retrieved and acts as an entry point of the pipeline. This is an elegant solution for a functional programmer (F#), but for an object-oriented programmer (C#) this may cause a confusion, as this approach is not a norm and is not aligned with an object-oriented thinking even though the C# language itself supports delegate. This issue will be discussed later when talking about creating middleware using Katana, which is an implementation of OWIN in C#. OWIN makes a clear distinction between host, server, middleware, web framework, and web application. However, OWIN specification only deals with host, server and part of the middleware. Below is the explanation taken from OWIN website. Even though, it is possible to write a whole ground up web application using the middleware pipeline, that structure is, in fact, intended as an infrastructure for web development. Middleware is particularly suitable for writing web frameworks and cross cutting aspects of web applications such as error handling, logging, etc., and web applications can be written based on the web framework registered in the pipeline. Using the structure also encourages developers to split out cross cutting aspects from web applications.
    
    1. **Server** — The HTTP server that directly communicates with the client and then uses OWIN semantics to process requests. Servers may require an adapter layer that converts to OWIN semantics.
    2. **Web Framework** — A self-contained component on top of OWIN exposing its own object model or API that applications may use to facilitate request processing. Web Frameworks may require an adapter layer that converts from OWIN semantics.
    3. **Web Application** — A specific application, possibly built on top of a Web Framework, which is run using OWIN compatible Servers.
    4. **Middleware** — Pass through components that form a pipeline between a server and application to inspect, route, or modify request and response messages for a specific purpose.
    5. **Host** — The process an application and server execute inside of, primarily responsible for application startup. Some Servers are also Hosts.
    
    (Source: http://owin.org)
    
4. Web applications or web frameworks or middleware written for an OWIN implementation do not have to rely on any IIS features, and they can be plugged with any web servers which understand OWIN semantics and be hosted in different ways. OWIN compatible servers are required to implement rules specific to the server specification. Consequently, middleware can make assumptions about the availability of mandatory fields in the environment object. Middleware also need to follow rules for error or exception handling, and the order of writing response body and response headers. It is worth to read the whole OWIN specification and it does not take a long time.

The specification is just a beginning. The other goal is to encourage the development of simple and re-usable modules for .NET. The expectation is to have a signification growth of middleware that can be downloaded as nuget packages. The long-term goal is to stimulate open source ecosystem of .NET web development.

OWIN has a number of implementations such as Katana for the C# community, and Freya for the F# community. There are also a number of libraries that only implement host and server OWIN specifications such as **Nowin** and **Suave**. These lists are in the OWIN website.

Katana is the Microsoft's implementation of OWIN specification. They are in the form of nuget packages, which all have a namespace **Microsoft.Owin**. However, Katana is more than just an implementation of OWIN as it also has other abstractions to help the productivity in development. Katana adds a number of object-oriented constructs such as the **IOwinContext** interface and the **OwinMiddleware** abstract class. The **IOwinContext** is used as an abstraction for the environment object and can be instantiated as an **OwinContext** by taking a **IDictionary<string, object>** object as the argument in the constructor, while the **OwinMiddleware** serves as a base class for creating a middleware class. In fact, OWIN has not specified the standard form of middleware or the pipeline builder. However, from the look in the OWIN Middleware draft, only delegates are used. In contrast, being an object-oriented C# implementation of OWIN, Katana uses the **AppBuilder** class, which implements the interface **IAppBuilder**, as the pipeline builder. In addition to that, Katana allows creating middleware as a class, which can be registered using the class type or class instance by the **AppBuilder**. It should be assumed that these Katana's middleware classes can only be used by the **AppBuilder**.

Katana also has a number of constructs to help accessing the environment object such as the **IOwinRequest** and the **IOwinResponse**, which are implemented by the **OwinRequest** and **OwinResponse** classes respectively. OWIN compatible middleware can still be authored by limited only using Katana's constructs such as **OwinContext**, **OwinRequest**, **OwinResponse** inside the middleware body.

Moreover, Katana also contains hosting components and a listener component, Hosting components deal with the server aspects of applications such as creating listeners, or converting a received http request to an environment object complying with OWIN semantics, and passing the environment object into the middleware pipeline. When creating an OWIN application with the host together or self hosting such as creating an OWIN application running as a console application, winforms application, or windows service, both hosting and listener components are required. On the other hand, if the OWIN application is hosted with IIS, only the hosting component is required to convert a http request to an environment object and passing it into the middleware pipeline. Katana also implements a host called 'OwinHost', as a nuget package, which can be used to replace IIS. The differences between the two is that IIS has its own pipeline while 'OwinHost' does not have one. When hosted with IIS, the server or listener is in the IIS infrastructure, and the OWIN application is operated under an IIS Integrated pipeline model, where the IIS pipeline is combined with OWIN middleware pipeline, and this will be explained in the next part. All above hosting components are split into a number of different packages, so they can be used selectively to fit the application.

Lastly, Katana has a number of common middleware such as CORS, Diagnostic, Static Files, Security and helper and utility classes. Below is the important assemblies or dlls related to Katana:

- Microsoft.Owin - Katana implementation of OWIN
- Microsoft.Owin.Host - Common library for hosting component
- Microsoft.Owin.Host.HttpListener - Listener or server implementation
- Microsoft.Owin.Host.SystemWeb - Hosting component for IIS Hosting
- Microsoft.Owin.Diagnostic - Diagnostic middleware
- Microsoft.Owin.Cors - Cors middleware
- Microsoft.Owin.StaticFiles - Static files middleware
- Microsoft.Owin.Security - Common library for security and Identity
- Microsoft.Owin.Security.* - Middleware for specific security/identity model, e.g Cookies, active directory, facebook, google, jwt, oauth, wsfederation, twitter, microsoft Account, open ID connect
- Owin - OWIN abstraction
- OwinHost - Katana host implementation

These assemblies are distributed via a number of nuget packages e.g **OwinHost**, **Microsoft.Owin.Host.SystemWeb**, and **Microsoft.Owin.Host.SelfHost**. Katana implementation is open source, and the source code can be accessed from [https://github.com/aspnet/AspNetKatana](https://github.com/aspnet/AspNetKatana)

As mentioned in previous part, OWIN Katana provides a structure to write web applications. Cross cutting concerns, such as logging and exception handling, and web frameworks, such as Web API, can be written as middleware. The main web application logic can be written using the web framework middleware registered in the pipeline. In this part, OWIN Katana applications development is attributed to the activity of writing middleware, creating a middleware pipeline and starting listeners or servers. Developing web applications using Web API framework will be discussed in the next part separately.

## 3.1. Creating listeners or servers

Creating listeners or servers is only required for self hosting scenarios and not a requirement for OwinHost or IIS hosting models. Katana provides a static method **WebApp.Start** from **Microsfot.Owin.Hosting** to create a server or servers. Creating servers are the same as creating listeners and activating them. There are a number of overload methods and generic methods to do this.

1. **IDisposable Start(string url, Action<IAppBuilder> startup)**
2. **IDisposable Start(StartOptions startOptions, Action<IAppBuilder> startup)**
3. **IDisposable Start<TStartup>(string url)**
4. **IDisposable Start<TStartup>(StartOptions startOptions)**

There are two important information required when creating a listener in OWIN Katana, the listening **url** and the **startup** delegate, as shown in the first overload. The listening **url** is the endpoint to receive http requests, while the **startup** delegate, which has a signature **Action<IAppBuilder>**, is the function to configure a middleware pipeline.

The **WebApp.Start** method not only creates a listener but also joins it to a middleware pipeline. This method creates a middleware pipeline builder, of type **IAppBuilder**, passes to the **startup** delegate, to be configured, and builds the middleware pipeline to get an **AppFunc** entry to first middleware in the pipeline. The **startup** delegate can take a number of forms: method name (method groups), delegate variable, or lambda expression, as demonstrated in the code below.  
Using the second overload method, multiple listening  
**urls** can be created by setting the **StartOptions**'s **Urls** property. The example code below demonstrates how to create a server which listens at multiple **urls**.  
The third and fourth generic methods is similar to first and second methods, except they accept a generic  
**startup** class instead of a **startup** delegate. In order to be used as a **startup** class for these methods, the class must not be static and has an instance or static method with the name **Configuration**. This method must have same signature as the **startup** delegate, **Action<IAppBuilder>**. The code below shows an example of creating a server using a **startup** class.  
The fifth overload method only accepts one argument,  
**StartupOption**. The **startup** class or delegate can be set in the **StartupOption**'s **AppStartup** property. The property can take a 'static' or instance **startup** class name. It can also take any method name with a signature of **Action<IAppBuilder>**. The example code below illustrates the usage of the fifth overload method.