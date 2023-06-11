import { Copy, Flex, Heading, Toggle } from "@/components/core";
import { useResumeBuilder } from "../../ResumeBuilderProvider";

export const SidebarSettings = () => {
	const { settings } = useResumeBuilder();

	return (
		<Flex.Column className="space-y-3 pr-1">
			<SettingsToggle
				label="Show Descriptions (Not recommended)"
				description="Display project and work experience descriptions instead of listing points."
				checked={settings.useDescriptions}
				setting="useDescriptions"
			/>
			<SettingsToggle
				label="Show React Tag"
				description="Display 'Made With React' tag on CV."
				checked={settings.showReactTag}
				setting="showReactTag"
			/>
			<SettingsToggle
				label="Show Website Link"
				description="Show link to the website on CV."
				checked={settings.showWebsiteLink}
				setting="showWebsiteLink"
			/>
		</Flex.Column>
	)
}

const SettingsToggle = (props: SettingsToggleProps) => {
	const { label, description, checked, setting } = props;
	const { editSettings } = useResumeBuilder();

	return (
		<Flex.Column>
			<Flex.Row className="space-x-2 items-start justify-between">
				<Heading.Three className="text-black" light underline>{label}</Heading.Three>
				<Toggle
					label={label}
					checked={checked}
					className="w-12"
					onChange={value => editSettings({ [setting]: value })}
				/>
			</Flex.Row>
			<Copy className="text-sm">{description}</Copy>
		</Flex.Column>
	)
}

interface SettingsToggleProps {
	label: string;
	description: string;
	checked: boolean;
	setting: string;

}
