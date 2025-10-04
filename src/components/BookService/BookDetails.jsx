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
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
					<p className="mt-4 text-lg text-gray-600">Loading book details...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		const message =
			error?.response?.data?.message ??
			error?.message ??
			"Failed to load book details.";
		return (
			<div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gradient-to-b from-orange-50 to-white px-4 text-center">
				<div className="rounded-2xl border border-red-200 bg-red-50 p-6">
					<p className="text-red-600">{message}</p>
				</div>
				<button
					onClick={() => refetch()}
					className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
				>
					Try again
				</button>
			</div>
		);
	}

	if (!book) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
				<p className="text-gray-600">No book details available.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
			<main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				{/* Hero Section with Book Cover and Quick Info */}
				<div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 shadow-xl">
					<div className="grid gap-8 p-8 lg:grid-cols-[400px,1fr] lg:gap-12 lg:p-12">
						{/* Book Cover */}
						<div className="mx-auto w-full max-w-sm">
							<div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-2xl">
								{book.bannerImage && book.bannerImage !== ebookImg ? (
									<img
										src={book.bannerImage}
										alt={book.title}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
										<div className="text-center p-8">
											<svg
												className="mx-auto h-24 w-24 text-orange-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
												/>
											</svg>
											<h3 className="mt-4 text-2xl font-bold text-orange-600">
												{book.title}
											</h3>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Book Info */}
						<div className="flex flex-col justify-center space-y-6">
							<div>
								<div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-600">
									<svg
										className="h-4 w-4"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
									</svg>
									E-Book
								</div>
								<h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
									{book.title}
								</h1>
								{book.author && (
									<p className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-600">
										by {book.author}
									</p>
								)}
							</div>

							<p className="text-lg leading-relaxed text-gray-700">
								{book.description ?? "Description coming soon."}
							</p>

							{/* Price and Purchase */}
							<div className="flex flex-wrap items-center gap-4">
								{book.price && (
									<div className="text-4xl font-bold text-orange-600">
										₹{book.price}
									</div>
								)}
								{book.languageOptions.length > 0 && (
									<div className="flex flex-wrap gap-3">
										{book.languageOptions.map((lang) => (
											<div key={lang.id} className="relative">
												<button
													disabled={!lang.available || !lang.buyLink}
													onClick={() =>
														lang.buyLink && window.open(lang.buyLink, "_blank")
													}
													className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
														lang.available && lang.buyLink
															? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
															: "cursor-not-allowed bg-gray-300 text-gray-500"
													}`}
												>
													<svg
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
														/>
													</svg>
													Buy {lang.language} Version
												</button>
												{lang.stock > 0 && lang.stock <= 5 && (
													<span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
														Only {lang.stock} left
													</span>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Main Content - 2/3 width */}
					<div className="space-y-8 lg:col-span-2">
						{/* Highlights */}
						{(book.highlights.whyThisBook ||
							book.highlights.difference ||
							book.highlights.whoCanBuy) && (
							<div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-lg">
								<h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
									<svg
										className="h-6 w-6 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
									Book Highlights
								</h2>
								<div className="space-y-6">
									{book.highlights.whyThisBook && (
										<div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
											<h3 className="mb-2 font-semibold text-gray-900">
												📚 Why this Book?
											</h3>
											<p className="text-gray-700 leading-relaxed">
												{book.highlights.whyThisBook}
											</p>
										</div>
									)}
									{book.highlights.difference && (
										<div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
											<h3 className="mb-2 font-semibold text-gray-900">
												✨ How this Book is Different?
											</h3>
											<p className="text-gray-700 leading-relaxed">
												{book.highlights.difference}
											</p>
										</div>
									)}
									{book.highlights.whoCanBuy && (
										<div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
											<h3 className="mb-2 font-semibold text-gray-900">
												👥 Who can Buy this Book?
											</h3>
											<p className="text-gray-700 leading-relaxed">
												{book.highlights.whoCanBuy}
											</p>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Key Features */}
						{book.keyFeatures && book.keyFeatures.length > 0 && (
							<div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-lg">
								<h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
									<svg
										className="h-6 w-6 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Key Features
								</h2>
								<ul className="grid gap-4 sm:grid-cols-2">
									{book.keyFeatures.map((item, index) => (
										<li
											key={item._id ?? index}
											className="flex items-start gap-3 rounded-lg bg-orange-50 p-4 transition hover:bg-orange-100"
										>
											<svg
												className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
											<span className="text-sm leading-relaxed text-gray-700">
												{item.feature}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Sidebar - 1/3 width */}
					<div className="space-y-8">
						{/* Target Audience */}
						{book.targetAudience && book.targetAudience.length > 0 && (
							<div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-lg">
								<h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
									<svg
										className="h-5 w-5 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									Perfect For
								</h3>
								<ul className="space-y-2">
									{book.targetAudience.map((audience, index) => (
										<li
											key={index}
											className="flex items-center gap-2 text-sm text-gray-700"
										>
											<span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
												✓
											</span>
											{audience}
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Available Languages */}
						{book.languageOptions.length > 0 && (
							<div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-lg">
								<h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
									<svg
										className="h-5 w-5 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
										/>
									</svg>
									Available In
								</h3>
								<ul className="space-y-2">
									{book.languageOptions.map((lang) => (
										<li
											key={lang.id}
											className="flex items-center justify-between rounded-lg bg-orange-50 p-3"
										>
											<span className="font-medium text-gray-900">
												{lang.language}
											</span>
											<span
												className={`text-xs font-semibold ${
													lang.available && lang.stock > 0
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{lang.available && lang.stock > 0
													? `${lang.stock} in stock`
													: "Out of stock"}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Sticky CTA */}
						<div className="sticky top-4 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl">
							<h3 className="mb-2 text-xl font-bold">Ready to begin?</h3>
							<p className="mb-4 text-sm text-orange-100">
								Get your copy now and start your journey!
							</p>
							{book.languageOptions
								.filter((option) => option.available && option.buyLink)
								.map((option) => (
									<button
										key={option.id}
										onClick={() => window.open(option.buyLink, "_blank")}
										className="w-full rounded-full bg-white px-6 py-3 text-center font-semibold text-orange-600 transition hover:bg-orange-50"
									>
										Buy Now - {option.language}
									</button>
								))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
