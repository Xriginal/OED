/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as _ from 'lodash';
import { connect } from 'react-redux';
import { updateSelectedMeter } from '../actions/admin';
import MeterDropdownComponent from '../components/MeterDropDownComponent';
import { State } from '../types/redux/state';
import { Dispatch } from '../types/redux/actions';
import { Units } from '../types/redux/units'
import { metersInGroup, setIntersect, unitsCompatibleWithMeters } from '../utils/determineCompatibleUnits';
import { changeSelectedGroups, changeSelectedMeters, changeSelectedUnit } from '../actions/graph';
import { UpdateImportMeterAction } from '../types/redux/admin';
import meters from 'reducers/meters';


/**
 * @param {State} state
 */
function mapStateToProps(state: State) {
	return {
		meters: _.sortBy(_.values(state.meters.byMeterID).map(meter => ({ id: meter.id, name: meter.name.trim() })), 'name')
	};
}
function mapDispatchToProps(dispatch: Dispatch) {
	return {
		updateSelectedMeter: (meterID: number) => dispatch(updateSelectedMeter(meterID))
	};
}

export function getvisibleMeters(state: State)
{
	if(state.admin)
	{
		visibleMeters = Meters.getNoUnitNotNull()
	}
	else
	{
		visibleMeters = Meters.getDisplayable()
	}
	let compatibleMeters = new Set<number>();
	let incompatibleMeters = new Set<number>();
	let M = new Set<number>();
	if(graphicUnit === -99 )
	{
		compatibleMeters = visibleMeters;
	}
	else
	{
		state.meters.isFetching(state).forEach(M => {
			const newUnits = unitsCompatibleWithMeters({M})
			if(Units)
			{
				compatibleMeters.add(M.id);
			}
			else
			{
				incompatibleMeters.add(M.id);
			}
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MeterDropdownComponent);
