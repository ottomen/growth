# System Design checklist

The first mandatory step we need to do before implementing our solution - is to collect requirements and brainstorm about the project.

## Math point of view

You can think about System Design from the Math point of view. In every mathematical problem you need to define and write down 3 elements in the system:

- **Variables and Unknowns**. What do they represent? What do we actually know, what do we actually don't know?
- **Relations**. What are the relations between the Variables and Unknowns?
- **Output**. What do we need to achieve? What should be a solution here?

If you don't know about Variables and Unknowns, their relations or what is the desired Output - you should not start doing anything, because there is a high chance that: you will solve not this exact problem or you will spend more time on elicitation process during the implementation that will multiply the time.

You need to be honest with yourself and say "Yes, now I know the problem, I know Variables and Unknowns and relations between them. Now I can move towards solution here".

**Book to read**: [How to Solve It](https://en.wikipedia.org/wiki/How_to_Solve_It) by George Polya.

## System Design plan checklist

Formalized approach to the System Design is to follow the checklist, that will help you to cover the whole area.

**Here is the checklist:**

1. **Gather all the requirements**. We need to know all about the domain and the Scope. We need to make sure that we understood a Client, and they are on the same page with us regarding the vision.
   - 1.1 **Functional requirements**. Specific features and operations a system must perform to meet business and user needs.
   - 1.2 **Non-functional requirements**. Defines how a system should operate, focusing on performance, reliability, and user experience rather than specific features. Often overlooked.
2. **Assumptions and Limitations**. We need to explicitly tell our assumptions and limitations. We are not magicians, we are limited by: Resources, Time and Cost.
3. **High-level diagramming of the system**. We need to make a sketch of the whole solution in a form of a visual diagram.
4. **Low-level components design**. We are focusing on specific components that are tricky, or the most important, to add some clarity here. We need to create UML diagrams here.
5. **Database layer, database schema**. DB layer planning. We need to create UML class diagrams here.
6. **High-level API-design**. We are thinking about API layer.
7. **Design Corrections**. We are revising the whole solution, addressing bottlenecks, problems, side effects.
8. **Preliminary Estimate**. We need to do the high-level estimate.

### 1.1 Functional requirements

Functional requirements define the Scope (specific features and operations) a system must perform to meet business and user needs. They describe what the system should do and how it should interact with users or other systems.

Here you need to focus on the explicit business logic. What this project is be about? What problem should it solve?
We should get these things from stakeholders, and we should have a common ground with them. We need to know 100% that we are talking about the same thing and we are solving the problems we are expected to solve.

**We can use the following methods of requirement elicitation:**

- **Interviewing a Client**. We can schedule a series of meetings, to ask client and collect their replies. "Can you please explain your vision? What this project is about? What is the Scope?".
- **Brainstorming**. We can form a team with the Client where we will think about the unknowns, ask questions, push us towards common grounds. This is a longer form of "Interviewing a Client" that can take more than 1 meeting.
- **Expert opinion method**. We can find people in out ream that are experts in this domain.
- **Past experience analysis**. We can use our own experience if we did similar projects in our past.

On this stage we need to get details about pure business logic of the project: list of features, auth mechanisms, integrations, payments, analytics, platforms.

**What you should have on this stage**: list of Functional requirements that Client approves.

### 1.2 Non-functional requirements

Often overlooked!

Non-functional requirements define how a system should operate, focusing on performance, reliability, and user experience rather than specific features. They ensure the system is efficient, secure, and maintainable over time.

Non-functional requirements essentially are following the ISO/IEC 25010 quality model.

It is extremely important to think about Non-functional requirements, because implementing them takes time, and they can affect the whole system.

These things are items not related to the business logic of the project. If we are designing the EHR healthcare system Non-functional requirements might be: scalability (how our system should react if we hit the users load limit), security (how shoule we protect PHI data), fault tolerance (what should happen if one of the services fails), maintainability (what are the UAT environments, what will be the update mechanism).

**On this stage we need to get details about**:

- How available and reliable should the system be?
- How secure it should be? What is the Security model?
- What is the peak load of the system?
- How fast should the system respond to user actions?
- How many users system might have?
- What is the size limit on the DB side? How may tables/records?
- What Observability tools (Logging, Metrics, Tracing) you need?

**What you should have on this stage**: list of Non-functional requirements that Client approves.

### 2. Assumptions and Limitations

We need to be honest with ourselves. The more complex project we are designing - the more unkowns we might have. We definitely will have some limitations and some assumptions of things we don't know at the moment.

Here you need to calculate:

- RPS (Requests Per Second).
- Peak RPS (usually 2x-5x average).
- Storage limits (if you store 100 million records at 300 bytes each, you need ~30GB/day).
- Bandwidth.
- Read/Write Ratio. Knowing if a system is "Read-Heavy" (like Twitter) or "Write-Heavy" completely changes your choice of Database and Caching strategy.

And you need to create 2 lists:

1. **Assumptions**. Things we assume. It might be something like "I assume that integration with `{X}` service will be done via {X} Java SDK they provide. We will not make it from scratch". Or "we will have 100.000 Requests Per Second (RPS)".
2. **Limitations**. Limitations we have. It might be something like "We have 2 months to deliver this project. We have no time to make `{4,5,6}` features, we will focus only on `{1,2,3}` features".

**What you should have on this stage**: 2 lists of Assumptions and Limitations items that Client is aware of.

### 3. High-level diagramming of the system

We need to think about the high-level structure of the project:

1. Should we pick monolithic or a microservices architecture? What are pros and cons of each of them in the context of the current project?
2. Is it a Cloud-based project or on premise? If this is a Cloud-based project, what is the cloud provider (AWS, GCP, Azure, other)?
3. What [System Components](https://www.geeksforgeeks.org/system-design/what-are-the-components-of-system-design/) do we need? Load Balancer, API Gateway, Rate Limiter, Redis, CDN, Message Queues (Kafka/RabbitMQ)?
4. What type of DBs we should use: SQL, NoSQL, other? What are pros and cons of each of them in the context of the project?

On this stage you can focus on high-level System Components and connection between them. You can use [https://excalidraw.com/](https://excalidraw.com/) or FigJam for that.

Additionally you can create [UML Entity Relationship Diagrams](https://mermaid.ai/open-source/syntax/entityRelationshipDiagram.html) to model entities and their relations. For example, you have a VPC, Order Service, Notifications Service, Load Balancer, Redis, Client iOS app + browser-based app. You can draw them, add some properties and add some logical connections.

**What you should have on this stage**: you should have a diagram with all System Components needed, their connections, and it should give you a desired level of clarity.

### 4. Low-level components design

On this stage you need to go to the deeper abstraction level, into specific System Components that are most important or/and unclear to you.
As a classic example, with "URL shortener" service you need to focus on the algorithm how you will actually make the URL hashing, for example using `base62` binary-to-text encoding with limit of chars per-URL.

**What you should have on this stage**: you shoudl enrich existing High-level diagram with System Component details.

### 5. Database layer, database schema

On this stage you need to create [UML Class diagrams](https://mermaid.ai/open-source/syntax/classDiagram.html) that will help you to model tables. For example, you have Order, User, Shipping, Address, Product entities. They have some properties. You need to think about responsibilities, isolations.

1. Think about scalability, according to the type of DB you have chosen.
2. Think about [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem) here.
3. Think about [ACID principles](https://en.wikipedia.org/wiki/ACID) here.
4. Retention Policy, how long do we keep data?
5. Caching Strategy - where do we cache (Client-side, CDN, Redis, Local memory)?

You should know about Sharding, Partitioning, Master-Slave Replication, Database Normalization database patterns.

**What you should have on this stage**: you need to have UML Class diagram, list of tables, relations between them and information about scalability, performance.

### 6. High-level API-design

On this level you need to decide the main tyope of API you will use. Is it REST, GraphQL, WebSockets, other? Check this article from IBM: [https://www.ibm.com/think/topics/api-design](https://www.ibm.com/think/topics/api-design).

You definitely can use Swagger, but for a beginning you can define the list of endpoints, data contracts, and points of interest (Client, Server, Proxy, other).

Also you need to clarify the need of WebSockets, other communication protocols.

**What you should have on this stage**: you need to have list of endpoints with data contracts.

### 7. Design corrections

On this stage you need to look on the artifacts you've made, diagrams, descriptions, to verify that you covered all pieces, and you are satisfied with what you see.

It is very common here to change some pieces in the big picture, to add some embellishments.

**What you should have on this stage**: you need to re-verify the whole solution.

### 8. Preliminary Estimate

Besides risk and time management the work that you did above is important for a following, importatn and crucial point from a Client perspective - Estimate. Why? Because at the end of the day it is about the business, cost and ROI (Return on Investment) numbers.

Do not forget that you are building this solution for a Client, not for your ego or schientific interest. You can use hours, story points, T-Shirt size estimates. Additionally, you need to be aware of Prioritization techniques, because it is very common that in the set of Resources, Time, Cost something will not fit and you will need to help a Client to pick the most important and feasible set of features to implement.

There are several techniques for estimates:

- **Brainstorm**. You and your team should spend some time on group estimates.
- **Expert Opinion**. You can bring an expert in the needed domain, to ask their estimate.
- **Past experience data**. You can bring up the data from you similar implementations for your past.

And there are several methods of Prioritization:

- **100 Dollar Test**. A simple yet effective technique for prioritizing requirements. It involves giving team members a hypothetical budget of `$100`, representing limited resources, and asking them to allocate the money to different features based on their perceived value. This technique encourages team collaboration and forces stakeholders to make trade-offs between features. Example: In a project to develop a mobile banking app, team members may allocate `$50` to the feature of instant money transfers, `$30` to biometric authentication, and `$20` to bill payments.
- **[MoSCoW method](https://en.wikipedia.org/wiki/MoSCoW_method)**. Acronym derived from the first letter of each of four prioritization categories: `M - Must have`, `S - Should have`, `C - Could have`, `W - Won’t have`.

**What you should have on this stage**: you need to have some Preliminary Estimate table, at least in Excel spreadsheet format.

**What to read to learn more**:

- System Design Tutorial from GeeksForGeeks: [https://www.geeksforgeeks.org/system-design/system-design-tutorial/](https://www.geeksforgeeks.org/system-design/system-design-tutorial/)
