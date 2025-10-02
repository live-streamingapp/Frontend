import MiddlePart from "./MiddlePart"
import BottomPart from "./BottomPart"
import AddProduct from "./AddProduct"
import Header from "./Header"
import Layout from "../Admin/Layout";
function CourseManagment10(){
    return(
        <Layout>

          <Header/>

          <AddProduct/>

           <MiddlePart/>

           <BottomPart/>
        </Layout>
    )
}

export default CourseManagment10