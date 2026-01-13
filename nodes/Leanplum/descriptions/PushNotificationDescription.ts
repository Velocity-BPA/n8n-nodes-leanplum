/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const pushNotificationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pushNotification'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a scheduled push notification',
				action: 'Cancel push notification',
			},
			{
				name: 'Create Template',
				value: 'createTemplate',
				description: 'Create a push notification template',
				action: 'Create push template',
			},
			{
				name: 'Delete Template',
				value: 'deleteTemplate',
				description: 'Delete a push notification template',
				action: 'Delete push template',
			},
			{
				name: 'Get Delivery Stats',
				value: 'getDeliveryStats',
				description: 'Get push notification delivery statistics',
				action: 'Get delivery statistics',
			},
			{
				name: 'Get Templates',
				value: 'getTemplates',
				description: 'Get all push notification templates',
				action: 'Get push templates',
			},
			{
				name: 'Schedule',
				value: 'schedule',
				description: 'Schedule a push notification',
				action: 'Schedule push notification',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send a push notification',
				action: 'Send push notification',
			},
			{
				name: 'Send to Segment',
				value: 'sendToSegment',
				description: 'Send push notification to a segment',
				action: 'Send push to segment',
			},
			{
				name: 'Send to User',
				value: 'sendToUser',
				description: 'Send push notification to a specific user',
				action: 'Send push to user',
			},
			{
				name: 'Update Template',
				value: 'updateTemplate',
				description: 'Update a push notification template',
				action: 'Update push template',
			},
		],
		default: 'sendToUser',
	},
];

export const pushNotificationFields: INodeProperties[] = [
	// User ID for sendToUser
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		description: 'Target user ID',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['sendToUser'],
			},
		},
	},
	// Multiple user IDs for send
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated list of user IDs',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['send'],
			},
		},
	},
	// Segment ID for sendToSegment
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		default: '',
		description: 'Target segment ID',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['sendToSegment'],
			},
		},
	},
	// Message text
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		description: 'Push notification message text',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['send', 'sendToUser', 'sendToSegment', 'schedule'],
			},
		},
	},
	// Notification ID for cancel/getDeliveryStats
	{
		displayName: 'Notification ID',
		name: 'notificationId',
		type: 'string',
		required: true,
		default: '',
		description: 'Push notification identifier',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['cancel', 'getDeliveryStats'],
			},
		},
	},
	// Template ID
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'Push template identifier',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['updateTemplate', 'deleteTemplate'],
			},
		},
	},
	// Template name for create
	{
		displayName: 'Template Name',
		name: 'templateName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name for the push template',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['createTemplate'],
			},
		},
	},
	// Template message
	{
		displayName: 'Template Message',
		name: 'templateMessage',
		type: 'string',
		required: true,
		default: '',
		description: 'Default message for the template',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['createTemplate'],
			},
		},
	},
	// Delivery time for schedule
	{
		displayName: 'Delivery Time',
		name: 'deliveryTime',
		type: 'dateTime',
		required: true,
		default: '',
		description: 'When to deliver the push notification',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['schedule'],
			},
		},
	},
	// Target users for schedule
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated list of user IDs',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['schedule'],
			},
		},
	},
	// Return all for getTemplates
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['getTemplates'],
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
				resource: ['pushNotification'],
				operation: ['getTemplates'],
				returnAll: [false],
			},
		},
	},
	// Additional fields for send operations
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['send', 'sendToUser', 'sendToSegment', 'schedule'],
			},
		},
		options: [
			{
				displayName: 'Android Options (JSON)',
				name: 'androidOptions',
				type: 'json',
				default: '{}',
				description: 'Android-specific push options as JSON',
			},
			{
				displayName: 'Badge',
				name: 'badge',
				type: 'number',
				default: 0,
				description: 'Badge count (iOS)',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Notification category for action buttons',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom data payload as JSON',
			},
			{
				displayName: 'Expiration Time',
				name: 'expirationTime',
				type: 'dateTime',
				default: '',
				description: 'When the push notification expires',
			},
			{
				displayName: 'iOS Options (JSON)',
				name: 'iosOptions',
				type: 'json',
				default: '{}',
				description: 'iOS-specific push options as JSON',
			},
			{
				displayName: 'Sound',
				name: 'sound',
				type: 'string',
				default: 'default',
				description: 'Notification sound',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Push notification title',
			},
			{
				displayName: 'Web Options (JSON)',
				name: 'webOptions',
				type: 'json',
				default: '{}',
				description: 'Web push specific options as JSON',
			},
		],
	},
	// Additional fields for createTemplate
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['createTemplate'],
			},
		},
		options: [
			{
				displayName: 'Android Options (JSON)',
				name: 'androidOptions',
				type: 'json',
				default: '{}',
				description: 'Android-specific options as JSON',
			},
			{
				displayName: 'Badge',
				name: 'badge',
				type: 'number',
				default: 0,
				description: 'Default badge count',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Default notification category',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Default custom data as JSON',
			},
			{
				displayName: 'iOS Options (JSON)',
				name: 'iosOptions',
				type: 'json',
				default: '{}',
				description: 'iOS-specific options as JSON',
			},
			{
				displayName: 'Sound',
				name: 'sound',
				type: 'string',
				default: 'default',
				description: 'Default notification sound',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Default push notification title',
			},
		],
	},
	// Update fields for templates
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pushNotification'],
				operation: ['updateTemplate'],
			},
		},
		options: [
			{
				displayName: 'Android Options (JSON)',
				name: 'androidOptions',
				type: 'json',
				default: '{}',
				description: 'Android-specific options as JSON',
			},
			{
				displayName: 'Badge',
				name: 'badge',
				type: 'number',
				default: 0,
				description: 'Badge count',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Notification category',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom data as JSON',
			},
			{
				displayName: 'iOS Options (JSON)',
				name: 'iosOptions',
				type: 'json',
				default: '{}',
				description: 'iOS-specific options as JSON',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Template message',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Template name',
			},
			{
				displayName: 'Sound',
				name: 'sound',
				type: 'string',
				default: '',
				description: 'Notification sound',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Push notification title',
			},
		],
	},
];
