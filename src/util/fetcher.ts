export default async function fetcher(url: string, config?: RequestInit) {
    return await fetch(url, config).then((res) => res.json());
}
