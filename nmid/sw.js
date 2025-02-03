// This is the service worker script, which executes in its own context when the extension is installed or refreshed
// (or when you access its console). It would correspond to the background script in chrome extensions v2.

// console.log("service worker (background script) loaded");

const state = {
    gameId: "UnknownGameId",
    modId: "UnknownModId",
    gameName: "UnknownGameName",
    modName: "UnknownModName"
};

async function handleDownload(list, index = 0, image_path) {
    if (index >= list.length || !list[index]) return;

    const filename = list[index].split("/").pop();
    const filepath = image_path ? 
        `NMID/${filename}` : 
        `NMID/${state.gameName}_${state.gameId}/${state.modId}_${state.modName}/${filename}`;

    try {
        await chrome.downloads.download({
            url: list[index],
            filename: filepath
        });
        handleDownload(list, index + 1, image_path);
    } catch (error) {
        console.error(`Download failed for ${filename}:`, error);
    }
}

chrome.runtime.onMessage.addListener((message) => {
    if (!message?.from || message.from !== "fg") return;

    Object.assign(state, {
        gameId: message.gameId,
        modId: message.modId,
        gameName: message.gameName,
        modName: message.modName
    });

    handleDownload(message.urlList, 0, message.image_path);
});