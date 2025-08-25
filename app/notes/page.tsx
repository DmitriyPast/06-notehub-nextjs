import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NotesClient from "./Notes.client"
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

export default async function Notes() {
    const perPage = 12;
    const page = 1;
    const search = "";
    const qc: QueryClient = new QueryClient()
    const data: FetchNotesResponse = await fetchNotes(search, page, perPage)
    await qc.prefetchQuery({
        queryKey: ["notes", search, page],
        queryFn: () => fetchNotes(search, page, perPage,),
    })
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotesClient initSearch={search} initPage={page} />
        </HydrationBoundary>
    )
}