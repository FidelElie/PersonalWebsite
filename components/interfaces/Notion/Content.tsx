import type { SimpleBlock } from "@/library/integrations/notion";

import Prose from "./Prose";

const Content = (props: ContentProps) => {
	const { nodes } = props;

	return (
		<>
			{
				nodes.map((node, nodeIndex) => {
					const ProseComponent = Prose[node.type];

					if (node.type === "section") {
						return (
							<ProseComponent
								key={nodeIndex}
								{...{...node, contents: <Content nodes={node.contents as SimpleBlock[]}/> } as any}
							/>
						)
					}

					return <ProseComponent {...node as any} key={nodeIndex}/>
				})
			}
		</>
	)
}

interface ContentProps {
	nodes: SimpleBlock[]
}

export default Content;
export type { ContentProps };
