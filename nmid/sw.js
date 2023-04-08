// This is the service worker script, which executes in its own context when the extension is installed or refreshed
// (or when you access its console). It would correspond to the background script in chrome extensions v2.

console.log(
    "service worker (background script) loaded"
);

let gameId = "UnknownGameId";
let modId = "UnknownModId";
let gameName = "UnknownGameName";
let modName = "UnknownModName";

function handleDownload(list, index, image_path) {
    if (list.length < index) {
        return;
    }

	let url = list[index];
	  if (!url) {
		return;
	  }
  
    let filename = url.substr(url.lastIndexOf("/") + 1);
    let filepath = `Nexus Image Downloader`;
    if (image_path) {
        filepath = `NMID/${filename}`;
    } else {
        filepath = `NMID/${gameName}_${gameId}/${modId}_${modName}/${filename}`;
    }
    chrome.downloads.download({
            url: url,
            filename: filepath,
        },
        () => {
            handleDownload(list, index + 1, image_path);
        }
    );
}

chrome.runtime.onMessage.addListener((message, callback) => {
    console.log(message);
    if (!message || !message.from || message.from != "fg") {
        return;
    }
    gameId = message.gameId;
    modId = message.modId;
    gameName = message.gameName;
    modName = message.modName;
    handleDownload(message.urlList, 0, message.image_path);
});
