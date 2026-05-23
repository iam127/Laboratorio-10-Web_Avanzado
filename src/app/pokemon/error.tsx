"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h2 className="text-6xl font-bold mb-4">¡Ups!</h2>
      <p className="text-2xl mb-2">Ocurrió un error inesperado</p>
      <p className="text-gray-400 mb-8">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/pokemon"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg"
        >
          Volver al Pokédex
        </Link>
      </div>
    </div>
  );
}