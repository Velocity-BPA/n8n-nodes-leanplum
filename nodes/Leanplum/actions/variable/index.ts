/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions } from 'n8n-workflow';
import { leanplumRequest, parseJson } from '../../transport/GenericFunctions';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'setVariables': {
			const userId = this.getNodeParameter('userId', index) as string;
			const variables = this.getNodeParameter('variables', index) as string;

			const body: any = {
				userId,
				variables: parseJson(variables),
			};

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'setVariables', body);
			break;
		}

		case 'getVariables': {
			const body: any = {};

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.userId) body.userId = options.userId;
			if (options.deviceId) body.deviceId = options.deviceId;
			if (options.includeDefaults !== undefined) body.includeDefaults = options.includeDefaults;
			if (options.versionId) body.versionId = options.versionId;
			if (options.locale) body.locale = options.locale;

			responseData = await leanplumRequest.call(this, 'getVariables', body);
			break;
		}

		case 'getDefaults': {
			const body: any = {};

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.versionId) body.versionId = options.versionId;
			if (options.locale) body.locale = options.locale;

			responseData = await leanplumRequest.call(this, 'getVariableDefaults', body);
			break;
		}

		case 'sync': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;
			if (additionalFields.includeDefaults !== undefined) body.includeDefaults = additionalFields.includeDefaults;
			if (additionalFields.includeVariants !== undefined) body.includeVariants = additionalFields.includeVariants;

			responseData = await leanplumRequest.call(this, 'syncVariables', body);
			break;
		}

		case 'getManyForUser': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const options = this.getNodeParameter('options', index, {}) as any;
			if (options.deviceId) body.deviceId = options.deviceId;
			if (options.includeDefaults !== undefined) body.includeDefaults = options.includeDefaults;

			responseData = await leanplumRequest.call(this, 'getUserVariables', body);
			break;
		}

		case 'forceContentUpdate': {
			const userId = this.getNodeParameter('userId', index) as string;

			const body: any = { userId };

			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			if (additionalFields.deviceId) body.deviceId = additionalFields.deviceId;

			responseData = await leanplumRequest.call(this, 'forceContentUpdate', body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
