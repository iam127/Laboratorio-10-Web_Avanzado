import Link from "next/link";
import { CharacterListResponse, SimpleCharacter } from "@/types/rickandmorty";
import Image from "next/image";

async function getCharacters(): Promise<SimpleCharacter[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: 'force-cache',
  });
  
  if (!res.ok) throw new Error("Error al cargar personajes");
  
  const data: CharacterListResponse = await res.json();
  
  return data.results.map((character) => ({
    id: character.id,
    name: character.name,
    image: character.image,
    status: character.status,
    species: character.species,
  }));
}

export default async function CharacterList() {
  const characters = await getCharacters();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
          SSG - Static Site Generation
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Character Gallery
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Explore all characters from the Rick and Morty universe. Click on any character to view detailed information.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-3xl font-bold text-slate-900">{characters.length}</div>
          <div className="text-sm text-slate-600">Total Characters</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-3xl font-bold text-green-600">
            {characters.filter(c => c.status === 'Alive').length}
          </div>
          <div className="text-sm text-slate-600">Alive</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-3xl font-bold text-red-600">
            {characters.filter(c => c.status === 'Dead').length}
          </div>
          <div className="text-sm text-slate-600">Dead</div>
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link
            key={character.id}
            href={`/rickandmorty/${character.id}`}
            className="group"
          >
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
              <div className="relative w-full h-64 overflow-hidden bg-slate-100">
                <Image
                  width={300}
                  height={300}
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  priority={false}
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    character.status === 'Alive' 
                      ? 'bg-green-100 text-green-700' 
                      : character.status === 'Dead' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {character.status}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {character.name}
                </h3>
                <p className="text-sm text-slate-600">{character.species}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}