import { Account, Client, Databases, Query } from "node-appwrite";

import { getMember } from "@/features/members/utils";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

import { WorkSpace } from "./types";

import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
    try {
        const { databases, account } = await createSessionClient();

        const user = await account.get();

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal("userId", user.$id)]
        )

        if (members.total === 0) {
            return { documents: [], total: 0 };
        }

        const workspaceIds = members.documents.map((member) => member.workspaceId);

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id", workspaceIds)
            ],
        );
        
        return workspaces;
    } catch (e) {
        console.error(e);
        return  { documents: [], total: 0 };
    }
}

interface GetWorkspaceProps {
    workspaceId: string;
}

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
    try {
        const { databases, account } = await createSessionClient();

        const user = await account.get();

        const member = await getMember({
            databases,
            workspaceId,
            userId: user.$id,
        })

        if (!member) {
            return null;
        }
        
        const workspace = await databases.getDocument<WorkSpace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        );

        
        return workspace;
    } catch (e) {
        console.error(e);
        return  null;
    }
}

interface GetWorkspaceInfoProps {
    workspaceId: string;
}

export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspaceInfoProps) => {
    try {
        const { databases } = await createSessionClient();
        
        const workspace = await databases.getDocument<WorkSpace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        );

        
        return {
            name: workspace.name,
        };
    } catch (e) {
        console.error(e);
        return  null;
    }
}