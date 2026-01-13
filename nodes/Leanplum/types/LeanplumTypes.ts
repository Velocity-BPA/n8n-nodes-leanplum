/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { IDataObject } from 'n8n-workflow';

export interface ILeanplumCredentials {
	appId: string;
	productionKey: string;
	developmentKey?: string;
	dataExportKey?: string;
	environment: 'production' | 'development';
}

export interface ILeanplumApiResponse {
	response: ILeanplumResponseItem[];
}

export interface ILeanplumResponseItem {
	success: boolean;
	error?: {
		message: string;
	};
	warning?: {
		message: string;
	};
	[key: string]: unknown;
}

export interface ILeanplumUser {
	userId: string;
	deviceId?: string;
	userAttributes?: IDataObject;
	created?: number;
	modified?: number;
}

export interface ILeanplumMessage {
	id: number;
	name: string;
	messageType?: string;
	action?: IDataObject;
	whenTrigger?: IDataObject;
	whenLimit?: IDataObject;
	startTime?: number;
	endTime?: number;
	active?: boolean;
	targeting?: IDataObject;
	variants?: ILeanplumVariant[];
	created?: number;
}

export interface ILeanplumCampaign {
	id: number;
	name: string;
	description?: string;
	type?: 'lifecycle' | 'scheduled' | 'triggered';
	status?: 'draft' | 'running' | 'paused' | 'completed';
	startDate?: number;
	endDate?: number;
	goals?: IDataObject[];
	segments?: string[];
	exclusions?: string[];
}

export interface ILeanplumPushNotification {
	userId?: string;
	users?: string[];
	segment?: string;
	message: string;
	title?: string;
	data?: IDataObject;
	sound?: string;
	badge?: number;
	category?: string;
	iosOptions?: IDataObject;
	androidOptions?: IDataObject;
	webOptions?: IDataObject;
	expirationTime?: number;
	deliveryTime?: number;
}

export interface ILeanplumInAppMessage {
	id: number;
	name: string;
	layout?: 'center' | 'top' | 'bottom' | 'full' | 'interstitial';
	htmlContent?: string;
	imageUrl?: string;
	title?: string;
	body?: string;
	acceptButton?: IDataObject;
	dismissButton?: IDataObject;
	backgroundColor?: string;
	textColor?: string;
	triggerEvent?: string;
	displayLimit?: number;
	displayFrequency?: number;
}

export interface ILeanplumSegment {
	id: string;
	name: string;
	description?: string;
	filters?: IDataObject[];
	behaviorFilters?: IDataObject[];
	attributeFilters?: IDataObject[];
	eventFilters?: IDataObject[];
	dateRange?: IDataObject;
	userCount?: number;
}

export interface ILeanplumAbTest {
	id: string;
	name: string;
	hypothesis?: string;
	primaryGoal?: string;
	variants: ILeanplumVariant[];
	trafficAllocation?: number[];
	minimumDetectableEffect?: number;
	statisticalSignificance?: number;
	startDate?: number;
	endDate?: number;
	status?: 'draft' | 'running' | 'completed';
}

export interface ILeanplumVariant {
	id: string;
	name: string;
	weight?: number;
	variables?: IDataObject;
}

export interface ILeanplumEvent {
	event: string;
	value?: number;
	info?: string;
	params?: IDataObject;
	time?: number;
	userId?: string;
	deviceId?: string;
}

export interface ILeanplumVariable {
	name: string;
	value: unknown;
	kind?: string;
}

export interface ILeanplumExportJob {
	jobId: string;
	exportType: 'sessions' | 'users' | 'events' | 'messages';
	status: 'pending' | 'running' | 'completed' | 'failed';
	startDate?: number;
	endDate?: number;
	downloadUrl?: string;
}

export interface ILeanplumPaginatedResponse<T> {
	items: T[];
	totalCount: number;
	offset: number;
	limit: number;
}

export type LeanplumResource =
	| 'user'
	| 'message'
	| 'campaign'
	| 'pushNotification'
	| 'inAppMessage'
	| 'segment'
	| 'abTest'
	| 'event'
	| 'variable'
	| 'export';

export type UserOperation =
	| 'setUserAttributes'
	| 'getUserAttributes'
	| 'advanceState'
	| 'track'
	| 'trackPurchase'
	| 'incrementUserAttribute'
	| 'deleteUser'
	| 'getUser'
	| 'pauseSession'
	| 'resumeSession'
	| 'setDeviceAttributes'
	| 'unsetUserAttribute';

export type MessageOperation =
	| 'create'
	| 'get'
	| 'getMany'
	| 'update'
	| 'delete'
	| 'duplicate'
	| 'archive'
	| 'unarchive'
	| 'getStats'
	| 'pause'
	| 'resume'
	| 'schedule'
	| 'sendNow'
	| 'getVariants';

export type CampaignOperation =
	| 'create'
	| 'get'
	| 'getMany'
	| 'update'
	| 'delete'
	| 'start'
	| 'stop'
	| 'pause'
	| 'getReport'
	| 'getConversions'
	| 'getRetention'
	| 'duplicate';

export type PushNotificationOperation =
	| 'send'
	| 'sendToUser'
	| 'sendToSegment'
	| 'schedule'
	| 'cancel'
	| 'getDeliveryStats'
	| 'createTemplate'
	| 'getTemplates'
	| 'updateTemplate'
	| 'deleteTemplate';

export type InAppMessageOperation =
	| 'create'
	| 'get'
	| 'getMany'
	| 'update'
	| 'delete'
	| 'preview'
	| 'getStats'
	| 'duplicate'
	| 'activate'
	| 'deactivate';

export type SegmentOperation =
	| 'create'
	| 'get'
	| 'getMany'
	| 'update'
	| 'delete'
	| 'getUsers'
	| 'getSize'
	| 'export'
	| 'duplicate';

export type AbTestOperation =
	| 'create'
	| 'get'
	| 'getMany'
	| 'update'
	| 'delete'
	| 'start'
	| 'stop'
	| 'getResults'
	| 'declareWinner'
	| 'getVariants'
	| 'updateVariant';

export type EventOperation =
	| 'track'
	| 'trackBatch'
	| 'getEvents'
	| 'getEventProperties'
	| 'getEventCounts'
	| 'createEvent'
	| 'updateEvent'
	| 'deleteEvent'
	| 'exportEvents';

export type VariableOperation =
	| 'setVariables'
	| 'getVariables'
	| 'getDefaults'
	| 'sync'
	| 'getManyForUser'
	| 'forceContentUpdate';

export type ExportOperation =
	| 'exportData'
	| 'getExportJob'
	| 'getExportJobs'
	| 'cancelExport'
	| 'getDataSchema'
	| 'downloadExport';
