export const stringLimit = (name, limit = 25) => {
	return name.length > limit
		? name.slice(0, limit)+'...'
		: name
}

export default {stringLimit}