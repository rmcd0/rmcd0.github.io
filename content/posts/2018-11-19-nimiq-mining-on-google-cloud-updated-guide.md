---
title: "Nimiq mining on Google Cloud, an updated guide"
description: "A beginner-friendly, detailed tutorial to make the most of your Google Cloud free credits."
type: post
lang: en
tags: ["crypto", "it"]
image: "/assets/img/posts/2018-11-19-1-wYIJjpgZNJ8csQHCGtPs7A-3c1585.webp"
imageAlt: "Nimiq Network logo over a night view of the Earth seen from space"
permalink: "/nimiq-mining-on-google-cloud-updated-guide/"
imageCaption: "Banner of Robin Linus’ [Medium article](https://medium.com/nimiq-network/nimiq-a-peer-to-peer-payment-protocol-native-to-the-web-ffd324bb084) introducing Nimiq"
alsoOn: "https://medium.com/@rmcd0/nimiq-cloud-mining-on-google-cloud-an-updated-guide-6193879f14ab"
---

If you landed here, I assume you’ve already heard of Nimiq project which, in the end, is (yet another…) “easy-to-use decentralized payment protocol & ecosystem” — blabla. You also probably read that you can easily “mine” some for free, from within your browser window — that’s actually part of their concept — or with local or cloud computing power. Anyway, to sum it up, probably just another shitcoin that will die like thousand others but hey, let’s have fun and get nerdy.

![Screenshot: Nimiq.com](/assets/img/posts/2018-11-19-1-0WgsBO1tlCfZ7eptn2l1xA-835b1d.webp)
*Screenshot: Nimiq.com*

