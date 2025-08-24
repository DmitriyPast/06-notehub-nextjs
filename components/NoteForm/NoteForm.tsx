import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import type { NoteFormValues } from "../../types/note";
import css from "./NoteForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  // onSubmit: (note: NoteFormValues) => void;
  // movies: Movie[];
  onClose: () => void;
}

// interface NoteFormValues {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  // if (movies.length === 0) return null;
  const Id = useId();

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    console.log(values);
    // onSubmit(values);
    actions.resetForm();
    request.mutate(values);
  };

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 Chara-cters.")
      .max(50, "YOUR title IS TOO LONG!")
      .required("Title is required."),
    content: Yup.string().max(500, "YOUR content IS TOO LONG!"),
    tag: Yup.mixed()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Tag is required."),
  });

  const client = useQueryClient();

  const request = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${Id}title`}>Title</label>
          <Field
            id={`${Id}title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${Id}content`}>Content</label>
          <Field
            as="textarea"
            id={`${Id}content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${Id}tag`}>Tag</label>
          <Field as="select" id={`${Id}tag`} name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
