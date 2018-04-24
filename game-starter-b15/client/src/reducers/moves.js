import {UPDATE_GAME_SUCCESS} from '../actions/games'

export default function (state = 0, {type, payload}) {
	switch (type) {
		case UPDATE_GAME_SUCCESS:
			return state = state+1


		default:
      return state
	}
}
