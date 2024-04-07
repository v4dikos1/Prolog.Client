import { OrderContent } from './orderContent'
import {
	Order as OrderType,
	Client as ClientType,
	Cargo as CargoType,
	StatusEnum,
	IncomingOrders,
	IncomingOrdersGroupByDate,
	ActiveOrders,
	ActiveOrdersGroupByDate,
	ActiveOrdersGroupByDriver,
	CompletedOrders,
} from './model'
import { IncomingOrdersFromAPI, ActiveOrdersFromAPI, CompletedOrdersFromAPI } from './apiModel'
import {
	transformOrdersFromAPIToIncoming,
	transformOrdersFromAPIToActive,
	transformOrdersFromAPIToCompleted,
	toggleOrderInIncomingOrders,
	toggleOrderInActiveOrders,
	toggleOrderInCompletedOrders,
} from './helpers'

export {
	OrderContent,
	transformOrdersFromAPIToIncoming,
	transformOrdersFromAPIToActive,
	transformOrdersFromAPIToCompleted,
	toggleOrderInIncomingOrders,
	toggleOrderInActiveOrders,
	toggleOrderInCompletedOrders,
	StatusEnum,
}

export type {
	OrderType,
	ClientType,
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
}