You’ll find plenty of conversations around that matter on reddit or across the web, but I’ve found that they weren’t all up to date, had various different methods, didn’t seem complete (for instance not mentioning the script to get your VM automatically launch the miner) or made you install nodejs dependencies (check [Nimiq tutorial for using Node.js mining](https://nimiq.community/2018/04/14/setting-up-nodejs_miner.html) on a server with your own SSL and domain name), etc. In addition, almost none of what I read mentioned an extremely efficient tip leading you to **multiply the duration of your free credit by more than 3.** Read on.

I already had improved a brief tutorial based on an experience shared by mates from the small Swiss crypto community I belong to (thank you Guibrush, if you read this !), and since I got friends who asked me recently, I felt it needed an update.

I don’t expect anything from mining this, and neither should you, probably; I mainly just wanted to learn & experiment the technical part, cloud VMs, Vim editor, etc.

---

## Introduction

One of Nimiq’s interests is that the Argon2 algorithm used requires only CPU for mining, so that leaves aside all expensive, powerful GPU or ASIC solutions. A token pre-sale occurred last year under an ERC-20 token named NET, and holders had until a few weeks ago to switch their NET for NIM. Turns out that, since all we need is CPU, online virtual machines are well-suited for mining it. One of the most generous providers out there is Google, with a 300$ free credit allocated to each new account.

First, you need to open a wallet on [nimiq.com](https://nimiq.com), and open a [Google Cloud Platform](https://cloud.google.com/) account, with our usual Gmail account or a side-one, **but keep in mind that** **since you’ll need to attach a credit card, you’ll have to use your real name** (card holder) when registering. We will use [Skypool](https://nimiq.skypool.org/) mining pool, you don’t need to register unless you want to, you’ll simply check your account balance online. Other pools are worth mentioning, such as Beeppool, Sushipool, check [the list here](https://nimiq.community/mining.html).

Google sets **2 restrictions** on each account:

- not more than 24 CPU/region,
- and not more than 64 CPU overall.

So we’ll create 3 virtual machines as follows : 2 x 24 CPU and 1 x 16 CPU to reach our 64 CPUs.

Access Google Cloud and select Compute Engine, then chose to upgrade your account to paying mode. Of course, your free credit will still be there, but Google warns you that you’ll be charged if you eventually smoke up all of it. VMs can be created in several server regions accross the globe, but the cheapest ones are : us-east, us-west and us-central.

## Hands-on

- Create a new instance such as “*name-1*”, we’ll create a 2 and 3 later on
- Select *us-east* region, or *us-west* or *us-central* if you’re creating your 2nd & 3rd VM
- In CPU, increase it to 24 and lower the RAM to the minimum possible. 24 as well for the 2nd instance, then 16 CPU for the 3rd one
- Chose Skylake CPU platform architecture
- OS selection: take Ubuntu 16.04 LTS (any Debian-based distro should be ok with the following terminal commands but this [o](https://nimiq.community/2018/04/14/setting-up-nodejs_miner.html)ne is recommended by Nimiq)
- At the bottom, unroll the disk-network-SSH menu and select “*Preemption*”.

→ Preemption means your VM will shutdown at least every 24h and Google can shut it down any time it needs more calculating power for other projects. On the other hand, you’ll see that your VMs won’t get turned off that often and that the overall monthly price estimation suddenly went from ~1200$ to 350$. Yay !

Leave the rest as it is, create it and open a browser SSH window.

## Miner client installation

First, update your distro

```
sudo apt-get update
sudo apt-get upgrade
```

Seperately type these to get unzip and skypool mining client, then unzip it. This is the latest version as of today but check their [Github release page](https://github.com/skypool-org/skypool-nimiq-miner/releases) in case, and adjust the following commands accordingly:

```
sudo apt-get install unzip
```

```
wget 
https://github.com/skypool-org/skypool-nimiq-miner/releases/download/v1.3.4/skypool-nimiq-v1.3.4-linux-x64.zip
```

```
sudo unzip skypool-nimiq-v1.3.4-linux-x64.zip
```

Now we need to edit the permissions to give read, write & execute rights (nothing visible happens after entering this command, that’s normal).

```
sudo chmod -R 777 skypool-nimiq-v1.3.4-linux-x64
```

Now we’ll create the shell script for running the miner in the VM.

```
vi nimiq.sh
# 
wait for it to open then enter:
```

```
#!/bin/bash
cd /home/USER/skypool-nimiq-v1.3.4-linux-x64
cd /home/USER/skypool-nimiq-v1.3.4-linux-x64 & ./skypool-node-client --address="XXXX XXXX XXXX" –name=INSTANCE-NAME --percent=100  --thread=24 --server=ws://eu1.nimiq.skypool.org:4000> ~/nimiq.log &
```

Where:

- /home/USER/ is your pseudo. Type command “*pwd*” to know yours, or simply check it at the beginning of any of your terminal entry line
- address “XXXX XXXX” is your own Nimiq wallet address
- name= is your instance name, so that you’ll recognize each VM when you’ll check the pool stats
- thread= number of CPU allocated for this instance (should be 24 or 16)

Type “esc” then “:wq” to write & quit. Now the script to automatically launch the miner. You may be prompted a message asking you to chose your among various editors, select vim.

```
crontab -e
```

```
# 
type "esc" then "i" to edit and add the following line:
```

```
@reboot /home/USER/nimiq.sh
```

```
# 
then "esc" and ":wq"
```

Again, some read, write & execute rights:

```
sudo chmod -R 777 nimiq.sh
```

To be sure, let’s type the following command and check that nimiq.sh and skypool clients are green:

```
ls -alh
```

![Terminal listing the files of the Google Cloud instance, including nimiq.sh](/assets/img/posts/2018-11-19-1-uMxpfLG7XkERulozdjw9jA-ca3916.webp)

The best is, that contrarily to what I read on some sites, with the script above now all you have to do is to get Google Cloud Console app on your [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.cloudconsole) / [iOS](https://itunes.apple.com/us/app/google-cloud-console/id1005120814?mt=8#iTunes), simply check once in a while if your VM are still smoothly running and relaunch them in a second if needed. The VM will automatically start to mine again and thanks to preemption settings, your credits will last much, much longer.

Now type “sudo reboot” then relaunch your SSH and type:

```
tail -f nimiq.log
```

As on the following image (a 16 CPU getting ~120 kH/s), you should see live inputs into the logfile (type Ctrl+C to close it), meaning your miner is properly working \o/

![Terminal showing the Nimiq miner log and its hashrate](/assets/img/posts/2018-11-19-1-sPSvHrh2kBaGETeuooXHWA-d2825b.webp)

## What’s next

After a while, when entering your wallet address in [Skypool](https://nimiq.skypool.org/) you will see your miners listed in live. Now repeat the whole process with 2 other instances in different regions, don’t forget to edit the instance number as well as the correct amount of CPU used. Remember to check the billing section of GCE to follow-up the consumption of your free credit, or setup a budget alarm.

You may decide to continue mining afterwards, charging your own credit card, but remember that the **cost-effectiveness ratio isn’t worth it** unless you’re using the free credits. The starting credit should be enough to make you 70/80K NIM, which won’t make you that much once converted to fiat but eh, **free hash is free hash**. If you can duplicate this process with other accounts from your close relatives and other supplier (AWS, Microsoft Azure and Oracle all allocate a free trial credit but none is as generous as Google) you may end up with a decent amount. I mostly just did that for learning purpose of setting cloud VMs and running a distant miner.

## Warning & disclaimer

Edit: Google bots have been increasingly efficient in detecting mining activities, I’ve been told that it’s possible that one or several of your instances gets flagged as free-trial ToS violation. You won’t be charged for that but your project (not your account) might get suspended. Apparently a quick KYC to confirm the ID and credit you provided earlier may simply reopen your project. However, having upgraded to a paying account as described earlier in this article should prevent that.
