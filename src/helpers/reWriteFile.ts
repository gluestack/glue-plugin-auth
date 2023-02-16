import { readFile, writeFile } from "@gluestack/helpers";

// Replaces file's content with the given database name
const reWriteFile = async (filePath: string, instanceName: string, defaultVar = 'services') => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await readFile(filePath, "utf8");
			data = data.replaceAll(defaultVar, instanceName);

			await writeFile(filePath, data);
			resolve('done');
		} catch (err) {
			reject(err)
		}
	})
}

export default reWriteFile
