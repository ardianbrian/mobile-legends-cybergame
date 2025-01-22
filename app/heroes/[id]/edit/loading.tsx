// app/heroes/loading.tsx
export default function LoadingEdit() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="bg-gray-800 rounded-lg shadow-xl">
            <div className="h-64 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
