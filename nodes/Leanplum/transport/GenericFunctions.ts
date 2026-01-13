/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import type { ILeanplumCredentials, ILeanplumApiResponse, ILeanplumResponseItem } from '../types/LeanplumTypes';

const BASE_URL = 'https://api.leanplum.com/api';
const API_VERSION = '1.0.6';

/**
 * Get the appropriate API key based on environment and operation type
 */
function getApiKey(credentials: ILeanplumCredentials, useExportKey = false): string {
	if (useExportKey && credentials.dataExportKey) {
		return credentials.dataExportKey;
	}
	return credentials.environment === 'production'
		? credentials.productionKey
		: (credentials.developmentKey || credentials.productionKey);
}

/**
 * Make a single action request to the Leanplum API
 */
export async function leanplumRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	action: string,
	body?: IDataObject,
	useExportKey = false,
): Promise<ILeanplumResponseItem> {
	const credentials = await this.getCredentials('leanplumApi') as ILeanplumCredentials;
	const apiKey = getApiKey(credentials, useExportKey);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: BASE_URL,
		qs: {
			appId: credentials.appId,
			clientKey: apiKey,
			apiVersion: API_VERSION,
			action,
		},
		body: body || {},
		json: true,
	};

	try {
		const response = await this.helpers.request(options) as ILeanplumApiResponse;

		if (!response.response || response.response.length === 0) {
			throw new NodeApiError(this.getNode(), { message: 'Empty response from Leanplum API' } as JsonObject);
		}

		const result = response.response[0];

		if (!result.success) {
			const errorMessage = result.error?.message || 'Unknown error occurred';
			throw new NodeApiError(this.getNode(), {
				message: `Leanplum API Error: ${errorMessage}`,
			} as JsonObject);
		}

		// Log warning if present
		if (result.warning?.message) {
			console.warn(`Leanplum Warning: ${result.warning.message}`);
		}

		return result;
	} catch (error) {
		if (error instanceof NodeApiError) {
			throw error;
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make a multi-action request to the Leanplum API
 */
export async function leanplumMultiRequest(
	this: IExecuteFunctions,
	actions: Array<{ action: string; [key: string]: unknown }>,
): Promise<ILeanplumResponseItem[]> {
	const credentials = await this.getCredentials('leanplumApi') as ILeanplumCredentials;
	const apiKey = getApiKey(credentials);

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: BASE_URL,
		qs: {
			appId: credentials.appId,
			clientKey: apiKey,
			apiVersion: API_VERSION,
		},
		body: {
			data: actions,
		},
		json: true,
	};

	try {
		const response = await this.helpers.request(options) as ILeanplumApiResponse;

		if (!response.response) {
			throw new NodeApiError(this.getNode(), { message: 'Empty response from Leanplum API' } as JsonObject);
		}

		return response.response;
	} catch (error) {
		if (error instanceof NodeApiError) {
			throw error;
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make a request specifically for data export operations
 */
export async function leanplumExportRequest(
	this: IExecuteFunctions,
	action: string,
	body?: IDataObject,
): Promise<ILeanplumResponseItem> {
	return leanplumRequest.call(this, action, body, true);
}

/**
 * Get all items with pagination support
 */
export async function leanplumRequestAllItems(
	this: IExecuteFunctions,
	action: string,
	body?: IDataObject,
	limitOrItemsKey?: number | string,
	maybeLimit?: number,
): Promise<IDataObject[]> {
	// Handle flexible parameters: limit can be 3rd or 4th arg
	let itemsKey: string | undefined;
	let limit: number | undefined;
	
	if (typeof limitOrItemsKey === 'number') {
		limit = limitOrItemsKey;
	} else if (typeof limitOrItemsKey === 'string') {
		itemsKey = limitOrItemsKey;
		limit = maybeLimit;
	}

	const results: IDataObject[] = [];
	let offset = 0;
	const pageSize = 50;

	while (true) {
		const response = await leanplumRequest.call(this, action, {
			...body,
			offset,
			limit: pageSize,
		});

		// Try to find items in response using common keys or provided key
		let items: IDataObject[] = [];
		if (itemsKey && response[itemsKey]) {
			items = response[itemsKey] as IDataObject[];
		} else {
			// Try common response keys
			const possibleKeys = ['messages', 'segments', 'campaigns', 'events', 'users', 'abTests', 'items', 'results'];
			for (const key of possibleKeys) {
				if (response[key] && Array.isArray(response[key])) {
					items = response[key] as IDataObject[];
					break;
				}
			}
		}

		if (items.length === 0) break;

		results.push(...items);

		if (limit && results.length >= limit) {
			return results.slice(0, limit);
		}

		if (items.length < pageSize) break;

		offset += pageSize;
	}

	return results;
}

/**
 * Poll for export job completion
 */
export async function pollExportJob(
	this: IExecuteFunctions,
	jobId: string,
	maxAttempts = 60,
	pollInterval = 5000,
): Promise<ILeanplumResponseItem> {
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const response = await leanplumExportRequest.call(this, 'getExportJobStatus', { jobId });

		const status = response.state as string;
		if (status === 'FINISHED' || status === 'completed') {
			return response;
		}

		if (status === 'FAILED' || status === 'failed') {
			throw new NodeApiError(this.getNode(), {
				message: `Export job failed: ${response.error?.message || 'Unknown error'}`,
			} as JsonObject);
		}

		// Wait before next poll
		await new Promise((resolve) => setTimeout(resolve, pollInterval));
	}

	throw new NodeApiError(this.getNode(), {
		message: `Export job timed out after ${maxAttempts} attempts`,
	} as JsonObject);
}

/**
 * Build user attributes object from input
 */
export function buildUserAttributes(additionalFields: IDataObject): IDataObject {
	const attributes: IDataObject = {};

	if (additionalFields.userAttributes) {
		const userAttrs = additionalFields.userAttributes as IDataObject;
		if (userAttrs.attribute && Array.isArray(userAttrs.attribute)) {
			for (const attr of userAttrs.attribute as IDataObject[]) {
				if (attr.key && attr.value !== undefined) {
					attributes[attr.key as string] = attr.value;
				}
			}
		}
	}

	// Add standard fields if provided
	const standardFields = ['email', 'firstName', 'lastName', 'age', 'gender', 'city', 'region', 'country', 'locale', 'timezone'];
	for (const field of standardFields) {
		if (additionalFields[field] !== undefined) {
			attributes[field] = additionalFields[field];
		}
	}

	return attributes;
}

/**
 * Build event parameters object from input
 */
export function buildEventParams(additionalFields: IDataObject): IDataObject {
	const params: IDataObject = {};

	if (additionalFields.eventParams) {
		const eventParams = additionalFields.eventParams as IDataObject;
		if (eventParams.param && Array.isArray(eventParams.param)) {
			for (const param of eventParams.param as IDataObject[]) {
				if (param.key && param.value !== undefined) {
					params[param.key as string] = param.value;
				}
			}
		}
	}

	return params;
}

/**
 * Parse JSON safely
 */
export function parseJson(value: string | IDataObject): IDataObject {
	if (typeof value === 'string') {
		try {
			return JSON.parse(value) as IDataObject;
		} catch {
			return {};
		}
	}
	return value;
}

/**
 * Convert timestamp to Unix seconds
 */
export function toUnixTimestamp(dateInput: string | number | Date): number {
	if (typeof dateInput === 'number') {
		// If already a Unix timestamp (seconds or milliseconds)
		return dateInput > 1e12 ? Math.floor(dateInput / 1000) : dateInput;
	}
	const date = new Date(dateInput);
	return Math.floor(date.getTime() / 1000);
}

/**
 * Format filters for segment creation
 */
export function buildSegmentFilters(filters: IDataObject): IDataObject[] {
	const result: IDataObject[] = [];

	if (filters.attributeFilters) {
		const attrFilters = filters.attributeFilters as IDataObject;
		if (attrFilters.filter && Array.isArray(attrFilters.filter)) {
			for (const filter of attrFilters.filter as IDataObject[]) {
				result.push({
					type: 'attribute',
					attribute: filter.attribute,
					operator: filter.operator,
					value: filter.value,
				});
			}
		}
	}

	if (filters.behaviorFilters) {
		const behaviorFilters = filters.behaviorFilters as IDataObject;
		if (behaviorFilters.filter && Array.isArray(behaviorFilters.filter)) {
			for (const filter of behaviorFilters.filter as IDataObject[]) {
				result.push({
					type: 'behavior',
					event: filter.event,
					operator: filter.operator,
					value: filter.value,
					timeRange: filter.timeRange,
				});
			}
		}
	}

	if (filters.eventFilters) {
		const eventFilters = filters.eventFilters as IDataObject;
		if (eventFilters.filter && Array.isArray(eventFilters.filter)) {
			for (const filter of eventFilters.filter as IDataObject[]) {
				result.push({
					type: 'event',
					eventName: filter.eventName,
					operator: filter.operator,
					count: filter.count,
				});
			}
		}
	}

	return result;
}

/**
 * Build A/B test variants array
 */
export function buildAbTestVariants(variants: IDataObject): IDataObject[] {
	const result: IDataObject[] = [];

	if (variants.variant && Array.isArray(variants.variant)) {
		for (const variant of variants.variant as IDataObject[]) {
			result.push({
				name: variant.name,
				weight: variant.weight,
				variables: variant.variables ? parseJson(variant.variables as string | IDataObject) : {},
			});
		}
	}

	return result;
}

/**
 * Validate push notification options
 */
export function buildPushOptions(additionalFields: IDataObject): IDataObject {
	const options: IDataObject = {};

	if (additionalFields.title) options.title = additionalFields.title;
	if (additionalFields.sound) options.sound = additionalFields.sound;
	if (additionalFields.badge !== undefined) options.badge = additionalFields.badge;
	if (additionalFields.category) options.category = additionalFields.category;
	if (additionalFields.data) options.data = parseJson(additionalFields.data as string | IDataObject);

	if (additionalFields.iosOptions) {
		options.iosOptions = parseJson(additionalFields.iosOptions as string | IDataObject);
	}

	if (additionalFields.androidOptions) {
		options.androidOptions = parseJson(additionalFields.androidOptions as string | IDataObject);
	}

	if (additionalFields.webOptions) {
		options.webOptions = parseJson(additionalFields.webOptions as string | IDataObject);
	}

	if (additionalFields.expirationTime) {
		options.expirationTime = toUnixTimestamp(additionalFields.expirationTime as string);
	}

	return options;
}
