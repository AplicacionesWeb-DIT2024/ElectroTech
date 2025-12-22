import { Suspense } from "react";
import SearchPage from "./page-search-client";

export default function PageSuccess() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchPage />
    </Suspense>
  );
}