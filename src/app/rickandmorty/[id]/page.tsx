import Link from 'next/link';
import { Metadata } from 'next';
import { Character, CharacterListResponse } from '@/types/rickandmorty';
import Image from 'next/image';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }
  });
  
  if (!res.ok) throw new Error('Personaje no encontrado');
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data: CharacterListResponse = await res.json();
  
  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const {id} = await params;
  const character = await getCharacter(id);
  
  return {
    title: `${character.name} - Rick and Morty`,
    description: `${character.status} ${character.species} from ${character.origin.name}`,
  };
}

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const {id} = await params;
  const character = await getCharacter(id);
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/rickandmorty" className="text-slate-600 hover:text-blue-600">
              Characters
            </Link>
          </li>
          <li className="text-slate-400">/</li>
          <li className="text-slate-900 font-medium">{character.name}</li>
        </ol>
      </nav>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-3">
            ISR - Revalidate every 10 days
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{character.name}</h1>
          <p className="text-blue-100">Character ID: #{character.id}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                  <Image
                    width={300}
                    height={300}
                    src={character.image}
                    alt={character.name}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                
                {/* Status Badge */}
                <div className="mt-4">
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${
                    character.status === 'Alive' 
                      ? 'bg-green-100 text-green-700' 
                      : character.status === 'Dead' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      character.status === 'Alive' 
                        ? 'bg-green-500' 
                        : character.status === 'Dead' 
                        ? 'bg-red-500' 
                        : 'bg-slate-500'
                    }`}></span>
                    {character.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Species</div>
                    <div className="font-semibold text-slate-900">{character.species}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Gender</div>
                    <div className="font-semibold text-slate-900">{character.gender}</div>
                  </div>
                  {character.type && (
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 md:col-span-2">
                      <div className="text-sm text-slate-600 mb-1">Type</div>
                      <div className="font-semibold text-slate-900">{character.type}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Info */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h2>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Origin</div>
                    <div className="font-semibold text-slate-900">{character.origin.name}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Last known location</div>
                    <div className="font-semibold text-slate-900">{character.location.name}</div>
                  </div>
                </div>
              </div>

              {/* Episodes */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  Episodes
                </h2>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {character.episode.length}
                    </div>
                    <div className="text-slate-700">
                      Episode{character.episode.length !== 1 ? 's' : ''} appeared in
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="pt-6 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Created: {new Date(character.created).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex flex-wrap gap-3">
          <Link
            href="/rickandmorty"
            className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            ← Back to gallery
          </Link>
          <Link
            href="/rickandmorty/search"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search characters
          </Link>
        </div>
      </div>
    </div>
  );
}