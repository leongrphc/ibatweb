"use client";

import { useState } from "react";
import Link from "next/link";
import { useAnnouncements, Announcement } from "@/context/AnnouncementContext";

export default function AnnouncementsPage() {
  const {
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  } = useAnnouncements();

  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!newText.trim()) return;
    addAnnouncement(newText.trim());
    setNewText("");
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setEditText(announcement.text);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editText.trim()) return;
    updateAnnouncement(editingId, { text: editText.trim() });
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateAnnouncement(id, { isActive: !isActive });
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      deleteAnnouncement(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const current = announcements[index];
    const prev = announcements[index - 1];
    updateAnnouncement(current.id, { order: prev.order });
    updateAnnouncement(prev.id, { order: current.order });
  };

  const handleMoveDown = (index: number) => {
    if (index === announcements.length - 1) return;
    const current = announcements[index];
    const next = announcements[index + 1];
    updateAnnouncement(current.id, { order: next.order });
    updateAnnouncement(next.id, { order: current.order });
  };

  const sortedAnnouncements = [...announcements].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Duyuru Yönetimi
                </h1>
                <p className="text-sm text-neutral-500">
                  Kayan duyuru yazılarını düzenleyin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Add New Announcement */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-4">
            Yeni Duyuru Ekle
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Duyuru metnini yazın..."
              className="input flex-1"
            />
            <button onClick={handleAdd} className="btn-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Ekle
            </button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="text-lg font-bold text-primary">
              Mevcut Duyurular ({announcements.length})
            </h2>
          </div>

          {sortedAnnouncements.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="w-12 h-12 mx-auto text-neutral-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              <p className="text-neutral-500">Henüz duyuru eklenmemiş</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {sortedAnnouncements.map((announcement, index) => (
                <div
                  key={announcement.id}
                  className={`p-4 flex items-center gap-4 ${
                    !announcement.isActive ? "bg-neutral-50 opacity-60" : ""
                  }`}
                >
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 hover:bg-neutral-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Yukarı taşı"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === sortedAnnouncements.length - 1}
                      className="p-1 hover:bg-neutral-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Aşağı taşı"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Order Number */}
                  <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-sm font-medium text-neutral-600">
                    {index + 1}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    {editingId === announcement.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit();
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                        className="input w-full"
                        autoFocus
                      />
                    ) : (
                      <p className="text-primary">{announcement.text}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {editingId === announcement.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors"
                          title="Kaydet"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors"
                          title="İptal"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Toggle Active */}
                        <button
                          onClick={() =>
                            handleToggleActive(
                              announcement.id,
                              announcement.isActive,
                            )
                          }
                          className={`p-2 rounded-lg transition-colors ${
                            announcement.isActive
                              ? "bg-success/10 text-success hover:bg-success/20"
                              : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                          }`}
                          title={
                            announcement.isActive ? "Pasif yap" : "Aktif yap"
                          }
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {announcement.isActive ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            )}
                          </svg>
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="p-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors"
                          title="Düzenle"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(announcement.id)}
                          className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
                          title="Sil"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="text-lg font-bold text-primary">Önizleme</h2>
            <p className="text-sm text-neutral-500">
              Duyurular sitede bu şekilde görünecek
            </p>
          </div>
          <div className="bg-primary text-white overflow-hidden">
            <div className="animate-marquee whitespace-nowrap py-2 text-sm font-medium">
              {sortedAnnouncements
                .filter((a) => a.isActive)
                .map((announcement, index) => (
                  <span key={`preview-${announcement.id}-${index}`}>
                    <span className="mx-8">{announcement.text}</span>
                    <span className="mx-8">*</span>
                  </span>
                ))}
              {sortedAnnouncements
                .filter((a) => a.isActive)
                .map((announcement, index) => (
                  <span key={`preview2-${announcement.id}-${index}`}>
                    <span className="mx-8">{announcement.text}</span>
                    <span className="mx-8">*</span>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
