import SearchForm from "../components/SearchForm";
import CountriesList from "@/components/CountriesList";

type HomeProps = {
  searchParams: Promise<{
    q?: string;
    region?: string;
  }>
}

export default async function Home({searchParams}: HomeProps) {
  const params = await searchParams;
  const query = params.q;
  const region = params.region;
  
  let endpoint = "https://restcountries.com/v3.1/all";

  if (query) {
    endpoint = `https://restcountries.com/v3.1/name/${query}`;
  } else if (region) {
    endpoint = `https://restcountries.com/v3.1/region/${region}`;
  }

  return (
      <main className="">
        <SearchForm />
        <CountriesList endpoint={endpoint}/>
      </main>
  );
}
