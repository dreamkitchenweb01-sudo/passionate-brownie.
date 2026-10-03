// SAMPLE orders for the Phase 1 Track Order demo. Phase 2 reads real orders from Supabase.
export const ORDER_STATUSES = ['received', 'confirmed', 'preparing', 'out_for_delivery', 'delivered']

export const mockOrders = [
  { id: 'PB-0101', phone: '9876543210', status: 'preparing', daysFromNow: 2 },
  { id: 'PB-0102', phone: '9876543210', status: 'out_for_delivery', daysFromNow: 0 },
]
