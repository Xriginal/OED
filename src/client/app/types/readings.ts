/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ChartTypes } from './redux/graph';

export interface CompareReading {
	curr_use: number;
	prev_use: number;
}

export interface CompareReadings {
	[id: number]: CompareReading;
}

export interface ExportDataSet {
	label: string;
	id: number;
	currentChart: ChartTypes;
	/* tslint:disable:array-type */
	exportVals: Array<{ x: number, y: number, z: number }>;
	/* tslint:enable:array-type */
}

export interface RawReadings {
	label: string,
	reading: number,
	startTimestamp: string,
	endTimestamp: string
}
