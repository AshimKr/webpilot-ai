import { useEffect, useState } from "react";
import { getActiveTab } from "./utils/chromeTabs";
import {
  getPageContent,
  getSelectedText
} from "./utils/pageContent";

function App() {
  const [currentTab, setCurrentTab] = useState(null);

  const [pageContent, setPageContent] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const [loading, setLoading] = useState(true);
  const [readingPage, setReadingPage] = useState(false);
  const [error, setError] = useState("");

  const [activeAction, setActiveAction] = useState(null);

  useEffect(() => {
    const loadCurrentTab = async () => {
      try {
        const tab = await getActiveTab();

        setCurrentTab(tab);
      } catch (error) {
        console.error("Failed to get active tab:", error);
        setError("Unable to detect current page.");
      } finally {
        setLoading(false);
      }
    };

    loadCurrentTab();
  }, []);

  const handleReadPage = async () => {
    if (!currentTab?.id) {
      return;
    }

    try {
      setReadingPage(true);
      setError("");

      const response = await getPageContent(currentTab.id);

      if (response?.success) {
        setPageContent(response.content);
        setSelectedText(response.selectedText || "");
      } else {
        setError("Unable to read this page.");
      }
    } catch (error) {
      console.error("Failed to read page:", error);

      setError(
        "Cannot access this page. Try refreshing the webpage and try again."
      );
    } finally {
      setReadingPage(false);
    }
  };

  const handleGetSelectedText = async () => {
    if (!currentTab?.id) {
      return;
    }

    try {
      setError("");

      const response = await getSelectedText(currentTab.id);

      if (response?.selectedText) {
        setSelectedText(response.selectedText);
      } else {
        setError("Please select some text on the webpage first.");
      }
    } catch (error) {
      console.error("Failed to get selected text:", error);

      setError(
        "Unable to get selected text. Try refreshing the webpage."
      );
    }
  };

  const handleAction = async (action) => {
    setActiveAction(action);
    setError("");

    if (!pageContent) {
      await handleReadPage();
    }
  };

  return (
    <div className="w-[380px] min-h-[500px] bg-slate-950 text-white p-5">

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          ✨ WebPilot AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Your AI assistant for the web
        </p>
      </header>

      {/* Current Page */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">

        <p className="text-sm text-slate-400 mb-2">
          Current page
        </p>

        {loading ? (
          <p className="text-sm text-slate-500">
            Loading...
          </p>
        ) : currentTab ? (
          <>
            <p className="font-medium truncate">
              {currentTab.title || "Untitled page"}
            </p>

            <p className="text-xs text-slate-500 mt-1 truncate">
              {currentTab.url}
            </p>
          </>
        ) : (
          <p className="text-sm text-red-400">
            Unable to detect current page.
          </p>
        )}

      </div>

      {/* Read Page */}
      <button
        onClick={handleReadPage}
        disabled={readingPage}
        className="w-full mt-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 py-2.5 font-medium transition"
      >
        {readingPage ? "Reading Page..." : "Read Current Page"}
      </button>

      {/* Selected Text */}
      <button
        onClick={handleGetSelectedText}
        className="w-full mt-2 rounded-lg bg-slate-800 hover:bg-slate-700 py-2.5 text-sm transition"
      >
        Get Selected Text
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-900 bg-red-950/50 p-3">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Page Content */}
      {pageContent && (
        <div className="mt-5">

          <div className="flex justify-between items-center mb-2">

            <p className="text-sm font-medium">
              Page Content
            </p>

            <span className="text-xs text-slate-500">
              {pageContent.length.toLocaleString()} chars
            </span>

          </div>

          <div className="h-40 overflow-y-auto rounded-lg bg-slate-900 border border-slate-800 p-3">

            <p className="text-xs text-slate-400 whitespace-pre-wrap">
              {pageContent}
            </p>

          </div>

        </div>
      )}

      {/* Selected Text */}
      {selectedText && (
        <div className="mt-4">

          <div className="flex justify-between items-center mb-2">

            <p className="text-sm font-medium">
              Selected Text
            </p>

            <button
              onClick={() => setSelectedText("")}
              className="text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>

          </div>

          <div className="max-h-28 overflow-y-auto rounded-lg bg-indigo-950/40 border border-indigo-900 p-3">

            <p className="text-xs text-indigo-200 whitespace-pre-wrap">
              {selectedText}
            </p>

          </div>

        </div>
      )}

      {/* Actions */}
      <div className="mt-6">

        <p className="text-sm font-medium mb-3">
          What would you like to do?
        </p>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => handleAction("summarize")}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm transition"
          >
            Summarize
          </button>

          <button
            onClick={() => handleAction("explain")}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm transition"
          >
            Explain
          </button>

          <button
            onClick={() => handleAction("key-points")}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm transition"
          >
            Key Points
          </button>

          <button
            onClick={() => handleAction("rewrite")}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm transition"
          >
            Rewrite
          </button>

        </div>

      </div>

      {/* Current Action */}
      {activeAction && (
        <div className="mt-4 rounded-lg bg-slate-900 border border-slate-800 p-3">

          <p className="text-xs text-slate-500">
            Selected action
          </p>

          <p className="text-sm font-medium mt-1 capitalize">
            {activeAction.replace("-", " ")}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Ready to send webpage context to the AI backend.
          </p>

        </div>
      )}

      {/* Question */}
      <div className="mt-6">

        <textarea
          placeholder="Ask anything about this page..."
          className="w-full h-24 resize-none rounded-lg bg-slate-900 border border-slate-800 p-3 text-sm outline-none focus:border-indigo-500"
        />

        <button className="w-full mt-3 rounded-lg bg-white text-slate-950 py-2.5 font-medium hover:bg-slate-200 transition">
          Ask AI
        </button>

      </div>

      {/* Footer */}
      <footer className="mt-6 pt-4 border-t border-slate-800">

        <p className="text-xs text-slate-500 text-center">
          WebPilot AI · v1.0.0
        </p>

      </footer>

    </div>
  );
}

export default App;