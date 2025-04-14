"use server";

import db from "@/lib/db";

export const createNewsAnnouncement = async (data: {
  title: string;
  description: string;
  imageUrl: string;
  expirationDate: string;
}) => {
  if (
    !data.title ||
    !data.description ||
    !data.imageUrl ||
    !data.expirationDate
  ) {
    return { error: "All fields are required" };
  }

  try {
    await db.newsAnnouncements.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        expirationDate: data.expirationDate,
      },
    });
    return { success: "News and announcement created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create news and announcement" };
  }
};

export const updateNewsAnnouncement = async (
  data: {
    title: string;
    description: string;
    imageUrl: string;
    expirationDate: string;
  },
  id: string
) => {
  if (
    !data.title ||
    !data.description ||
    !data.imageUrl ||
    !data.expirationDate
  ) {
    return { error: "All fields are required" };
  }

  try {
    await db.newsAnnouncements.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        expirationDate: data.expirationDate,
      },
    });
    return { success: "News and announcement updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update news and announcement" };
  }
};

export const deleteNewsAnnouncement = async (id: string) => {
  if (!id) {
    return { error: "Invalid ID" };
  }

  try {
    await db.newsAnnouncements.delete({
      where: {
        id: id,
      },
    });

    return { success: "News and announcement deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete news and announcement" };
  }
};
