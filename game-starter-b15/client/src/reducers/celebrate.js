import {UPDATE_CELEBRATE} from '../actions/games'

const initialState = "WIP"

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case UPDATE_CELEBRATE:
			return state = payload

		default:
      return state
	}
}
