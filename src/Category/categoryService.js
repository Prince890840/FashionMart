const KEYS = {
    categories: 'categories',
    categoryId: 'categoryId'
}

export function insertCategory(data) {
    let categories = getAllCategories();
    data['id'] = generateCategoryId()
    categories.push(data)
    localStorage.setItem(KEYS.categories, JSON.stringify(categories))
}

export function updateCategory(data) {
    let categories = getAllCategories();
    let recordIndex = categories.findIndex(x => x.id == data.id);
    categories[recordIndex] = { ...data }
    localStorage.setItem(KEYS.categories, JSON.stringify(categories));
}

export function deleteCategory(id) {
    let categories = getAllCategories();
    categories = categories.filter(x => x.id != id)
    localStorage.setItem(KEYS.categories, JSON.stringify(categories));
}

export function generateCategoryId() {
    if (localStorage.getItem(KEYS.categoryId) == null)
        localStorage.setItem(KEYS.categoryId, '0')
    var id = parseInt(localStorage.getItem(KEYS.categoryId))
    localStorage.setItem(KEYS.categoryId, (++id).toString())
    return id;
}

export function getAllCategories() {
    if (localStorage.getItem(KEYS.categories) == null)
        localStorage.setItem(KEYS.categories, JSON.stringify([]))
}