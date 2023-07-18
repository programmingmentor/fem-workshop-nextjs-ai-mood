import { prisma } from '@/utils/db';

import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';

import { redirect } from 'next/navigation';

const createNewUser = async () => {
    const user: User | null = await currentUser();
    console.log({user});
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id
        }
    })
    if (!match) {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user?.id,
                email: user?.emailAddresses[0].emailAddress
            }
        })
        console.log({newUser});
    }
    redirect('/journal');
}

const NewUser = async () => {
    await createNewUser();
    return <div>...</div>
}

export default NewUser