{loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
        <div className="w-full aspect-square bg-slate-200"></div>
        <div className="p-4">
          <div className="h-4 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
) : characters.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {characters.map((character) => (
      <Link
        key={character.id}
        href={`/rickandmorty/${character.id}`}
        className="group"
      >
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
          <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
            <Image
              width={300}
              height={300}
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
            {character.type && (
              <p className="text-xs text-slate-500 mt-1">{character.type}</p>
            )}
          </div>
        </div>
      </Link>
    ))}
  </div>