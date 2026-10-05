function slugify(name) {
    return name
        .toLowerCase()          // step 1
        .trim()                 // step 2
        .replace(/\s+/g, '-')   // step 3
        .replace(/[^a-z0-9-]/g, '')  // step 4
        .replace(/-+/g, '-')    // step 5
        .replace(/^-|-$/g, '')  // step 6
}

function isInvalidSlug(slug) {
    return !slug
}

module.exports = {slugify, isInvalidSlug}