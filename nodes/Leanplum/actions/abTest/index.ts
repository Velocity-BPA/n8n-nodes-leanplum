/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions } from 'n8n-workflow';
import { leanplumRequest, leanplumRequestAllItems, toUnixTimestamp, parseJson, buildAbTestVariants } from '../../transport/GenericFunctions';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'create': {
			const name = this.getNodeParameter('name', index) as string;
			const primaryGoal = this.getNodeParameter('primaryGoal', index) as string;

			const body: any = {
				name,
				primaryGoal,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.hypothesis) body.hypothesis = additionalFields.hypothesis;
			if (additionalFields.startDate) body.startDate = toUnixTimestamp(additionalFields.startDate);
			if (additionalFields.endDate) body.endDate = toUnixTimestamp(additionalFields.endDate);
			if (additionalFields.trafficAllocation) body.trafficAllocation = parseJson(additionalFields.trafficAllocation);
			if (additionalFields.minimumDetectableEffect !== undefined) body.minimumDetectableEffect = additionalFields.minimumDetectableEffect;
			if (additionalFields.statisticalSignificance !== undefined) body.statisticalSignificance = additionalFields.statisticalSignificance;

			// Build variants from UI if provided
			const variantConfig = this.getNodeParameter('variantConfig', index, {}) as any;
			if (variantConfig.variant) {
				body.variants = buildAbTestVariants(variantConfig.variant);
			}

			responseData = await leanplumRequest.call(this, 'createAbTest', body);
			break;
		}

		case 'get': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			responseData = await leanplumRequest.call(this, 'getAbTest', { abTestId });
			break;
		}

		case 'getMany': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = {};

			const filters = this.getNodeParameter('filters', index, {}) as any;
			if (filters.status) body.status = filters.status;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getAbTests', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getAbTests', body, limit);
			}
			break;
		}

		case 'update': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			const body: any = { abTestId };

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.hypothesis) body.hypothesis = updateFields.hypothesis;
			if (updateFields.primaryGoal) body.primaryGoal = updateFields.primaryGoal;
			if (updateFields.startDate) body.startDate = toUnixTimestamp(updateFields.startDate);
			if (updateFields.endDate) body.endDate = toUnixTimestamp(updateFields.endDate);
			if (updateFields.trafficAllocation) body.trafficAllocation = parseJson(updateFields.trafficAllocation);
			if (updateFields.minimumDetectableEffect !== undefined) body.minimumDetectableEffect = updateFields.minimumDetectableEffect;
			if (updateFields.statisticalSignificance !== undefined) body.statisticalSignificance = updateFields.statisticalSignificance;

			responseData = await leanplumRequest.call(this, 'editAbTest', body);
			break;
		}

		case 'delete': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			responseData = await leanplumRequest.call(this, 'deleteAbTest', { abTestId });
			break;
		}

		case 'start': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			responseData = await leanplumRequest.call(this, 'startAbTest', { abTestId });
			break;
		}

		case 'stop': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			responseData = await leanplumRequest.call(this, 'stopAbTest', { abTestId });
			break;
		}

		case 'getResults': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			const body: any = { abTestId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.startDate) body.startDate = toUnixTimestamp(options.startDate);
			if (options.endDate) body.endDate = toUnixTimestamp(options.endDate);
			if (options.includeConfidenceIntervals !== undefined) body.includeConfidenceIntervals = options.includeConfidenceIntervals;

			responseData = await leanplumRequest.call(this, 'getAbTestResults', body);
			break;
		}

		case 'declareWinner': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;
			const winningVariant = this.getNodeParameter('winningVariant', index) as string;

			const body: any = {
				abTestId,
				winningVariant,
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.reason) body.reason = additionalFields.reason;

			responseData = await leanplumRequest.call(this, 'declareAbTestWinner', body);
			break;
		}

		case 'getVariants': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;

			responseData = await leanplumRequest.call(this, 'getAbTestVariants', { abTestId });
			break;
		}

		case 'updateVariant': {
			const abTestId = this.getNodeParameter('abTestId', index) as string;
			const variantId = this.getNodeParameter('variantId', index) as string;

			const body: any = {
				abTestId,
				variantId,
			};

			const updateFields = this.getNodeParameter('updateFields', index, {}) as any;
			if (updateFields.name) body.name = updateFields.name;
			if (updateFields.description) body.description = updateFields.description;
			if (updateFields.weight !== undefined) body.weight = updateFields.weight;
			if (updateFields.variables) body.variables = parseJson(updateFields.variables);

			responseData = await leanplumRequest.call(this, 'updateAbTestVariant', body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
