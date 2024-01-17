export default function Error({ error }: { error: string }) {
  return (
    <div className="flex min-h-screen place-items-center justify-center align-center">
      <h1 className="text-4xl">Error: {error}</h1>
    </div>
  );
}
