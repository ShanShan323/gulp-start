const fetchParam = async (url) => {
    const response = await fetch(url);
    const commit = await response.json();
    return commit;
};


async function fetchData(url) {
    const data = await fetchParam(url);
    return data;
}

const url = 'https://zsa-studio.ru/catalog.php';

export const arrayOfProduct = await fetchData(url);
