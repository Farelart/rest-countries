import { BsMoon } from "react-icons/bs";

export default function Header() {
  return (
    <nav className="bg-white shadow-md">
        <div className="flex justify-between items-center max-w-[80%] md:container mx-auto py-4">
            <h1 className="text-xl font-bold">Where in the world?</h1>
            <button className="flex items-center gap-2">
              <BsMoon />
              Dark Mode
            </button>
        </div>
    </nav>
  )
}
