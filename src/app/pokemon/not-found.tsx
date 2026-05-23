import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h2 className="text-6xl font-bold mb-4">404</h2>
      <p className="text-2xl mb-6">¡Pokémon no encontrado!</p>
      <Link
        href="/pokemon"
        className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg"
      >
        Volver al Pokédex
      </Link>
    </div>
  );
}