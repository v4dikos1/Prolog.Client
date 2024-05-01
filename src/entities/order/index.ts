import { OrderContent } from './orderContent'
import { IncomingOrdersFromAPI, ActiveOrdersFromAPI, CompletedOrdersFromAPI } from './apiModel'
import {
	Order as OrderType,
	Cargo as CargoType,
	StatusEnum,
	IncomingOrders,
	IncomingOrdersGroupByDate,
	ActiveOrders,
	ActiveOrdersGroupByDate,
	ActiveOrdersGroupByDriver,
	CompletedOrders,
	CompletedOrdersGroupByDate,
} from './model'
import {
	transformOrdersFromAPIToIncoming,
	transformOrdersFromAPIToActive,
	transformOrdersFromAPIToCompleted,
	toggleOrderInIncomingOrders,
	toggleOrderInActiveOrders,
	toggleOrderInCompletedOrders,
	filterActiveOrders,
	filterIncomingOrders,
	filterCompletedOrders,
	activeOrdersGroupByDateIsEmpty,
} from './helpers'

export {
	OrderContent,
	transformOrdersFromAPIToIncoming,
	transformOrdersFromAPIToActive,
	transformOrdersFromAPIToCompleted,
	toggleOrderInIncomingOrders,
	toggleOrderInActiveOrders,
	toggleOrderInCompletedOrders,
	filterActiveOrders,
	filterIncomingOrders,
	filterCompletedOrders,
	activeOrdersGroupByDateIsEmpty,
	StatusEnum,
}

export type {
	OrderType,
	CargoType,
	IncomingOrdersFromAPI,
	ActiveOrdersFromAPI,
	CompletedOrdersFromAPI,
	IncomingOrders,
	IncomingOrdersGroupByDate,
	CompletedOrders,
	ActiveOrders,
	ActiveOrdersGroupByDate,
	ActiveOrdersGroupByDriver,
	CompletedOrdersGroupByDate,
}
