/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions } from 'n8n-workflow';
import { leanplumRequest, leanplumRequestAllItems, toUnixTimestamp, parseJson } from '../../transport/GenericFunctions';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'create': {
			const name = this.getNodeParameter('name', index) as string;
			const messageType = this.getNodeParameter('messageType', index) as string;

			const body: any = {
				name,
				messageType,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.action) body.action = parseJson(additionalFields.action);
			if (additionalFields.whenTrigger) body.whenTrigger = parseJson(additionalFields.whenTrigger);
			if (additionalFields.whenLimit) body.whenLimit = parseJson(additionalFields.whenLimit);
			if (additionalFields.startTime) body.startTime = toUnixTimestamp(additionalFields.startTime);
			if (additionalFields.endTime) body.endTime = toUnixTimestamp(additionalFields.endTime);
			if (additionalFields.active !== undefined) body.active = additionalFields.active;
			if (additionalFields.targeting) body.targeting = parseJson(additionalFields.targeting);

			responseData = await leanplumRequest.call(this, 'createMessage', body);
			break;
		}

		case 'get': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'getMessage', { messageId });
			break;
		}

		case 'getMany': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = {};

			const filters = this.getNodeParameter('filters', index, {}) as any;
			if (filters.messageType) body.messageType = filters.messageType;
			if (filters.status) body.status = filters.status;
			if (filters.archived !== undefined) body.archived = filters.archived;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getMessages', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getMessages', body, limit);
			}
			break;
		}

		case 'update': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.action) body.action = parseJson(updateFields.action);
			if (updateFields.whenTrigger) body.whenTrigger = parseJson(updateFields.whenTrigger);
			if (updateFields.whenLimit) body.whenLimit = parseJson(updateFields.whenLimit);
			if (updateFields.startTime) body.startTime = toUnixTimestamp(updateFields.startTime);
			if (updateFields.endTime) body.endTime = toUnixTimestamp(updateFields.endTime);
			if (updateFields.active !== undefined) body.active = updateFields.active;
			if (updateFields.targeting) body.targeting = parseJson(updateFields.targeting);

			responseData = await leanplumRequest.call(this, 'editMessage', body);
			break;
		}

		case 'delete': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'deleteMessage', { messageId });
			break;
		}

		case 'duplicate': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.newName) body.newName = additionalFields.newName;

			responseData = await leanplumRequest.call(this, 'duplicateMessage', body);
			break;
		}

		case 'archive': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'archiveMessage', { messageId });
			break;
		}

		case 'unarchive': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'unarchiveMessage', { messageId });
			break;
		}

		case 'getStats': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.granularity) body.granularity = options.granularity;

			responseData = await leanplumRequest.call(this, 'getMessageStats', body);
			break;
		}

		case 'pause': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'pauseMessage', { messageId });
			break;
		}

		case 'resume': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'resumeMessage', { messageId });
			break;
		}

		case 'schedule': {
			const messageId = this.getNodeParameter('messageId', index) as number;
			const deliveryTime = this.getNodeParameter('deliveryTime', index) as string;

			const body: any = {
				messageId,
				deliveryTime: toUnixTimestamp(deliveryTime),
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.localTime !== undefined) body.localTime = additionalFields.localTime;
			if (additionalFields.timezone) body.timezone = additionalFields.timezone;

			responseData = await leanplumRequest.call(this, 'scheduleMessage', body);
			break;
		}

		case 'sendNow': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'sendMessage', { messageId });
			break;
		}

		case 'getVariants': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'getMessageVariants', { messageId });
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
