import { redirect } from "next/navigation";

import { getWorkspaces } from "./workspaces/actions";
import { getCurrent } from "@/features/auth/actions";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaces = await getWorkspaces();
  if (workspaces.total === 0) {
    redirect(`/workspaces/1234?create-workspace=${true}`)
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  };
};
