export enum OrderState {
  PENDING,
  CONFIRMED,
  PREPARED,
	ON_THE_WAY,
	DELIVERED,
	CANCELLED
}

export const ORDER_STATE_DICTIONARY = {
  0: 'Pendiente',
  1: 'Confirmado',
  2: 'Preparado',
  3: 'En camino',
  4: 'Entregado',
  5: 'Cancelado'
}
