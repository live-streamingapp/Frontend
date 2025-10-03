import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ebookImg from "../../assets/ebook.png";
import { useBookQuery } from "../../hooks/useContentApi";

const buildBannerImage = (book) => {
	if (!book) return ebookImg;
	if (book.coverImageUrl) return book.coverImageUrl;
	if (book.imageUrl) return book.imageUrl;
	if (book.coverImage && book.coverImage.startsWith("http"))
		return book.coverImage;
	if (book.image && book.image.startsWith("http")) return book.image;
	const baseUrl = import.meta.env.VITE_BACKEND_URL;
	const candidate = book.coverImage ?? book.image;
	if (!candidate || !baseUrl) return ebookImg;
	const normalized = candidate.startsWith("/") ? candidate.slice(1) : candidate;
	return `${baseUrl}/${normalized}`;
};

const formatLanguageOptions = (options = []) =>
	options.map((option) => ({
		id: option._id ?? option.id ?? option.language,
		language: option.language ?? "Digital",
		available: Boolean(option.available ?? option.stock > 0),
		stock: option.stock ?? (option.available ? 1 : 0),
		buyLink: option.buyLink ?? option.link ?? "",
	}));

export default function BookDetails() {
	const { id } = useParams();
	const {
		data: rawBook,
		isLoading,
		isError,
		error,
		refetch,
	} = useBookQuery(id);

	const book = useMemo(() => {
		if (!rawBook) return null;
		const languageOptions = formatLanguageOptions(rawBook.languageOptions);
		return {
			...rawBook,
			languageOptions,
			highlights: rawBook.highlights ?? {},
			bannerImage: buildBannerImage(rawBook),
		};
	}, [rawBook]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
				<p className="text-gray-600 text-lg">Loading book details...</p>
			</div>
		);
	}

	if (isError) {
		const message =
			error?.response?.data?.message ??
			error?.message ??
			"Failed to load book details.";
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center space-y-4">
				<p className="text-red-600">{message}</p>
				<button
					onClick={() => refetch()}
					className="rounded-full bg-[#c22e1c] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
				>
					Try again
				</button>
			</div>
		);
	}

	if (!book) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
				<p className="text-gray-600">No book details available.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div
					className="rounded-lg p-8 mb-8 lg:py-16 w-full h-[60vh] sm:h-[70vh] bg-cover bg-center"
					style={{ backgroundImage: `url(${book.bannerImage || ebookImg})` }}
				/>

				<div className="bg-white p-6 mb-6 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold text-gray-900 mb-4">
						{book.title}
					</h2>

					{book.author && (
						<p className="text-sm uppercase tracking-wide text-gray-500 mb-3">
							by {book.author}
						</p>
					)}

					<p className="text-gray-700 mb-4 leading-relaxed">
						{book.description ?? "Description coming soon."}
					</p>

					{book.languageOptions.length > 0 && (
						<div className="flex gap-4 flex-wrap">
							{book.languageOptions.map((lang) => (
								<button
									key={lang.id}
									disabled={!lang.available || !lang.buyLink}
									onClick={() =>
										lang.buyLink && window.open(lang.buyLink, "_blank")
									}
									className={`px-6 py-2 rounded text-sm inline-flex items-center gap-2 transition ${
										lang.available && lang.buyLink
											? "bg-[#c22e1c] text-white hover:opacity-90"
											: "bg-gray-300 text-white cursor-not-allowed"
									}`}
								>
									Buy {lang.language} Version
								</button>
							))}
						</div>
					)}

					<div className="mt-6 space-y-6">
						{book.highlights.whyThisBook && (
							<section>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Why this Book?
								</h3>
								<p className="text-gray-700">{book.highlights.whyThisBook}</p>
							</section>
						)}
						{book.highlights.difference && (
							<section>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									How this Book is Different?
								</h3>
								<p className="text-gray-700">{book.highlights.difference}</p>
							</section>
						)}
						{book.highlights.whoCanBuy && (
							<section>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Who can Buy this Book?
								</h3>
								<p className="text-gray-700">{book.highlights.whoCanBuy}</p>
							</section>
						)}
					</div>
				</div>

				<div className="flex justify-center gap-4 flex-wrap mt-6">
					{book.languageOptions
						.filter((option) => option.available && option.buyLink)
						.map((option) => (
							<div key={option.id} className="flex flex-col items-start">
								<button
									onClick={() => window.open(option.buyLink, "_blank")}
									className="px-6 py-2 rounded text-sm inline-flex items-center gap-2 bg-[#c22e1c] text-white hover:opacity-90 transition"
								>
									Buy {option.language} Version
								</button>
								{option.stock <= 0 && (
									<span className="text-xs text-red-600 mt-1">
										Out of Stock
									</span>
								)}
							</div>
						))}
				</div>
			</main>
		</div>
	);
}
