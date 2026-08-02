import { post } from './http.js';

function make_query(query, { signal } = {}) {
    return post('/api/query',
        { query },
        { signal }
    )
}

export {
    make_query
};