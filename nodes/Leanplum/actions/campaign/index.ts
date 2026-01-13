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
			const campaignType = this.getNodeParameter('campaignType', index) as string;

			const body: any = {
				name,
				type: campaignType,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.description) body.description = additionalFields.description;
			if (additionalFields.startDate) body.startDate = toUnixTimestamp(additionalFields.startDate);
			if (additionalFields.endDate) body.endDate = toUnixTimestamp(additionalFields.endDate);
			if (additionalFields.goals) body.goals = parseJson(additionalFields.goals);
			if (additionalFields.segments) body.segments = parseJson(additionalFields.segments);
			if (additionalFields.exclusions) body.exclusions = parseJson(additionalFields.exclusions);

			responseData = await leanplumRequest.call(this, 'createCampaign', body);
			break;
		}

		case 'get': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			responseData = await leanplumRequest.call(this, 'getCampaign', { campaignId });
			break;
		}

		case 'getMany': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = {};

			const filters = this.getNodeParameter('filters', index, {}) as any;
			if (filters.type) body.type = filters.type;
			if (filters.status) body.status = filters.status;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getCampaigns', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getCampaigns', body, limit);
			}
			break;
		}

		case 'update': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			const body: any = { campaignId };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.description) body.description = updateFields.description;
			if (updateFields.startDate) body.startDate = toUnixTimestamp(updateFields.startDate);
			if (updateFields.endDate) body.endDate = toUnixTimestamp(updateFields.endDate);
			if (updateFields.goals) body.goals = parseJson(updateFields.goals);
			if (updateFields.segments) body.segments = parseJson(updateFields.segments);
			if (updateFields.exclusions) body.exclusions = parseJson(updateFields.exclusions);

			responseData = await leanplumRequest.call(this, 'editCampaign', body);
			break;
		}

		case 'delete': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			responseData = await leanplumRequest.call(this, 'deleteCampaign', { campaignId });
			break;
		}

		case 'start': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			responseData = await leanplumRequest.call(this, 'startCampaign', { campaignId });
			break;
		}

		case 'stop': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			responseData = await leanplumRequest.call(this, 'stopCampaign', { campaignId });
			break;
		}

		case 'pause': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			responseData = await leanplumRequest.call(this, 'pauseCampaign', { campaignId });
			break;
		}

		case 'getReport': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			const body: any = { campaignId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.granularity) body.granularity = options.granularity;

			responseData = await leanplumRequest.call(this, 'getCampaignReport', body);
			break;
		}

		case 'getConversions': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			const body: any = { campaignId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.goalId) body.goalId = options.goalId;

			responseData = await leanplumRequest.call(this, 'getCampaignConversions', body);
			break;
		}

		case 'getRetention': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			const body: any = { campaignId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.retentionPeriod) body.retentionPeriod = options.retentionPeriod;

			responseData = await leanplumRequest.call(this, 'getCampaignRetention', body);
			break;
		}

		case 'duplicate': {
			const campaignId = this.getNodeParameter('campaignId', index) as string;

			const body: any = { campaignId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.newName) body.newName = additionalFields.newName;

			responseData = await leanplumRequest.call(this, 'duplicateCampaign', body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
