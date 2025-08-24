import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { getSingleNote } from "@/lib/api";

type NoteDetailsProps = {
    params: Promise<{ id: string }>;
};
export default async function NoteDetails({ params }: NoteDetailsProps) {

    const { id } = await params;
    const qc = new QueryClient();

    await qc.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getSingleNote(id),
    });

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}