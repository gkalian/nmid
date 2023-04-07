const btn1 = document.querySelector(".files-only"); 
const btn2 = document.querySelector(".full-path"); 

btn1.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  console.log("you clicked button for file only");
  chrome.tabs.sendMessage(
    tab[0].id,
    { from: "nexus-image-downloader-popup", user_image: true, image_path: true },
    function (response) {
      console.log(response);
      chrome.runtime.sendMessage(response);
    }
  );
};

btn2.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  console.log("you clicked the button to get the full structure");
  chrome.tabs.sendMessage(
    tab[0].id,
    { from: "nexus-image-downloader-popup", user_image: true, image_path: false },
    function (response) {
      console.log(response);
      chrome.runtime.sendMessage(response);
    }
  );
};