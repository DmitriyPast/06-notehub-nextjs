// import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
// import type React from "react";
// import { useEffect } from "react";

interface NoteListProps {
  noteList: Note[];
}

export default function NoteList({ noteList }: NoteListProps) {
  const client = useQueryClient();

  const request = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => client.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (noteId: string) => request.mutate(noteId);

  return (
    <ul className={css.list}>
      {
        /* Набір елементів списку нотатків */
        noteList.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{`${note.title}`}</h2>
            <p className={css.content}>{`${note.content}`}</p>
            <div className={css.footer}>
              <span className={css.tag}>{`${note.tag}`}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
              <button
                onClick={() => handleDelete(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  );
}
