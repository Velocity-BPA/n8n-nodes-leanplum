/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const messageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['message'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a message',
				action: 'Archive message',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new message',
				action: 'Create message',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a message',
				action: 'Delete message',
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate a message',
				action: 'Duplicate message',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get message details',
				action: 'Get message',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many messages',
				action: 'Get many messages',
			},
			{
				name: 'Get Statistics',
				value: 'getStats',
				description: 'Get message statistics',
				action: 'Get message statistics',
			},
			{
				name: 'Get Variants',
				value: 'getVariants',
				description: 'Get message A/B variants',
				action: 'Get message variants',
			},
			{
				name: 'Pause',
				value: 'pause',
				description: 'Pause message delivery',
				action: 'Pause message',
			},
			{
				name: 'Resume',
				value: 'resume',
				description: 'Resume message delivery',
				action: 'Resume message',
			},
			{
				name: 'Schedule',
				value: 'schedule',
				description: 'Schedule message delivery',
				action: 'Schedule message',
			},
			{
				name: 'Send Now',
				value: 'sendNow',
				description: 'Send message immediately',
				action: 'Send message now',
			},
			{
				name: 'Unarchive',
				value: 'unarchive',
				description: 'Restore archived message',
				action: 'Unarchive message',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update message content',
				action: 'Update message',
			},
		],
		default: 'getMany',
	},
];

export const messageFields: INodeProperties[] = [
	// Message ID (required for most operations)
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		required: true,
		default: 0,
		description: 'Message identifier',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: [
					'get',
					'update',
					'delete',
					'duplicate',
					'archive',
					'unarchive',
					'getStats',
					'pause',
					'resume',
					'schedule',
					'sendNow',
					'getVariants',
				],
			},
		},
	},
	// Message name (for create)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Message name',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create'],
			},
		},
	},
	// Message type
	{
		displayName: 'Message Type',
		name: 'messageType',
		type: 'options',
		required: true,
		options: [
			{ name: 'App Inbox', value: 'AppInbox' },
			{ name: 'Email', value: 'Email' },
			{ name: 'In-App', value: 'InApp' },
			{ name: 'Push', value: 'Push' },
		],
		default: 'Push',
		description: 'Type of message to create',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create'],
			},
		},
	},
	// Schedule time
	{
		displayName: 'Delivery Time',
		name: 'deliveryTime',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'When to deliver the message',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['schedule'],
			},
		},
	},
	// Return all for getMany
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['getMany'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
	},
	// Additional fields for create
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the message is active',
			},
			{
				displayName: 'Action (JSON)',
				name: 'action',
				type: 'json',
				default: '{}',
				description: 'Message action configuration as JSON',
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'dateTime',
				default: '',
				description: 'Campaign end time',
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'dateTime',
				default: '',
				description: 'Campaign start time',
			},
			{
				displayName: 'Targeting (JSON)',
				name: 'targeting',
				type: 'json',
				default: '{}',
				description: 'Target segment configuration as JSON',
			},
			{
				displayName: 'When Limit (JSON)',
				name: 'whenLimit',
				type: 'json',
				default: '{}',
				description: 'Frequency limits as JSON',
			},
			{
				displayName: 'When Trigger (JSON)',
				name: 'whenTrigger',
				type: 'json',
				default: '{}',
				description: 'Trigger conditions as JSON',
			},
		],
	},
	// Additional fields for update
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Action (JSON)',
				name: 'action',
				type: 'json',
				default: '{}',
				description: 'Message action configuration as JSON',
			},
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the message is active',
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'dateTime',
				default: '',
				description: 'Campaign end time',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Message name',
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'dateTime',
				default: '',
				description: 'Campaign start time',
			},
			{
				displayName: 'Targeting (JSON)',
				name: 'targeting',
				type: 'json',
				default: '{}',
				description: 'Target segment configuration as JSON',
			},
			{
				displayName: 'When Limit (JSON)',
				name: 'whenLimit',
				type: 'json',
				default: '{}',
				description: 'Frequency limits as JSON',
			},
			{
				displayName: 'When Trigger (JSON)',
				name: 'whenTrigger',
				type: 'json',
				default: '{}',
				description: 'Trigger conditions as JSON',
			},
		],
	},
	// Filters for getMany
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Active Only',
				name: 'activeOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to return only active messages',
			},
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether to include archived messages',
			},
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'App Inbox', value: 'AppInbox' },
					{ name: 'Email', value: 'Email' },
					{ name: 'In-App', value: 'InApp' },
					{ name: 'Push', value: 'Push' },
				],
				default: '',
				description: 'Filter by message type',
			},
		],
	},
	// Stats options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['getStats'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Statistics end date',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Statistics start date',
			},
		],
	},
];
