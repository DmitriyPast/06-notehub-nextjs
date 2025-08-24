"use client"

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./page.module.css";
// import type { Movie } from "../../types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
// import SearchBar from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { FetchNotesResponse } from "@/types/note";

interface NotesClientProps {
    initSearch: string,
    initPage: number,
    initData: FetchNotesResponse
}

export default function NotesClient({ initSearch, initPage, initData }: NotesClientProps) {
    // const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [page, setPage] = useState<number>(initPage);
    const [query, setQuery] = useState<string>(initSearch);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [queryDebounced] = useDebounce(query, 1000);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["notes", queryDebounced, page],
        queryFn: () => fetchNotes(queryDebounced, page, 12),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (isSuccess && !data?.notes.length)
            toast("No notes found for your request.");
    }, [data, isSuccess]);

    const handleClose = () => setModalOpen(false);

    return (

        <div className={css.app}>
            <header className={css.toolbar}>
                {/* Компонент SearchBox */}
                {<SearchBox onChange={(query) => setQuery(query)} />}
                {/* Пагінація */}
                {data && data.totalPages > 0 && (
                    <Pagination
                        page={page}
                        totalPages={data.totalPages}
                        setPage={(selected) => setPage(selected)}
                    />
                )}
                {/* Кнопка створення нотатки */}
                {
                    <button onClick={() => setModalOpen(true)} className={css.button}>
                        Create note +
                    </button>
                }
            </header>
            {query && isLoading && !data && <>Loading notes...</>}
            {query && isError && <>Error occured</>}
            {data && data.notes.length > 0 && <NoteList noteList={data.notes} />}
            {modalOpen && (
                <Modal onClose={handleClose}>
                    <NoteForm onClose={handleClose} />
                </Modal>
            )}
            <Toaster />
        </div>
    );
}