import os
import re
from datetime import datetime

ICON_FILE_PATH = "./public/remixicon.symbol.svg"
ICON_DESINATION_PATH = "./components/core/Data/Icon.data.ts"

FIND_IDS_REGEXP = "id=\"[\w\d-]+\""
TYPE_REGEXP = "(fill$|line$)"
REPLACEMENT_REGEXP = "(id=|ri-|\"|-fill|-line)"

def extract_types_from_identifiers(identifiers):
	types = []

	for _id in identifiers:
		extracted_type = re.search(TYPE_REGEXP, _id)

		if (extracted_type != None and extracted_type.group() not in types):
			types.append(extracted_type.group())

	return types

def generate_icon_map(names, identifiers):
	icon_map = {
		name: extract_types_from_identifiers(
			list(filter(lambda x: name in x, identifiers)
		)) for name in names
	}

	return icon_map


def populate_icon_data():
	startime = datetime.now()
	with open(ICON_FILE_PATH, "r") as icon_file:
		svg_file_contents = icon_file.read()

	icon_matches = re.findall(FIND_IDS_REGEXP, svg_file_contents)

	clean_id_match = lambda match: re.sub("(id=|\")", "", match)
	get_icon_name = lambda match: re.sub(REPLACEMENT_REGEXP, "", match)

	icon_identifiers = [clean_id_match(match) for match in icon_matches]

	icon_names = [get_icon_name(identifier) for identifier in icon_identifiers]

	icon_map = generate_icon_map(icon_names, icon_identifiers)

	print("Total icons to parse to type: {}".format(len(icon_map)))

	print(f"Writing icon_identifiers to {ICON_DESINATION_PATH}")

	with open(os.path.join(ICON_DESINATION_PATH), "w") as icon_file:
		icon_file.write("\n".join([
			"export const iconNames = [",
			*[f"\t\"{icon}\"," for icon in icon_map],
			"] as const;",
			"",
			"export const iconsMap = {",
			*[f"\t\"{x}\": {y}," for x, y in icon_map.items()],
			"} as {",
			"\t[key in typeof iconNames[number]]: (\"fill\" | \"line\")[]",
			"};",
			"",
			"export const iconIdentifiers = [",
			*[f"\t\"{icon}\"," for icon in icon_identifiers],
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
