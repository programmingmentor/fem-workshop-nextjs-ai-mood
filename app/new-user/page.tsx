const { prisma } from '@/utils/db';

import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';

import { redirect } from 'next/navigation';

const createNewUser = async () => {
    const user: User | null = await currentUser();
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id
        }
    })
    if (!match) {
        const newUser = await prisma.user.create({
            clerkId: user?.id,
            email: user?.emailAddresses[0].emailAddress
        })
    }
    redirect('/journal');
}

const NewUser = async () => {
    await createNewUser();
    return <div>...</div>
}

export default NewUser