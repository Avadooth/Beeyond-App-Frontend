export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>
        <p className="text-xl">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}
