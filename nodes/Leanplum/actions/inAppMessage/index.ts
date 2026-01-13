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
			const layout = this.getNodeParameter('layout', index) as string;

			const body: any = {
				name,
				layout,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.title) body.title = additionalFields.title;
			if (additionalFields.body) body.body = additionalFields.body;
			if (additionalFields.htmlContent) body.htmlContent = additionalFields.htmlContent;
			if (additionalFields.imageUrl) body.imageUrl = additionalFields.imageUrl;
			if (additionalFields.acceptButton) body.acceptButton = parseJson(additionalFields.acceptButton);
			if (additionalFields.dismissButton) body.dismissButton = parseJson(additionalFields.dismissButton);
			if (additionalFields.backgroundColor) body.backgroundColor = additionalFields.backgroundColor;
			if (additionalFields.textColor) body.textColor = additionalFields.textColor;
			if (additionalFields.triggerEvent) body.triggerEvent = additionalFields.triggerEvent;
			if (additionalFields.displayLimit !== undefined) body.displayLimit = additionalFields.displayLimit;
			if (additionalFields.displayFrequency) body.displayFrequency = additionalFields.displayFrequency;

			responseData = await leanplumRequest.call(this, 'createInAppMessage', body);
			break;
		}

		case 'get': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'getInAppMessage', { messageId });
			break;
		}

		case 'getMany': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = {};

			const filters = this.getNodeParameter('filters', index, {}) as any;
			if (filters.layout) body.layout = filters.layout;
			if (filters.status) body.status = filters.status;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getInAppMessages', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getInAppMessages', body, limit);
			}
			break;
		}

		case 'update': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.layout) body.layout = updateFields.layout;
			if (updateFields.title) body.title = updateFields.title;
			if (updateFields.bodyText) body.body = updateFields.bodyText;
			if (updateFields.htmlContent) body.htmlContent = updateFields.htmlContent;
			if (updateFields.imageUrl) body.imageUrl = updateFields.imageUrl;
			if (updateFields.acceptButton) body.acceptButton = parseJson(updateFields.acceptButton);
			if (updateFields.dismissButton) body.dismissButton = parseJson(updateFields.dismissButton);
			if (updateFields.backgroundColor) body.backgroundColor = updateFields.backgroundColor;
			if (updateFields.textColor) body.textColor = updateFields.textColor;
			if (updateFields.triggerEvent) body.triggerEvent = updateFields.triggerEvent;
			if (updateFields.displayLimit !== undefined) body.displayLimit = updateFields.displayLimit;
			if (updateFields.displayFrequency) body.displayFrequency = updateFields.displayFrequency;

			responseData = await leanplumRequest.call(this, 'editInAppMessage', body);
			break;
		}

		case 'delete': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'deleteInAppMessage', { messageId });
			break;
		}

		case 'preview': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.platform) body.platform = options.platform;
			if (options.deviceModel) body.deviceModel = options.deviceModel;

			responseData = await leanplumRequest.call(this, 'previewInAppMessage', body);
			break;
		}

		case 'getStats': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.granularity) body.granularity = options.granularity;

			responseData = await leanplumRequest.call(this, 'getInAppMessageStats', body);
			break;
		}

		case 'duplicate': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			const body: any = { messageId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.newName) body.newName = additionalFields.newName;

			responseData = await leanplumRequest.call(this, 'duplicateInAppMessage', body);
			break;
		}

		case 'activate': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'activateInAppMessage', { messageId });
			break;
		}

		case 'deactivate': {
			const messageId = this.getNodeParameter('messageId', index) as number;

			responseData = await leanplumRequest.call(this, 'deactivateInAppMessage', { messageId });
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
