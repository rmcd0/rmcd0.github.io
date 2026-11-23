---
title: "Crypto Dashboard, log file"
description: "Version history of my Google Sheets Crypto Dashboard."
type: post
lang: en
tags: ["crypto", "tools"]
image: "/assets/img/posts/2021-10-31-1-TO8roHFuAUwMQ3-pm2IyLA-595ad6.webp"
imageAlt: "Spreadsheet with colour-coded columns, from the Crypto Dashboard"
permalink: "/crypto-dashboard-version-log/"
---

---

Reference: Crypto Dashboard [article](/crypto-dashboard-intro/)

---





 ## ongoing v1.5 - Jun 2022 - not publicly published

- correct & adjust Fiscal Year calculations
- reduce Fiscal Year computation burden, turning towards an optimised copy-paste process end of each year



 ## v1.4 - Apr 2022


- MAJOR: changed import price method due to Nomics.com deprecating their 'price' API endpoint. Now using Coinstats.app. See article for quick explanation.
- created Wallets sheet to serve as easy repository for daily use and better remembering purpose of each wallet
- DataCleaner: added crypto.com exchange (previously app download csv data only)
- edited FTX DataCleaner (new format of https://ftx.com/fills page)
- Fiscal year still not ready. I use it myself but it requires too many manual adjustment to be partially automated now
- Passive Income sheet: building. Idea is to centralise data reg. daily paying coins or NFT, yield, DAO, nodes, etc, to always have a rough estimation of ongoing passive income + price projection
- Deleted: LP sheet. Was nice looking but not scalable long term. Gonna think about something more traditional which can welcome hundreds of in/out Tx lines
- Added Arbitrage section on main page. Doing quite some volume in Arb opportunities between CEX & DEX this winter, so this centralizes them from buy & sell raw data. Still need to be designed a bit further, to include fees, show volume, etc. Delete this section if you don't need it



 ## v1.3 - Oct 2021

- fine tune: layout improv., adjusted scales, added sparkline, added links & QR code redirect, isolated/strenghtened potentially error-resulting formulas
- improved & added notes to DataCleaner
- added ‘SAFU checker’ for comparing wallet addresses (note: plan to impl. a regexmatch to auto-detect if valid BTC/ETH/BSC/other address format)
- adjusted ‘Scalper’ tool — probably still some improvements to be made
- BETA > LP sheet: trying to find a model to keep track of Liquidity Providing in pools. Welcoming any suggestion 🤓
- BETA: Fiscal Year finally is coming — was using it for myself for the past 4 years but not ready to publish it. Primarily designed for swiss tax payers of course. Also welcoming suggestions^^


 ## v1.2 — Mar 2021

- refined queries, fixed many N/A errors due to empty fields, added exclusions/rules
- added theme tribute to Thorchain and custom formatting rules
- added crypto.com (new model), Huobi and Swissquote in DataCleaner. Improved existing data cleaner models.
- tailored list in crypto converter
- split distinction between USD-EUR-CHF in Settings > Portfolio > FIAT
- modified MarketData to account for FTT, named FTXTOKEN by Nomics (let me know if you find others like this)
- FiscalYear however, still isn’t ready ¯\_(ツ)_/¯


 ## v1.0 & 1.1

- new overall layout, +/- already looks like nowadays (writing this in Oct 2021) version
- first DataCleaner, with Binance, Binance DEX, FTX, Coinbase Pro, Kucoin, Crypto.com (but different data source & model), Firebot, Probit.
- first definition of a stable, auto-compiling data model in CompiledData. Discovering & playing with [Google Query structure](https://developers.google.com/chart/interactive/docs/querylanguage), very cool tool 8)
- header-banner + large portfolio graph on main view, and much time spent on my favorite part: the toolbox
- defining a Fiscal Year model to pre-draft my annual crypto tax report. Not so easy due do to difference between live $ PF value vs. swiss tax office often unclear calculation of crypto assets


 ## v0.1 to 0.9 #### (_sort of_)

Countless time and spreadsheet models between 2017 and 2019. Some were ugly. Most required too much time to maintain.
Then came 2020 and global pandemia, with sundely a few weeks with a lot of spare time at home to totally rethink the data collection model. This is when I felt in the rabbit hole of designing _my own_ perfect crypto dashboard model once and for all.
