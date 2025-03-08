import Image from "next/image";
import Link from "next/link";

type Props = {
    params: Promise<{
        id: string;
    }>
}

type NativeName = {
    official: string;
    common: string;
}

type CountryName = {
    common: string;
    official: string;
    nativeName: {
        [key: string]: NativeName;
    }
}

type Country = {
    name: CountryName;
    flags: {
        png: string;
    }
    population: number;
    region: string;
    subregion: string;
    capital: string;
    tld: string[];
    currencies: {
        [key: string]: {
            name: string;
        }
    }
    languages: string[];
    borders?: string[];
}

export default async function CountryPage({ params }: Props) {
    const countryParams = await params;
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryParams.id}`);
    const [country] = await response.json() as Country[];

    return (
        <main className="max-w-[80%] md:container mx-auto py-16">
            <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-white px-8 py-2 shadow-md rounded-md mb-16"
            >
                ← Back
            </Link>

            <div className="flex flex-col md:flex-row gap-16">
                <Image
                    src={country.flags.png}
                    alt={country.name.common}
                    width={300}
                    height={140}
                    className=""
                />

                <div>
                    <h1 className="text-3xl font-bold mb-8">{country.name.common}</h1>
                    <div className="grid grid-cols-2 gap-32 text-sm">
                        <div className="space-y-2">
                            <p><span className="font-semibold">Native Name:</span> {Object.values(country.name.nativeName)[0].common}</p>
                            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                            <p><span className="font-semibold">Region:</span> {country.region}</p>
                            <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
                            <p><span className="font-semibold">Capital:</span> {country.capital}</p>
                        </div>
                        <div className="space-y-2">
                            <p><span className="font-semibold">Top Level Domain:</span> {country.tld}</p>
                            <p><span className="font-semibold">Currencies:</span> {Object.values(country.currencies).map(c => c.name).join(', ')}</p>
                            <p><span className="font-semibold">Languages:</span> {Object.values(country.languages).join(', ')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-4">
                        {country.borders ? (
                            <>
                                <span className="font-semibold">Border Countries:</span>
                                <div className="flex gap-2 flex-wrap">
                                    {country.borders.map((border) => (
                                        <Link
                                            key={border}
                                            href={`/country/${border.toLowerCase()}`}
                                            className="bg-white px-6 py-1 shadow-md rounded-sm text-sm hover:bg-gray-50"
                                        >
                                            {border}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p>No border countries</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}