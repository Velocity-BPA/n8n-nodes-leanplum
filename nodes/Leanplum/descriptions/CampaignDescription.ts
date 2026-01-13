/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a campaign',
				action: 'Create campaign',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a campaign',
				action: 'Delete campaign',
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate a campaign',
				action: 'Duplicate campaign',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get campaign details',
				action: 'Get campaign',
			},
			{
				name: 'Get Conversions',
				value: 'getConversions',
				description: 'Get campaign conversion data',
				action: 'Get campaign conversions',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many campaigns',
				action: 'Get many campaigns',
			},
			{
				name: 'Get Report',
				value: 'getReport',
				description: 'Get campaign report',
				action: 'Get campaign report',
			},
			{
				name: 'Get Retention',
				value: 'getRetention',
				description: 'Get retention metrics',
				action: 'Get retention metrics',
			},
			{
				name: 'Pause',
				value: 'pause',
				description: 'Pause a campaign',
				action: 'Pause campaign',
			},
			{
				name: 'Start',
				value: 'start',
				description: 'Start a campaign',
				action: 'Start campaign',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop a campaign',
				action: 'Stop campaign',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a campaign',
				action: 'Update campaign',
			},
		],
		default: 'getMany',
	},
];

export const campaignFields: INodeProperties[] = [
	// Campaign ID
	{
		displayName: 'Campaign ID',
		name: 'campaignId',
		type: 'string',
		required: true,
		default: '',
		description: 'Campaign identifier',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: [
					'get',
					'update',
					'delete',
					'start',
					'stop',
					'pause',
					'getReport',
					'getConversions',
					'getRetention',
					'duplicate',
				],
			},
		},
	},
	// Campaign name (for create)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Campaign name',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
	},
	// Campaign type
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{ name: 'Lifecycle', value: 'lifecycle' },
			{ name: 'Scheduled', value: 'scheduled' },
			{ name: 'Triggered', value: 'triggered' },
		],
		default: 'lifecycle',
		description: 'Campaign type',
		displayOptions: {
			show: {
				resource: ['campaign'],
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
				resource: ['campaign'],
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
				resource: ['campaign'],
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
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Campaign description',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Campaign end date',
			},
			{
				displayName: 'Exclusion Segments',
				name: 'exclusions',
				type: 'string',
				default: '',
				description: 'Comma-separated list of exclusion segment IDs',
			},
			{
				displayName: 'Goals (JSON)',
				name: 'goals',
				type: 'json',
				default: '[]',
				description: 'Conversion goals as JSON array',
			},
			{
				displayName: 'Segments',
				name: 'segments',
				type: 'string',
				default: '',
				description: 'Comma-separated list of target segment IDs',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Campaign start date',
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
				resource: ['campaign'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Campaign description',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Campaign end date',
			},
			{
				displayName: 'Exclusion Segments',
				name: 'exclusions',
				type: 'string',
				default: '',
				description: 'Comma-separated list of exclusion segment IDs',
			},
			{
				displayName: 'Goals (JSON)',
				name: 'goals',
				type: 'json',
				default: '[]',
				description: 'Conversion goals as JSON array',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Campaign name',
			},
			{
				displayName: 'Segments',
				name: 'segments',
				type: 'string',
				default: '',
				description: 'Comma-separated list of target segment IDs',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Campaign start date',
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
				resource: ['campaign'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Paused', value: 'paused' },
					{ name: 'Running', value: 'running' },
				],
				default: '',
				description: 'Filter by campaign status',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Lifecycle', value: 'lifecycle' },
					{ name: 'Scheduled', value: 'scheduled' },
					{ name: 'Triggered', value: 'triggered' },
				],
				default: '',
				description: 'Filter by campaign type',
			},
		],
	},
	// Report options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['getReport', 'getConversions', 'getRetention'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Report end date',
			},
			{
				displayName: 'Granularity',
				name: 'granularity',
				type: 'options',
				options: [
					{ name: 'Daily', value: 'day' },
					{ name: 'Hourly', value: 'hour' },
					{ name: 'Weekly', value: 'week' },
				],
				default: 'day',
				description: 'Report granularity',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Report start date',
			},
		],
	},
];
