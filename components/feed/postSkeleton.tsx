import { Skeleton } from "../ui/skeleton"

interface PostSkeletonProps {
    number?: number;
}

export const PostSkeleton = ({ number } : PostSkeletonProps) => {
    return (
        <div className="flex flex-col items-start ">
            <div className="flex w-full items-center gap-4 py-5 px-5 border-b border-neutral-800">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="grid gap-2">
                    <Skeleton className="h-4 w-[150px] md:w-[350px]" />
                    <Skeleton className="h-4 w-[100px] md:w-[300px]" />
                </div>
            </div>
            <div className="flex w-full items-center gap-4 py-5 px-5 border-b border-neutral-800">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="grid gap-2">
                    <Skeleton className="h-4 w-[150px] md:w-[350px]" />
                    <Skeleton className="h-4 w-[100px] md:w-[300px]" />
                </div>
            </div>
        </div>
    );
}