chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_PAGE_CONTENT") {
    const pageContent = document.body.innerText;

    sendResponse({
      success: true,
      title: document.title,
      url: window.location.href,
      content: pageContent
    });
  }

  return true;
});