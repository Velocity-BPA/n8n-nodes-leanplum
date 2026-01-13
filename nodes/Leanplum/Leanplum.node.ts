/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { userOperations, userFields } from './descriptions/UserDescription';
import { messageOperations, messageFields } from './descriptions/MessageDescription';
import { campaignOperations, campaignFields } from './descriptions/CampaignDescription';
import { pushNotificationOperations, pushNotificationFields } from './descriptions/PushNotificationDescription';
import { inAppMessageOperations, inAppMessageFields } from './descriptions/InAppMessageDescription';
import { segmentOperations, segmentFields } from './descriptions/SegmentDescription';
import { abTestOperations, abTestFields } from './descriptions/AbTestDescription';
import { eventOperations, eventFields } from './descriptions/EventDescription';
import { variableOperations, variableFields } from './descriptions/VariableDescription';
import { exportOperations, exportFields } from './descriptions/ExportDescription';

import * as user from './actions/user';
import * as message from './actions/message';
import * as campaign from './actions/campaign';
import * as pushNotification from './actions/pushNotification';
import * as inAppMessage from './actions/inAppMessage';
import * as segment from './actions/segment';
import * as abTest from './actions/abTest';
import * as event from './actions/event';
import * as variable from './actions/variable';
import * as exportResource from './actions/export';

export class Leanplum implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Leanplum',
		name: 'leanplum',
		icon: 'file:leanplum.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Multi-channel customer engagement platform for mobile-first growth',
		defaults: {
			name: 'Leanplum',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'leanplumApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'A/B Test',
						value: 'abTest',
					},
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'Export',
						value: 'export',
					},
					{
						name: 'In-App Message',
						value: 'inAppMessage',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Push Notification',
						value: 'pushNotification',
					},
					{
						name: 'Segment',
						value: 'segment',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Variable',
						value: 'variable',
					},
				],
				default: 'user',
			},
			...userOperations,
			...userFields,
			...messageOperations,
			...messageFields,
			...campaignOperations,
			...campaignFields,
			...pushNotificationOperations,
			...pushNotificationFields,
			...inAppMessageOperations,
			...inAppMessageFields,
			...segmentOperations,
			...segmentFields,
			...abTestOperations,
			...abTestFields,
			...eventOperations,
			...eventFields,
			...variableOperations,
			...variableFields,
			...exportOperations,
			...exportFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				switch (resource) {
					case 'user':
						responseData = await user.execute.call(this, i, operation);
						break;
					case 'message':
						responseData = await message.execute.call(this, i, operation);
						break;
					case 'campaign':
						responseData = await campaign.execute.call(this, i, operation);
						break;
					case 'pushNotification':
						responseData = await pushNotification.execute.call(this, i, operation);
						break;
					case 'inAppMessage':
						responseData = await inAppMessage.execute.call(this, i, operation);
						break;
					case 'segment':
						responseData = await segment.execute.call(this, i, operation);
						break;
					case 'abTest':
						responseData = await abTest.execute.call(this, i, operation);
						break;
					case 'event':
						responseData = await event.execute.call(this, i, operation);
						break;
					case 'variable':
						responseData = await variable.execute.call(this, i, operation);
						break;
					case 'export':
						responseData = await exportResource.execute.call(this, i, operation);
						break;
					default:
						throw new Error(`Unknown resource: ${resource}`);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
