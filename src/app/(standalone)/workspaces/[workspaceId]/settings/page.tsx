import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

interface WorkspaceIdSettingPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspaceIdSettingPage = async ({ params }: WorkspaceIdSettingPageProps) => {
    const {} = useCreateWorkspaceModal
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

    if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);
    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValues={initialValues} />
        </div>
    );
};

export default WorkspaceIdSettingPage;