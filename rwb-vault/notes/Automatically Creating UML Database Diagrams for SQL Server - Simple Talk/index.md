---
source: https://www.red-gate.com/simple-talk/databases/sql-server/tools-sql-server/automatically-creating-uml-database-diagrams-for-sql-server/
---
SQL Server database developers seem reluctant to use diagrams when documenting their databases. It is probably because it has, in the past, been difficult to automatically draw precisely what you want, other than a vast Entity-relationship diagram. However, you can do it without buying any third-party tool, just using some existing Java-based open-source tools; and can even automate it entirely, using SQL and PowerShell.

Diagrams are often a great help in understanding how databases work. I’ve always wanted to generate various database diagrams automatically to go with my database documentation. The problem is that, once you’ve drawn them nicely in a drawing package, you feel reluctant to alter the database because you’d then have to re-draw the diagrams to reflect those changes. This article explains a way of creating easily ‘refreshed’ automated diagrams based only on open-source, or free, tools.

# PlantUML

We’ll be using PlantUML. PlantUML is an open-source project for writing Unified Modelling Language (UML) diagrams for Sequence, Use-Case, Class, Activity, Component, State and Objects. It uses GraphViz for its graphical output. Its use, like GraphViz, is to render quite complex diagrams from a simple intuitive language based on text.

For example, this will give you a simple UML sequence diagram:

If this code is then processed by PlantUML, would provide this .PNG image:

![[2405-clip_image002.jpg]]

Don’t like the style? You can specify it how you like. With a little extra tweaking with the `skinparam`, you can get this instead

the code changes are simple

Although you may have little urge to use UML diagrams in your everyday work, PlantUML is versatile enough to provide for a range of requirements. For a relational database person who winces at the terms ‘class’ and ‘persistence’, even UML modelling has its uses as a way of communicating ideas and designs.

In this article I’m going to show how it can be used to easily generate class diagrams for database objects. I will use TSQL code to create the PlantUML code directly.

# Getting up and running

To get you started, there is a little on the PlantUML site that allows you to type in PlantUML code and view the results. With that, and the PlantUML manual, you should be well away with using this interesting application. Chrome has an Add-in that runs PlantUML called the UML Diagram Editor.

