import fs from "fs";
import path from "path";
import { Command } from "commander";

const program = new Command();

program.command("init").action(() => {
	const templatePath = path.join(process.cwd(), ".env.template");

	if (fs.existsSync(templatePath)) {
		throw new Error("Your env template file already exists.")
	}

	fs.writeFile(templatePath, "", () => {
		console.log("Your env template file was created successfully.");
	});
});

program.command("types").action(() => {
	const declarationFile = "environment.d.ts";
	const templatePath = path.join(process.cwd(), ".env.template");
	const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
	const contents = fs.readFileSync(templatePath, { encoding: "utf8", flag: "r" });

	const envContentsMap = contents.split("\n").map(line => {
		if (line.trim().startsWith("#")) {
			return { type: "comment", content: line.replace("#", "").trim() };
		} else if (line.includes("=")) {
			return { type: "variable", content: line.split("=")[0] };
		} else {
			return { type: "empty", content: "" };
		}
	}).filter(map => map.type !== "empty");

	const fileContents = [
		"declare global {",
		indentLine("namespace NodeJS {", 1),
		indentLine("interface ProcessEnv {", 2),
		indentLine("NODE_ENV: \"development\" | \"staging\" | \"production\";", 3),
		...envContentsMap.map(map => {
			switch (map.type) {
				case "comment":
					return indentLine(`// ${map.content}`, 3);
				case "variable":
					return indentLine(`${map.content}?: string;`, 3);
				default:
					// Shouldn't hit this
					throw new Error("Unknown line type added to env file");
			}
		}),
		indentLine("}", 2),
		indentLine("}", 1),
		"}",
		"",
		"export {};"
	].join("\n");

	fs.writeFileSync(declarationFile, fileContents);

	const tsconfigContents = JSON.parse(
		fs.readFileSync(tsconfigPath, { encoding: "utf8", flag: "r" }).trim()
	);

	if (!tsconfigContents.include || !tsconfigContents["include"].includes(declarationFile)) {
		const updatedContents = {
			...tsconfigContents,
			include: (tsconfigContents.include ?? []).concat(declarationFile)
		}

		console.log("Writing declaration to tsconfig file");

		fs.writeFileSync(tsconfigPath, JSON.stringify(updatedContents, null, 2));
	}

	console.log("Environment types were generated successfully");
});

const indentLine = (text: string, numberOfTabs = 0) => {
	return `${(new Array(numberOfTabs).fill("\t")).join("")}${text}`;
}

program.parse(process.argv);

