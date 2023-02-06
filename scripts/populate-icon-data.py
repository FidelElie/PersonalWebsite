import os
import re
from datetime import datetime

ICON_FILE_PATH = "./node_modules/remixicon/fonts/remixicon.css"
ICON_DESINATION_PATH = "./components/core/Data/Icon.data.ts"

LINE_REXEXP = "^.ri-[\w\d-]+(:before){1}"
TYPE_REGEXP = "(fill|line)"
REPLACEMENT_REGEXP = "(.ri-|-fill|-line)"

def populate_icon_data():
	startime = datetime.now()
	with open(ICON_FILE_PATH, "r") as icon_file:
		icon_css = icon_file.readlines()

	iconNames = {}
	iconRules = []
	skipped_icons = []

	for line in icon_css:
		if (":before" in line):
			icon_rule = re.search(LINE_REXEXP, line)

			if icon_rule == None:
				skipped_icons.append(line)
				continue

			match = icon_rule.group()

			split_line = match.split(":before")
			iconRules.append(split_line[0].replace(".", ""))

			name = re.sub(REPLACEMENT_REGEXP, "", split_line[0])

			if (name not in iconNames):
				iconNames[name] = []

			iconType = re.search(TYPE_REGEXP, split_line[0])

			if (iconType != None):
				iconNames[name].append(iconType.group())

	print("Total icon parse to type: {}".format(len(iconNames)))
	print("Total iconNames skipped: {}".format(len(skipped_icons)))

	if (len(skipped_icons) > 0):
		print("Skipped rules:")
		for line in skipped_icons:
			print(line)

	print(f"Writing iconNames to {ICON_DESINATION_PATH}")

	with open(os.path.join(ICON_DESINATION_PATH), "w") as icon_file:
		icon_file.write("\n".join([
			"export const iconNames = [",
			*[f"\t\"{icon}\"," for icon in iconNames],
			"] as const;",
			"",
			"export const iconsMap = {",
			*[f"\t\"{x}\": {y}," for x, y in iconNames.items()],
			"} as {",
			"\t[key in typeof iconNames[number]]: (\"fill\" | \"line\")[]"
			"};",
			"",
			"export const iconIdentifiers = [",
			*[f"\t\"{icon}\"," for icon in iconRules],
			"] as const;",
			""
		]))

	duration = datetime.now() - startime
	print(
		f"Parsing complete in {duration.total_seconds() * 1000} milliseconds"
	);

if __name__ == "__main__":
	if not os.path.isfile("package.json"):
		raise Exception("Script must be run from root directory")

	populate_icon_data();
