---
categories:
  - Coding
status: bin noch dran
source: https://aka.ms/az204
tags:
  - Azure
  - learning
project:
  - Weiterbildung-und-Kreativit-t
date: 2024-01-21T15:20
modified: 2024-02-04T18:26
---
- Scaling
    
    ARR Affinity - [Application Request Routing](http://www.iis.net/learn/extensions/planning-for-arr) - ARR Affinity - affinity cookie
    
    scaling _in and out_
    
    In die Breite Scalieren, mehr Instanzen (auch autoscaling)
    
    scaling _up and down_
    
    Anderen Tier wählen / Mehr Performance/CPU/MEM etc.
    
    autoscaling
    
    when you can't easily predict the workload in advance, or when the workload is likely to vary by date or time.
    
    1. time grain and time aggregation
    2. duration and duration aggregation
    3. one minute time and avg / 10 min duration and max  
        the maximum of the last 10 one minute avgs  
        
    
    Flapping
    
    scale in and out in an infinite loop, because of wrong metrics
    
    metric is calculated over all instances (ex: 300 processes on all 3 instances = 100 in average)
    
    300 / 3 before scale-in = 100, after scale-in = 300 / 2 = 150
    
    that will maybe lead to flapping, which is prevented. That’s why a roule seems to not work properly! This happens, when same value for scale-in and -out is choosen
    
- Deployment
    
    Deployment slots sind geil :D
    
    Deployment Slots
    
    Staging / Rollback
    
- Azure Functions
    
    are a great solution for processing data, integrating systems, working with the internet-of-things (IoT), and building simple APIs and microservices
    
    _triggers_, which are ways to start execution of your code, and 
    
    _bindings_, which are ways to simplify coding for input and output data
    
    Functions (compute service - code first - imperative) and Logic Apps (serverless workflows - Designer first - deklarativ) enable serverless workloads
    
    Kann man in VS Code lokal testen / laufen lassen
    
- SOLID ([https://de.wikipedia.org/wiki/Prinzipien_objektorientierten_Designs#SOLID-Prinzipien](https://de.wikipedia.org/wiki/Prinzipien_objektorientierten_Designs#SOLID-Prinzipien))  
      
    [http://principles-wiki.net/](http://principles-wiki.net/)
    
    - `S` - Single-responsiblity Principle | [SRP](https://bugs.cp-pro.de/api/files/262-191?sign=MTY3Mzc0MDgwMDAwMHwyMS0yfDI2Mi0xOTF8UkI2VHRpUWhDR3pJSk92QXdFak1WWGZHekdnQ1lZ%0D%0AeWYyZVotNEdQb3pqTQ0K%0D%0A&updated=1615736939603&forceDownload=true)  
        A class   
        _should_ have one, and only one, reason to change.
    - `O` - Open-closed Principle | [OCP](https://bugs.cp-pro.de/api/files/262-192?sign=MTY3Mzc0MDgwMDAwMHwyMS0yfDI2Mi0xOTJ8SXZFVW1YY0NudUpKTU5iRTM4a21wcTFCWlEyQk5B%0D%0AQ0tJZzkzN3RtN0U2dw0K%0D%0A&updated=1615736939603&forceDownload=true)  
        You   
        _should_ be able to extend a classes behavior, without modifying existing code.
    - `L` - Liskov Substitution Principle | [LSP](http://396lsp.pdf/)  
        Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.  
        
    - `I` - Interface Segregation Principle | [ISP](https://bugs.cp-pro.de/api/files/262-193?sign=MTY3Mzc0MDgwMDAwMHwyMS0yfDI2Mi0xOTN8Z3BNUVJkNmRCZElLY29lMmROaUp6bWJFSUJObzhq%0D%0ASVlPR01KYjRPdlhRQQ0K%0D%0A&updated=1615736939603&forceDownload=true)  
        Make fine grained interfaces that are client specific, meaning no client   
        _should_ be forced to depend on methods it does not use.
    - `D` - Dependency Inversion Principle | [DIP](https://bugs.cp-pro.de/api/files/262-190?sign=MTY3Mzc0MDgwMDAwMHwyMS0yfDI2Mi0xOTB8LU5rcHhWYWpmZ3BJY0t4NUpES1c4TjdRY0ttZWo4%0D%0AZmNLdTZUNDd1LWFHOA0K%0D%0A&updated=1615736939603&forceDownload=true)  
        Depend on abstractions, not on concretions  
        
    
    **Gesetz von Demeter**
    
    Kopplung verringern - Kommunikation nur mit Objekten in unmittelbarer Umgebung
    
    Design by Contract
    
    formale “Verträge” - Zusicherungen (was muss eingehalten werden, was darf erwartet werden) und Invarianten (unveränderlicher Zustand)
    
- JSON
    
    semi-structured
    
    **The data contains tags that make the organization and hierarchy of the data apparent.**
    
- Database
    
    operation needs
    
    - Will you be doing simple lookups by using an ID field?
    - Do you need to query the database for one or more fields?
    - How many create, update, and delete operations do you expect to run?
    - Do you need to run complex analytical queries?
    - How quickly do these operations need to process?
    
    _online transaction processing (OLTP)_ systems
    
    Azure SQL Database
    
    _Online analytical processing (OLAP)_ systems
    
    Azure Analysis Services
    
    ACID-compliant
    
    _atomicity_, _consistency_, _isolation_, and _durability_.
    
    - _Atomicity_ means a transaction must execute exactly once, and it must be atomic. Either all of the work is done or none of it is. Operations within a transaction usually share a common intent and are interdependent.
    - _Consistency_ ensures that the data is consistent both before and after the transaction.
    - _Isolation_ ensures that each transaction is unaffected by other transactions.
    - _Durability_ means that changes made as a result of a transaction are permanently saved in the system. The system saves data that's committed so that even in the event of a failure and system restart, the data is available in its correct state.
    
- Messages
    
    SignalR in Azure
    
    Azure Functions lokal testen
    
    messaging technology
    
    - Storage queue
        - simple store of a lot of messages
        - Azure Queue Storage
        - Reasons: audit trail - size - track progress for processing
        - REST API
            - `GET https://[url-for-service-account]/?comp=list&include=metadata`
                
                |   |   |
                |---|---|
                |Data type|Example endpoint|
                |Blobs|`https://[name].blob.core.windows.net/`|
                |Queues|`https://[name].queue.core.windows.net/`|
                |Table|`https://[name].table.core.windows.net/`|
                |Files|`https://[name].file.core.windows.net/`|
                
    - Event Grid
        
        - a fully-managed event routing service running on top of Azure [Service Fabric](https://azure.microsoft.com/services/service-fabric/)
        - was created to make it easier to build event-based and serverless applications on Azure
        
        - several concepts in Azure Event Grid that connect a source to a subscriber
            1. Events source (in)
            2. Topics (send)
            3. Events (event grid)
            4. Event subscription (send)
            5. Event handlers
        
        - Reasons: **Simplicity, Advanced filtering, Fan-out, Reliability, Pay-per-event**
    - Event Hubs
        - an intermediary for the publish-subscribe communication pattern. Unlike [Event Grid](https://azure.microsoft.com/services/event-grid/), however, it is optimized for extremely high throughput, a large number of publishers, security, and resiliency
        - Reasons: save a stream of events to Data Lake or Blob storage, aggregation or analytics, reliable messaging or resiliency
        - 1 MB single publication
        - AMQP - Websocket
    - Service Bus
        - message broker system - built on top of a dedicated messaging infrastructure
        - Has a `queue`-Service too  
            →  
            **Azure Service Bus Queues  
            → Azure Service Bus Topics (multiple receivers to handle each message)  
            **
    
    **Events**
    
    are lighter weight than messages, and are most often used for broadcast communications. The components sending the event are known as 
    
    **publishers**, and receivers are known as 
    
    **subscribers**
    
    → Signal. that something should happen
    
    Messages
    
    → Contains information to be processed a certain way
    
      
    
- MEAN stack (MongoDB, Express.js, AngularJS, and Node.js)
- Lernpfad
    - [https://learn.microsoft.com/en-gb/training/modules/app-service-scale-up-scale-out](https://learn.microsoft.com/en-gb/training/modules/app-service-scale-up-scale-out)
    - [https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-database-engine?view=sql-server-ver16](https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-database-engine?view=sql-server-ver16)
- TODO
    - [https://learn.microsoft.com/en-gb/training/modules/deploy-run-container-app-service/?WT.mc_id=cloudskillschallenge_4b2f91e9-04c5-4a1c-8f67-443adefd0806&ns-enrollment-type=Collection&ns-enrollment-id=3127b5w77g80](https://learn.microsoft.com/en-gb/training/modules/deploy-run-container-app-service/?WT.mc_id=cloudskillschallenge_4b2f91e9-04c5-4a1c-8f67-443adefd0806&ns-enrollment-type=Collection&ns-enrollment-id=3127b5w77g80)
    - [https://learn.microsoft.com/en-gb/training/modules/stage-deploy-app-service-deployment-slots/?WT.mc_id=cloudskillschallenge_4b2f91e9-04c5-4a1c-8f67-443adefd0806&ns-enrollment-type=Collection&ns-enrollment-id=3127b5w77g80](https://learn.microsoft.com/en-gb/training/modules/stage-deploy-app-service-deployment-slots/?WT.mc_id=cloudskillschallenge_4b2f91e9-04c5-4a1c-8f67-443adefd0806&ns-enrollment-type=Collection&ns-enrollment-id=3127b5w77g80)
    - [https://learn.microsoft.com/en-gb/training/modules/build-a-web-app-with-mean-on-a-linux-vm/?WT.mc_id=cloudskillschallenge_4b2f91e9-04c5-4a1c-8f67-443adefd0806&ns-enrollment-type=Collection&ns-enrollment-id=3127b5w77g80](https://learn.microsoft.com/en-gb/training/modules/build-a-web-app-with-mean-on-a-linux-vm/?WT.mc_id=cloudskillschallenge_4b2f91e9-04c5-4a1c-8f67-443adefd0806&ns-enrollment-type=Collection&ns-enrollment-id=3127b5w77g80)