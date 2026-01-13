/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Create Event',
				value: 'createEvent',
				description: 'Define a new event type',
				action: 'Create event definition',
			},
			{
				name: 'Delete Event',
				value: 'deleteEvent',
				description: 'Remove an event definition',
				action: 'Delete event definition',
			},
			{
				name: 'Export Events',
				value: 'exportEvents',
				description: 'Export event data',
				action: 'Export events',
			},
			{
				name: 'Get Event Counts',
				value: 'getEventCounts',
				description: 'Get event statistics',
				action: 'Get event counts',
			},
			{
				name: 'Get Event Properties',
				value: 'getEventProperties',
				description: 'Get properties for an event',
				action: 'Get event properties',
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				description: 'List all event types',
				action: 'Get events',
			},
			{
				name: 'Track',
				value: 'track',
				description: 'Track a custom event',
				action: 'Track event',
			},
			{
				name: 'Track Batch',
				value: 'trackBatch',
				description: 'Track multiple events at once',
				action: 'Track batch events',
			},
			{
				name: 'Update Event',
				value: 'updateEvent',
				description: 'Update an event definition',
				action: 'Update event definition',
			},
		],
		default: 'track',
	},
];

export const eventFields: INodeProperties[] = [
	// Event name for track
	{
		displayName: 'Event Name',
		name: 'event',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the event to track',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['track', 'getEventProperties', 'getEventCounts', 'updateEvent', 'deleteEvent'],
			},
		},
	},
	// User ID for track
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		description: 'User ID to associate with the event',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['track'],
			},
		},
	},
	// Event name for create
	{
		displayName: 'Event Name',
		name: 'eventName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name for the new event type',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['createEvent'],
			},
		},
	},
	// Events array for trackBatch
	{
		displayName: 'Events',
		name: 'events',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		description: 'Events to track',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['trackBatch'],
			},
		},
		options: [
			{
				displayName: 'Event',
				name: 'event',
				values: [
					{
						displayName: 'Device ID',
						name: 'deviceId',
						type: 'string',
						default: '',
						description: 'Device identifier',
					},
					{
						displayName: 'Event Name',
						name: 'eventName',
						type: 'string',
						default: '',
						description: 'Name of the event',
					},
					{
						displayName: 'Info',
						name: 'info',
						type: 'string',
						default: '',
						description: 'Additional event info',
					},
					{
						displayName: 'Parameters (JSON)',
						name: 'params',
						type: 'json',
						default: '{}',
						description: 'Event parameters as JSON',
					},
					{
						displayName: 'Time',
						name: 'time',
						type: 'dateTime',
						default: '',
						description: 'Event timestamp',
					},
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
						description: 'User identifier',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'number',
						default: 0,
						description: 'Numeric event value',
					},
				],
			},
		],
	},
	// Return all for getEvents
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getEvents'],
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
				resource: ['event'],
				operation: ['getEvents'],
				returnAll: [false],
			},
		},
	},
	// Additional fields for track
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['track'],
			},
		},
		options: [
			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'string',
				default: '',
				description: 'Device identifier',
			},
			{
				displayName: 'Event Parameters',
				name: 'eventParams',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Custom event parameters',
				options: [
					{
						displayName: 'Parameter',
						name: 'param',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Parameter name',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Parameter value',
							},
						],
					},
				],
			},
			{
				displayName: 'Info',
				name: 'info',
				type: 'string',
				default: '',
				description: 'Additional event info string',
			},
			{
				displayName: 'Time',
				name: 'time',
				type: 'dateTime',
				default: '',
				description: 'Event timestamp',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				default: 0,
				description: 'Numeric event value',
			},
		],
	},
	// Additional fields for createEvent
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['createEvent'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Event description',
			},
			{
				displayName: 'Properties',
				name: 'properties',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Event properties schema',
				options: [
					{
						displayName: 'Property',
						name: 'property',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Property name',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Boolean', value: 'boolean' },
									{ name: 'Number', value: 'number' },
									{ name: 'String', value: 'string' },
								],
								default: 'string',
								description: 'Property type',
							},
						],
					},
				],
			},
		],
	},
	// Update fields for event
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['updateEvent'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Event description',
			},
			{
				displayName: 'Properties',
				name: 'properties',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Event properties schema',
				options: [
					{
						displayName: 'Property',
						name: 'property',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Property name',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Boolean', value: 'boolean' },
									{ name: 'Number', value: 'number' },
									{ name: 'String', value: 'string' },
								],
								default: 'string',
								description: 'Property type',
							},
						],
					},
				],
			},
		],
	},
	// Export options
	{
		displayName: 'Export Options',
		name: 'exportOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['exportEvents'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Export end date',
			},
			{
				displayName: 'Event Name Filter',
				name: 'eventName',
				type: 'string',
				default: '',
				description: 'Filter by event name',
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'CSV', value: 'csv' },
					{ name: 'JSON', value: 'json' },
					{ name: 'Parquet', value: 'parquet' },
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
				description: 'GCS service account credentials',
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
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Export start date',
			},
		],
	},
	// Count options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getEventCounts'],
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
				displayName: 'Granularity',
				name: 'granularity',
				type: 'options',
				options: [
					{ name: 'Daily', value: 'day' },
					{ name: 'Hourly', value: 'hour' },
					{ name: 'Weekly', value: 'week' },
				],
				default: 'day',
				description: 'Statistics granularity',
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
