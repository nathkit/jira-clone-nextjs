import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";

interface WorkspaceIdJoinPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkerspaceIdJoinPage = async ({
    params,
}: WorkspaceIdJoinPageProps) => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    const initailValues = await getWorkspaceInfo({
        workspaceId: params.workspaceId,
    })

    if (!initailValues) redirect("/");

    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm initailValues={initailValues} />
        </div>
    );
};

export default WorkerspaceIdJoinPage;