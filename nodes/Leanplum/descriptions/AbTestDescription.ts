/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const abTestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['abTest'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new A/B test',
				action: 'Create A/B test',
			},
			{
				name: 'Declare Winner',
				value: 'declareWinner',
				description: 'Declare the winning variant',
				action: 'Declare A/B test winner',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an A/B test',
				action: 'Delete A/B test',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get A/B test details',
				action: 'Get A/B test',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many A/B tests',
				action: 'Get many A/B tests',
			},
			{
				name: 'Get Results',
				value: 'getResults',
				description: 'Get A/B test results',
				action: 'Get A/B test results',
			},
			{
				name: 'Get Variants',
				value: 'getVariants',
				description: 'Get variant details',
				action: 'Get A/B test variants',
			},
			{
				name: 'Start',
				value: 'start',
				description: 'Start an A/B test',
				action: 'Start A/B test',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop an A/B test',
				action: 'Stop A/B test',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an A/B test',
				action: 'Update A/B test',
			},
			{
				name: 'Update Variant',
				value: 'updateVariant',
				description: 'Update a specific variant',
				action: 'Update A/B test variant',
			},
		],
		default: 'getMany',
	},
];

export const abTestFields: INodeProperties[] = [
	// A/B Test ID
	{
		displayName: 'A/B Test ID',
		name: 'abTestId',
		type: 'string',
		required: true,
		default: '',
		description: 'A/B test identifier',
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: [
					'get',
					'update',
					'delete',
					'start',
					'stop',
					'getResults',
					'declareWinner',
					'getVariants',
					'updateVariant',
				],
			},
		},
	},
	// Test name (for create)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'A/B test name',
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['create'],
			},
		},
	},
	// Primary goal
	{
		displayName: 'Primary Goal',
		name: 'primaryGoal',
		type: 'string',
		required: true,
		default: '',
		description: 'Primary success metric for the test',
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['create'],
			},
		},
	},
	// Variant ID for declareWinner and updateVariant
	{
		displayName: 'Variant ID',
		name: 'variantId',
		type: 'string',
		required: true,
		default: '',
		description: 'Variant identifier',
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['declareWinner', 'updateVariant'],
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
				resource: ['abTest'],
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
				resource: ['abTest'],
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
				resource: ['abTest'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Test end date',
			},
			{
				displayName: 'Hypothesis',
				name: 'hypothesis',
				type: 'string',
				default: '',
				description: 'Test hypothesis',
			},
			{
				displayName: 'Minimum Detectable Effect (%)',
				name: 'minimumDetectableEffect',
				type: 'number',
				default: 5,
				description: 'Minimum detectable effect percentage',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Test start date',
			},
			{
				displayName: 'Statistical Significance (%)',
				name: 'statisticalSignificance',
				type: 'number',
				default: 95,
				description: 'Required confidence level',
			},
			{
				displayName: 'Traffic Allocation',
				name: 'trafficAllocation',
				type: 'string',
				default: '50,50',
				description: 'Traffic split percentages (comma-separated)',
			},
			{
				displayName: 'Variants',
				name: 'variants',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Test variants',
				options: [
					{
						displayName: 'Variant',
						name: 'variant',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Variant name',
							},
							{
								displayName: 'Variables (JSON)',
								name: 'variables',
								type: 'json',
								default: '{}',
								description: 'Variant variables as JSON',
							},
							{
								displayName: 'Weight (%)',
								name: 'weight',
								type: 'number',
								default: 50,
								description: 'Traffic weight percentage',
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
				resource: ['abTest'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Test end date',
			},
			{
				displayName: 'Hypothesis',
				name: 'hypothesis',
				type: 'string',
				default: '',
				description: 'Test hypothesis',
			},
			{
				displayName: 'Minimum Detectable Effect (%)',
				name: 'minimumDetectableEffect',
				type: 'number',
				default: 5,
				description: 'Minimum detectable effect',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Test name',
			},
			{
				displayName: 'Primary Goal',
				name: 'primaryGoal',
				type: 'string',
				default: '',
				description: 'Primary success metric',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Test start date',
			},
			{
				displayName: 'Statistical Significance (%)',
				name: 'statisticalSignificance',
				type: 'number',
				default: 95,
				description: 'Required confidence level',
			},
			{
				displayName: 'Traffic Allocation',
				name: 'trafficAllocation',
				type: 'string',
				default: '',
				description: 'Traffic split percentages (comma-separated)',
			},
		],
	},
	// Variant update fields
	{
		displayName: 'Update Fields',
		name: 'variantUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['updateVariant'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Variant name',
			},
			{
				displayName: 'Variables (JSON)',
				name: 'variables',
				type: 'json',
				default: '{}',
				description: 'Variant variables as JSON',
			},
			{
				displayName: 'Weight (%)',
				name: 'weight',
				type: 'number',
				default: 50,
				description: 'Traffic weight percentage',
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
				resource: ['abTest'],
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
					{ name: 'Running', value: 'running' },
				],
				default: '',
				description: 'Filter by test status',
			},
		],
	},
	// Results options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['abTest'],
				operation: ['getResults'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Results end date',
			},
			{
				displayName: 'Include Confidence Intervals',
				name: 'includeConfidenceIntervals',
				type: 'boolean',
				default: true,
				description: 'Whether to include confidence intervals in results',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Results start date',
			},
		],
	},
];
