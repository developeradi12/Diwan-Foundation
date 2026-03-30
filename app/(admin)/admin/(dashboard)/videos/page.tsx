"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, PlayCircle, Link2, Film } from "lucide-react";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";

interface VideoItem {
  _id: string;
  videoUrl: string;
}

/* ── Extract YouTube video ID ── */
function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

/* ── Try maxresdefault, fall back to hqdefault ── */
function getThumbnailUrl(videoId: string, quality: "max" | "hq" = "hq"): string {
  return quality === "max"
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/* ── Video card ── */
function VideoCard({
  video,
  onDelete,
}: {
  video: VideoItem;
  onDelete: (v: VideoItem) => void;
}) {
  const videoId = getYoutubeId(video.videoUrl);
  // Try hqdefault first; if that 404s the onError swaps to mqdefault
  const [thumbSrc, setThumbSrc] = useState<string | null>(
    videoId ? getThumbnailUrl(videoId, "hq") : null
  );
  const [thumbFailed, setThumbFailed] = useState(false);

  const handleThumbError = () => {
    if (videoId && !thumbFailed) {
      // Try lower quality fallback
      setThumbSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
      setThumbFailed(true);
    } else {
      setThumbSrc(null);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {thumbSrc ? (
          <img
            src={thumbSrc}
            alt="Video thumbnail"
            onError={handleThumbError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Film className="h-10 w-10 text-gray-300" />
          </div>
        )}

        {/* Play overlay on hover */}
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-200"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <PlayCircle className="h-6 w-6 text-gray-800" />
          </div>
        </a>
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Link2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-600 truncate flex-1 transition-colors"
        >
          {video.videoUrl}
        </a>
        <button
          onClick={() => onDelete(video)}
          className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Skeleton className="h-3.5 w-3.5 rounded" />
        <Skeleton className="h-3.5 flex-1 rounded" />
        <Skeleton className="h-6 w-6 rounded-lg" />
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<VideoItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get("admin/video");
      setVideos(res.data.videos || []);
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleSave = async () => {
    if (!url.trim()) return toast.error("Video URL is required");
    if (!url.includes("youtube.com") && !url.includes("youtu.be"))
      return toast.error("Only YouTube URLs allowed");

    setSaving(true);
    try {
      await api.post("admin/video", { videoUrl: url });
      toast.success("Video added");
      setUrl("");
      fetchVideos();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`admin/video/${deleteTarget._id}`);
      toast.success("Video deleted");
      setDeleteTarget(null);
      fetchVideos();
    } catch {
      toast.error("Failed to delete video");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Media Library
            </p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Videos
            </h1>
          </div>
          {!loading && (
            <div className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {videos.length} video{videos.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* ── Add Video Panel ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-red-500" />
            Add YouTube Video
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-sm h-10"
            />
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-10 px-5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium transition-colors shrink-0"
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Adding…
                </span>
              ) : (
                "Add Video"
              )}
            </Button>
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Film className="h-7 w-7 text-gray-400" />
            </div>
            <p className="text-gray-800 font-semibold text-base mb-1">No videos yet</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Paste a YouTube URL above to add your first video to the library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((v) => (
              <VideoCard key={v._id} video={v} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Video?"
        description="This action cannot be undone."
      />
    </div>
  );
}