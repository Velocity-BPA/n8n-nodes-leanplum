/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { leanplumRequest, leanplumMultiRequest, leanplumRequestAllItems, leanplumExportRequest, toUnixTimestamp, parseJson } from '../../transport/GenericFunctions';

function buildParamsFromInput(params: IDataObject): IDataObject {
	const result: IDataObject = {};
	if (params.param && Array.isArray(params.param)) {
		for (const p of params.param as Array<{ key: string; value: string }>) {
			if (p.key) {
				result[p.key] = p.value;
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
		case 'track': {
			const userId = this.getNodeParameter('userId', index) as string;
			const event = this.getNodeParameter('event', index) as string;

			const body: any = {
				userId,
				event,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;
			if (additionalFields.value !== undefined) body.value = additionalFields.value;
			if (additionalFields.info) body.info = additionalFields.info;
			if (additionalFields.time) body.time = toUnixTimestamp(additionalFields.time);

			// Build event params from UI if provided
			if (additionalFields.eventParams) {
				body.params = buildParamsFromInput(additionalFields.eventParams as IDataObject);
			}

			responseData = await leanplumRequest.call(this, 'track', body);
			break;
		}

		case 'trackBatch': {
			const events = this.getNodeParameter('events', index, {}) as {
				event?: Array<{
					userId: string;
					eventName: string;
					deviceId?: string;
					value?: number;
					info?: string;
					time?: string;
					params?: string;
				}>;
			};

			if (!events.event || events.event.length === 0) {
				throw new Error('At least one event is required for batch tracking');
			}

			const actions = events.event.map((e) => {
				const action: any = {
					action: 'track',
					userId: e.userId,
					event: e.eventName,
				};
				if (e.deviceId) action.deviceId = e.deviceId;
				if (e.value !== undefined) action.value = e.value;
				if (e.info) action.info = e.info;
				if (e.time) action.time = toUnixTimestamp(e.time);
				if (e.params) action.params = parseJson(e.params);
				return action;
			});

			responseData = await leanplumMultiRequest.call(this, actions);
			break;
		}

		case 'getEvents': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getEvents', {});
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getEvents', {}, limit);
			}
			break;
		}

		case 'getEventProperties': {
			const event = this.getNodeParameter('event', index) as string;

			responseData = await leanplumRequest.call(this, 'getEventProperties', { event });
			break;
		}

		case 'getEventCounts': {
			const event = this.getNodeParameter('event', index) as string;

			const body: any = { event };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.granularity) body.granularity = options.granularity;

			responseData = await leanplumRequest.call(this, 'getEventCounts', body);
			break;
		}

		case 'createEvent': {
			const eventName = this.getNodeParameter('eventName', index) as string;

			const body: any = { event: eventName };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.description) body.description = additionalFields.description;

			// Build properties schema if provided
			if (additionalFields.properties?.property) {
				body.properties = additionalFields.properties.property.map((p: { name: string; type: string }) => ({
					name: p.name,
					type: p.type,
				}));
			}

			responseData = await leanplumRequest.call(this, 'createEvent', body);
			break;
		}

		case 'updateEvent': {
			const event = this.getNodeParameter('event', index) as string;

			const body: any = { event };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.description) body.description = updateFields.description;

			if (updateFields.properties?.property) {
				body.properties = updateFields.properties.property.map((p: { name: string; type: string }) => ({
					name: p.name,
					type: p.type,
				}));
			}

			responseData = await leanplumRequest.call(this, 'updateEvent', body);
			break;
		}

		case 'deleteEvent': {
			const event = this.getNodeParameter('event', index) as string;

			responseData = await leanplumRequest.call(this, 'deleteEvent', { event });
			break;
		}

		case 'exportEvents': {
			const body: any = {
				exportType: 'events',
			};

			const exportOptions = this.getNodeParameter('exportOptions', index, {}) as any;
			if (exportOptions.startDate) body.startDate = toUnixTimestamp(exportOptions.startDate);
			if (exportOptions.endDate) body.endDate = toUnixTimestamp(exportOptions.endDate);
			if (exportOptions.eventName) body.eventName = exportOptions.eventName;
			if (exportOptions.format) body.format = exportOptions.format;
			if (exportOptions.s3BucketName) body.s3BucketName = exportOptions.s3BucketName;
			if (exportOptions.s3AccessKey) body.s3AccessKey = exportOptions.s3AccessKey;
			if (exportOptions.s3SecretKey) body.s3SecretKey = exportOptions.s3SecretKey;
			if (exportOptions.gcsBucket) body.gcsBucket = exportOptions.gcsBucket;
			if (exportOptions.gcsCredentials) body.gcsCredentials = parseJson(exportOptions.gcsCredentials);

			responseData = await leanplumExportRequest.call(this, 'exportData', body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
