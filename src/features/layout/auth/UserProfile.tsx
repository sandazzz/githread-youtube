import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { DropdownMenuItemLogOut } from "@/src/features/layout/auth/LogoutButton";
import React from "react";

export const UserProfile = async () => {
  const session = await getAuthSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          {session?.user.name ?? ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User2 className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItemLogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
