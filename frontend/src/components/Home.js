import React from "react";

const Home = () => {
  return (
    <div className="relative flex justify-center items-center min-h-[80vh] overflow-hidden bg-[#16161A]">
      <div className="absolute w-[2200px] h-[1013px] border border-[#16161A] bg-[#242629] rounded-full top-[-50%]"></div>
      <div className="absolute w-[680px] h-[750px] bg-[#16161A] rounded-full flex items-center justify-center top-[-35%]">
        <div className="text-center mt-48 w-[400px]">
          <h1 className="text-white font-Goldman text-lg leading-[22px] tracking-wider">
            Welcome to Groove Store! Elevate your playlist. Elevate your Groove!
          </h1>
          <button className="mt-24 bg-[#7F5AF0] text-white rounded-full px-6 py-2 drop-shadow-lg">
            Browse Tracks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

