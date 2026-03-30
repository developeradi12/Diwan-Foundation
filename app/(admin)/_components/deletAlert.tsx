"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

const DeleteAlert = ({ id }: { id: string }) => {

    const router = useRouter();

    const handleDelete = async() => {
         try {
      await api.delete(`/admin/membership/${id}`);
      toast.success("Membership plan deleted!");
      router.push("/admin/memberships");
    } catch (error) {
      toast.error("Failed to delete plan. Try again.");
      console.error("Error deleting membership:", error);
    } 
    }
  return (
    <div>
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-700 text-white"><Trash /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            
            <div className="text-lg font-semibold text-red-950">Delete Membership?</div>
            <AlertDialogDescription>
              This will permanently delete your membership. are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-gray-200 px-5 py-2 rounded-md cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-md cursor-pointer" onClick={() => handleDelete()}>
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAlert;
