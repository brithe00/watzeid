import { create } from 'zustand';

export const useImagesStore = create((set) => ({
	images: [],
	addImages: (imageUrl, imageId) =>
		set((state) => ({
			images: [
				...state.images,
				{
					url: imageUrl,
					id: imageId,
				},
			],
		})),
}));
