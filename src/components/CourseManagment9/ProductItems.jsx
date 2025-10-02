
import Gemstones from "../../../public/images/Gemstones.png"
import Rudraksha from  "../../../public/images/Rudraksha.png"
import PoojaItems from "../../../public/images/PoojaItems.png"
import SpiritualBooks from "../../../public/images/SpiritualBooks.png"

function ProductItems(){
    return(
        <>
          <div className="flex flex-col items-center mx-auto gap-4 mt-6 w-full max-w-[660px] px-4 sm:flex-row sm:gap-[30px] sm:mt-10">
             <div className="flex w-full max-w-[70px] flex-col items-center gap-1 sm:w-[85px]">
                <div className="flex h-[60px] justify-center items-center gap-2 self-stretch border border-[#FFA4A4] rounded-[8px] bg-[#FFD5D5] sm:h-[74px]">
                 <img src={Gemstones} width={36} height={36} alt="Gemstones" className="sm:w-[45px] sm:h-[45px]"/>
                </div>
                <div>
                  <p className="text-black/70 text-center font-normal text-[11px] leading-[13px] sm:text-[13px] sm:leading-[15px]">Gemstones</p>
                </div>
             </div>
             <div className="flex w-full max-w-[70px] flex-col items-center gap-1 sm:w-[85px]">
                 <div className="flex h-[60px] justify-center items-center gap-2 self-stretch border border-[#FFA4A4] rounded-[8px] bg-[#FFD5D5] sm:h-[74px]">
                  <img src={Rudraksha} width={36} height={36} alt="Rudraksha" className="sm:w-[45px] sm:h-[45px]"/>
                 </div>
                 <div>
                    <p className="text-black/70 text-center font-normal text-[11px] leading-[13px] sm:text-[13px] sm:leading-[15px]">Rudraksha</p>
                 </div>
             </div>
             <div className="flex w-full max-w-[70px] flex-col items-center gap-1 sm:w-[85px]">
                  <div className="flex h-[60px] justify-center items-center gap-2 self-stretch border border-[#FFA4A4] rounded-[8px] bg-[#FFD5D5] sm:h-[74px]">
                   <img src={PoojaItems} width={36} height={36} alt="Pooja Items" className="sm:w-[45px] sm:h-[45px]"/> 
                  </div>
                  <div>
                     <p className="text-black/70 text-center font-normal text-[11px] leading-[13px] sm:text-[13px] sm:leading-[15px]">Pooja Items</p>
                  </div>
             </div>
             <div className="flex w-full max-w-[70px] flex-col items-center gap-1 sm:w-[85px]">
                 <div className="flex h-[60px] justify-center items-center gap-2 self-stretch border border-[#FFA4A4] rounded-[8px] bg-[#FFD5D5] sm:h-[74px]">
                   <img src={SpiritualBooks} width={36} height={36} alt="Spiritual Books" className="sm:w-[45px] sm:h-[45px]"/>
                 </div>
                 <div>
                    <p className="text-black/70 text-center font-normal text-[11px] leading-[13px] sm:text-[13px] sm:leading-[15px] whitespace-nowrap">Spiritual Books</p>
                 </div>
             </div>
             <div className="flex w-full max-w-[70px] flex-col items-center gap-1 sm:w-[85px]">
                  <div className="flex h-[60px] justify-center items-center gap-2 self-stretch border border-[#FFA4A4] rounded-[8px] bg-[#FFD5D5] sm:h-[74px]">
                    <img src={SpiritualBooks} width={36} height={36} alt="Spiritual Books" className="sm:w-[45px] sm:h-[45px]"/>
                  </div>
                  <div>
                     <p className="text-black/70 text-center font-normal text-[11px] leading-[13px] sm:text-[13px] sm:leading-[15px] whitespace-nowrap">Spiritual Books</p>
                  </div>
             </div>
             <div className="flex w-full max-w-[70px] flex-col items-center gap-1 sm:w-[85px]">
                  <div className="flex h-[60px] justify-center items-center gap-2 self-stretch border border-[#FFA4A4] rounded-[8px] bg-[#FFD5D5] sm:h-[74px]">
                    <img src={PoojaItems} width={36} height={36} alt="Pooja Items" className="sm:w-[45px] sm:h-[45px]"/>
                  </div>
                  <div>
                     <p className="text-black/70 text-center font-normal text-[11px] leading-[13px] sm:text-[13px] sm:leading-[15px]">Pooja Items</p>
                  </div>
             </div>
          </div>
        </>
    )
}

export default ProductItems