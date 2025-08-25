import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

// const myKey = import.meta.env.VITE_TMDB_TOKEN;
const ApiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// console.log(myKey);

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

// axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes/";
axios.defaults.headers.common["Authorization"] = `Bearer ${ApiKey}`;
const url = "https://notehub-public.goit.study/api/notes/";

export async function fetchNotes(
    search: string,
    page: number,
    perPage?: number
): Promise<FetchNotesResponse> {
    const res = await axios.get<FetchNotesResponse>(url, {
        params: {
            search,
            page,
            perPage,
        },
    });
    return res.data;
}

export async function createNote(formData: NoteFormValues): Promise<Note> {
    return (await axios.post<Note>(url, formData)).data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    return (await axios.delete<Note>(`${url}${noteId}`)).data;
}

export async function getSingleNote(noteId: string): Promise<Note> {
    return (await axios.get<Note>(`${url}${noteId}`)).data;
}