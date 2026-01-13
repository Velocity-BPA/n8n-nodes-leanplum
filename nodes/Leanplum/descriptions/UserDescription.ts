/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Advance State',
				value: 'advanceState',
				description: 'Advance user to a new state',
				action: 'Advance user state',
			},
			{
				name: 'Delete User',
				value: 'deleteUser',
				description: 'Delete user data',
				action: 'Delete user',
			},
			{
				name: 'Get User',
				value: 'getUser',
				description: 'Get full user profile',
				action: 'Get user profile',
			},
			{
				name: 'Get User Attributes',
				value: 'getUserAttributes',
				description: 'Get user attributes',
				action: 'Get user attributes',
			},
			{
				name: 'Increment User Attribute',
				value: 'incrementUserAttribute',
				description: 'Increment a numeric user attribute',
				action: 'Increment user attribute',
			},
			{
				name: 'Pause Session',
				value: 'pauseSession',
				description: 'Pause user session',
				action: 'Pause session',
			},
			{
				name: 'Resume Session',
				value: 'resumeSession',
				description: 'Resume user session',
				action: 'Resume session',
			},
			{
				name: 'Set Device Attributes',
				value: 'setDeviceAttributes',
				description: 'Set device-level attributes',
				action: 'Set device attributes',
			},
			{
				name: 'Set User Attributes',
				value: 'setUserAttributes',
				description: 'Set user attributes',
				action: 'Set user attributes',
			},
			{
				name: 'Track',
				value: 'track',
				description: 'Track a user event',
				action: 'Track user event',
			},
			{
				name: 'Track Purchase',
				value: 'trackPurchase',
				description: 'Track a purchase event',
				action: 'Track purchase',
			},
			{
				name: 'Unset User Attribute',
				value: 'unsetUserAttribute',
				description: 'Remove a user attribute',
				action: 'Unset user attribute',
			},
		],
		default: 'setUserAttributes',
	},
];

export const userFields: INodeProperties[] = [
	// User ID field (used by most operations)
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		description: 'Unique identifier for the user',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: [
					'setUserAttributes',
					'getUserAttributes',
					'advanceState',
					'track',
					'trackPurchase',
					'incrementUserAttribute',
					'deleteUser',
					'getUser',
					'pauseSession',
					'resumeSession',
					'unsetUserAttribute',
				],
			},
		},
	},
	// Device ID field
	{
		displayName: 'Device ID',
		name: 'deviceId',
		type: 'string',
		required: true,
		default: '',
		description: 'Device identifier',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setDeviceAttributes'],
			},
		},
	},
	// State name for advanceState
	{
		displayName: 'State Name',
		name: 'state',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the state to advance to',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['advanceState'],
			},
		},
	},
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
				resource: ['user'],
				operation: ['track'],
			},
		},
	},
	// Purchase event name
	{
		displayName: 'Event Name',
		name: 'event',
		type: 'string',
		required: true,
		default: 'Purchase',
		description: 'Name of the purchase event',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['trackPurchase'],
			},
		},
	},
	// Purchase value
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		required: true,
		default: 0,
		description: 'Purchase value in currency units',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['trackPurchase'],
			},
		},
	},
	// Currency code
	{
		displayName: 'Currency Code',
		name: 'currencyCode',
		type: 'string',
		default: 'USD',
		description: 'ISO currency code (e.g., USD, EUR)',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['trackPurchase'],
			},
		},
	},
	// Attribute name for increment/unset
	{
		displayName: 'Attribute Name',
		name: 'attributeName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the attribute',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['incrementUserAttribute', 'unsetUserAttribute'],
			},
		},
	},
	// Increment value
	{
		displayName: 'Increment By',
		name: 'incrementValue',
		type: 'number',
		required: true,
		default: 1,
		description: 'Value to increment the attribute by',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['incrementUserAttribute'],
			},
		},
	},
	// Additional fields for setUserAttributes
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setUserAttributes'],
			},
		},
		options: [
			{
				displayName: 'Age',
				name: 'age',
				type: 'number',
				default: 0,
				description: 'User age',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'User city',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'User country',
			},
			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'string',
				default: '',
				description: 'Device identifier',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'User email address',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'User first name',
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'options',
				options: [
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Other', value: 'other' },
				],
				default: 'male',
				description: 'User gender',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'User last name',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'User locale (e.g., en_US)',
			},
			{
				displayName: 'New User ID',
				name: 'newUserId',
				type: 'string',
				default: '',
				description: 'New user ID for migration',
			},
			{
				displayName: 'Region',
				name: 'region',
				type: 'string',
				default: '',
				description: 'User region/state',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'User timezone (e.g., America/New_York)',
			},
			{
				displayName: 'User Attributes',
				name: 'userAttributes',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Custom user attributes',
				options: [
					{
						displayName: 'Attribute',
						name: 'attribute',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Attribute name',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Attribute value',
							},
						],
					},
				],
			},
		],
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
				resource: ['user'],
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
	// Additional fields for trackPurchase
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['trackPurchase'],
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
				description: 'Additional purchase info',
			},
			{
				displayName: 'Item Name',
				name: 'itemName',
				type: 'string',
				default: '',
				description: 'Name of purchased item',
			},
			{
				displayName: 'Time',
				name: 'time',
				type: 'dateTime',
				default: '',
				description: 'Purchase timestamp',
			},
		],
	},
	// Additional fields for setDeviceAttributes
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setDeviceAttributes'],
			},
		},
		options: [
			{
				displayName: 'App Version',
				name: 'appVersion',
				type: 'string',
				default: '',
				description: 'Application version',
			},
			{
				displayName: 'Device Attributes',
				name: 'deviceAttributes',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Custom device attributes',
				options: [
					{
						displayName: 'Attribute',
						name: 'attribute',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Attribute name',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Attribute value',
							},
						],
					},
				],
			},
			{
				displayName: 'Device Model',
				name: 'deviceModel',
				type: 'string',
				default: '',
				description: 'Device model name',
			},
			{
				displayName: 'Device Name',
				name: 'deviceName',
				type: 'string',
				default: '',
				description: 'Device name',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Device locale',
			},
			{
				displayName: 'OS Name',
				name: 'osName',
				type: 'string',
				default: '',
				description: 'Operating system name',
			},
			{
				displayName: 'OS Version',
				name: 'osVersion',
				type: 'string',
				default: '',
				description: 'Operating system version',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Associate device with user',
			},
		],
	},
	// Additional fields for advanceState
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['advanceState'],
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
				displayName: 'Info',
				name: 'info',
				type: 'string',
				default: '',
				description: 'Additional state info',
			},
			{
				displayName: 'State Parameters',
				name: 'stateParams',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'State parameters',
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
		],
	},
];
