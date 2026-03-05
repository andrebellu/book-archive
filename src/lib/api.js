/**
 * @typedef {Object} Book
 * @property {number} id
 * @property {string} title
 * @property {number} author_id
 * @property {string} [cover]
 * @property {string} [publisher]
 * @property {string} [genre]
 * @property {string} [shelf]
 * @property {string} [short_description]
 * @property {'unread' | 'reading' | 'read' | 'wishlist'} reading_status
 * @property {boolean} [is_borrowed]
 */

/**
 * @typedef {Object} BookFilter
 * @property {string} [search]
 * @property {string} [sort]
 * @property {string} [status]
 */

export const api = {
    books: {
        /**
         * Fetch books with optional filters
         * @param {BookFilter} [filters]
         * @returns {Promise<Book[]>}
         */
        getAll: async (filters = {}) => {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.sort) params.append('sort', filters.sort);
            if (filters.status) params.append('status', filters.status);

            const res = await fetch(`/api/books?${params.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch books');
            return res.json();
        },

        /**
         * Update a book
         * @param {number} id
         * @param {Partial<Book>} data
         * @returns {Promise<void>}
         */
        update: async (id, data) => {
            const res = await fetch('/api/books/edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data })
            });
            if (!res.ok) throw new Error('Failed to update book');
        }
    }
};
