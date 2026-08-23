export const buildAIRequest = ({
  action,
  page,
  selectedText = "",
  userQuestion = ""
}) => {
  return {
    action,

    page: {
      title: page.title || "",
      url: page.url || "",
      content: page.content || ""
    },

    selectedText: selectedText || "",

    userQuestion: userQuestion || ""
  };
};