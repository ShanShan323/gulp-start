export async function getApi (url) {
    const response = await fetch(url);
    const commit = await response.json();
    return commit;
};

export async function createOrder (url, data) { 
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

