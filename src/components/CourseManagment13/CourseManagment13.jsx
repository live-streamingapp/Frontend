import FeatureOverview from "./FeatureOverview.jsx"
import RolePermissionManagment from "./RolePermissionManagment.jsx"
import PermissionsManager from "./PermissionsManager.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import styles from "./RolePermissionManagment.jsx"
import Layout from "../Admin/Layout.jsx"
function CourseManagment13(){
    return(
        <>
           <Header/>
           <br/>
           <FeatureOverview/>
           
           <br/>
            <RolePermissionManagment/>
             
            <br/> <br/>

             <PermissionsManager/>

             <br/> 
             <Footer/>
        </>
    )
}

export default CourseManagment13