import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import PodcastCard from "./PodcastCard";
import axios from "axios";

const Podcasts = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/podcasts`
        );
        setVideos(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="px-[1.5rem]">
      <h1 className="my-[2rem] text-[1.5rem] font-semibold">Latest Videos</h1>
      <div className="grid gap-6 max-[600px]:grid-cols-1 max-[850px]:grid-cols-2 min-[850px]:grid-cols-3">
        {videos.slice(0, visibleCards).map((video) => (
          <PodcastCard key={video._id} video={video} />
        ))}
      </div>

      {videos.length > visibleCards ? (
        <div className="flex items-center justify-center my-[2rem]">
          <button
            onClick={() => setVisibleCards(videos.length)}
            className="flex items-center gap-[5px] font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 cursor-pointer rounded-lg text-sm"
          >
            View All <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center my-[2rem]">
          <button
            onClick={() => setVisibleCards(6)}
            className="font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 cursor-pointer rounded-lg text-sm"
          >
            View Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Podcasts;
