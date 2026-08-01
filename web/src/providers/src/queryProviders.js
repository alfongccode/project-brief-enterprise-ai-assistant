function make_query(data) {
    return fetch('/api/query', {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export {
    make_query
}