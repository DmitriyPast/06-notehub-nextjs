"use client"

import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import { useDebounce } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import type { FetchNotesResponse } from "@/lib/api";

interface NotesClientProps {
    initSearch: string,
    initPage: number,
}

export default function NotesClient({ initSearch, initPage }: NotesClientProps) {
    const [page, setPage] = useState<number>(initPage);
    const [query, setQuery] = useState<string>(initSearch);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [queryDebounced] = useDebounce(query, 1000);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["notes", queryDebounced, page],
        queryFn: () => fetchNotes(queryDebounced, page, 12),
        placeholderData: keepPreviousData,
    });
    const firstUpdate = useRef(true);
    useEffect(() => {
        if (!firstUpdate.current && isSuccess && !data?.notes.length)
            toast("No notes found for your request.")
        else firstUpdate.current = false;
    }, [data, isSuccess]);

    useEffect(() => setPage(1), [queryDebounced])

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