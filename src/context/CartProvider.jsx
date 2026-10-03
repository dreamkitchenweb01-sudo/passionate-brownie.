import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'pb_cart'
const MAX_QTY = 99
const CartContext = createContext(null)

function readCart() {
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(v) ? v.filter((i) => i && i.lineId && i.qty > 0) : []
  } catch {
    return []
  }
}

const clampQty = (q) => Math.max(1, Math.min(MAX_QTY, Math.round(q) || 1))

// A box with the same flavours merges into one line; different flavours get their own line.
const lineIdFor = (product, contents) =>
  contents?.length
    ? `${product.id}:${contents.map((c) => `${c.productId}x${c.qty}`).sort().join(',')}`
    : product.id

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  // contents (boxes only): [{ productId, name: {en, ta}, qty }]
  const add = useCallback((product, qty = 1, contents) => {
    const lineId = lineIdFor(product, contents)
    setItems((prev) => {
      if (prev.some((i) => i.lineId === lineId)) return prev.map((i) => (i.lineId === lineId ? { ...i, qty: clampQty(i.qty + qty) } : i))
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          unit: product.unit,
          piecesPerUnit: product.pieces || 1,
          contents: contents || null,
          qty: clampQty(qty),
        },
      ]
    })
  }, [])
  const setQty = useCallback((lineId, qty) => {
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, qty: clampQty(qty) } : i)))
  }, [])
  const remove = useCallback((lineId) => setItems((prev) => prev.filter((i) => i.lineId !== lineId)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const pieces = items.reduce((s, i) => s + i.qty * (i.piecesPerUnit || 1), 0)
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    return { items, pieces, subtotal, add, setQty, remove, clear, maxQty: MAX_QTY }
  }, [items, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
