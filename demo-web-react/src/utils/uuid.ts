/**
A function that returns a universally unique identifier (uuid).  
example: 1b83fd69-abe7-468c-bea1-306a8aa1c81d
@returns `string` : 32 character uuid (see example)
*/

// For generate the random id string
export function uuidSmall(length: number = 18) {
	const hashTable = [
		"a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"
	];

	let uuid: string[] = [];
	for (let i = 0; i < length; i++) {
		if (i === 8 || i === 13 || i === 18 || i === 23) {
			uuid[i] = "_";
		} else {
			uuid[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
		}
	}
	return uuid.join("");
}