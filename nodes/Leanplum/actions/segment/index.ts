/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions } from 'n8n-workflow';
import { leanplumRequest, leanplumRequestAllItems, leanplumExportRequest, parseJson, buildSegmentFilters } from '../../transport/GenericFunctions';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'create': {
			const name = this.getNodeParameter('name', index) as string;

			const body: any = { name };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.description) body.description = additionalFields.description;
			if (additionalFields.filters) body.filters = parseJson(additionalFields.filters);
			if (additionalFields.behaviorFilters) body.behaviorFilters = parseJson(additionalFields.behaviorFilters);
			if (additionalFields.attributeFilters) body.attributeFilters = parseJson(additionalFields.attributeFilters);
			if (additionalFields.eventFilters) body.eventFilters = parseJson(additionalFields.eventFilters);
			if (additionalFields.dateRange) body.dateRange = parseJson(additionalFields.dateRange);

			// Build filters from UI if provided
			const filterConfig = this.getNodeParameter('filterConfig', index, {}) as any;
			if (filterConfig.filter) {
				body.filters = buildSegmentFilters(filterConfig.filter);
			}

			responseData = await leanplumRequest.call(this, 'createSegment', body);
			break;
		}

		case 'get': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;

			responseData = await leanplumRequest.call(this, 'getSegment', { segmentId });
			break;
		}

		case 'getMany': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = {};

			const filters = this.getNodeParameter('filters', index, {}) as any;
			if (filters.type) body.type = filters.type;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getSegments', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getSegments', body, limit);
			}
			break;
		}

		case 'update': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;

			const body: any = { segmentId };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.description) body.description = updateFields.description;
			if (updateFields.filters) body.filters = parseJson(updateFields.filters);
			if (updateFields.behaviorFilters) body.behaviorFilters = parseJson(updateFields.behaviorFilters);
			if (updateFields.attributeFilters) body.attributeFilters = parseJson(updateFields.attributeFilters);
			if (updateFields.eventFilters) body.eventFilters = parseJson(updateFields.eventFilters);
			if (updateFields.dateRange) body.dateRange = parseJson(updateFields.dateRange);

			responseData = await leanplumRequest.call(this, 'editSegment', body);
			break;
		}

		case 'delete': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;

			responseData = await leanplumRequest.call(this, 'deleteSegment', { segmentId });
			break;
		}

		case 'getUsers': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = { segmentId };

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getSegmentUsers', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getSegmentUsers', body, limit);
			}
			break;
		}

		case 'getSize': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;

			responseData = await leanplumRequest.call(this, 'getSegmentSize', { segmentId });
			break;
		}

		case 'export': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;

			const body: any = { segmentId };

			const exportOptions = this.getNodeParameter('exportOptions', index, {}) as any;
			if (exportOptions.format) body.format = exportOptions.format;
			if (exportOptions.s3BucketName) body.s3BucketName = exportOptions.s3BucketName;
			if (exportOptions.s3AccessKey) body.s3AccessKey = exportOptions.s3AccessKey;
			if (exportOptions.s3SecretKey) body.s3SecretKey = exportOptions.s3SecretKey;
			if (exportOptions.gcsBucket) body.gcsBucket = exportOptions.gcsBucket;
			if (exportOptions.gcsCredentials) body.gcsCredentials = parseJson(exportOptions.gcsCredentials);
			if (exportOptions.includeAttributes !== undefined) body.includeAttributes = exportOptions.includeAttributes;

			responseData = await leanplumExportRequest.call(this, 'exportSegment', body);
			break;
		}

		case 'duplicate': {
			const segmentId = this.getNodeParameter('segmentId', index) as string;

			const body: any = { segmentId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.newName) body.newName = additionalFields.newName;

			responseData = await leanplumRequest.call(this, 'duplicateSegment', body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
