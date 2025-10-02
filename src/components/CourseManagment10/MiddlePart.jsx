// import styles from "./MiddlePart.module.css"
// import SevenMukhiRudraksh from "../../../public/images/SevenMukhiRudraksh.png"
// import { RiProgress7Line } from "react-icons/ri";
// import { TbAlertCircleFilled, TbHelpSquareFilled } from "react-icons/tb";
// import { TiImage } from "react-icons/ti";
// function MiddlePart(){
//     return(
//         <>
//           <div className={styles.Parent}>
//              <div className={styles.RudrakshImage}>
//                <div className={styles.UpperParentBox}>
//                    <img src={SevenMukhiRudraksh} style={{ width: "352px", height: "351px"}} alt="7 Mukhi Rudraksha"/>
//                </div>
//                <div className={styles.LowerParentBox}>
//                   <div>
//                        <div className={styles.RedRoundedCircle}></div>
//                    </div>

//                    <div>
//                        <div className={styles.GreyRoundedCircle}></div>
//                    </div>

//                    <div>
//                        <div className={styles.GreyRoundedCircle}></div>
//                    </div>
//                </div>
//              </div>

//              <div className={styles.Editingpart}>
//                 <div className={styles.EditingUpperPart}>
//                    <div>
//                      <p style={{fontSize:"20px",fontStyle:"normal",fontWeight:"600",lineHeight:"26px"}}>7 Mukhi Rudraksha</p>
//                    </div>
//                    <div>
//                      <p style={{color:"rgba(0, 0, 0, 0.70)",fontSize:"12px",fontStyle:"normal", fontWeight:"400",lineHeight:"16px"}}>ID: PRD-074</p>
//                    </div>
//                    <div className={styles.PriceTag}>
//                       <p style={{fontFamily:"SF Pro", fontSize:"18px",fontStyle:"normal",fontWeight:"550"}}>
//                          ₹1,299
//                       </p>
//                       <p style={{color:"rgba(0, 0, 0, 0.60)", fontSize:"11px", fontStyle:"normal",fontWeight:"400",lineHeight:"15px",
//                         textDecoration:"line-through"}}>
//                         ₹2,999
//                       </p>
//                    </div>
//                 </div>
//                 <div className={styles.EditingLowerPart}>
//                    <button style={{color:"#FFF", background:"linear-gradient(180deg, #BB0E00 0%, #B94400 100%)"}}>Edit Product</button>
//                    <button style={{color:"#BB0E00"}}>Delete Product</button>
//                 </div>
//              </div>

//              <div className={styles.ProductMeta}>
//                   <div>
//                      <div>
//                         <div><TiImage size={22} color="red" /></div>
//                         <p style={{fontFamily:"SF Pro",fontSize:"13px",fontStyle:"normal",fontWeight:"400",lineHeight:"normal"}}>Added On</p>
//                         <p style={{fontFamily:"SF Pro",fontSize:"16px",fontStyle:"normal",fontWeight:"600",lineHeight:"normal"}}>Jul 10, 2025</p>
//                      </div>
//                   </div>
//                   <div>
//                      <div>
//                         <div><TbHelpSquareFilled size={22} color="red" /></div>
//                         <p style={{fontFamily:"SF Pro",fontSize:"13px",fontStyle:"normal",fontWeight:"400",lineHeight:"normal"}}>Category</p>
//                         <p style={{fontFamily:"SF Pro",fontSize:"16px",fontStyle:"normal",fontWeight:"600",lineHeight:"normal"}}>Spiritual Beads</p>
//                      </div>
//                   </div>
//                   <div>
//                      <div>
//                         <div><RiProgress7Line size={22} color="red" /></div>  
//                         <p style={{fontFamily:"SF Pro",fontSize:"13px",fontStyle:"normal",fontWeight:"400",lineHeight:"normal"}}>Sold rate</p>
//                         <p style={{fontFamily:"SF Pro",fontSize:"16px",fontStyle:"normal",fontWeight:"600",lineHeight:"normal"}}>92%</p>
//                      </div>
//                   </div>
//                   <div>
//                      <div>
//                         <div><TbAlertCircleFilled size={22} color="red" /></div> 
//                         <p style={{fontFamily:"SF Pro",fontSize:"13px",fontStyle:"normal",fontWeight:"400",lineHeight:"normal"}}>Stock</p>
//                         <p style={{fontFamily:"SF Pro",fontSize:"16px",fontStyle:"normal",fontWeight:"600",lineHeight:"normal"}}>15 Units</p>
//                      </div>
//                   </div>
//              </div>
//           </div>  
//         </>
//     )
// }

