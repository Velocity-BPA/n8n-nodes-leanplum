/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const segmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['segment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new segment',
				action: 'Create segment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a segment',
				action: 'Delete segment',
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate a segment',
				action: 'Duplicate segment',
			},
			{
				name: 'Export',
				value: 'export',
				description: 'Export segment users',
				action: 'Export segment users',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get segment details',
				action: 'Get segment',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many segments',
				action: 'Get many segments',
			},
			{
				name: 'Get Size',
				value: 'getSize',
				description: 'Get segment user count',
				action: 'Get segment size',
			},
			{
				name: 'Get Users',
				value: 'getUsers',
				description: 'Get users in segment',
				action: 'Get segment users',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update segment definition',
				action: 'Update segment',
			},
		],
		default: 'getMany',
	},
];

export const segmentFields: INodeProperties[] = [
	// Segment ID
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		default: '',
		description: 'Segment identifier',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: [
					'get',
					'update',
					'delete',
					'getUsers',
					'getSize',
					'export',
					'duplicate',
				],
			},
		},
	},
	// Segment name (for create)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Segment name',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['create'],
			},
		},
	},
	// Return all for getMany and getUsers
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['getMany', 'getUsers'],
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
				resource: ['segment'],
				operation: ['getMany', 'getUsers'],
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
				resource: ['segment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Attribute Filters',
				name: 'attributeFilters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Attribute-based filters',
				options: [
					{
						displayName: 'Filter',
						name: 'filter',
						values: [
							{
								displayName: 'Attribute',
								name: 'attribute',
								type: 'string',
								default: '',
								description: 'Attribute name',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Contains', value: 'contains' },
									{ name: 'Does Not Contain', value: 'notContains' },
									{ name: 'Ends With', value: 'endsWith' },
									{ name: 'Equals', value: 'eq' },
									{ name: 'Greater Than', value: 'gt' },
									{ name: 'Greater Than or Equals', value: 'gte' },
									{ name: 'Is Not Set', value: 'isNotSet' },
									{ name: 'Is Set', value: 'isSet' },
									{ name: 'Less Than', value: 'lt' },
									{ name: 'Less Than or Equals', value: 'lte' },
									{ name: 'Not Equals', value: 'neq' },
									{ name: 'Starts With', value: 'startsWith' },
								],
								default: 'eq',
								description: 'Comparison operator',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Filter value',
							},
						],
					},
				],
			},
			{
				displayName: 'Behavior Filters',
				name: 'behaviorFilters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Behavioral filters',
				options: [
					{
						displayName: 'Filter',
						name: 'filter',
						values: [
							{
								displayName: 'Event',
								name: 'event',
								type: 'string',
								default: '',
								description: 'Event name',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Did', value: 'did' },
									{ name: 'Did Not', value: 'didNot' },
								],
								default: 'did',
								description: 'Behavior operator',
							},
							{
								displayName: 'Time Range (Days)',
								name: 'timeRange',
								type: 'number',
								default: 30,
								description: 'Time range in days',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'number',
								default: 1,
								description: 'Minimum event count',
							},
						],
					},
				],
			},
			{
				displayName: 'Date Range (JSON)',
				name: 'dateRange',
				type: 'json',
				default: '{}',
				description: 'Date range for behavior filters as JSON',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Segment description',
			},
			{
				displayName: 'Event Filters',
				name: 'eventFilters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Event-based filters',
				options: [
					{
						displayName: 'Filter',
						name: 'filter',
						values: [
							{
								displayName: 'Count',
								name: 'count',
								type: 'number',
								default: 1,
								description: 'Event count threshold',
							},
							{
								displayName: 'Event Name',
								name: 'eventName',
								type: 'string',
								default: '',
								description: 'Event name',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Equals', value: 'eq' },
									{ name: 'Greater Than', value: 'gt' },
									{ name: 'Greater Than or Equals', value: 'gte' },
									{ name: 'Less Than', value: 'lt' },
									{ name: 'Less Than or Equals', value: 'lte' },
								],
								default: 'gte',
								description: 'Count operator',
							},
						],
					},
				],
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
				resource: ['segment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Attribute Filters',
				name: 'attributeFilters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Attribute-based filters',
				options: [
					{
						displayName: 'Filter',
						name: 'filter',
						values: [
							{
								displayName: 'Attribute',
								name: 'attribute',
								type: 'string',
								default: '',
								description: 'Attribute name',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Contains', value: 'contains' },
									{ name: 'Does Not Contain', value: 'notContains' },
									{ name: 'Ends With', value: 'endsWith' },
									{ name: 'Equals', value: 'eq' },
									{ name: 'Greater Than', value: 'gt' },
									{ name: 'Greater Than or Equals', value: 'gte' },
									{ name: 'Is Not Set', value: 'isNotSet' },
									{ name: 'Is Set', value: 'isSet' },
									{ name: 'Less Than', value: 'lt' },
									{ name: 'Less Than or Equals', value: 'lte' },
									{ name: 'Not Equals', value: 'neq' },
									{ name: 'Starts With', value: 'startsWith' },
								],
								default: 'eq',
								description: 'Comparison operator',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Filter value',
							},
						],
					},
				],
			},
			{
				displayName: 'Behavior Filters',
				name: 'behaviorFilters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Behavioral filters',
				options: [
					{
						displayName: 'Filter',
						name: 'filter',
						values: [
							{
								displayName: 'Event',
								name: 'event',
								type: 'string',
								default: '',
								description: 'Event name',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Did', value: 'did' },
									{ name: 'Did Not', value: 'didNot' },
								],
								default: 'did',
								description: 'Behavior operator',
							},
							{
								displayName: 'Time Range (Days)',
								name: 'timeRange',
								type: 'number',
								default: 30,
								description: 'Time range in days',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'number',
								default: 1,
								description: 'Minimum event count',
							},
						],
					},
				],
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Segment description',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Segment name',
			},
		],
	},
	// Export options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['export'],
			},
		},
		options: [
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'CSV', value: 'csv' },
					{ name: 'JSON', value: 'json' },
				],
				default: 'csv',
				description: 'Export format',
			},
			{
				displayName: 'GCS Bucket',
				name: 'gcsBucket',
				type: 'string',
				default: '',
				description: 'Google Cloud Storage bucket name',
			},
			{
				displayName: 'GCS Credentials (JSON)',
				name: 'gcsCredentials',
				type: 'json',
				default: '{}',
				description: 'GCS service account credentials as JSON',
			},
			{
				displayName: 'S3 Access Key',
				name: 's3AccessKey',
				type: 'string',
				default: '',
				description: 'AWS S3 access key',
			},
			{
				displayName: 'S3 Bucket Name',
				name: 's3BucketName',
				type: 'string',
				default: '',
				description: 'AWS S3 bucket name',
			},
			{
				displayName: 'S3 Secret Key',
				name: 's3SecretKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'AWS S3 secret key',
			},
		],
	},
];
