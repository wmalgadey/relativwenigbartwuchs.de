---
categories:
  - Artikel
status: gefunden
source: https://www.theinsaneapp.com/2021/03/system-design-and-recommendation-algorithms.html?utm_source=tldrnewsletter
---
[![](https://www.theinsaneapp.com/wp-content/uploads/2021/03/Recommendation-System-and-System-Design-Of-Uber-Netflix-YouTube-Spotify-Twitter-Dropbox-Amazon-Airbnb.png)](https://www.theinsaneapp.com/wp-content/uploads/2021/03/Recommendation-System-and-System-Design-Of-Uber-Netflix-YouTube-Spotify-Twitter-Dropbox-Amazon-Airbnb.png)

---

![[Recommendation-System-and-System-Design-Of-Uber-Netflix-YouTube-Spotify-Twitter-Dropbox-Amazon-Airbnb.png]]

Today, In this article, we’ll cover system design and recommendation algorithm of YouTube, Netflix, Spotify, Uber, TikTok, Airbnb, Amazon, Dropbox, Signal Messenger, Google Maps, Zoom, Yelp and more.

Let’s take a dive in all recommendation algorithms and system designs

## System Design And Recommendation Algorithm Of 20 Big Companies

### Uber System Design

Uber’s technology may look straightforward but the game starts behind the scenes when A user requests a ride from the app, and a driver arrives to take them to their destination.

Uber’s infrastructure consisting of thousands of services and terabytes of data supports each and every trip on the platform.

The system was predominantly written in Python and used SQLAlchemy as the ORM-layer to the database. The actual architecture was fine for running a relatively modest number of trips in a few cities.

The company’s backend is now not just designed to handle taxies, instead, it can handle taxi, food delivery, cargo and a lot more.

### YouTube Video Recommendation Algorithm

When users are spotting the videos on YouTube, a list of recommended videos are thrown below or on the right side of your device which the user might like in a certain order.

The described model in the paper focuses on the two main objectives. A Wide & Deep model architecture was used which combines the power of a wide model linear model (memorization) alongside a deep neural network (generalizations). The Wide & Deep model will generate a prediction for each of the defined (both engagement and satisfaction) objectives.

### Twitter System Design

### Spotify Music Recommendation Algorithm by Harvard Business School

How Spotify uses Machine learning to recommend the music?

The company uses three recommendation models concurrently and other techniques. Three models as described by Harvard Business School are

- CF aka Collaborative Filtering: Models that analyze your behavior and compare it to other users’ behaviors
- NLP aka Natural Language Processing Models – that scan the internet and analyze text about Spotify’s catalog
- Audio Analysis: Models that analyze the raw audio files

### Netflix System Design

Netflix operates in two clouds: AWS and Open Connect. Both clouds must work together without error to deliver endless hours of customer-pleasing video.

Three main component that plays a major role: CDN, Backend and Client

Anything that doesn’t involve serving video is handled in AWS. Everything that happens after you hit play is handled by Open Connect. Open Connect is Netflix’s custom global content delivery network (CDN).

### Netflix System Architectures for Personalization and Recommendation

Netflix uses a variety of rankers mentioned in its paper, though specifics of each model’s architecture is not specified. Here is a summary of what they are:

Personalized Video Ranking (PVR) — This algorithm is a general-purpose one, which usually filters down the catalog by a certain criteria (e.g. Violent TV Programmes, US TV shows, Romance, etc), combined with side features including user features and popularity.

Top-N Video Ranker — Similar to PVR except that it only looks at the head of the rankings and looks at the entire catalog. It is optimized using metrics that look at the head of the catalog rankings (e.g. MAP@K, NDCG).

Learn more about the Machine Learning Approach, Online Computation, Signals and Data Distribution by visiting the link given below

### Flipkart / Amazon System Design

Functional Requirements in designing a platform like amazon or flipkart:

- You Should provide a search functionality with delivery ETA
- Should provide a catalog of all products
- You Should provide Cart and Wishlist features
- Should handle payment flow smoothly
- Should provide a view for all previous orders
- And a lot more

Non Functional Requirements

- Low latency
- High availability
- High consistency

**Recommended Posts:**

- As A Programmer You Might Stuck At Some Point While Searching On Google? If You Have Faced This Situation, Then You Should Check This Hidden Methods To Reach At Your Target Search Faster: [20 Best Google Tips And Tricks For Programmers](https://www.theinsaneapp.com/2021/07/google-tips-and-tricks.html)
- Cool Machine Learning Applications: [[real]]
- Which YouTube Channel Is Best For Python, C++, Java, C#, Flutter, Ruby, Rust, iOS, PHP, CSS, HTML, Go, Perl, Julia, R, Kotlin, etc? For Answer, Check Out This List Of Best Coding YouTube Channels: [[b]]

### Signal System Architecture

Signal is an end-to-end encrypted communications application for Android and iOS similar to WhatsApp but open source. It uses the TCP/IP (Internet) to send one-to-one and group messages, which can include text, files, voice notes, images and videos, and make one-to-one voice and video calls. For user identification standard cellular mobile numbers are used.

### Book My Show System Design

In this post we’ll learn “How to design an online ticket booking system like BookMyShow”.

BookMyShow is built on microservice architecture. Let’s look at the components individually. Before we take a jump towards designing a ticket booking system, take a look over services and technologies used by Book My Show

Technologies Used By The Bookmyshow

- User Interface: ReactJS & BootStrapJS
- Server language and Framework: Java, Spring Boot, Swagger, Hibernate
- Security: Spring Security
- Database: MySQL
- Server: Tomcat
- Caching: In memory cache Hazelcast.
- Notifications: RabbitMQ. A Distributed message queue for push notifications.
- Payment API: Popular ones are Paypal, Stripe, Square
- Deployment: Docker & Ansible
- Code repository: Git
- Logging: Log4J
- Log Management: Logstash, ELK Stack
- Load balancer: Nginx

### Airbnb System Design

How do vacation rental giants like Airbnb, Booking.com and OYO work to provide such a smooth flow, from property listing, to booking, to payments? And all without a single glitch! Watch the video to find out everything from their system design, technologies, working, etc

### TikTok’s ML Backed Recommendation Engine

The Archetype of TikTok’s Recommendation System Design is User-Centric Design. In a simple term, TikTok will only recommend the content you would love, from a cold start adjustment to an explicit recommendation for active users.

TikTok never reveals its core algorithm to the public or the tech community. But based on the fragmented information posted via the company, and trails discovered by geeks using the reverse engineer techniques this recommendation workflow is made.

Let’s divide this workflow in various parts

a. Duo-Audit system for the User Generated Content (UGC)

b. Cold Start

c. Metric based Weighing

d. User Profile Amplifier

e. Boutique Trending Pool

f. Delayed Ignition

### Google Maps System Design

Functional Requirements for designing a system like Google Maps:

- To be able to identify roads and routes
- Find distance and ETA while travelling between 2 points
- Should be a pluggable model in case we want to build up on those good to have requirements

Non Functional Requirements

- High Availability – This system can never be down. We don’t want our users to get lost in the middle of nowhere.
- Good Accuracy – The ETA we predict should not deviate too much from the actual time of travel.
- Responds promptly – The response should be ready within a few seconds.
- Scalable – A system like google maps receives huge number of requests per second, so it should be designed in a way that it can handle these requests and any surges in the number of requests.

### Amazon Product Recommendation Algorithm

The algorithm contains 5 different main concepts:

- Multiple view – shows multiple components, all the items are displayed here
- User view – shows specific information about the current user in the session
- Item view – shows detailed information about the current item
- Recommendation view – shows recommended items based on the current item
- Data view – visualizes the data structure used by the recommendation algorithm

### Dropbox System Design

Have you ever wonder how these services works internally to provide features like File Upload, Update, Delete and Download?

- File versioning
- File and folder sync
- Here is the high-level explanation of how these systems works under the hood

### Google Docs System Design

The Google Docs system design is divided into two videos. In the first video, you’ll learn about operational transformation and differential synchronization. And in second part, you’ll learn about system components with micro service architecture and API gateway.

### Zoom System Design

Who hasn’t used Zoom or Microsoft teams or WebEx or some sort of video conferencing platform by now! Even classes are being conducted on Zoom these days. If you are reading this I am sure you are curious about how it works. So, Watch the video by visiting the below given link and I am sure that by the end of this video, you will be able to successfully design a video conferencing system.

### Yelp System Design

Let’s design any location-based service like Yelp or Trip Advisor, where users can search for nearby places like tourist places, restaurants, theaters, or markets, etc and also users can log in, can also add/view comments, photos, and reviews of places. We’ll understand everything by taking example of Yelp

### Cricbuzz System Design

### Stock Exchange System Design

Goal of the system design:

- Thousands of order matches per second per stock type (For reference NASDAQ handles over 60k messages per second.)
- High availability, Scalable, Reliable and durable
- SLA/latency
- Tolerates 1 data center failure
- Serves specific Geo users will less latency

Now, It will be easy for you to create a system design, recommendation system or a recommendation algorithm like YouTube, Netflix, Twitter, etc. If you think it’s possible, then please share this post with your friends and others. Do you have any other system design and recommendation algorithm to add in this post? If yes, Please share it with us at [@TheInsaneApp](https://twitter.com/theinsaneapp).