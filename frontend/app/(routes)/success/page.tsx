import { Suspense } from "react";
import PageSuccessClient from "./page-success-client";

export default function PageSuccess() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PageSuccessClient />
    </Suspense>
  );
}