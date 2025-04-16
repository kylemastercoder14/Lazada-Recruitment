"use client";

import { Button } from "@/components/ui/button";
import { Archive, Undo2, View } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ApplicationManagementColumn } from "./column";
import AlertModal from "@/components/ui/alert-modal";
import { toast } from "sonner";
import { archiveApplicationManagement, retrieveApplicationManagement } from "@/actions/application";

interface CellActionProps {
  data: ApplicationManagementColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRetrieve, setIsRetrieve] = React.useState(false);
  const router = useRouter();

  const onArchive = async () => {
    try {
      const res = await archiveApplicationManagement(data.id);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log("[ARCHIVE_APPLICATION_MANAGEMENT_ERROR]", error);
      toast.error(
        "Something went wrong while archiving the application management."
      );
    }
  };

  const onRetrieve = async () => {
    try {
      const res = await retrieveApplicationManagement(data.id);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
        setIsRetrieve(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log("[RETRIEVE_APPLICATION_MANAGEMENT_ERROR]", error);
      toast.error(
        "Something went wrong while retireving the application management."
      );
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onArchive}
        title="Are you sure you want to archive this data?"
      />
      <AlertModal
        isOpen={isRetrieve}
        onClose={() => setIsRetrieve(false)}
        onConfirm={onRetrieve}
        title="Are you sure you want to retrieve this data?"
      />
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={() =>
            router.push(`/admin/application-management/${data.id}`)
          }
        >
          <View className="w-4 h-4" />
          View
        </Button>
        {data.status === "Failed" && !data.isArchived && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            <Archive className="w-4 h-4" />
            Archive
          </Button>
        )}

        {data.isArchived && (
          <Button size="sm" variant="success" onClick={() => setIsRetrieve(true)}>
            <Undo2 className="w-4 h-4" />
            Retrieve
          </Button>
        )}
      </div>
    </>
  );
};
