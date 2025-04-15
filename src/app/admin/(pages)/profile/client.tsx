"use client";

import { Admin } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Camera, X } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserImage, updateUserName } from "@/actions/admin";

const ProfileClient = ({ user }: { user: Admin | null }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState(user?.name || "");
  const [username, setUsername] = React.useState(user?.username || "");

  const [isEditing, setIsEditing] = React.useState(false);
  const [image, setImage] = React.useState(user?.profileImage || "");
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateUserName(name, username, user?.id as string);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpload = async (url: string) => {
    setIsLoading(true);
    try {
      setImage(url);
      const res = await updateUserImage(url, user?.id as string);
      if (res.error) {
        toast.error(res.error);
      } else {
        setIsEditing(false);
        toast.success(res.success);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center gap-5 mt-3">
        {!isEditing && (
          <div className="relative w-20 h-20">
            <Avatar className="w-20 h-20">
              <AvatarImage
                className="object-cover"
                src={user?.profileImage || ""}
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              onClick={toggleEdit}
              className="cursor-pointer absolute bottom-0 right-0 rounded-full w-8 h-8 flex items-center justify-center bg-white border shadow"
            >
              <Camera className="w-4 h-4" />
            </div>
          </div>
        )}
        {isEditing && (
          <div className="flex items-end">
            <ImageUpload
            className='w-[200px]'
              defaultValue={user?.profileImage || ""}
              onImageUpload={(url: string) => {
                if (url) {
                  onUpload(url);
                }
              }}
            />
            <div
              onClick={toggleEdit}
              className="cursor-pointer -ml-4 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center border shadow"
            >
              <X className="w-4 h-4" />
            </div>
          </div>
        )}
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.username}</p>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="space-y-2 mt-4">
          <Label>Name</Label>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2 mt-4">
          <Label>Username</Label>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="mt-5">
          Save Changes
        </Button>
      </form>
    </>
  );
};

export default ProfileClient;
