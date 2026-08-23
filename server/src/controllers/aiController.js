import { generateAIResponse } from "../services/aiService.js";

export const processAIRequest = async (req, res) => {
  try {
    const {
      action,
      page,
      selectedText,
      userQuestion
    } = req.body;

    if (!action) {
      return res.status(400).json({
        success: false,
        message: "AI action is required."
      });
    }

    if (!page?.content) {
      return res.status(400).json({
        success: false,
        message: "Page content is required."
      });
    }

    const result = await generateAIResponse({
      action,
      page,
      selectedText,
      userQuestion
    });

    return res.status(200).json({
      success: true,
      action,
      result
    });

  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process AI request."
    });
  }
};