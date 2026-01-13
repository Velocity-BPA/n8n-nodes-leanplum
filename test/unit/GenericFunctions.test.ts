/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	parseJson,
	toUnixTimestamp,
	buildSegmentFilters,
	buildAbTestVariants,
} from '../../nodes/Leanplum/transport/GenericFunctions';

describe('GenericFunctions', () => {
	describe('parseJson', () => {
		it('should parse valid JSON string', () => {
			const input = '{"key": "value"}';
			const result = parseJson(input);
			expect(result).toEqual({ key: 'value' });
		});

		it('should return empty object for invalid JSON', () => {
			const input = 'invalid json';
			const result = parseJson(input);
			expect(result).toEqual({});
		});

		it('should return object as-is if already an object', () => {
			const input = { key: 'value' };
			const result = parseJson(input);
			expect(result).toEqual({ key: 'value' });
		});
	});

	describe('toUnixTimestamp', () => {
		it('should convert date string to Unix timestamp', () => {
			const dateString = '2024-01-15T12:00:00.000Z';
			const result = toUnixTimestamp(dateString);
			expect(result).toBe(1705320000);
		});

		it('should handle ISO date strings', () => {
			const dateString = '2024-06-01T00:00:00Z';
			const result = toUnixTimestamp(dateString);
			expect(typeof result).toBe('number');
			expect(result).toBeGreaterThan(0);
		});
	});

	describe('buildSegmentFilters', () => {
		it('should build attribute filters', () => {
			const input = {
				attributeFilters: {
					filter: [
						{ attribute: 'country', operator: 'equals', value: 'US' },
					],
				},
			};
			const result = buildSegmentFilters(input);
			expect(result).toEqual([
				{ type: 'attribute', attribute: 'country', operator: 'equals', value: 'US' },
			]);
		});

		it('should build behavior filters', () => {
			const input = {
				behaviorFilters: {
					filter: [
						{ event: 'purchase', operator: 'greater_than', value: 5, timeRange: '30d' },
					],
				},
			};
			const result = buildSegmentFilters(input);
			expect(result).toEqual([
				{ type: 'behavior', event: 'purchase', operator: 'greater_than', value: 5, timeRange: '30d' },
			]);
		});

		it('should build event filters', () => {
			const input = {
				eventFilters: {
					filter: [
						{ eventName: 'app_open', operator: 'at_least', count: 3 },
					],
				},
			};
			const result = buildSegmentFilters(input);
			expect(result).toEqual([
				{ type: 'event', eventName: 'app_open', operator: 'at_least', count: 3 },
			]);
		});

		it('should return empty array for empty input', () => {
			const result = buildSegmentFilters({});
			expect(result).toEqual([]);
		});
	});

	describe('buildAbTestVariants', () => {
		it('should build variants array', () => {
			const input = {
				variant: [
					{ name: 'Control', weight: 50, variables: '{"color": "blue"}' },
					{ name: 'Test', weight: 50, variables: '{"color": "red"}' },
				],
			};
			const result = buildAbTestVariants(input);
			expect(result).toEqual([
				{ name: 'Control', weight: 50, variables: { color: 'blue' } },
				{ name: 'Test', weight: 50, variables: { color: 'red' } },
			]);
		});

		it('should handle empty variants', () => {
			const result = buildAbTestVariants({});
			expect(result).toEqual([]);
		});

		it('should handle variants without variables', () => {
			const input = {
				variant: [
					{ name: 'Control', weight: 100 },
				],
			};
			const result = buildAbTestVariants(input);
			expect(result).toEqual([
				{ name: 'Control', weight: 100, variables: {} },
			]);
		});
	});
});
