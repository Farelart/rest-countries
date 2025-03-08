"use client";

import { BsSearch } from "react-icons/bs"
import { useRouter } from "next/navigation"

export default function SearchForm() {
    const router = useRouter()
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const searchQuery = formData.get("search") as string
        router.push(`/?q=${searchQuery}`)
    }

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const region = e.target.value;
        if (region) {
            router.push(`/?region=${region.toLowerCase()}`);
        } else {
            router.push('/');
        }
    }

    return (
        <section className="max-w-4/5 md:container mx-auto my-12">
            <div className="mx-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <form
                    className="bg-white shadow-md flex justify-between items-center gap-4 p-3 rounded-md"
                    onSubmit={handleSubmit}
                >   
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for a country..."
                        className="outline-none"
                    />
                    <button
                        type="submit"
                        aria-label="Search"
                    >
                        <BsSearch color="gray"/>
                    </button>
                </form>
                
                <select
                    className="bg-white shadow-md px-3.5 py-3.5 rounded-md outline-none"
                    onChange={handleRegionChange}
                    name="region" 
                    id="region"
                >
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </section>
    )
}