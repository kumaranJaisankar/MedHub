import { useState } from "react";
import { Send } from "lucide-react";
import useUser from "@/utils/useUser";

export default function CommentForm({ postId, onCommentAdded }) {
  const { data: user } = useUser();
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      onCommentAdded({
        author: anonymous
          ? {
              id: "anon",
              name: "Anonymous",
              avatar: "👤",
              expertise: "General",
            }
          : {
              id: user?.id || "user",
              name: user?.name || "You",
              avatar: user?.image || "👨‍⚕️",
              expertise: "Healthcare Professional",
            },
        content: content.trim(),
        anonymous,
      });
      setContent("");
      setAnonymous(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Comment Input */}
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts or insights..."
          rows="4"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Anonymous Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="anonymous"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="anonymous" className="text-sm text-slate-600">
          👤 Post anonymously
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={18} />
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
