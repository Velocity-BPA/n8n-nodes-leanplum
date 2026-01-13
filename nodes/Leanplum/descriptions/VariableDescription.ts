/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const variableOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['variable'],
			},
		},
		options: [
			{
				name: 'Force Content Update',
				value: 'forceContentUpdate',
				description: 'Force variable content refresh',
				action: 'Force content update',
			},
			{
				name: 'Get Defaults',
				value: 'getDefaults',
				description: 'Get default variable values',
				action: 'Get default variables',
			},
			{
				name: 'Get Many for User',
				value: 'getManyForUser',
				description: 'Get personalized variables for a user',
				action: 'Get user variables',
			},
			{
				name: 'Get Variables',
				value: 'getVariables',
				description: 'Get current variable values',
				action: 'Get variables',
			},
			{
				name: 'Set Variables',
				value: 'setVariables',
				description: 'Set variable values',
				action: 'Set variables',
			},
			{
				name: 'Sync',
				value: 'sync',
				description: 'Sync variables with server',
				action: 'Sync variables',
			},
		],
		default: 'getVariables',
	},
];

export const variableFields: INodeProperties[] = [
	// User ID for getManyForUser
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		description: 'User ID for personalized variables',
		displayOptions: {
			show: {
				resource: ['variable'],
				operation: ['getManyForUser'],
			},
		},
	},
	// Variables for setVariables
	{
		displayName: 'Variables',
		name: 'variables',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		description: 'Variables to set',
		displayOptions: {
			show: {
				resource: ['variable'],
				operation: ['setVariables'],
			},
		},
		options: [
			{
				displayName: 'Variable',
				name: 'variable',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Variable name',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Variable value',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'Boolean', value: 'boolean' },
							{ name: 'Color', value: 'color' },
							{ name: 'File', value: 'file' },
							{ name: 'Group', value: 'group' },
							{ name: 'Number', value: 'number' },
							{ name: 'String', value: 'string' },
						],
						default: 'string',
						description: 'Variable type',
					},
				],
			},
		],
	},
	// Options for getVariables
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['variable'],
				operation: ['getVariables'],
			},
		},
		options: [
			{
				displayName: 'Include Defaults',
				name: 'includeDefaults',
				type: 'boolean',
				default: true,
				description: 'Whether to include default values',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Content locale (e.g., en_US)',
			},
			{
				displayName: 'Version ID',
				name: 'versionId',
				type: 'string',
				default: '',
				description: 'Specific content version ID',
			},
		],
	},
	// Options for getManyForUser
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['variable'],
				operation: ['getManyForUser'],
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
				displayName: 'Include Defaults',
				name: 'includeDefaults',
				type: 'boolean',
				default: true,
				description: 'Whether to include default values',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Content locale',
			},
		],
	},
	// Options for sync
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['variable'],
				operation: ['sync'],
			},
		},
		options: [
			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'string',
				default: '',
				description: 'Device identifier for sync',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID for sync',
			},
		],
	},
	// Options for forceContentUpdate
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['variable'],
				operation: ['forceContentUpdate'],
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
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'User ID to force update for',
			},
		],
	},
];
