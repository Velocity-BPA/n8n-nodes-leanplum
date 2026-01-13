/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const exportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['export'],
			},
		},
		options: [
			{
				name: 'Cancel Export',
				value: 'cancelExport',
				description: 'Cancel a running export job',
				action: 'Cancel export',
			},
			{
				name: 'Download Export',
				value: 'downloadExport',
				description: 'Get export download URL',
				action: 'Download export',
			},
			{
				name: 'Export Data',
				value: 'exportData',
				description: 'Start a data export job',
				action: 'Export data',
			},
			{
				name: 'Get Data Schema',
				value: 'getDataSchema',
				description: 'Get the export data schema',
				action: 'Get data schema',
			},
			{
				name: 'Get Export Job',
				value: 'getExportJob',
				description: 'Get export job status',
				action: 'Get export job status',
			},
			{
				name: 'Get Export Jobs',
				value: 'getExportJobs',
				description: 'List all export jobs',
				action: 'Get export jobs',
			},
		],
		default: 'exportData',
	},
];

export const exportFields: INodeProperties[] = [
	// Export type
	{
		displayName: 'Export Type',
		name: 'exportType',
		type: 'options',
		required: true,
		options: [
			{ name: 'Events', value: 'events' },
			{ name: 'Messages', value: 'messages' },
			{ name: 'Sessions', value: 'sessions' },
			{ name: 'Users', value: 'users' },
		],
		default: 'users',
		description: 'Type of data to export',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData', 'getDataSchema'],
			},
		},
	},
	// Job ID
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		default: '',
		description: 'Export job identifier',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['getExportJob', 'cancelExport', 'downloadExport'],
			},
		},
	},
	// Date range for export
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'Export start date',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'Export end date',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
			},
		},
	},
	// Return all for getExportJobs
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['getExportJobs'],
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
				resource: ['export'],
				operation: ['getExportJobs'],
				returnAll: [false],
			},
		},
	},
	// Destination options for export
	{
		displayName: 'Destination',
		name: 'destination',
		type: 'options',
		required: true,
		options: [
			{ name: 'Amazon S3', value: 's3' },
			{ name: 'Google Cloud Storage', value: 'gcs' },
		],
		default: 's3',
		description: 'Export destination',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
			},
		},
	},
	// S3 configuration
	{
		displayName: 'S3 Bucket Name',
		name: 's3BucketName',
		type: 'string',
		required: true,
		default: '',
		description: 'AWS S3 bucket name',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
				destination: ['s3'],
			},
		},
	},
	{
		displayName: 'S3 Access Key',
		name: 's3AccessKey',
		type: 'string',
		required: true,
		default: '',
		description: 'AWS S3 access key ID',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
				destination: ['s3'],
			},
		},
	},
	{
		displayName: 'S3 Secret Key',
		name: 's3SecretKey',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		description: 'AWS S3 secret access key',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
				destination: ['s3'],
			},
		},
	},
	// GCS configuration
	{
		displayName: 'GCS Bucket',
		name: 'gcsBucket',
		type: 'string',
		required: true,
		default: '',
		description: 'Google Cloud Storage bucket name',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
				destination: ['gcs'],
			},
		},
	},
	{
		displayName: 'GCS Credentials (JSON)',
		name: 'gcsCredentials',
		type: 'json',
		required: true,
		default: '{}',
		description: 'GCS service account credentials as JSON',
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
				destination: ['gcs'],
			},
		},
	},
	// Additional export options
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['exportData'],
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
					{ name: 'Parquet', value: 'parquet' },
				],
				default: 'csv',
				description: 'Export file format',
			},
			{
				displayName: 'S3 Path Prefix',
				name: 's3PathPrefix',
				type: 'string',
				default: '',
				description: 'Path prefix within the S3 bucket',
			},
			{
				displayName: 'S3 Region',
				name: 's3Region',
				type: 'string',
				default: 'us-east-1',
				description: 'AWS region for the S3 bucket',
			},
			{
				displayName: 'Wait for Completion',
				name: 'waitForCompletion',
				type: 'boolean',
				default: false,
				description: 'Whether to wait for the export to complete before returning',
			},
		],
	},
	// Filters for getExportJobs
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['export'],
				operation: ['getExportJobs'],
			},
		},
		options: [
			{
				displayName: 'Export Type',
				name: 'exportType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Events', value: 'events' },
					{ name: 'Messages', value: 'messages' },
					{ name: 'Sessions', value: 'sessions' },
					{ name: 'Users', value: 'users' },
				],
				default: '',
				description: 'Filter by export type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Failed', value: 'failed' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Running', value: 'running' },
				],
				default: '',
				description: 'Filter by job status',
			},
		],
	},
];
