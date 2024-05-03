export const fetchParam = async (url) => {
    const response = await fetch(url);
    const commit = await response.json();
    return commit;
};

