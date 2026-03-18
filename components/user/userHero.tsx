import useUser from "@/hooks/useUser";
import Image from "next/image";
import { UserAvatar } from "./userAvatar";


interface UserHeroProps {
    userId?: string;
}


export const UserHero = ({
    userId
}: UserHeroProps) => {
    
    const {data: fetchedUser } = useUser(userId as string);
    
    return (
        <div className="bg-neutral-700 h-44 relative">
            {fetchedUser?.coverImage && (
                <Image
                    src={fetchedUser?.coverImage}
                    fill
                    alt="Cover image" 
                    style={{
                        objectFit: 'cover'
                    }}
                />
            )}
            <div className="absolute -bottom-16 left-4">
                <UserAvatar 
                    isLarge
                    hasBorder 
                    userId={userId as string}/>
            </div>
        </div>
    )
}