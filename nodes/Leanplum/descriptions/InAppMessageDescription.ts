/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const inAppMessageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['inAppMessage'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate an in-app message',
				action: 'Activate in-app message',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new in-app message',
				action: 'Create in-app message',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate an in-app message',
				action: 'Deactivate in-app message',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an in-app message',
				action: 'Delete in-app message',
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate an in-app message',
				action: 'Duplicate in-app message',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get in-app message details',
				action: 'Get in-app message',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many in-app messages',
				action: 'Get many in-app messages',
			},
			{
				name: 'Get Statistics',
				value: 'getStats',
				description: 'Get display statistics',
				action: 'Get in-app message statistics',
			},
			{
				name: 'Preview',
				value: 'preview',
				description: 'Get preview data for an in-app message',
				action: 'Preview in-app message',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an in-app message',
				action: 'Update in-app message',
			},
		],
		default: 'getMany',
	},
];

export const inAppMessageFields: INodeProperties[] = [
	// Message ID
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		required: true,
		default: 0,
		description: 'In-app message identifier',
		displayOptions: {
			show: {
				resource: ['inAppMessage'],
				operation: [
					'get',
					'update',
					'delete',
					'preview',
					'getStats',
					'duplicate',
					'activate',
					'deactivate',
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
		description: 'In-app message name',
		displayOptions: {
			show: {
				resource: ['inAppMessage'],
				operation: ['create'],
			},
		},
	},
	// Layout
	{
		displayName: 'Layout',
		name: 'layout',
		type: 'options',
		required: true,
		options: [
			{ name: 'Bottom Banner', value: 'bottom' },
			{ name: 'Center Popup', value: 'center' },
			{ name: 'Full Screen', value: 'full' },
			{ name: 'Interstitial', value: 'interstitial' },
			{ name: 'Top Banner', value: 'top' },
		],
		default: 'center',
		description: 'Message layout style',
		displayOptions: {
			show: {
				resource: ['inAppMessage'],
				operation: ['create'],
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
				resource: ['inAppMessage'],
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
				resource: ['inAppMessage'],
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
				resource: ['inAppMessage'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Accept Button (JSON)',
				name: 'acceptButton',
				type: 'json',
				default: '{"text": "OK"}',
				description: 'Accept button configuration as JSON',
			},
			{
				displayName: 'Background Color',
				name: 'backgroundColor',
				type: 'color',
				default: '#FFFFFF',
				description: 'Background color of the message',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				default: '',
				description: 'Message body text',
			},
			{
				displayName: 'Dismiss Button (JSON)',
				name: 'dismissButton',
				type: 'json',
				default: '{"text": "Cancel"}',
				description: 'Dismiss button configuration as JSON',
			},
			{
				displayName: 'Display Frequency',
				name: 'displayFrequency',
				type: 'number',
				default: 0,
				description: 'Display frequency limit (0 = no limit)',
			},
			{
				displayName: 'Display Limit',
				name: 'displayLimit',
				type: 'number',
				default: 0,
				description: 'Max display count (0 = no limit)',
			},
			{
				displayName: 'HTML Content',
				name: 'htmlContent',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Custom HTML content for the message',
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'URL of the message image',
			},
			{
				displayName: 'Text Color',
				name: 'textColor',
				type: 'color',
				default: '#000000',
				description: 'Text color of the message',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Message title',
			},
			{
				displayName: 'Trigger Event',
				name: 'triggerEvent',
				type: 'string',
				default: '',
				description: 'Event that triggers the message display',
			},
		],
	},
	// Update fields
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['inAppMessage'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Accept Button (JSON)',
				name: 'acceptButton',
				type: 'json',
				default: '{}',
				description: 'Accept button configuration as JSON',
			},
			{
				displayName: 'Background Color',
				name: 'backgroundColor',
				type: 'color',
				default: '',
				description: 'Background color of the message',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				default: '',
				description: 'Message body text',
			},
			{
				displayName: 'Dismiss Button (JSON)',
				name: 'dismissButton',
				type: 'json',
				default: '{}',
				description: 'Dismiss button configuration as JSON',
			},
			{
				displayName: 'Display Frequency',
				name: 'displayFrequency',
				type: 'number',
				default: 0,
				description: 'Display frequency limit',
			},
			{
				displayName: 'Display Limit',
				name: 'displayLimit',
				type: 'number',
				default: 0,
				description: 'Max display count',
			},
			{
				displayName: 'HTML Content',
				name: 'htmlContent',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Custom HTML content',
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'URL of the message image',
			},
			{
				displayName: 'Layout',
				name: 'layout',
				type: 'options',
				options: [
					{ name: 'Bottom Banner', value: 'bottom' },
					{ name: 'Center Popup', value: 'center' },
					{ name: 'Full Screen', value: 'full' },
					{ name: 'Interstitial', value: 'interstitial' },
					{ name: 'Top Banner', value: 'top' },
				],
				default: 'center',
				description: 'Message layout style',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Message name',
			},
			{
				displayName: 'Text Color',
				name: 'textColor',
				type: 'color',
				default: '',
				description: 'Text color of the message',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Message title',
			},
			{
				displayName: 'Trigger Event',
				name: 'triggerEvent',
				type: 'string',
				default: '',
				description: 'Event that triggers the message display',
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
				resource: ['inAppMessage'],
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
				displayName: 'Layout',
				name: 'layout',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Bottom Banner', value: 'bottom' },
					{ name: 'Center Popup', value: 'center' },
					{ name: 'Full Screen', value: 'full' },
					{ name: 'Interstitial', value: 'interstitial' },
					{ name: 'Top Banner', value: 'top' },
				],
				default: '',
				description: 'Filter by layout type',
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
				resource: ['inAppMessage'],
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
