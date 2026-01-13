/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { leanplumRequest, toUnixTimestamp } from '../../transport/GenericFunctions';

function buildAttributesFromInput(attributes: IDataObject): IDataObject {
	const result: IDataObject = {};
	if (attributes.attribute && Array.isArray(attributes.attribute)) {
		for (const attr of attributes.attribute as Array<{ key: string; value: string }>) {
			if (attr.key) {
				result[attr.key] = attr.value;
			}
		}
	}
	return result;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'setUserAttributes': {
			const userId = this.getNodeParameter('userId', index) as string;
			const attributes = this.getNodeParameter('attributes', index, {}) as IDataObject;

			const body: any = {
				userId,
				userAttributes: buildAttributesFromInput(attributes),
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;
			if (additionalFields.createDisposition) body.createDisposition = additionalFields.createDisposition;

			responseData = await leanplumRequest.call(this, 'setUserAttributes', body);
			break;
		}

		case 'getUserAttributes': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'getUserAttributes', body);
			break;
		}

		case 'advanceState': {
			const userId = this.getNodeParameter('userId', index) as string;
			const state = this.getNodeParameter('state', index) as string;

			const body: any = { userId, state };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;
			if (additionalFields.info) body.info = additionalFields.info;
			if (additionalFields.params) body.params = JSON.parse(additionalFields.params);

			responseData = await leanplumRequest.call(this, 'advance', body);
			break;
		}

		case 'track': {
			const userId = this.getNodeParameter('userId', index) as string;
			const event = this.getNodeParameter('event', index) as string;

			const body: any = { userId, event };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;
			if (additionalFields.value !== undefined) body.value = additionalFields.value;
			if (additionalFields.info) body.info = additionalFields.info;
			if (additionalFields.time) body.time = toUnixTimestamp(additionalFields.time);
			if (additionalFields.params) body.params = JSON.parse(additionalFields.params);

			responseData = await leanplumRequest.call(this, 'track', body);
			break;
		}

		case 'trackPurchase': {
			const userId = this.getNodeParameter('userId', index) as string;
			const event = this.getNodeParameter('event', index) as string;
			const value = this.getNodeParameter('value', index) as number;
			const currencyCode = this.getNodeParameter('currencyCode', index) as string;

			const body: any = {
				userId,
				event,
				value,
				currencyCode,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;
			if (additionalFields.info) body.info = additionalFields.info;
			if (additionalFields.time) body.time = toUnixTimestamp(additionalFields.time);
			if (additionalFields.params) body.params = JSON.parse(additionalFields.params);

			responseData = await leanplumRequest.call(this, 'track', body);
			break;
		}

		case 'incrementUserAttribute': {
			const userId = this.getNodeParameter('userId', index) as string;
			const attributeName = this.getNodeParameter('attributeName', index) as string;
			const incrementValue = this.getNodeParameter('incrementValue', index) as number;

			const body: any = {
				userId,
				userAttributes: {
					[attributeName]: { __op: 'increment', amount: incrementValue },
				},
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'setUserAttributes', body);
			break;
		}

		case 'deleteUser': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.fullErasure !== undefined) body.fullErasure = additionalFields.fullErasure;

			responseData = await leanplumRequest.call(this, 'deleteUser', body);
			break;
		}

		case 'getUser': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'getUser', body);
			break;
		}

		case 'pauseSession': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'pauseSession', body);
			break;
		}

		case 'resumeSession': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'resumeSession', body);
			break;
		}

		case 'setDeviceAttributes': {
			const userId = this.getNodeParameter('userId', index) as string;
			const deviceId = this.getNodeParameter('deviceId', index) as string;
			const attributes = this.getNodeParameter('deviceAttributes', index, {}) as IDataObject;

			const body: any = {
				userId,
				deviceId,
				deviceAttributes: buildAttributesFromInput(attributes),
			};

			responseData = await leanplumRequest.call(this, 'setDeviceAttributes', body);
			break;
		}

		case 'unsetUserAttribute': {
			const userId = this.getNodeParameter('userId', index) as string;
			const attributeName = this.getNodeParameter('attributeName', index) as string;

			const body: any = {
				userId,
				userAttributes: {
					[attributeName]: null,
				},
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'setUserAttributes', body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
