import React from "react";
import Header from "./Header";

const BaseLayout = (props) =>  {
    return (
           <div>
             <Header />
             {props.children}
           </div>
           );
}

export default BaseLayout
