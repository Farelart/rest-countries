import Image from "next/image";
import Link from "next/link";

type CountriesListProps = {
    endpoint: string;
}

export default async function CountriesList({endpoint}: CountriesListProps) {   
    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Country not found. Please try searching in English');
            }
            throw new Error('Failed to fetch countries');
        }

        const countries = await response.json();
        
        // Ensure countries is an array before using slice
        if (!Array.isArray(countries)) {
            throw new Error('Invalid data format received');
        }

        // limit to 8 countries
        const limitedCountries = countries.slice(0, 8);
        console.log(limitedCountries);

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 w-4/5 md:container mx-auto">
                {limitedCountries.map((country) => (
                    <Link
                        key={country.cca3}
                        href={`/country/${country.cca3.toLowerCase()}`}
                    >
                        <article 
                            key={country.cca3}
                            className="bg-white shadow-md rounded-md text-xs font-light"
                        >
                            <Image
                                src={country.flags.png}
                                alt={country.name.common}
                                width={160}
                                height={80}
                                className="w-full h-25 object-cover rounded-t-md"
                            />
                            <div className="p-4">
                                <h2 className="font-bold my-4">{country.name.common}</h2>
                                <p>Population: {country.population}</p>
                                <p>Region: {country.region}</p>
                                <p>Capital: {country.capital}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error:', error);
        return (
            <div className="container mx-auto text-center py-8">
                <p>No countries found. Please try a different search.</p>
            </div>
        );
    }
}