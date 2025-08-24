// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NotesClient from "./Notes.client"
import { FetchNotesResponse } from "@/types/note";
import { fetchNotes } from "@/lib/api";
// import type { FetchNotesResponse } from "@/lib/api"

export default async function Notes() {
    const perPage = 12;
    const Page = 1;
    const Search = "";
    const Data: FetchNotesResponse = await fetchNotes(Search, Page, perPage)
    // const qc: QueryClient = new QueryClient()
    return (
        <NotesClient initSearch={Search} initPage={Page} initData={Data} />
    )
}