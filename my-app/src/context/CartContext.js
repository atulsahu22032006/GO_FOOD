import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "gofoodCart";

const buildCartItemId = (foodId, size) => `${foodId}-${size}`;

const readStoredCart = () => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(readStoredCart);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = useCallback((foodItem, qty, size, pricePerUnit) => {
        const foodId = foodItem._id || foodItem.name;
        const id = buildCartItemId(foodId, size);

        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === id);

            if (existing) {
                return prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              qty: item.qty + qty,
                              totalPrice: (item.qty + qty) * item.pricePerUnit,
                          }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id,
                    foodId,
                    name: foodItem.name,
                    img: foodItem.img,
                    category: foodItem.CategoryName,
                    size,
                    qty,
                    pricePerUnit,
                    totalPrice: qty * pricePerUnit,
                },
            ];
        });
    }, []);

    const removeFromCart = useCallback((id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateCartQty = useCallback((id, qty) => {
        if (qty < 1) {
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          qty,
                          totalPrice: qty * item.pricePerUnit,
                      }
                    : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const cartCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.qty, 0),
        [cartItems]
    );

    const cartTotal = useMemo(
        () => cartItems.reduce((total, item) => total + item.totalPrice, 0),
        [cartItems]
    );

    const value = {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}
