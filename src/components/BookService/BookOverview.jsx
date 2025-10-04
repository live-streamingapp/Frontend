import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ebookImg from "../../assets/ebook.png";
import { useBooksQuery } from "../../hooks/useContentApi";

export default function BookOverview() {
	const navigate = useNavigate();
	const {
		data: books = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useBooksQuery();

	const bannerImage = ebookImg;
	const sanitizedBooks = useMemo(
		() =>
			books.map((book) => ({
				id: book._id ?? book.id,
				title: book.title ?? "Untitled",
				author: book.author ?? "Unknown Author",
				description:
					book.shortDescription ??
					book.description ??
					"No description available at the moment.",
				thumbnail: book.coverImage ?? book.image ?? book.thumbnail,
				price: book.price
					? `₹${book.price}`
					: book.priceLabel ?? "Contact for pricing",
				format: book.format ?? "Digital",
				pageCount: book.pageCount ?? book.details?.pageCount ?? "—",
				language: book.language ?? book.details?.language ?? "English",
				onSelect: () => navigate(`/books/${book._id ?? book.id}`),
			})),
		[books, navigate]
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
			<main className="mx-auto max-w-6xl space-y-12 px-4 py-16 md:px-8">
				<section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 p-10 shadow-xl">
					<div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
						<div className="space-y-6 text-center lg:text-left">
							<p className="inline-flex rounded-full bg-orange-500/10 px-4 py-1 text-sm font-medium uppercase tracking-wider text-orange-600">
								Featured collection
							</p>
							<h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
								Unlock ancient wisdom with curated astrology e-books
							</h1>
							<p className="text-gray-600">
								Explore our digital library covering Vedic astrology,
								numerology, Vastu, and spiritual guidance crafted by renowned
								astrologers.
							</p>
							<div className="flex flex-wrap justify-center gap-4 lg:justify-start">
								<button
									onClick={() => navigate("/courses")}
									className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
								>
									Browse Courses
								</button>
								<button
									onClick={() => navigate("/contact")}
									className="rounded-full border border-orange-500/40 px-6 py-3 text-sm font-semibold text-orange-600 transition hover:border-orange-500 hover:bg-orange-50"
								>
									Talk to an expert
								</button>
							</div>
						</div>
						<img
							src={bannerImage}
							alt="Astrology ebooks"
							className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-2xl"
							loading="lazy"
						/>
					</div>
				</section>

				<section className="space-y-8">
					<header className="space-y-4 text-center lg:text-left">
						<h2 className="text-3xl font-semibold text-gray-900 lg:text-4xl">
							Discover titles tailored for your spiritual journey
						</h2>
						<p className="text-gray-600">
							Each book blends timeless knowledge with practical insights to
							help you interpret charts, align energies, and elevate daily life.
						</p>
					</header>

					{isLoading && (
						<p className="text-center text-sm text-orange-600">
							Loading books…
						</p>
					)}

					{isError && (
						<div className="flex flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
							<p>We couldn&apos;t load the library just now.</p>
							<button
								onClick={() => refetch()}
								className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
							>
								Try again
							</button>
							{error?.message && (
								<p className="text-xs text-red-500">{error.message}</p>
							)}
						</div>
					)}

					{!isLoading && !isError && sanitizedBooks.length === 0 && (
						<p className="text-center text-sm text-gray-500">
							Our bookstore is being refreshed. Please check back soon.
						</p>
					)}

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{!isError &&
							sanitizedBooks.map((book) => (
								<article
									key={book.id}
									className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
								>
									{/* Book Cover Image */}
									<div className="aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50">
										{book.thumbnail ? (
											<img
												src={book.thumbnail}
												alt={book.title}
												className="h-full w-full object-cover transition-transform hover:scale-105"
												loading="lazy"
											/>
										) : (
											<div className="flex h-full w-full items-center justify-center">
												<div className="text-center">
													<svg
														className="mx-auto h-16 w-16 text-orange-300"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
														/>
													</svg>
													<p className="mt-2 text-sm text-orange-400">
														No cover
													</p>
												</div>
											</div>
										)}
									</div>

									{/* Book Content */}
									<div className="flex flex-1 flex-col gap-4 p-6">
										<div className="space-y-2">
											<h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
												{book.title}
											</h3>
											<p className="text-sm text-gray-600">by {book.author}</p>
											<p className="text-sm text-gray-700 line-clamp-3">
												{book.description}
											</p>
										</div>

										<dl className="mt-auto grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 text-xs">
											<div>
												<dt className="font-medium uppercase tracking-wider text-gray-500">
													Format
												</dt>
												<dd className="mt-1 text-sm font-medium text-gray-900">
													{book.format}
												</dd>
											</div>
											<div>
												<dt className="font-medium uppercase tracking-wider text-gray-500">
													Pages
												</dt>
												<dd className="mt-1 text-sm font-medium text-gray-900">
													{book.pageCount}
												</dd>
											</div>
											<div>
												<dt className="font-medium uppercase tracking-wider text-gray-500">
													Language
												</dt>
												<dd className="mt-1 text-sm font-medium text-gray-900">
													{book.language}
												</dd>
											</div>
											<div>
												<dt className="font-medium uppercase tracking-wider text-gray-500">
													Price
												</dt>
												<dd className="mt-1 text-lg font-bold text-orange-600">
													{book.price}
												</dd>
											</div>
										</dl>

										<button
											onClick={book.onSelect}
											className="mt-4 w-full rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
										>
											View details
										</button>
									</div>
								</article>
							))}
					</div>
				</section>
			</main>
		</div>
	);
}
