import React, { ReactNode, ElementType } from "react";
import classNames from "classnames";

const Heading = (props: HeadingProps) => {
	const {
		className,
		level = 1,
		// size,
		// color = "DEFAULT",
		// weight,
		// tracking,
		children
	} = props;

	const Tag = `h${level}` as ElementType;
	console.log(Tag)

	return (
		<Tag className={classNames(
			// size && theme.sizes[size],
			// color && theme.colors[color],
			// weight && theme.weights[weight],
			// tracking && theme.trackings[tracking],
			className
		)}>
			{children}
		</Tag>
	)
};

interface HeadingProps {
	level?: 1 | 2 | 3 | 4 | 5 | 6,
	className?: string,
	// size?: keyof typeof theme.sizes,
	// color?: keyof typeof theme.colors,
	// weight?: keyof typeof theme.weights,
	// tracking?: keyof typeof theme.trackings,
	children: ReactNode
}

type HeadingTypeProps = Omit<HeadingProps, "level">;

Heading.One = (props: HeadingTypeProps) => <Heading {...props} />;
Heading.Two = (props: HeadingTypeProps) => <Heading level={2} {...props} />;
Heading.Three = (props: HeadingTypeProps) => <Heading level={3} {...props} />;
Heading.Four = (props: HeadingTypeProps) => <Heading level={4} {...props} />;
Heading.Five = (props: HeadingTypeProps) => <Heading level={5} {...props} />;
Heading.Six = (props: HeadingTypeProps) => <Heading level={6} {...props} />;

export default Heading;
export type { HeadingProps }
