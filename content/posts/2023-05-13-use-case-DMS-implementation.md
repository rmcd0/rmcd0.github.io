---
title: "Use case: DMS implementation for a global finance department"
description: "Case study: how I would roll out a document management system for a global finance department, from metadata model to user acceptance tests."
type: project
lang: en
tags: ["it", "tools"]
permalink: "/use-case-DMS-implementation/"
image: "/assets/img/posts/2023-05-13-1-Xjm35J1_dE-qEs6wADXzHQ-fc21ab.webp"
imageAlt: "Invoice-to-Pay process diagram, with the future EDM storing the documents and their metadata"
imageCaption: "I2P process — [source file](https://github.com/r-m-c-d/sandbox/blob/c7c1e4e4e66ef7216d17a58fd90d626d9657cc8f/diagrams-workflows/I2P_process.excalidraw)"
alsoOn: "https://medium.com/@rmcd0/use-case-dms-implementation-for-a-global-finance-department-64efb8c44948"
---

Recently pitched to a panel for a project lead position in a global organisation, responsible for managing the implementation of a DMS in their global finance dept before scaling up to other business units. Here’s my (anonymised) slides and notes. Glad if it can be useful for you in a similar recruitment process!

*Tl, dr: if you don’t care about side notes & context, jump to the slides* [*here*](https://docs.google.com/presentation/d/1d0MSFDz-KmjFkGv0jDEI3fsVSOCuDcQLqrmyiQekKk0/edit?usp=sharing)*:*

> ▶ [Présentation](https://docs.google.com/presentation/embed?id=1d0MSFDz-KmjFkGv0jDEI3fsVSOCuDcQLqrmyiQekKk0&size=l)

---

## Context

The client is a large scientific organisation renowned as a reference in biodiversity protection, with project offices across the globe and a swiss based headquarter. They are structuring their systems and selecting vendors for an Enterprise Document Management platform to be implemented for their global finance department at first, with scale up to other business units in a 2nd step.

The specialist will encompass usual activities for such a project: product evaluation and contracting, Proof of Concept, environment preparation, user training, planning & delivery, QA & implementation, User Acceptance Tests (UAT) and post live support.

After the first interview rounds and meeting the panel, the latest step was a use case exercise in 2 steps:

- meta data document analysis: based on a provided example of a finance doc (invoice), suggest the minimal data model, present & explain it. Some data is provided (like vendor code, account n°, project code, etc).
- UAT: definition/preparation, execution (what would you test, who will test, instructions, etc.), testers provided (6 persons, 2 from HQ + 4 other coming from 2 other offices worldwide), request: perform an advanced search of a document based on the combination of elements (doc name, project code, owner, etc.)

Further info are given, such as internal references (document properties, dept. & accounting codes, etc). It is mentioned that we should assume the panel is not familiar with meta data models or technical aspects of the system, hence my will to popularize the content.

Through discussions in the 1st rounds, I also noted that the organisation didn’t especially have a formal document management framework, document control protocol, established naming conventions, etc, things I tend to be quite acquainted with in the pharma engineering field where everything is, let’s say, quite highly controlled & governed. Which gave me the opportunity to mention in my slides and pitch not only the importance of a technically well thought-out DMS but also of a standardised & controlled environment with clear & accessible internal guidelines.

## Dive in

Presentation to panel was asked not to last more than 45min, so it passes quite fast but also gives some room for adding content and show your strenghts in not only implementing a system but also understanding their IT environment as a whole, anticipating future scale up of the system, etc. So I added a couple of more slides to the strictly necessary meta data model & UAT.

Since the allocated time would be short, but I would have to send my slides beforehand, then the strategy in that case when you want to pass some info is to textually add in your slides content you would otherwise share verbally, since they would for sure take the time to read you before the interview. A bit of the contrary to what is usually a best practice when presenting something (lighter slides with main key points).

### Invoice-to-pay (I2P) process review

Before jumping in, and since the content provided for the exercise was missing a bit of exhaustive details, it seemed important to me to understand the upstream process which would actually feed document to our future system, since it was part of prior conversations and was the backbone of the financial department I would work with.

Through my questions in prior interview, some hints I could dig from their test sheet and some basic OSINT, I quickly (had a short amount of time as exercise was sent <48h before pitching) mapped the estimated process ([excalidraw](https://excalidraw.com/) is your go-to for that!) to show comprehension of their environment and serve as a reference for later on in the conversation.

Passed ~2mins on this slide, just making sure I had understood their I2P process, from reception in GSU (General Service Unit), PI (Purchase Invoice) Navision transaction, then PPI (Posted Purchase Invoice), and opening questions for later.

### Metadata

![Explaining metadata to someone uninitiated](/assets/img/posts/2023-05-13-1-w3ER8Bo11OAQ02jC6IBUyA-8d2a5a.webp)
*Explaining metadata to someone uninitiated*

During prior interview, I got asked to “explain metadata as to a 5 years old” and wasn’t sure my improvised popularisation was enough or if the concept was understood. Afterwards, I felt like my example maybe wasn’t perfect, of course it’s easier when you have time to think of a perfect example afterwards than in live conditions. Well, that is to say, here’s a quick slide on metadata, I just passed it in 5 seconds, simply asked if anyone had a question regarding MD.

### Metadata model

![Slide: metadata model design](/assets/img/posts/2023-05-13-1-3gtQ3vh0_tiH-fFa84H9QA-30812c.webp)

So now we’re entering into more concrete action. Remember, initial question was “what is a minimal metada model for an invoice”. That was quite short to simply respond to that (see “Minimal model”), because basic necessary elements from an invoice seem rather logical, without showing we can think way much ahead and plan for future x-system interactions, data exhaustivity, etc. Hence the “Going further” and the list of more exhaustive potential variables.

I designed an associated spreadsheet and tried to think more widely about any variable we could possibly extract or use out of what seems like a simple standard invoice that any company receives everyday. In the context of a DMS, I could also think of usual additional features when working on documents, such as versioning, redlining, etc. Probably rarely used for invoicing since the mother-doc won’t change, but vital functions when working on editable documents in other contexts. Remember: global finance is the 1st customer, but if the PoC is successful the system would upscale to other departments. Since they collaborate with thousands of scientists globally, from multiple organisations, it seemed clear to me that the required features of a DMS I can think of in my pharmaceutical engineering activites would rather match this kind of needs and process. Think: long back & forth peer reviews, annotations, comments, versioning, etc).

### Complementary notes

![Slide: complementary notes](/assets/img/posts/2023-05-13-1-MkNSNuY48h84jF9LBgdvgg-4bae93.webp)

Again, a slide I wasn’t expecting to spend time on during this last round, but which was a natural reflection of what came out of our prior conversations around the fact that when I asked if their was any documenting best practices, protocols or internal framework I would rely on when I would be joining their team, the answer was more or less that there were was some sparse procedures here and there but likely not globally enforced and that they would gladly welcome my support to structure that later on.

I aslo needed to emphasize that I couldn’t implement a software “out of the box” and would need to spend a lot of time initially with their finance team in order to oversee the whole chain, how they work, what do they need from operational or legal PoV, etc, if I wanted to translate that into actual metadata or variables I would get out of a software.

Turned out, that is perhaps the slide we spent most time on (!) after I finished with UATs

### UAT goal & scope

![Slide: UAT goal and scope](/assets/img/posts/2023-05-13-1-UnnYzYN-1PQq4Bv8v0mFCQ-ecd116.webp)

Back to what was asked in their test sheet: explain what are UAT to someone not familiar with it.

So here’s a simplified intro to UAT in general, then in the context of an EDM software. No need to spend much time talking here, rather just be available to come back to it if asked to.

Come the preparation scenario. I was asked not to provide a timed scheduled, but to provide the UAT plan in a way to segment the different steps, categories, actions to take, etc. I decided to stay high level and not to exhaustively detail every subcategory because, again: time. So a large overview of what each step contains, and some focus/definitions on some elements (again, they would read beforehand and time for interview is short).

![Slide: UAT preparation](/assets/img/posts/2023-05-13-1-mlPzhf-GcktqVjCRJLx7ew-641d71.webp)

I had noticed that the test instruction seemed to presuppose that the testers would all have the same tasks to complete which, well, would probably just multiply the expected results by the number of testers. There was no mention of segmentation, of their job level/requirements/access rights/security: I would safely assume any organisation doesn’t let their summer intern in accounting access the same docs a Head of Global Finance does.

If you think of a Saas/cloud based software, I also want to know how the regional offices work: OS/setup/environment, network connection, VPN to the the headquarter — latency, usual web browser in the org —result from an action in Chrome vs Firefox might differ, etc.

Similarly, still from an IT PoV: a system administrator, a document controller or a standard user, all face a different UX in what they are allowed to do and see in a system.

So rather than just replying to the ‘what would users test’ question, I went outisde of their test scope and felt like I had to also provide a common ground to be all alligned on:

![Slide: UAT execution, part 1](/assets/img/posts/2023-05-13-1-_GTJpsiBsiuTWFKeOY32Pg-3be33c.webp)

Hopefully, I already have multiple Gsheet templates I built over the years, and of course have a DMS testing repository I could rely on to quickly prepare something more visually concrete. I adjusted it to suggest some roles we could give to these 6 testers. The slide serves as a basis but during my talk I actually switched to the live demo of my tool while talking, projecting them into a more live, real-case action.

I then went on with contuing the execution and had pre-filled my dashboard with some brief examples I could think of:

![Slide: UAT execution, part 2](/assets/img/posts/2023-05-13-1--S8WJDrmO6UoylsQmzTCaw-43a1ca.webp)

### UAT example: Search

Lastly, since the instruction sheet mentioned that the tests would include the search of a document with a given couple of criterias, but that it seems to me that Search can be a whole category as itself, which encompasses many features, technologies, subcategories, etc, I ended up my slides with a brief overview of Search categories and listed multiple examples of specific test instructions I could think of:

![Slide: UAT example for the search feature](/assets/img/posts/2023-05-13-1-lw1xgF0Vtgh0qaVEoGbgNg-084e96.webp)

---

### Sources:

- [Pitch slides](https://docs.google.com/presentation/d/1d0MSFDz-KmjFkGv0jDEI3fsVSOCuDcQLqrmyiQekKk0/edit?usp=share_link)
- I2P process: Excalidraw [raw code](https://github.com/r-m-c-d/sandbox/blob/c7c1e4e4e66ef7216d17a58fd90d626d9657cc8f/diagrams-workflows/I2P_process.excalidraw) — and [PNG](/assets/img/posts/2023-05-13-I2P_process-0e591b.jpg)
- Software Sprint Test tool: [Gsheet template](https://docs.google.com/spreadsheets/d/1kNcGU-3XuCLVFcwiiehDA7ION6ONpDWJn_9CLX6UN2k/edit?usp=sharing)
- Sandbox worksheet for DMS metadata variables: [Gsheet template](https://docs.google.com/spreadsheets/d/1B1AIaQcWvicYNuWzTf_ZaTZpiMSIRi_BaqagpW8GlhA/edit?usp=sharing)

### Outcome

I’ve been hired and working there since then 🥳
