import React from "react";

export default function CustomCard(props) {
 return (
   //<div className="flex justify-center items-center h-screen w-full">
   //<div className="absolute inset-0 flex items-center justify-center">
   <div className="flex items-center justify-center w-full h-full">
     <div className="block rounded-lg shadow-lg bg-white w-1/2">
       {props.headerEl}
       <div className="p-5">
         {props.children}
       </div>
     </div>
   </div>
 )
}