/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

 import * as _ from 'lodash';
 import { connect } from 'react-redux';
 import { updateSelectedMeter } from '../actions/admin';
 import MeterDropdownComponent from '../components/MeterDropDownComponent';
 import { State } from '../types/redux/state';
 import { Dispatch } from '../types/redux/actions';
 import { MeterMetadata, MetersState, } from '../types/redux/meters';
 import { metersInGroup, setIntersect, unitsCompatibleWithMeters } from '../utils/determineCompatibleUnits';
 import meters from 'reducers/meters';
 import { metersApi } from 'utils/api';
 import Meter from '/home/ubermensch/OED/src/server/models/Meter';
 
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
 
 export function getvisibleMeters(state: State) {
	 let visibleMeters;
	 if (state.admin) {
		 // Can see all meters that don't have null for unit
		 visibleMeters = Meter.getUnitNotNull
		 //state.meters.isFetching.valueOf 
	 }
 
	 else {
		 // regular user or not logged in so only displayable ones
		 visibleMeters = Meter.getDisplayable
	 }
	 // meters that can graph
	 let compatibleMeters = new Set<number>();
	 // meters that cannot graph.
	 let incompatibleMeters = new Set<number>();
 
	 const M = new Set<number>();
 
	 if (state.graph.selectedUnit == -99) {
		 // If there is no graphic unit then no meters/groups are displayed and you can display all meters.
		 //  Also, if not admin, then meters not displayable are not viewable.
		 // admin can see all except if unit is null (not included in ones gotten above). 
		 compatibleMeters.forEach = visibleMeters;
	 }
	 // If displayable is false then only admin.
	 else {
		 // {M} means turn M into a set.
		 state.graph.selectedMeters.forEach(meter => {//for each visibleMeters M 
			 M.add(meter)
			 const newUnits = unitsCompatibleWithMeters(M)
			 if (newUnits)//graphicUnit is in units
			 {
				 // The compatible units of the meter have graphic unit so can graph (case 1)
				 compatibleMeters = M;
			 }
			 else {
				 // Case 2
				 incompatibleMeters = M;
			 }
		 })
	 }
	 //Ready to display meters in menu. Note you display the identifier and not the id.
	 //For each compatibleUnit C add name C.identifier to meter menu in alphabetically sorted order in regular font for case 1
	 //ForAdd each incompatibleUnit I add name I.identifier to meter menu in alphabetically sorted order as grayed out and not selectable for case 2
 }
 export default connect(mapStateToProps, mapDispatchToProps)(MeterDropdownComponent);
