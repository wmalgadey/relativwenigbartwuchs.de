- paket manager
    
    [https://chocolatey.org/install#individual](https://chocolatey.org/install#individual)
    
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('[https://chocolatey.org/install.ps1](https://chocolatey.org/install.ps1)'))
    
    choco install gitlab-runner
    
    choco install windows-admin-center -params "'/Port:443'"
    
    [https://expanic.at/wordpress/2019/09/05/programme-auf-windows-server-core-deinstallieren/](https://expanic.at/wordpress/2019/09/05/programme-auf-windows-server-core-deinstallieren/)
    
- **share mac folder in windows**
    
    New-Item -ItemType SymbolicLink -Path "C:\shares\projects" -Target "\\mac\projects"
    
    New-Item -ItemType Junction -Path "c:\projects" -Target "C:\shares\projects"
    
      
    
    New-PSDrive -Name P -PSProvider FileSystem -Root \\mac\projects -Persist
    
- devexpress nuget
    
    unsere devexpress nuget api
    
    [https://nuget.devexpress.com/C5aY7jYDhLkjiIOfT2cQPtbEp3ED4PCWyvRovn2Yqg7B6Dek5c/api](https://nuget.devexpress.com/C5aY7jYDhLkjiIOfT2cQPtbEp3ED4PCWyvRovn2Yqg7B6Dek5c/api)
    
- docker msbuild
    
      
    
    [https://docs.microsoft.com/de-de/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2019%2Cwindows-10-20H2](https://docs.microsoft.com/de-de/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2019%2Cwindows-10-20H2)
    
    Current Windows version: 17763.1.amd64fre.rs5_release.180914-1434
    
    - nuget packages
        
        **4.8-20210309-windowsservercore-ltsc2019, 4.8-windowsservercore-ltsc2019, 4.8, latest**
        
        3.5-20200428-windowsservercore-ltsc2019, 3.5-windowsservercore-ltsc2019, 3.5
        
    
    [https://supportcenter.devexpress.com/ticket/details/t890369/spreadsheet-for-asp-net-core-how-to-include-the-component-in-the-docker-project/](https://supportcenter.devexpress.com/ticket/details/t890369/spreadsheet-for-asp-net-core-how-to-include-the-component-in-the-docker-project/)
    
    ---
    
    ## beispiel wcfapp mit msbuild und dockerfile
    
    [https://github.com/microsoft/dotnet-framework-docker/tree/main/samples/wcfapp](https://github.com/microsoft/dotnet-framework-docker/tree/main/samples/wcfapp)
    
    **msbuild im container**
    
    [https://github.com/dotnet/dotnet-docker/blob/main/samples/build-in-sdk-container.md](https://github.com/dotnet/dotnet-docker/blob/main/samples/build-in-sdk-container.md)
    
      
    
    cd c:\projects\fm.prim3d
    
    docker run --rm -v ${pwd}:c:\app -w c:\app [mcr.microsoft.com/dotnet/framework/sdk:4.8](http://mcr.microsoft.com/dotnet/framework/sdk:4.8) msbuild /t:Rebuild Prime3D.Client.sln
    
      
    
- gitlab.runner
    
    docker-windows
    
    nuget help | select -First 1
    
      
    
    - Add default .gitignore  
          
        `gitignore -types`
    - Add makefile for package.json  
          
        `npm i fakefile`
    - install pandoc (latext) package  
          
        `tlmgr install`
    - `npm-check`
    - `npm-outdated`
    - `npm install -g npm-check-updates`  
          
        `ncu`
    - `npx tslint-comment-to-eslint 'src/**/*.ts'`