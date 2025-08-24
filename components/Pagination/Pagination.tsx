// import toast from "react-hot-toast";
import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (selected: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

// interface searchBarProps {
//   onSubmit: (formData: string) => void;
// }

// export function SearchBar({ onSubmit }: searchBarProps) {
//   function handleSubmit(formData: FormData) {
//     const query = (formData.get("query") as string).trim();
//     if (query === "") {
//       toast("Please enter your search query.");
//       return;
//     }
//     onSubmit(query);
//   }

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <a
//           className={styles.link}
//           href="https://www.themoviedb.org/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by TMDB
//         </a>
//         <form action={handleSubmit} className={styles.form}>
//           <input
//             className={styles.input}
//             type="text"
//             name="query"
//             autoComplete="off"
//             placeholder="Search movies..."
//             autoFocus
//           />
//           <button className={styles.button} type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//     </header>
//   );
// }
