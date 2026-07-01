import { XIcon, ImageIcon, VideoIcon, UploadCloudIcon } from "lucide-react";

const MediaTab = ({
    coverImageFile,
    coverImagePreview,
    existingCoverImage,
    galleryFiles,
    galleryPreviews,
    existingGallery,
    formData,
    onCoverImageChange,
    onRemoveCoverImage,
    onGalleryChange,
    onRemoveExistingGallery,
    onRemoveNewGallery,
    setFormData,
}) => {
    const update = (field, value) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const totalGallery = existingGallery.length + galleryFiles.length;

    return (
        <div className="space-y-6">
            {/* Cover Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Cover Image{" "}
                    <span className="text-xs text-gray-500">(shown on package cards)</span>
                </label>

                {(coverImagePreview || existingCoverImage?.url) ? (
                    <div className="relative inline-block">
                        <img
                            src={coverImagePreview || existingCoverImage?.url}
                            alt="Cover"
                            className="w-64 h-40 object-cover rounded-xl border border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={onRemoveCoverImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow"
                        >
                            <XIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors">
                        <UploadCloudIcon className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Upload cover image</span>
                        <span className="text-xs text-gray-400">PNG, JPG, WEBP</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onCoverImageChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* Gallery */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Gallery{" "}
                    <span className="text-xs text-gray-500">
                        (details page — {totalGallery}/8)
                    </span>
                </label>

                {/* Existing gallery */}
                {existingGallery.length > 0 && (
                    <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Current gallery</p>
                        <div className="grid grid-cols-4 gap-2">
                            {existingGallery.map((img) => (
                                <div key={img.public_id} className="relative group aspect-square">
                                    <img
                                        src={img.url}
                                        alt=""
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onRemoveExistingGallery(img.public_id)}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                    >
                                        <XIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* New gallery previews */}
                {galleryPreviews.length > 0 && (
                    <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">New uploads</p>
                        <div className="grid grid-cols-4 gap-2">
                            {galleryPreviews.map((src, i) => (
                                <div key={i} className="relative group aspect-square">
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full h-full object-cover rounded-lg border-2 border-emerald-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onRemoveNewGallery(i)}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow"
                                    >
                                        <XIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {totalGallery < 8 && (
                    <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors text-sm text-gray-500">
                        <UploadCloudIcon className="w-5 h-5" />
                        Add gallery images
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={onGalleryChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* Cover Video */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <VideoIcon className="inline w-4 h-4 mr-1 text-emerald-600" />
                    Cover Video URL{" "}
                    <span className="text-xs text-gray-500">(YouTube link)</span>
                </label>
                <input
                    type="url"
                    value={formData.coverVideo}
                    onChange={(e) => update("coverVideo", e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
            </div>
        </div>
    );
};

export default MediaTab;