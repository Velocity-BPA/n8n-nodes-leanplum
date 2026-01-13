/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions } from 'n8n-workflow';
import { leanplumExportRequest, leanplumRequestAllItems, toUnixTimestamp, parseJson, pollExportJob } from '../../transport/GenericFunctions';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	let responseData: any;

	switch (operation) {
		case 'exportData': {
			const exportType = this.getNodeParameter('exportType', index) as string;

			const body: any = { exportType };

			const exportOptions = this.getNodeParameter('exportOptions', index, {}) as any;
			if (exportOptions.startDate) body.startDate = toUnixTimestamp(exportOptions.startDate);
			if (exportOptions.endDate) body.endDate = toUnixTimestamp(exportOptions.endDate);
			if (exportOptions.format) body.format = exportOptions.format;

			// S3 options
			if (exportOptions.s3BucketName) body.s3BucketName = exportOptions.s3BucketName;
			if (exportOptions.s3AccessKey) body.s3AccessKey = exportOptions.s3AccessKey;
			if (exportOptions.s3SecretKey) body.s3SecretKey = exportOptions.s3SecretKey;
			if (exportOptions.s3Region) body.s3Region = exportOptions.s3Region;
			if (exportOptions.s3Path) body.s3Path = exportOptions.s3Path;

			// GCS options
			if (exportOptions.gcsBucket) body.gcsBucket = exportOptions.gcsBucket;
			if (exportOptions.gcsCredentials) body.gcsCredentials = parseJson(exportOptions.gcsCredentials);
			if (exportOptions.gcsPath) body.gcsPath = exportOptions.gcsPath;

			const waitForCompletion = this.getNodeParameter('waitForCompletion', index, false) as boolean;

			responseData = await leanplumExportRequest.call(this, 'exportData', body);

			if (waitForCompletion && responseData.jobId) {
				responseData = await pollExportJob.call(this, responseData.jobId);
			}
			break;
		}

		case 'getExportJob': {
			const jobId = this.getNodeParameter('jobId', index) as string;

			responseData = await leanplumExportRequest.call(this, 'getExportJobStatus', { jobId });
			break;
		}

		case 'getExportJobs': {
			const returnAll = this.getNodeParameter('returnAll', index) as boolean;

			const body: any = {};

			const filters = this.getNodeParameter('filters', index, {}) as any;
			if (filters.exportType) body.exportType = filters.exportType;
			if (filters.status) body.status = filters.status;

			if (returnAll) {
				responseData = await leanplumRequestAllItems.call(this, 'getExportJobs', body);
			} else {
				const limit = this.getNodeParameter('limit', index) as number;
				responseData = await leanplumRequestAllItems.call(this, 'getExportJobs', body, limit);
			}
			break;
		}

		case 'cancelExport': {
			const jobId = this.getNodeParameter('jobId', index) as string;

			responseData = await leanplumExportRequest.call(this, 'cancelExportJob', { jobId });
			break;
		}

		case 'getDataSchema': {
			const exportType = this.getNodeParameter('exportType', index) as string;

			responseData = await leanplumExportRequest.call(this, 'getDataSchema', { exportType });
			break;
		}

		case 'downloadExport': {
			const jobId = this.getNodeParameter('jobId', index) as string;

			responseData = await leanplumExportRequest.call(this, 'getExportDownloadUrl', { jobId });
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	return responseData;
}
