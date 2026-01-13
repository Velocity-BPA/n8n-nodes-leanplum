/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

export class LeanplumTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Leanplum Trigger',
		name: 'leanplumTrigger',
		icon: 'file:leanplum.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts a workflow when Leanplum events occur',
		defaults: {
			name: 'Leanplum Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'leanplumApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'event.tracked',
				options: [
					{
						name: 'Attribute Changed',
						value: 'attribute.changed',
						description: 'User attribute was updated',
					},
					{
						name: 'Event Tracked',
						value: 'event.tracked',
						description: 'Custom event was tracked',
					},
					{
						name: 'In-App Dismissed',
						value: 'inapp.dismissed',
						description: 'In-app message was closed',
					},
					{
						name: 'In-App Displayed',
						value: 'inapp.displayed',
						description: 'In-app message was shown',
					},
					{
						name: 'Message Clicked',
						value: 'message.clicked',
						description: 'Message link was clicked',
					},
					{
						name: 'Message Opened',
						value: 'message.opened',
						description: 'Message was opened',
					},
					{
						name: 'Message Sent',
						value: 'message.sent',
						description: 'Message was sent to user',
					},
					{
						name: 'Purchase Made',
						value: 'purchase.made',
						description: 'Purchase event completed',
					},
					{
						name: 'Push Delivered',
						value: 'push.delivered',
						description: 'Push notification was delivered',
					},
					{
						name: 'Push Opened',
						value: 'push.opened',
						description: 'Push notification was opened',
					},
					{
						name: 'Session End',
						value: 'session.end',
						description: 'User session ended',
					},
					{
						name: 'Session Start',
						value: 'session.start',
						description: 'User session started',
					},
					{
						name: 'State Changed',
						value: 'state.changed',
						description: 'User state was changed',
					},
				],
				description: 'The Leanplum event to listen for',
			},
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Secret to verify webhook authenticity (sent in x-leanplum-secret header)',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Filter by User ID',
						name: 'filterUserId',
						type: 'string',
						default: '',
						description: 'Only trigger for specific user ID',
					},
					{
						displayName: 'Filter by Message ID',
						name: 'filterMessageId',
						type: 'number',
						default: 0,
						description: 'Only trigger for specific message ID',
					},
					{
						displayName: 'Filter by Event Name',
						name: 'filterEventName',
						type: 'string',
						default: '',
						description: 'Only trigger for specific event name (for event.tracked)',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Leanplum webhooks are configured in dashboard, not via API
				// Return true to indicate webhook should be active
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Webhook URL needs to be manually configured in Leanplum dashboard
				// Log webhook URL for user reference
				const webhookUrl = this.getNodeWebhookUrl('default');
				console.log(`Leanplum Webhook URL: ${webhookUrl}`);
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Webhook needs to be manually removed from Leanplum dashboard
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		const headers = this.getHeaderData();
		const event = this.getNodeParameter('event') as string;
		const webhookSecret = this.getNodeParameter('webhookSecret') as string;
		const options = this.getNodeParameter('options', {}) as {
			filterUserId?: string;
			filterMessageId?: number;
			filterEventName?: string;
		};

		// Verify webhook secret if configured
		if (webhookSecret) {
			const receivedSecret = headers['x-leanplum-secret'] as string;
			if (receivedSecret !== webhookSecret) {
				return {
					webhookResponse: {
						status: 401,
						body: { error: 'Invalid webhook secret' },
					},
				};
			}
		}

		// Check if event matches
		const receivedEvent = body.event as string;
		if (receivedEvent !== event) {
			// Event doesn't match, acknowledge but don't process
			return {
				webhookResponse: {
					status: 200,
					body: { received: true, processed: false },
				},
			};
		}

		// Apply filters
		if (options.filterUserId && body.userId !== options.filterUserId) {
			return {
				webhookResponse: {
					status: 200,
					body: { received: true, processed: false, reason: 'userId filter mismatch' },
				},
			};
		}

		if (options.filterMessageId && body.messageId !== options.filterMessageId) {
			return {
				webhookResponse: {
					status: 200,
					body: { received: true, processed: false, reason: 'messageId filter mismatch' },
				},
			};
		}

		if (options.filterEventName && event === 'event.tracked' && body.eventName !== options.filterEventName) {
			return {
				webhookResponse: {
					status: 200,
					body: { received: true, processed: false, reason: 'eventName filter mismatch' },
				},
			};
		}

		// Return webhook data for processing
		return {
			workflowData: [
				this.helpers.returnJsonArray({
					event: receivedEvent,
					userId: body.userId,
					deviceId: body.deviceId,
					messageId: body.messageId,
					messageName: body.messageName,
					eventName: body.eventName,
					timestamp: body.timestamp,
					attributes: body.attributes,
					params: body.params,
					value: body.value,
					info: body.info,
					rawBody: body,
				}),
			],
		};
	}
}
