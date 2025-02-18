export default function LoadingPage() {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }