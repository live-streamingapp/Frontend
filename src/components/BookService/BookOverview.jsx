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
				thumbnail: book.image ?? book.thumbnail,
				price: book.priceLabel ?? book.price ?? "Contact for pricing",
				format: book.format ?? "Digital",
				pageCount: book.pageCount ?? book.details?.pageCount ?? "—",
				language: book.language ?? book.details?.language ?? "English",
				onSelect: () => navigate(`/books/${book._id ?? book.id}`),
			})),
		[books, navigate]
	);

	return (
		<div className="min-h-screen bg-[#0B0B11] text-white">
			<main className="mx-auto max-w-6xl space-y-12 px-4 py-16 md:px-8">
				<section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1C1C24] via-[#242432] to-[#1C1C24] p-10 shadow-lg">
					<div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
						<div className="space-y-6 text-center lg:text-left">
							<p className="inline-flex rounded-full bg-[#F7C386]/10 px-4 py-1 text-sm font-medium uppercase tracking-wider text-[#F7C386]">
								Featured collection
							</p>
							<h1 className="text-4xl font-bold leading-tight sm:text-5xl">
								Unlock ancient wisdom with curated astrology e-books
							</h1>
							<p className="text-[#D1D5DB]">
								Explore our digital library covering Vedic astrology,
								numerology, Vastu, and spiritual guidance crafted by renowned
								astrologers.
							</p>
							<div className="flex flex-wrap justify-center gap-4 lg:justify-start">
								<button
									onClick={() => navigate("/courses")}
									className="rounded-full bg-[#F7C386] px-6 py-3 text-sm font-semibold text-[#1F1D36] transition hover:bg-[#f5b76f]"
								>
									Browse Courses
								</button>
								<button
									onClick={() => navigate("/contact")}
									className="rounded-full border border-[#F7C386]/40 px-6 py-3 text-sm font-semibold text-[#F7C386] transition hover:border-[#F7C386] hover:text-white"
								>
									Talk to an expert
								</button>
							</div>
						</div>
						<img
							src={bannerImage}
							alt="Astrology ebooks"
							className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-[0_20px_45px_rgba(19,18,31,0.6)]"
							loading="lazy"
						/>
					</div>
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0B11] to-transparent" />
				</section>

				<section className="space-y-8">
					<header className="space-y-4 text-center lg:text-left">
						<h2 className="text-3xl font-semibold lg:text-4xl">
							Discover titles tailored for your spiritual journey
						</h2>
						<p className="text-[#9CA3AF]">
							Each book blends timeless knowledge with practical insights to
							help you interpret charts, align energies, and elevate daily life.
						</p>
					</header>

					{isLoading && (
						<p className="text-center text-sm text-[#F7C386]">Loading books…</p>
					)}

					{isError && (
						<div className="flex flex-col items-center gap-4 rounded-2xl border border-[#FCA5A5]/30 bg-[#1F1D24] p-6 text-center text-[#FCA5A5]">
							<p>We couldn&apos;t load the library just now.</p>
							<button
								onClick={() => refetch()}
								className="rounded-full bg-[#F7C386] px-5 py-2 text-sm font-semibold text-[#221714] transition hover:bg-[#f5b76f]"
							>
								Try again
							</button>
							{error?.message && (
								<p className="text-xs text-[#fcd9d9]">{error.message}</p>
							)}
						</div>
					)}

					{!isLoading && !isError && sanitizedBooks.length === 0 && (
						<p className="text-center text-sm text-[#9CA3AF]">
							Our bookstore is being refreshed. Please check back soon.
						</p>
					)}

					<div className="flex flex-wrap justify-center gap-8 lg:justify-between">
						{!isError &&
							sanitizedBooks.map((book) => (
								<article
									key={book.id}
									className="flex w-full max-w-xs flex-col gap-6 rounded-3xl border border-[#F7C386]/40 bg-gradient-to-b from-[#1C1C24]/90 to-[#13131A] p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-[#F7C386]/20 sm:max-w-sm"
								>
									<div className="space-y-4 text-center">
										{book.thumbnail && (
											<img
												src={book.thumbnail}
												alt={book.title}
												className="h-48 w-full rounded-2xl object-cover"
												loading="lazy"
											/>
										)}
										<div className="space-y-2">
											<h3 className="text-xl font-semibold text-white">
												{book.title}
											</h3>
											<p className="text-sm text-[#9CA3AF]">by {book.author}</p>
											<p className="text-sm text-[#E5E7EB]">
												{book.description}
											</p>
										</div>
									</div>

									<dl className="grid grid-cols-2 gap-4 text-left text-xs uppercase tracking-widest text-[#F7C386]">
										<div>
											<dt>Format</dt>
											<dd className="text-base font-medium normal-case text-white">
												{book.format}
											</dd>
										</div>
										<div>
											<dt>Pages</dt>
											<dd className="text-base font-medium normal-case text-white">
												{book.pageCount}
											</dd>
										</div>
										<div>
											<dt>Language</dt>
											<dd className="text-base font-medium normal-case text-white">
												{book.language}
											</dd>
										</div>
										<div>
											<dt>Price</dt>
											<dd className="text-lg font-semibold normal-case text-[#F7C386]">
												{book.price}
											</dd>
										</div>
									</dl>

									<button
										onClick={book.onSelect}
										className="rounded-full bg-[#F7C386] px-5 py-2 text-sm font-semibold text-[#221714] transition hover:bg-[#f5b76f]"
									>
										View details
									</button>
								</article>
							))}
					</div>
				</section>
			</main>
		</div>
	);
}
