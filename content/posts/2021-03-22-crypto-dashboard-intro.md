---
title: "Crypto Dashboard, under the hood"
description: "How my Google Sheets Crypto Dashboard works, and how to use it."
type: project
lang: en
tags: ["crypto", "digital", "tools"]
image: "/assets/img/posts/2021-03-22-1-olXKmBdBO6mC6qdBDPzahw-396df6.webp"
imageAlt: "Dark dashboard showing portfolio totals, a growth chart and three gauges"
permalink: "/crypto-dashboard-intro/"
alsoOn: "https://medium.com/@rmcd0/crypto-dashboard-6b939399cd50"
---

![Dashboard landing page view with Thorchain-inspired coloured theme & fancy random figures— 5 themes available — calm down, these are fake numbers](/assets/img/posts/2021-03-22-1-olXKmBdBO6mC6qdBDPzahw-8d923d.webp)
*Dashboard landing page view with Thorchain-inspired coloured theme & fancy random figures— 5 themes available — calm down, these are fake numbers*

## Crypto Dashboard: under the hood

Don’t have any crypto anymore but was a fun experience. So few years ago I had developed this dashboard that some people across the world are now using. Here is the archive of some infos and how-to’s for using it.

> > Tl;dr: if you know your way around spreadhseets, fill [this form](https://forms.gle/YHWRrBQHcwtLeizi7) to request access to the Gsheet, make a copy of it and move on. It’s filled with a bit of random data & fake trades just as example.

---

- *dashboard latest: June 2022 — v1.5*
- *dashboard public: v1.4*
- *this article latest update: Nov 4th, 2022; minor typos*
- *version logs:* [*here*](/crypto-dashboard-version-log/)
- *setup periodic backup to xlsx format:* [*here*](/periodic-auto-backup-google-sheets/)

---

Note — Apr 8th, 2022 — live price source: nomics.com has deprecated their price API endpoint so I’ve spent the past few weeks looking for an alternative. I’m now pulling max. 2000 first marketcaps live prices through an import of Coinstats.app directly into the gSheet. Works smooth, but Nomics used to provide me with +12K live prices in 1 pull. Good thing is you don’t even have to register for a free API now! Also, you can skip the 1st part below about getting a Nomics API :)

If you have better alternatives, I’m all ears!

NB — 2025 update: I’m now using Coinmarketcap API pulled via a SyncWith connection in the spreadsheet. You are a few dozen users using my template, that’s really cool! I gotta work on a major update of this article, especially in the Market Data section below, and publication of an updated spreadsheet template!

---

Finding a reliable portfolio tracker is sort of a hard thing in the crypto jungle. Since 2017 I had tried betas or public versions of many providers, some with awesome UI, some with native connections to many exchanges, but I was never a fan: all of those I checked were missing some key features to me, were not versatile enough to track every possible exchange, couldn’t give enough details on every little detail I wished to know, couldn’t integrate staking rewards or airdrops and track them independently, or give me my average cost per dollar and per reference pair (e.g. trades in BTC) instantly, remember me the Tx ID to a precise past transaction, etc. Plus with the rise of DEX & DEFI, it’s close to impossible for these centralised tools to follow up on daily developments and integrate transactions within their app.

