export const streamToUnit8Array = async (stream: ReadableStream<Uint8Array>) => {
	const reader = stream.getReader();

	const chunks: Uint8Array[] = [];

	while (true) {
		const { done, value } = await reader.read();

		if (done) { break; }

		chunks.push(value);
	}

	const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);

	const joinedArray = new Uint8Array(totalLength);

	let offset = 0;
	for (const chunk of chunks) {
		joinedArray.set(chunk, offset);
		offset += chunk.length;
	}

	return joinedArray;
}
