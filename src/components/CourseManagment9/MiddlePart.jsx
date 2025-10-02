import ColorGemstone from "../../../public/images/ColorGemstone.png"

function MiddlePart(){
 
    return(
        <>
          <div className="border border-[#E1E1E1] rounded-[10px] sm:rounded-[15px] bg-[#FFEFEF] flex justify-center items-center gap-3 sm:gap-5 mt-10 mx-4 sm:mx-0">
            <div className="flex flex-col items-center my-3 sm:my-[21px] gap-3 sm:gap-5">
                <div className="w-full max-w-[320px] sm:max-w-none overflow-hidden">
                   <img src={ColorGemstone} className="w-full h-auto max-w-[320px] sm:w-[352px] sm:h-[212px] object-cover rounded-lg" alt="Color Gemstone"/>
                </div>
                <div className="flex h-[8px] sm:h-[10px] justify-center items-center gap-1.5 sm:gap-2.5 self-stretch">
                   <div>
                       <div className="rounded-[46px] bg-[#C50200] w-6 sm:w-8 h-[8px] sm:h-[10px]"></div>
                   </div>
                   <div>
                       <div className="rounded-[46px] bg-[#C0C0C0] w-[8px] sm:w-[10px] h-[8px] sm:h-[10px]"></div>
                   </div>
                   <div>
                       <div className="rounded-[46px] bg-[#C0C0C0] w-[8px] sm:w-[10px] h-[8px] sm:h-[10px]"></div>
                   </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default MiddlePart