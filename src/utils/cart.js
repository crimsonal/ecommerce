export function productExistsInCart(productId, cart,) {
    for (const cartItem of cart) {
        if (cartItem.productId === productId) {
            return cartItem;
        }
    }
    return null;
}

export function getCartSize(cart) {
    let size = 0
    for (const cartItem of cart) {
        size+=cartItem.qty
    }
    return size
}

export function incrementProductInCart(productId, cart, setCart) {
    setCart(prev =>
        prev.map(item =>
            item.productId === productId
            ? { ...item, qty: item.qty + 1 } : item)
    );
}

export function addProductToCart(productId, obj, cart, setCart) {
    const newProduct = {
        productId: productId, 
        qty: 1,
        ...obj
    }
    setCart([...cart, newProduct])
}