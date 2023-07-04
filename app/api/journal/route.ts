import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async () => {
    const user = await getUserByClerkId();
    const entry = await prisma.journalEntry.create({
        data: {
            content: 'hello',
            userId: user.id
            // user: {
            //     connect: {
            //         id: user.id
            //     }
            // }
        }
    })
    return NextResponse.json({ data: entry })
}

