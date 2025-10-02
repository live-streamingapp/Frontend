
function AddProduct(){
    return(
        <>
           <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:"45px"}}>
               <div>

               </div>
               <div style={{display:"flex",height:"50px",padding:"15px", border:"1px solid #BB0E00", borderRadius:"5px",
                background:"linear-gradient(180deg, #BB0E00 0%, #B94400 100%)",boxShadow:"0 4px 12.4px 0 rgba(255, 255, 255, 0.25) inset"
               }}>
                  <button style={{color: "#FFF",fontSize: "15px",fontWeight: "500",lineHeight: "20px",background: "transparent",border: "none",cursor: "pointer"}}>
                      + Add New Product
                  </button>

               </div>
           </div>
        </>
    )
}

export default AddProduct