// this function is used to standardize "shelf" field from api to shelf name 
export function standardizeName(name) {
    return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([A-Z])/g, ' $1').trim()
}