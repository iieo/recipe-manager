import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex bg-white p-4 w-screen border-2">
      <h1 className="text-black p-2">Project Management</h1>
      <Link href="/recipes" className="text-black ml-8 rounded border-2 p-2">
        Recipes
      </Link>
    </div>
  );
}
