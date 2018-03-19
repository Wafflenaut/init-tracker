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