There are many ways of using PlantUML. There are several Atom packages that add PlantUML integration. If you use DocuWiki for documentation, there is an add-in for PlantUML, which is handy for teams since there is nothing to install on your machine then. If you want to use PlantUML from the command-line, there are . I use AsciiDocFx, which installs the prerequisites for you (though you may need to set the path to your GraphViz install. You can use your favourite editor via a command-line interface as well. PlantUML uses simple text-based instructions to render UML diagrams and these can be generated from SQL to show you such things as the intricacies of your database permission system, the foreign-key dependencies, or the details of your indexing strategy for a table.

We’ll just stick to showing a subset of your database objects and the dependencies between them.

# Data Modelling With Unified Modelling Language (UML)

Let’s look at AdventureWorks, just so we can try things out. I’ve always been caught out by views so it would be nice to see those objects in the database that a view references. Here is a simple diagram.

![[2405-clip_image004.jpg]]

Note that schemas have been represented as folders. All I did to do this was to use the text:

I didn’t type this in. I just executed the SQL query that finds the soft references and foreign key references to and from the object that you name…

…and copied the result from the results pane (use text mode and set the ‘Query‘ ‘Options‘ -> ‘Results’ -> ‘Text’ -> ‘Maximum number of characters displayed in each column‘ to 8192 or some other generous figure)

…but you can of course use it with any other database object such as **dbo.ufnGetContactInformation.** Obviously, there is plenty more you can include but there is something to be said for having just one clear message to every diagram. Be wary about including too much in a diagram. Any network diagram quickly morphs into a birds-nest diagram if you try to do too much. This type of diagram was never intended to provide an entire map of your database.

Once you’ve got some confidence, you can use PowerShell to update diagrams automatically. You just execute the code, save the result to disk, and pass the result to PlantUML, which has a command-line interface.

Sometimes we would like to do a bit more than this. Now UML never had a stereotype to deal with a relational database, but there that includes a logical and physical model. As I have no strong feelings about the way that a table is represented, I’ve not deviated much from the standard class.

![[2405-clip_image006.jpg]]

We have drilled in to the detail from the first diagram here to look more closely at the tables. PlantUML is able to give you immense diagrams which are probably useless for our purpose here. If you want to do this, I’d advise you just to open the wallet a bit and use SQL Dependency Tracker instead. Here we want to keep things simpler, and just want to document tables, views, and functions and their dependencies in detail.

The PlantUML source code that we used is this, generated from SQL code…

All we have done is to give a list of the tables that we want a diagram for.

Here is the code:

I have only shown how to execute the stored procedure I wrote. I have specified the four objects whose dependencies and relationships I’m interested in. You may want to see all the dependencies and relationship of any object but even just the directly linked objects can overwhelm the diagram. It is better to be selective. PlantUML will do its best to oblige but you are soon at the wallchart scale of activity.

This stored procedure can do other things. What if you want to see a UML diagram of all the objects that reference person.address Here, it is

…giving you this, once the output is passed to PlantUML. …

![[2405-clip_image008.jpg]]

… or this …

… giving you this …

![[2405-clip_image009.png]]

I’ve given the SQL code at the end of the article.

# Modifying your diagrams

I have taken quite a few design decisions which you may not like. Fortunately, PlantUML has an excellent PDF manual which explains that you can change almost everything. It is so good that I’m not going to attempt to repeat anything from it. However, be assured that diagrams can be altered to suit your requirements: Related objects can be placed side by side, or vertically;, You can use dotted arrows or arrows with a different head; You can opt to avoid shadows, and change the colour of anything. My instinct is to leave GraphViz and PlantUML to do as much as possible by default.

PlantUML supports a flavour of markdown called Creole. This allows you to have formatted notes and descriptions. There is even a full set of icons from OpenIconic. Because PlantUML is based on GraphViz, you can use Graphviz raw. This allows you to do more general network visualisation diagrams for general software-engineering purposes. For database people, it is great for plotting out chains of dependencies in database data or in databases themselves.

# GraphViz Dot Language

PlantUML can execute graphviz dot language files as well. We can therefore use PlantUML to draw ‘network’ diagrams, which is something thet GraphViz does extraordinarily well. Most of the time, you’d probably want to do it with data but you can do it for your SQL Server metadata. Here, for example is Northwind’s table dependency diagram based on foreign key relationships

This code produced this diagram (you can click on it to enlarge it)

..but you’ll see that I’m cheating a bit by using a very small sample database. Even AdventureWorks produces a big mess.

Which you can view if you have an image viewer that scrolls!

![[2405-clip_image015.jpg]]

How did I do this? Just the same way as the first database UML diagrams. I just executed this in SSMS, and copied the result into a text editor, just to put in the top and tail as shown above.

This can easily be refined into a stored procedure that takes out those illegal characters that make graphviz crash. GraphViz has a lot of power and it is worth looking around for examples and information.

# References

- This is the main site for Graphviz. There is plenty of information here, and it is from this site that you can get the GraphViz application and documentation
- This is the PlantUML site. It has a large number of resources including downloads and documentation.
- The essential book of PlantUML. It is much less confusing to read than the PlantUML site that has some distracting google adverts.
- The equivalent book of GraphViz. It was written some time ago but still seems relevant.
- The site for ASCIIdocFX, which is a very cute and useful editor for ASCIIdoc (Markdown for grown-ups) which is intended for creating technical books with mixed text and diagrams. The editor is based on Atom, and you can use PlantUML, GraphViz and DITAA for drawing your diagrams.
- DocuWiki is a wiki that is geared towards technical documentation. The real power of Docuwiki is in the add-ins, one of which gives you PlantUML diagrams embedded in your documentation.
- A specification for using UML diagrams for databases by Simple-Talk author Scott W Ambler

# The Code

# The Coda

Just to show that, with some care with the way that you do the arrows, you can get some very satisfactory effects.

![[2405-Stairway1.png]]

… and PlantUML can even do syntax railroad diagrams for SQL.