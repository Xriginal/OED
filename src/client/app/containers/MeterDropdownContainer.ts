/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/* Testing stuff and saving stuff just in case my computer bricks */

import * as _ from 'lodash';
import { connect } from 'react-redux';
import { updateSelectedMeter } from '../actions/admin';
import MeterDropdownComponent from '../components/MeterDropDownComponent';
import { State } from '../types/redux/state';
import { Dispatch } from '../types/redux/actions';
import { MeterMetadata, MetersState,  } from  '../types/redux/meters';
import { metersInGroup, setIntersect, unitsCompatibleWithMeters } from '../utils/determineCompatibleUnits';

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
export function getNoUnitNotNull()
{

}
export function getDisplayable()
{
	
}

export function getvisibleMeters(state: State)
{
	let visibleMeters = null;
	if(state.admin)
	{
		visibleMeters = getNoUnitNotNull()
		//state.meters.isFetching.valueOf 
	}
	
	else
	{
		visibleMeters = getDisplayable()
	}
	let compatibleMeters = new Set<number>();
	let incompatibleMeters = new Set<number>();
	let M = new Set<number>();
	if(state.graph.selectedMeters[1] === -99)
	{
		compatibleMeters.add(visibleMeters);
	}
	else
	{
		state.graph.selectedMeters.forEach(meter => {
			M.add(meter)
			const newUnits = unitsCompatibleWithMeters({M})
			if(newUnits)
			{
				compatibleMeters.add(M);
			}
			else
			{
				incompatibleMeters.add(M);
			}
		}
	})

}

export default connect(mapStateToProps, mapDispatchToProps)(MeterDropdownComponent);
}
