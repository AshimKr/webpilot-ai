const MAX_CONTENT_LENGTH = 20000;

const getCleanText = (element) => {
  if (!element) {
    return "";
  }

  const clone = element.cloneNode(true);

  const unwantedElements = clone.querySelectorAll(
    "script, style, noscript, iframe, svg, canvas, nav, footer, header, aside, form"
  );

  unwantedElements.forEach((element) => {
    element.remove();
  });

  return clone.innerText
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
};

const getMainContent = () => {
  const selectors = [
    "article",
    "main",
    '[role="main"]',
    ".article",
    ".article-content",
    ".post-content",
    ".entry-content"
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);

    if (element) {
      const text = getCleanText(element);

      if (text.length > 200) {
        return text;
      }
    }
  }

  return getCleanText(document.body);
};

const getPageData = () => {
  let content = getMainContent();

  if (content.length > MAX_CONTENT_LENGTH) {
    content = content.substring(0, MAX_CONTENT_LENGTH);
  }

  const selection = window.getSelection()?.toString().trim() || "";

  return {
    success: true,
    title: document.title,
    url: window.location.href,
    content,
    selectedText: selection,
    contentLength: content.length
  };
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_PAGE_CONTENT") {
    sendResponse(getPageData());
  }

  if (message.type === "GET_SELECTED_TEXT") {
    const selectedText = window.getSelection()?.toString().trim() || "";

    sendResponse({
      success: true,
      selectedText
    });
  }

  return true;
});