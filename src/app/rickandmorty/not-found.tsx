import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
          <span className="text-4xl font-bold text-slate-400">404</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Character Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The character you're looking for doesn't exist or has been removed from the database.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/rickandmorty"
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse characters
          </Link>
          <Link
            href="/rickandmorty/search"
            className="flex-1 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}