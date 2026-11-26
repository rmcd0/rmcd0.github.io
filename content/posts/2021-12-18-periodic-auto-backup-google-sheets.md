---
title: "Periodic auto backup a Google sheet"
description: "Set up a script that automatically copies a Google Sheet at a defined interval."
type: post
lang: en
tags: ["tools"]
image: "/assets/img/posts/2021-12-18-1-ySUuz6UsAiLWu82iN4AppQ-224628.webp"
imageAlt: "Google Apps Script editor with the “Add a service” dialog open"
permalink: "/periodic-auto-backup-google-sheets/"
alsoOn: "https://medium.com/@rmcd0/periodic-auto-backup-a-google-spreadsheet-5c9c7d826997"
---

Say you have a heavy or important Gsheet that is populated with lots of data you can’t afford to lose, or that you want an exportable snapshot of this spreadsheet at defined intervals.

Then it would be quite nice to ensure you have periodic backups of all your logs stored anywhere else in case, say, your Google account gets compromised some day, or lost, and in a format that lets you reupload it into another Google account, or to MS Excel, LibreOffice Calc, etc., and to open it locally from your computer.

---

First things first, create a backup folder into your gDrive and get the folder ID

![Google Drive folder address in the browser bar, with the folder ID highlighted](/assets/img/posts/2021-12-18-1-nUMIxaH1h7UBk2etnyBUhQ-21ae04.webp)

From your Google sheet, open [Apps Script](https://developers.google.com/apps-script) and enable Advanced Services > Drive API

Insert the following in your editor and replace FolderID with the correct value:

```js
// backup the current Spreadsheet as an XLSX file into a dedicated folder
// you need to enable "Advanced Drive Service". In Apps Script menu, go to "Services", select "Drive API" in the list and add it
function backupSheet() {
  // UPDATE THE FOLDER ID, for example the ID of the folder you created for your backups "My Drive/Backups"
  var backupFolder = DriveApp.getFolderById("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetId = spreadsheet.getId();
  var file = Drive.Files.get(spreadsheetId);
  var url = file.exportLinks[MimeType.MICROSOFT_EXCEL];

  // enter sheet name you want to export - e.g. sheetName = "RawData", or leave empty if you want to take the whole spreadsheet: sheetName = ""
  var sheetName = "";
  if (sheetName.length) {
    var sheet = spreadsheet.getSheetByName(sheetName);
    var sheetId = sheet.getSheetId();
    url += "&gid=" + sheetId;
  }

  var token = ScriptApp.getOAuthToken();
  var options = { headers: { Authorization: "Bearer " + token } };
  var response = UrlFetchApp.fetch(url, options);
  var doc = response.getBlob();

  // adjust date formatting to your preference. For a weekly/monthly backup I don't need hours and seconds. If so, reformat as: "GMT", "yyyy-MM-dd' 'HH-mm-ss");
  var backupDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");
  var backupName = spreadsheet.getName() + ".backup " + backupDate + ".xlsx";
  var tempFile = DriveApp.createFile(doc).setName(backupName);
  tempFile.makeCopy(backupName, backupFolder);
  tempFile.setTrashed(true);
}
```

Note that to save up space you can chose to backup just one sheet, or your entire spreadsheet.

---

Run the script to verify it works properly — if it doesn’t, it’s likely your FolderID, double check that you entered it properly. Then save it and go to the Triggers menu to set up an automatic execution at given intervals.

Say you do a monthly reporting and are expecting some final data from another source, or a colleague, on the last day of each month, then setting the backup to run each 2nd day of a month can be a good idea.

![Apps Script “Add trigger” dialog for the BackupSheet function, set to run monthly](/assets/img/posts/2021-12-18-1-2Gmjp0qSaN0PZGSCTKh5kQ-2b596d.webp)

---

Install [Drive for desktop](https://www.google.com/drive/download/) and configure it on your computer. Select ‘Folders from Drive’, not ‘Folders from your computer’.

You now have mounted an additional virtual drive to your computer which mirrors your gDrive. Since we converted the backup to .xlsx format and not to native .gsheet extension, you can open it locally from any other spreadsheet software, program another auto-sync with another folder, encrypt it and upload to another cloud service provider, etc.

---

If you identify errors or have better suggestions, I’m all ears!
