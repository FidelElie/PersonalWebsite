import NextImage, { StaticImageData } from "next/image";

import { joinClasses } from "@/library/utilities";

const Image = (props: ImageProps) => {
	const {
		className,
		src,
		fit,
		loading,
		onLoadingComplete,
		unoptimized
	} = props;
	return (
		<NextImage
			className={joinClasses("Image", {
				[className as string]: className
			})}
			src={src}
			objectFit={fit}
			loading={loading}
			onLoadingComplete={onLoadingComplete}
			unoptimized={unoptimized}
			placeholder="blur"
			layout="fill"
		/>
	)
}

interface ImageProps {
	src: string | StaticImageData,
	className?: string,
	fit?: "fill" | "contain" | "cover" | "none" | "scale-down",
	loading?: "lazy" | "eager",
	onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number; }) => void,
	unoptimized?: boolean
}
export default Image;
export type { ImageProps }
