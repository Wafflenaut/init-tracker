export const setPlayersWinTies = ( playersWinTies = false) => ({
	type: 'SET_PLAYERS_WIN_TIES',
	playersWinTies
});

export const setCurrentCombatant = ( currentCombatantId = '', currentCombatantOrder = 0) => ({
	type: 'SET_CURRENT_COMBATANT',
	currentCombatantId,
	currentCombatantOrder
});

export const startSetCurrentCombastant = (currentCombatantId = '', currentCombatantOrder = 0) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/filters`).update({
			currentCombatantId,
			currentCombatantOrder
		}).then(() => {
			dispatch(setCurrentCombatant(currentCombatantId, currentCombatantOrder));
		});
	};
};

export const setLibraryNpcTypeFilter = ( NpcType = 'None') => ({
	type: 'SET_NPCTYPE_FILTER',
	text
});

export const setNameFilter = ( name = '') => ({
	type: 'SET_TEXT_FILTER',
	name
});

export const setFilterBySurprised = (filterBySurprise = true) => ({
	type: 'FILTER_BY_SURPRISED',
	filterBySurprise
});
