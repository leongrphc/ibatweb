"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Announcement {
  id: string;
  text: string;
  isActive: boolean;
  order: number;
}

interface AnnouncementContextType {
  announcements: Announcement[];
  addAnnouncement: (text: string) => void;
  updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  reorderAnnouncements: (announcements: Announcement[]) => void;
  getActiveAnnouncements: () => Announcement[];
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "ibat_announcements";

const defaultAnnouncements: Announcement[] = [
  {
    id: "1",
    text: "Ücretsiz Kargo - 500 TL ve üzeri alışverişlerde",
    isActive: true,
    order: 1,
  },
  {
    id: "2",
    text: "APP15 kodu ile ilk siparişinizde %15 indirim",
    isActive: true,
    order: 2,
  },
  {
    id: "3",
    text: "Kapıda Ödeme İmkanı",
    isActive: true,
    order: 3,
  },
];

export function AnnouncementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load announcements from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAnnouncements(JSON.parse(stored));
      } else {
        setAnnouncements(defaultAnnouncements);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAnnouncements));
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
      setAnnouncements(defaultAnnouncements);
    }
    setIsLoaded(true);
  }, []);

  // Save announcements to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    }
  }, [announcements, isLoaded]);

  const addAnnouncement = (text: string) => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      text,
      isActive: true,
      order: announcements.length + 1,
    };
    setAnnouncements((prev) => [...prev, newAnnouncement]);
  };

  const updateAnnouncement = (id: string, data: Partial<Announcement>) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a)),
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const reorderAnnouncements = (newOrder: Announcement[]) => {
    setAnnouncements(newOrder);
  };

  const getActiveAnnouncements = () => {
    return announcements
      .filter((a) => a.isActive)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        reorderAnnouncements,
        getActiveAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error(
      "useAnnouncements must be used within an AnnouncementProvider",
    );
  }
  return context;
}
