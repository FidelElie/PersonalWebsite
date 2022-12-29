import NextImage from "next/image";
import type { ComponentProps } from "react";
import clsx from "clsx";

const Image = (props: ImageProps) => {
	const { className, ...imageProps } = props;

	return (
		<div className={clsx("relative", className)}>
			<NextImage
				{...imageProps}
				fill
			/>
		</div>
	)
}

interface ImageProps extends ComponentProps<typeof NextImage> { }

export default Image;
export type { ImageProps }