// export default MiddlePart

import SevenMukhiRudraksh from "../../../public/images/SevenMukhiRudraksh.png"
import { RiProgress7Line } from "react-icons/ri";
import { TbAlertCircleFilled, TbHelpSquareFilled } from "react-icons/tb";
import { TiImage } from "react-icons/ti";

function MiddlePart() {
  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-6 w-full px-4 lg:flex-row lg:items-start lg:gap-[90px] lg:mt-10">
        <div className="flex flex-col items-center gap-4 w-full max-w-[352px] lg:w-[352px]">
          <div className="rounded-[10px] w-full">
            <img src={SevenMukhiRudraksh} alt="7 Mukhi Rudraksha" className="w-full max-w-[280px] h-[280px] mx-auto lg:max-w-[352px] lg:h-[351px]" />
          </div>
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="rounded-[46px] bg-[#C50200] w-8 h-2.5 lg:w-[32px] lg:h-[10px]"></div>
            <div className="rounded-[46px] bg-[#C0C0C0] w-2.5 h-2.5 lg:w-[10px] lg:h-[10px]"></div>
            <div className="rounded-[46px] bg-[#C0C0C0] w-2.5 h-2.5 lg:w-[10px] lg:h-[10px]"></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-[307px] lg:w-[307px] lg:items-start">
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <p className="text-[18px] font-semibold leading-[24px] text-center sm:text-[20px] sm:leading-[26px] sm:text-left font-['SF_Pro']">7 Mukhi Rudraksha</p>
            <p className="text-black/70 text-[11px] font-normal leading-[14px] text-center sm:text-[12px] sm:leading-[16px] sm:text-left font-['SF_Pro']">ID: PRD-074</p>
            <div className="flex items-center gap-2.5">
              <p className="text-[16px] font-medium text-center sm:text-[18px] sm:text-left font-['SF_Pro']">₹1,299</p>
              <p className="text-black/60 text-[10px] font-normal line-through text-center sm:text-[11px] sm:leading-[15px] sm:text-left font-['SF_Pro']">₹2,999</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 w-full lg:items-start">
            <button className="w-full h-10 flex justify-center items-center text-white text-[11px] font-semibold leading-[14px] text-center sm:text-[12px] sm:leading-[16px] rounded-[5px] bg-gradient-to-b from-[#BB0E00] to-[#B94400] border border-[#BB0E00] shadow-[inset_0_4px_12.4px_rgba(255,255,255,0.25)]">
              Edit Product
            </button>
            <button className="w-full h-10 flex justify-center items-center text-[#BB0E00] text-[11px] font-semibold leading-[14px] text-center sm:text-[12px] sm:leading-[16px] rounded-[5px] border border-[#BB0E00] shadow-[inset_0_4px_12.4px_rgba(255,255,255,0.25)]">
              Delete Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-[370px] sm:grid-cols-2 sm:gap-5 sm:w-[370px] lg:w-[370px]">
          {[
            { icon: <TiImage size={18} color="red" className="sm:size-[22px]" />, label: "Added On", value: "Jul 10, 2025" },
            { icon: <TbHelpSquareFilled size={18} color="red" className="sm:size-[22px]" />, label: "Category", value: "Spiritual Beads" },
            { icon: <RiProgress7Line size={18} color="red" className="sm:size-[22px]" />, label: "Sold rate", value: "92%" },
            { icon: <TbAlertCircleFilled size={18} color="red" className="sm:size-[22px]" />, label: "Stock", value: "15 Units" },
          ].map((item, index) => (
            <div key={index} className="flex items-center p-2 pr-8 border border-[#E1E1E1] rounded-[15px] bg-[#F8F8F8] shadow-[0_0_15px_rgba(0,0,0,0.1)] w-full max-w-[166px] h-[100px] mx-auto sm:h-[121px]">
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <div className="flex justify-center items-center w-[40px] h-[40px] sm:w-[49px] sm:h-[49px] rounded-[5px] bg-[#FFB3AD]">
                  {item.icon}
                </div>
                <p className="text-[11px] font-normal leading-normal text-center sm:text-[13px] sm:text-left font-['SF_Pro']">{item.label}</p>
                <p className="text-[14px] font-semibold leading-normal text-center sm:text-[16px] sm:text-left font-['SF_Pro']">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MiddlePart