/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions } from 'n8n-workflow';
import { leanplumRequest, leanplumRequestAllItems, toUnixTimestamp, parseJson, buildPushOptions } from '../../transport/GenericFunctions';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'send': {
			const message = this.getNodeParameter('message', index) as string;
			const targeting = this.getNodeParameter('targeting', index) as string;

			const body: any = {
				message,
			};

			if (targeting === 'userId') {
				body.userId = this.getNodeParameter('userId', index) as string;
			} else if (targeting === 'users') {
				const users = this.getNodeParameter('users', index) as string;
				body.users = users.split(',').map((u: string) => u.trim());
			} else if (targeting === 'segment') {
				body.segment = this.getNodeParameter('segment', index) as string;
			}

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.data) body.data = parseJson(additionalFields.data);
			if (additionalFields.sound) body.sound = additionalFields.sound;
			if (additionalFields.badge !== undefined) body.badge = additionalFields.badge;
			if (additionalFields.category) body.category = additionalFields.category;
			if (additionalFields.expirationTime) body.expirationTime = toUnixTimestamp(additionalFields.expirationTime);

			// Platform-specific options
			const pushOptions = buildPushOptions(additionalFields);
			if (pushOptions.iosOptions) body.iosOptions = pushOptions.iosOptions;
			if (pushOptions.androidOptions) body.androidOptions = pushOptions.androidOptions;
			if (pushOptions.webOptions) body.webOptions = pushOptions.webOptions;

			responseData = await leanplumRequest.call(this, 'sendPush', body);
			break;
		}

		case 'sendToUser': {
			const userId = this.getNodeParameter('userId', index) as string;
			const message = this.getNodeParameter('message', index) as string;

			const body: any = {
				userId,
				message,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.data) body.data = parseJson(additionalFields.data);
			if (additionalFields.sound) body.sound = additionalFields.sound;
			if (additionalFields.badge !== undefined) body.badge = additionalFields.badge;

			const pushOptions = buildPushOptions(additionalFields);
			if (pushOptions.iosOptions) body.iosOptions = pushOptions.iosOptions;
			if (pushOptions.androidOptions) body.androidOptions = pushOptions.androidOptions;

			responseData = await leanplumRequest.call(this, 'sendPushToUser', body);
			break;
		}

		case 'sendToSegment': {
			const segment = this.getNodeParameter('segment', index) as string;
			const message = this.getNodeParameter('message', index) as string;

			const body: any = {
				segment,
				message,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.data) body.data = parseJson(additionalFields.data);
			if (additionalFields.sound) body.sound = additionalFields.sound;

			const pushOptions = buildPushOptions(additionalFields);
			if (pushOptions.iosOptions) body.iosOptions = pushOptions.iosOptions;
			if (pushOptions.androidOptions) body.androidOptions = pushOptions.androidOptions;

			responseData = await leanplumRequest.call(this, 'sendPushToSegment', body);
			break;
		}

		case 'schedule': {
			const message = this.getNodeParameter('message', index) as string;
			const deliveryTime = this.getNodeParameter('deliveryTime', index) as string;

			const body: any = {
				message,
				deliveryTime: toUnixTimestamp(deliveryTime),
			};

			const targeting = this.getNodeParameter('targeting', index) as string;
			if (targeting === 'userId') {
				body.userId = this.getNodeParameter('userId', index) as string;
			} else if (targeting === 'segment') {
				body.segment = this.getNodeParameter('segment', index) as string;
			}

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.data) body.data = parseJson(additionalFields.data);
			if (additionalFields.localTime !== undefined) body.localTime = additionalFields.localTime;
			if (additionalFields.timezone) body.timezone = additionalFields.timezone;

			responseData = await leanplumRequest.call(this, 'schedulePush', body);
			break;
		}

		case 'cancel': {
			const pushId = this.getNodeParameter('pushId', index) as string;

			responseData = await leanplumRequest.call(this, 'cancelPush', { pushId });
			break;
		}

		case 'getDeliveryStats': {
			const pushId = this.getNodeParameter('pushId', index) as string;

			const body: any = { pushId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.includeDetails !== undefined) body.includeDetails = options.includeDetails;

			responseData = await leanplumRequest.call(this, 'getPushDeliveryStats', body);
			break;
		}

		case 'createTemplate': {
			const name = this.getNodeParameter('name', index) as string;
			const message = this.getNodeParameter('message', index) as string;

			const body: any = {
				name,
				message,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.data) body.data = parseJson(additionalFields.data);
			if (additionalFields.sound) body.sound = additionalFields.sound;
			if (additionalFields.badge !== undefined) body.badge = additionalFields.badge;
			if (additionalFields.category) body.category = additionalFields.category;

			responseData = await leanplumRequest.call(this, 'createPushTemplate', body);
			break;
		}

		case 'getTemplates': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getPushTemplates', {});
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getPushTemplates', {}, limit);
			}
			break;
		}

		case 'updateTemplate': {
			const templateId = this.getNodeParameter('templateId', index) as string;

			const body: any = { templateId };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.message) body.message = updateFields.message;
			if (updateFields.title) body.title = updateFields.title;
			if (updateFields.data) body.data = parseJson(updateFields.data);
			if (updateFields.sound) body.sound = updateFields.sound;
			if (updateFields.badge !== undefined) body.badge = updateFields.badge;

			responseData = await leanplumRequest.call(this, 'updatePushTemplate', body);
			break;
		}

		case 'deleteTemplate': {
			const templateId = this.getNodeParameter('templateId', index) as string;

			responseData = await leanplumRequest.call(this, 'deletePushTemplate', { templateId });
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
