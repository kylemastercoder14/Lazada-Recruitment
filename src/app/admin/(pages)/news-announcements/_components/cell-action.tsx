"use client";

import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash, View } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { NewsAnnouncementsColumn } from "./column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/ui/alert-modal";
import { toast } from "sonner";
import { deleteFromS3 } from "@/lib/s3";
import { deleteNewsAnnouncement } from '@/actions/news-announcement';

interface CellActionProps {
  data: NewsAnnouncementsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteNewsAnnouncement(data.id);
      if (res.success) {
        const deleteUrl = await deleteFromS3(data.imageUrl);
        if (deleteUrl.success) {
          toast.success(res.success);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(deleteUrl.error);
        }
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        onConfirm={handleDelete}
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Are you sure you want to delete this announcement?"
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/news-announcements/${data.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
