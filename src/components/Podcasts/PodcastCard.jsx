import { Link } from "react-router-dom";

const PodcastCard = ({ video }) => {
  return (
    <article className="bg-white flex flex-col rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-300">
      {/* Video Block */}
      <div className="w-full h-[200px]">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {video.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {video.description}
          </p>
        </div>

        <Link
          to={`/videos/${video.id}`}
          className="font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 rounded-lg text-sm text-center"
        >
          Watch Now →
        </Link>
      </div>
    </article>
  );
};

export default PodcastCard;
