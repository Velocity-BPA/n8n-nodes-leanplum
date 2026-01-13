/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LeanplumApi implements ICredentialType {
	name = 'leanplumApi';
	displayName = 'Leanplum API';
	documentationUrl = 'https://docs.leanplum.com/reference/api-overview';
	properties: INodeProperties[] = [
		{
			displayName: 'App ID',
			name: 'appId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your Leanplum Application ID. Found in App Settings > Keys & Settings.',
		},
		{
			displayName: 'Production Key',
			name: 'productionKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Production API Key for full access to production operations',
		},
		{
			displayName: 'Development Key',
			name: 'developmentKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Development API Key for testing and development environments',
		},
		{
			displayName: 'Data Export Key',
			name: 'dataExportKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Data Export API Key for export operations',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Development',
					value: 'development',
				},
			],
			default: 'production',
			required: true,
			description: 'Select the environment to use',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				appId: '={{$credentials.appId}}',
				clientKey: '={{$credentials.environment === "production" ? $credentials.productionKey : $credentials.developmentKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.leanplum.com/api',
			qs: {
				appId: '={{$credentials.appId}}',
				clientKey: '={{$credentials.environment === "production" ? $credentials.productionKey : $credentials.developmentKey}}',
				apiVersion: '1.0.6',
				action: 'getVars',
			},
			method: 'POST',
		},
	};
}
