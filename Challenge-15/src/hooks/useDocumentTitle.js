// src/hooks/useDocumentTitle.js
import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title; // Cambia el título del documento en la pestaña
  }, [title]);
};

export default useDocumentTitle;
