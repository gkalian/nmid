// console.log("NMID script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.from !== "nexus-image-downloader-popup") {
        sendResponse({ name: "from-fg" });
        return true;
    }

    const { user_image, image_path } = request;

    const imageList = Array.from(
        document.querySelectorAll("ul.thumbgallery.gallery.clearfix li"),
        item => item.dataset.src
    );

    console.log(imageList);

    const dataElement = document.querySelector("section#section.modpage");
    const defaults = {
        gameId: `UnknownGameId${Date.now()}`,
        modId: `UnknownModId${Date.now()}`,
        gameName: document.querySelector('.nav-current-game a')?.getAttribute('title') || `UnknownGameName${Date.now()}`,
        modName: document.querySelector("#pagetitle h1")?.textContent || `UnknownModName${Date.now()}`
    };

    const gameId = dataElement?.dataset?.gameId || defaults.gameId;
    const modId = dataElement?.dataset?.modId || defaults.modId;

    sendResponse({
        from: "fg",
        user_image,
        image_path,
        urlList: imageList,
        gameId,
        modId,
        gameName: defaults.gameName,
        modName: defaults.modName
    });
});