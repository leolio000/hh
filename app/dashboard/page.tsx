import CreatorDashboard from "../components/creator-dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-light text-gray-900">
              Mon Dashboard
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CreatorDashboard />
      </div>
    </div>
  );
} 