Secondly, I’m not a fan of linking all my APIs and trade history to a centralized company. Even famous ones can have issues, bugs, shut down or simply change their model. And finally, I was spending way too much time navigating through apps like these, liaising my data, and having tools everywhere to calculate percentages, ratios, risks, etc. Not productive at all. **In a nutshell: sometimes nothing beats a good old spreadhseet \o/**

> > Not your app, not your data?

Yes, my solution here is somehow centralized too, but Google Sheet is the messenger, not the message. If for some reason Google would terminate its product, or even if every exchange I use would die today, I‘d still have my whole trades & transactions history stored locally, with backups, and could simply just move my data in any other spreadsheet system. Data is critical, simply for my own analysis, as well as obviously for the annual closing of my portfolio and declaring my taxes.

> 🔗 [Periodic auto backup a Google sheet](/periodic-auto-backup-google-sheets/) · rmcd0.medium.com

- long-lasting capacity to log thousands of lines of trades & transactions for years to come
- easy enough to modify it on-the-fly without touching the important logged data

This dashboard was primarily developed for my own use so it fits my needs and it definitely became my main page for my everyday crypto activities. However, I’d be glad if it can help you too! As per my usual open-source personal philosophy, this tool has initially been shared with a few friends, then it became more complex over time and since some people don’t know much about spreadsheets, I’ve been asked to provide some guidance, hence this step-by-step guide to unveil the logic behind it : )

Alright, let’s dive in!

---

![Market Data](/assets/img/posts/2021-03-22-1-UppR9ejkNkj4BrsCkS6eOA-c0ea61.webp)
*Market Data*

## Market Data, one key to rule them all

It all starts here. I initially was pulling prices from CoinMarketCap but they changed their site structure and anyway it was a bit unsteady in my sheet. Then used my Binance API to pull live market prices but this was taking only Binance coins and we all trade on so many places in crypto that I was missing plenty and didn’t want to start reading documentation of all exchanges!

Did some research and tests and it turned our that [Nomics](http://nomics.com) was exhaustive (+11.5K token prices as of writing this), dead simple (not even a script to edit, simply an IMPORTDATA function which pulls the whole list in 1 request) and reliable. **Oh, and free too.** You just need an email.

The API key in this template is a 2nd one I have and I don’t mind it being blocked. **So if the dashboard doesn’t work when you open it**, since it’s been shared multiple times and several people made a copy of it, probably look there first.

Head over to [nomics.com](https://p.nomics.com/pricing#free-plan), get your API, and replace it in cell MarketData!A7 between ‘=’ and ‘&’. The sheet is simply protected to warn you when editing, tick ‘OK’ or disable this in menu Data > Protect Sheets And Ranges.

Nomics gives all the USD values. Then this coin list is calculated in EUR, BTC, ETH and BNB pairs simply deduced from that. EUR and CHF are just a GOOGLEFINANCE request in column B3 to B5.

As per Bitcoin’s historic data, it’s just an IMPORTHTML of CoinGecko’s data considering the dates you input in I3:J3 which is by default a rolling 3-years and the URL in I6. So basically you’re visiting [this page](https://www.coingecko.com/en/coins/bitcoin/historical_data/usd?start_date=2018-10-28&end_date=10/30/2021#panel) but from your spreadsheet.

In the case Nomics wouldn’t have a coin you acquired, just lower the API request currently in A7 down 1 cell and add it manually —as it’s done for FTT (FTXTOKEN) in B6.

---

![Data Cleaner, the entry door!](/assets/img/posts/2021-03-22-1-B1DwntpCPZ64zJQBEaxVBQ-a4efa9.webp)
*Data Cleaner, the entry door!*

## Data Cleaner, a static story

The 2 key elements for my initial project were: 1/ keep track of ALL my trades, ever; and 2/ get their live prices in real time. Then came the nice-to-have features.

My initial template was pulling live prices, open orders, trade history, etc, from a Binance API. Each request in a different sheet. I quickly realized it was inefficient: each script refresh was taking ages to pull data, and was loading the whole trade history again instead of just pulling latest trades.

Then I would have had to make an independent sheet for every exchange, get an API on all of them, read plenty of documentation and, be it manual or automatically at a defined time range, refresh each. And I didn’t want to start linking my Gsheet with many third-parties API connectors which would increase maintenance surface or slow everything down even more, so I ended up spending countless hours building my own (almost) reliable data formatting tool instead… #rabbithole

![Puzzled man in a suit, from a Monty Python sketch](/assets/img/posts/2021-03-22-1-qKCl3GEpANMJHvULRRBd1Q-1c866c.webp)

Static data is much better here, in my opinion, than API calls. Plus, I may be old-school but **I prefer to keep tracks of all my trades manually**. Automation is awesome for plenty of things, but manual tracking makes me more responsible and better memorize and understand the positions I take.

So here are a few data converters for several exchanges like Binance, Binance DEX, FTX, Coinbase Pro, Kucoin, Swissquote, Firebot *(actually not an exchange but a cool algorithmic trading platform I use; and yes, I have a* [*reflink*](https://firebot.gg/register?ref=OSOZSFL) *and I’ll probably make an article about it some day because it’s totally worth it and you should definitely check it out!)*, etc.

It’s dead simple: on the right you paste native data from the trade history page of the exchange, and it is sorted and converted into the appropriate format on the left, compatible with the data input model developed in RawData sheet. To make things clearer and avoid confusion, an additional rule formats **the converted data to green or red depending if the native data is a buy/long vs. sell/short**. I have left some random examples in this sheet to better visualize this.

Check out the notes I left: in some cases there is real data coming from different persons using my dashboard and who asked me to integrate an exchange. This means I had to rely on them but that I couldn’t always-double check. In anyway, basically with each model listed here, a simple change in the native format of the exchange, or simply in your (date/time/numbers) configuration can lead the formula to an error. No worries: you’ll solve 99% of the issues just by quickly googling your question.

To avoid accumulating thousands of lines over the years in RawData (like it happens very often when your orders have 10x0.1 buys instead of 1x1 unit buy), I then paste *(with Ctrl+Shift+V to only consider values)* the trades of a same coin for a same day, into the trade grouper.

Note that since I can compile my trades from the exchange to my sheet sometimes with several days of delay, and when the trade is not against a USD-based pair, I can’t just ask for the live $ rate of a coin in this sheet when I paste the data. In these cases it is needed to go check the past USD rate on Tradingview. If you’re pasting the data right when the trade happened, there’s a ‘quick search’ box on the right of every formatter to get the live $ price. Since I mostly trade against USD pairs, I mostly never face this.

---

![RawData: the only thing to save above all](/assets/img/posts/2021-03-22-1-YzFw62Jk8yRjnmEs8zOaAg-8af7ed.webp)
*RawData: the only thing to save above all*

## Raw Data, the underlying foundation

Copy-pasted from the trade grouper (remember: with *Ctrl+Shift+V*), or manually from an exchange not listed in DataCleaner, here is the centralized data homogenized to the very same logic, everywhere. I have entered some buy & sell trading lines with fancy numbers just to show you how it looks. The first 3 columns are array formulas so you should only paste data starting from column Coin. There are:

- **BUY-SELL:** all my buy/long and sell/short trades made for my own account. The Tag column was primarily used to further analyse my bags, for instance the long term holdings vs short term plays, etc, but I don’t use it that way anymore. However I now use this column as a bridge for algorithmic trading bot data — more on that later!
- **BOT BUY-BOT SELL:** longs and shorts taken by bots. Not using it much now, it was a bit time consuming and I don’t really use any trading bots anyway.
- **CASH:** is the getaway between IRL world and crypto world. Here you can enter any ‘Deposit’ or ‘Withdrawal’ in any FIAT currency, as long as you also convert it to USD reference too (tip: I created a FIAT converter in Overview: Toolbox). The in/out balance will be used for your net & all-time profitability calculation.
- **TRANSACTIONS:** I needed to have a sandbox for everything not purely trading or buy/sell: making a purchase in crypto, buying an NFT, paying a bot subscription, transferring crypto between accounts while still deducing my fees from my portfolio, account the monthly staking rewards on some coins, etc. Something that was **most frequently missing from online portfolio tracking services!**

Here again it is important to only use the listed types: Credit, Deposit, Correction, Withdrawal, Payment, and Transfer, because each type will have consequences later on in CompiledData.

‘Correction’ is very helpful, when you check your real vs theoretical stocks and need to apply a correction without entering a trade line: forgot a movement or a fee somewhere, aligning your real USD balance (e.g. tends to become negative because you moved to USDT or USDC and forgot to account the swap), or lost some cryptos in a boat accident, you know.

- **MANUAL STOCK CHECK:** crypto can be a mess sometimes, between all those exchanges, wallets, etc. So when I do my monthly portfolio closure I sometimes also compare the actual holdings on some accounts compared to my theoretical asset report in this document. Then, if you followed me so far, you guessed that I create a ‘Correction’ event in the transactions accordingly.

All in all, this sheet is the core root of this whole system. Every other sheet is worthless if RawData isn’t carefully maintained. A good practice is to download an archive of the whole spreadsheet or just RawData every month after your closure. I wrapped this for you here:

> 🔗 [Periodic auto backup a Google sheet](/periodic-auto-backup-google-sheets/) · rmcd0.medium.com

---

![Compiled Data, the funnel](/assets/img/posts/2021-03-22-1-TO8roHFuAUwMQ3-pm2IyLA-23a721.webp)
*Compiled Data, the funnel*

## Compiled Data: the fun begins

Most here just consists in queries and formulas which shouldn’t much touched.

It gathers and compiles data from RawData! Buy, Sell, Bot buy, Bot sell, has an area dedicated to the fees (I personally believe it’s interesting to keep detailed tracking of all fees), another for Exchanges (I also like to see the whole volume/exchange), then Bots tracking and overall Portfolio.

Here you find the reason why RawData concatenates the coin and its relative pair in your trades (like in columns C or AK), because CompiledData lists them appart. So if you buy some BTCEUR, BTCUSDT, BTCBUSD, BTCETH, you will always have your overall average BTCUSD encompassing all traded pairs, but will also be **able to check insights for each pair** later on.

The ASSETS part was a bit tricky and drove me crazy for hours! AX to BU columns could probably be grouped in less, but I noticed that it’s much easier, when I identify an error somewhere in my data, to reverse-track its origin and have the most exhaustive and detailed columns, then telling me which area of RawData is concerned.

BV-BW columns track the balance according to all your RawData, there’s a formatting rule to bold non-empty stocks and ‘hide’ zero balances. Then on the right are some calculations:

- Manual check is what you entered in RawData/Manual stock check earlier. My personal good practice is to check that every last day of a month, when I do my monthly closure. Then, when needed, just copy the value the Diff. column gives you and paste it into RawData!/Transactions tagged as ‘Correction’. **Make sure to invert the value** (if Diff. is -2.48, paste 2.48, and the other way round), that’s how the system is done, sorry ¯\_(ツ)_/¯
- Then values and further calculation are based on the $ rates provided in MarketData. There’s a regex that takes “-PERP” off of coins to track them too so it works just fine if you trade perp contracts too!

BOTS Tracking also is split in multiple columns. Deposits/withdrawals of any kind (FIAT or crypto) are recalculated to USD reference, and here comes the utility of using the Tag in my spot buys-sells from RawData:

- one of my bots runs on FTX and this platform allows me to place multiple assets as collateral.
- the bot trades in USD but sizes its leveraged trade value based on the overall value of my collateral.
- it also hopefully generates profits in USD and I can chose to withdraw them (then I would create a ‘Withdrawal’ line in RawData/Transactions and that would be accounted here) or to spot-buy other assets from the same account and leave those assets in my collateral to help grow the value of the bot account.
- however these spot-buys or sells are **of my own will, not the bot’s decision**, so per my logic I have to enter them in RawData! Buy or Sell, but I still have to consider that this money was printed by the bot so I still need to credit it for this and account this in the overall PnL, hence tagging the proper bot name in the Tag column.

It’s a bit twisted but that’s the best trick I could find to overcome this.

And finally, PORTFOLIO, which although located in CompiledData **requires some manual action**: every last day of the month or first day of a new month, I:

- add the new month in column CK
- drag the formulas in CL, CM, CN and CO down one line below
- copy-paste (remember: *Ctrl+Shift+V*) the closing month line over itself to just keep the data without formulas
- enter the BTC monthly close value from MarketData.

Note that the Portfolio BTC value is not your net BTC holdings but literally your USD portfolio considered in BTC — you should start getting used to value things in BTC too ;-)

---

![Overview again, this time with a more sober, brown shades theme](/assets/img/posts/2021-03-22-1-rh9-8-3q2MoLJy3PcP9xBw-7bdeb9.webp)
*Overview again, this time with a more sober, brown shades theme*

## Overview, my new crypto homepage

And here comes my daily landingpage and main toolbox. It works in parallel with the Settings sheet. It is composed of various sections:

### Main Dashboard

**The header banner** gives the overview of current total portfolio value, with delta compared to past month and over 12 rolling months, plus the part of it which is allocated to trading bots. There’s the overall portfolio value in BTC, but also the actual net holdings next to it. Overall PnL considers the portfolio USD value with the cash in/out balance, so it’s your actual portfolio real value without what you initially invested. Exposure is a bit overkill here, but it’s just the ratio of your holdings which is not FIAT or stablecoins, meaning what part of your total portfolio valuation is at risk if tomorrow BTC and alts fall to zero. A bit extreme, I know. And, say the whole crypto game burns to ashes overnight, would our stablecoins keep any value at all anway?

**The graph** is quite simple too, no fancy projected valuation or such, just your monthly closures and a trailing moving average of 3 months for USD value. Just double click on the graph and adjust the scale of the graph to your portfolio valuation — it’s of 8M$ and 300BTC here, I just wanted to see how it feels to be rich.

The text part above it comes from Settings/Custom Text, where you just need to replace text with what you want. Here I have custom messages which differs depending if past month closed in profits (≤0 ≤ 30%), big profits (> 30%), loss (<0 >-10%), or big loss (<0 > -10%), mainly here to insist on (and force me to) taking a certain amount of profits. Note that if a trade hits your Take Profit target further down in Overview/Scalper area, this message is replaced by an alert.

**The exposure gauges** and the associated custom text messages are also defined in Settings and depend on your strategy. Here for the example it means I wish to manage my portfolio’s exposition and rebalancing to 20–40% BTC, 30–60% of ALTS, and 20–30% of FIAT. The large gap is because I need to stay flexible too, depending the market momentum being more inclined to Alts season or to BTC-uber-älles season.

One lesson learned from these years in crypto, and to which I still often fail to abide to until this day, is to always have a decent amount of cash available for buying dips, seizing opportunities, or hedge against crashes. So I made these gauges to help me in that way.

![Investor’s Cockpit](/assets/img/posts/2021-03-22-1-i3CQnjzQIkqI0z3RjkR34Q-d8d0d1.webp)
*Investor’s Cockpit*

### Cockpit

Is also entirely made out of automatically compiled data, except the 3 yellow elements in the Search Box area, obviously.

In MAIN STOCK you find your detailed portfolio and each asset worth more than 50USD in order to not pollute your feed with small worthless bags — adjust the query value in D65 if you wish. You’ll find the basics: quantity, value in $ and BTC, proportion of PF, and asset’s PnL USD delta. Clicking on the Twitter icon for each asset directly opens a Twitter $TICKER search for it. Quite convenient daily!

LAST BUY / SALES gives you a view of your max 9 last moves. I don’t do hundreds of trades a month so I don’t need a long view, but if you need more just edit each query in L65 & L77.

I find the SEARCH BOX very helpful to me every day. And here’s why CompiledData accounts trades by their relative pair. For instance, it helps me:

- see how much overall $ worth I bought & sold on a coin, insightful when I want to make sure I kept a moonbag and already took my initial investment, or more, back;
- see how I performed on this asset but relative to a specific pair. I have coins that I have traded over the time against stablecoins but also against BTC, ETH, BNB, etc.

![Toolbox — in ‘Night blue degen scalper’ theme!](/assets/img/posts/2021-03-22-1-H0dTB0qMIinm7B71WLlZKw-c5fe8a.webp)
*Toolbox — in ‘Night blue degen scalper’ theme!*

### Toolbox

I realized I was spending way too much time of my day trading activity to check values, compare, convert, determine percentages, etc. So here I built my best daily time-saver. The only editable cells are in light-green.

- FIAT CONVERTER uses a GoogleFinance function so you can enter pretty much any currency you can think of into the 2 green boxes, and optionally add your value to convert below. You can also check this same conversion at a specific past date in ‘Historic XX/YY rate’. The formula is hosted in Settings/Historic Fiat Converter.
- CRYPTO CONVERTER is the same but fort converting crypto. It can only convert to the references I have in MarketData, namely: USD, EUR, BTC, ETH and BNB. If you wish to have more, create new column there and ajust the formula in P95. A custom error message in this cell would inform you anyway.
- Note that Historic Rate is for BTC-ETH-LTC only, based on CoinGecko’s past 3 years data in MarketData/ cell I5. Same, adjust dates there to gather a broader time range.
- SIMULATE is just a box playing with percentage, very useful daily. How much is x% growth or loss? What % growth do I need to recover x% loss?
- HOPIUM is just a simulator of a defined growth rate over a number of periods. Say a farming protocol offers you *x*% yield over *n* periods, what will the projected value be in *n* periods.
- Price determination below it, is my go-to when for instance I’m doing Fundamental Analysis on the future-best-shitcoin-ever and I need price projections by comparing its marketcap to its relative circulating or max supply.
- SAFU CHECKER is helpful if you need to double-check an address prior to doing a transaction.
- For the next version, I’m currently creating a wallet addresses repository in another sheet, and this checker will also display the info if it matches a regsitered wallet

![Strategy —mostly just a note-taking & thinking area](/assets/img/posts/2021-03-22-1-e0KZG0c1yWNiezZSJ9rb_A-c68e8e.webp)
*Strategy —mostly just a note-taking & thinking area*

### Strategy

Is mostly a free-writing area with just a few lookups. It allows me to manually list coins I have in my radar but not especially in my portfolio, and to take notes, prepare strategies, etc.

The sandbox part has no formula at all, I just put here some thoughts, links to read later, etc.

![Scalper — ok it’s more of a daytrading tool but scalper sounded much cooler 😎](/assets/img/posts/2021-03-22-1-TjcRjMGMgoLgpf67_ZTVGQ-9ec021.webp)
*Scalper — ok it’s more of a daytrading tool but scalper sounded much cooler 😎*

### Scalper

Is composed of a SIZE & RISK box to determinate certain percentage of holdings when doing your due diligence calculation before preparing a trade.

Here again, it’s based on USD, EUR, BTC, ETH and BNB, with the exception that USD reference is based on overall portfolio value, while the others are a lookup of their relative quantity in stock.

Then rest of the area is dedicated to enter your side (long/short), your position details and up to 3 take-profits levels. When one of these TP indicates ‘Hit!’, it takes over the month-closure header message in the portfolio top banner.

*A point to work on for future version, I should tailor the query here to distinct USDT, BUSD, USDC, etc.*

### Algos

Here again, kept it simple, as it’s made to be a gross overview:

- list of all bots is manually entered in Settings / Bots accounts, and is not supposed to change very often.
- each bot in the list can be considered ‘On’ or ‘Off’. If On, it will be listed here
- the graph displays the curve of the algo selected in I187, or all of them, based on the Bots Point-outs from RawData.

## Bonus

### Theme

There is a theme changer option right below the portfolio main graph. I’ve had fun creating and naming them (half sarcastic).

*Fifty shades of brown sugar* is the default theme, because it would be the most tricky to parameter in a conditional formatting with all these interchanging colors. The 4 other ones depend on a custom format. Thorchain-inspired is by far my preferred one, not only because I love the project, but also their branding colours are the most appealing.

If you want to create additional themes, here after is everything you need:

- Go to cell F55, then menu Data > Data validation, and add your own theme name to the list.
- Format > Conditional formatting > New rule > Select “Custom formula is”: =$F$55=”*your-theme-name*”

Here is the split list of each area of this dashboard in case you want to create a new coloured theme:

- Whole frame outline: A:A, AN:AN, B1:AM1, B57:AM57, B87:AM87, B114:AM114, B142:AM142, B161:AM161, B190:AM190, B203:AM203,
- Home dashboard banner & graph part: B2:AM56,
- Trading cockpit: B58:AM86,
- Toolbox: B88:D118,E88:E92,F88:G94,H88:H92,I88:M118,N88:N92,O88:P94,Q88:Q92,R88:U118,V88:V92,W88:X94,Y88:Y92,Z88:AD118,AE88:AE108,AF88:AH101,AI88:AJ92,AK88:AK108,AL88:AM118,E94:E108,H94:H98,N94:N108,Q94:Q98,V94,Y94,AI94:AJ94,F96:F108,G96:G98,O96:O108,P96:P98,V96:V98,W96:W108,X96:Y98,AI96:AJ96,AI98:AJ101,G100:H108,P100:Q108,V100:V118,X100:X108,Y100:Y118,AF103:AG108,AH103:AH110,AI103:AJ108,E110:E118,F110:G110,H110:H118,N110:N118,O110:P110,Q110:Q118,W110:X110,AE110:AE118,AF110:AG110,AI110:AJ110,AK110:AK118,F112:G113,O112:P113,W112:X118,AF112:AJ118, (you’re welcome!)
- Strategy: B120:AM146,
- Scalper: B148:AM165,
- Algos: B167:AM194,
- Plan B: B196:AM207 (yeah, I had to)

### Other custom formatting

I like to quickly identify delta variations at a glance and a ▲ or ▼ next to a percentage does help a lot. Also, in crypto we have a lot of numbers in millions or billions: marketcaps, circulating supplies, or even your portfolio perhaps :-)

Apply the following when needed (Format > Number > More Formats > Custom number format):

- clearer deltas: *+0.00%” ▲”;-0.00%” ▼”;0%*
- concatenate large numbers like 1.1K, 1.2M, 1.3B: *[<999950]0.0,”K”;[<999950000]0.0,,”M”;0.0,,,”B”*

Always handy to have these close by for any sheet!

---

If you identify errors or, even better, have suggestions to improve this tool, let me know.
