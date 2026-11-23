---
title: "Blancarré Watches virtual shop"
description: "Development of a tailor-made, 360° and VR-ready interactive shop for a Swiss watchmaker."
type: project
lang: en
tags: ["digital", "360-vr"]
image: "/assets/img/posts/2018-03-25-1-SCNnf1S4CI19sUAd5dG-4A-78bf5d.webp"
imageAlt: "Entrance of the Blancarré virtual shop: a dark door reading “Bienvenue dans notre shop virtuel”"
permalink: "/blancarre-watches-project_GH/"
imageCaption: "Home page of [Blancarré’s virtual shop](http://www.blancarre.com/landing/fr/index.html)"
alsoOn: "https://medium.com/@rmcd0/projects-portfolio-blancarr%C3%A9-virtual-shop-9875abc69832"
---

**Role**: PM — **Project**: Virtual shop, digital content, web development, VR, 3D **Period**: 07.2017–03.2018

Blancarré is a young Swiss made watches manufacturer founded by Nicolas Mertenat, former lead designer at Omega and other watchmakers (see [founder’s interview](https://www.youtube.com/watch?time_continue=1&v=FhHxM7p89N8) and [press coverage](http://blancarre.com/shop/content/11-presse)).

*This article is a detailed version of a project wrap up I made after handover around March 2018. Project took place in 2017 & 2018.*

---

## Context

Founder’s vision is to use the most of newest digital technologies and the rise of Virtual Reality to leverage his product presence and corporate identity and stand out from other watchmakers. Besides, from a marketing point of view, entering such a traditional market, where biggest competitors have reached global recognition through dozen of years of production and have huge marketing budgets, requires a well thought out strategy.

Instead of partnering with a large number of physical stores and risking to dilute his hard-earned branding into many locations and cut margin by placing his young brand alongside other very famous watches brands in shops, he bet on a disruptive approach consisting in VR compatible online shop, and a dedication up to personally visit and deliver his products directly to his customers if needed.

![Final VR headset rendering on a smartphone](/assets/img/posts/2018-03-25-1-YWzAyCiZM4ki6uqZcgyvuw-6d4de4.webp)
*Final VR headset rendering on a smartphone*

For this, an external digital agency was initially contracted to design a tailormade, state-of-the-art interactive shop featuring watches products range as interactive 3D elements, product specification for each watch, and embedded videos of receptionnist and watchmaker at work to make the user feel just like in a traditional shop and offer a unique user experience.   
After several months of development between 2015 and 2016, their former supplier went extinct and left the project with unfinished materials and elements and a heavy code database with multiple errors. Overall, a broken prototype.

Then came my mission to take over everything from scratch, analyse the feasibility and cost to put the project back on track, deliver a properly streamlined database and a working prototype, and *de facto* save my customer’s initial investment. The integration into [Blancarré’s website](http://www.blancarre.com/landing/fr/index.html) would later on be made in collaboration with [Openroom](https://www.openroom.ch/home), a swiss digital agency providing high quality work for some renowned projects (TCS, BMW, SBB CFF, Car Postal, etc).

### Hands-on: approach & main achievments

This project was very different from the 360° interactive virtual tours I usually create: shooting actual location in DSLR pictures, stitching them into 360x180 panos and then develop interactive content based on the existing Google Streetview tour through an external platform. I detailed the process in another article (in french):

> 🔗 [Publication Google Street View Trusted: que se passe-t’il après le shooting](https://medium.com/@Romain_Marchand/publication-google-street-view-trusted-que-se-passe-til-apr%C3%A8s-le-shooting-8b5417ce0307) · medium.com

![Example of a watch model elements before 360° slider process](/assets/img/posts/2018-03-25-1-_zpMcRQrjiQq9SfkTVisgA-51ab5e.webp)
*Example of a watch model elements before 360° slider process*

- **Think out of the box**: instead of first going to a developer, since the database was sent to me “as is” with no further explanations, and not especially knowing which technologies were involved as the project was very different from what I used to do, I started by studying the project elements for hours to deeply understand the conception model and the technologies involved. This would help recruiting the relevant developer profile later on.

![Shop structure view in Blender](/assets/img/posts/2018-03-25-1-EamYQTMdmkp5ZvNF_E6V6w-0e055a.webp)
*Shop structure view in Blender*

- **Technical analysis**: to do so, I executed a local prototype trying to *sort of* reverse-engineering it to analyse the database and underground lying technologies (WebGL, HTML5, JS, KRpano, etc) and the relevant plugins (e.g. 360 slider, mobile/desktop compatibility, etc). My basic knowledge of 3D at least helped me to review the 3D structure of the shop layout in Blender, used for developing the digital shop architecture.

![ThreeSixty slider JS](/assets/img/posts/2018-03-25-1-cjfUQpe-pG4iqxYBBwcg-A-82f9ac.webp)
*ThreeSixty slider JS*

- **Customer requirements & specifications writing**: identify and list all corrections to bring on my local prototype, and there were quite a lot. Submit and review them together with the customer and translate them in specifications and project scope definition for the future developer (…)
- **Specialist sourcing**: (…) then once every required skill was identified, source the relevant developer able to work with both web & VR / 3D technologies, ideally based in Swiss Romandie and also french speaking. Not that easy in the end, but eventually met the rare pearl through networking connections. He made such an impressive quality work and basically saved the project!
- **Improved communication**: setup a permanent and open communication channel between the customer, the developer and myself, to improve productivity and issue response time, speed up integration of customer feedbacks and improvement ideas into the project scope, then faster update of the live product version along the development phase
- **Quality & Customer satisfaction**: delivered a working project, with an error-free code and a smoother database radically lightened from 7.4Go to 960Mo. Overall self-satisfaction to come out of this technically challenging project (at least for me) with honours.

![Initial database I was sent](/assets/img/posts/2018-03-25-1-D4Hig1jE_R53x4-3nALkEA-f081a0.webp)
*Initial database I was sent*

There were tons of unexpected little issues spicing up the deliverables every day, such as the proper and borderless integration of video layers above content, but none that were unfixable in the end. Video frames are now unvisible and their area finally is clickable for navigation:

![Both the receptionist and the watchmaker behind are distinct videos frames shot separately, then embedded into the final rendering](/assets/img/posts/2018-03-25-1-ONDRAdlr4Gj0NCJBnMvhIQ-9a979b.webp)
*Both the receptionist and the watchmaker behind are distinct videos frames shot separately, then embedded into the final rendering*

### Technical environment and methodologies

- **Web technologies**: WebGL, HTML5, CSS, jQuery libraries & JS plugins (such as [ThreeSixty slider](https://github.com/creativeaura/threesixty-slider)), WebM, etc
- **Multiple softwares**: Blender (3D design), Photoshop, KRpano / Panotour Pro (virtual tour development), Hugin (panoramic image assembler), develope mode web browser
- “*Sort of*” **Agile XP methodology** (Extreme Programming)-like product management: with customer implication and cost reduction in mind, and code review > test > continuous conception and simplicity phases.
