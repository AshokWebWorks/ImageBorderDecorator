/* eslint-disable react/prop-types */
import Masonry,{ ResponsiveMasonry } from "react-responsive-masonry";
function ShowImages({ processedImages,saveImage,saveAllImages }) {
  return (
    <div className=" mt-4 w-[90%] m-auto p-4">
        <div className="p-2">
        {processedImages.length > 0 && (
          <button onClick={saveAllImages} className=" bg-slate-950 text-white px-10 py-2 rounded-md capitalize border border-green-500 hover:bg-slate-900 hover:border-green-950 transition-all duration-200 ">Save All Images</button>
        )}
      </div>
      <ResponsiveMasonry  columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}>
    
       <Masonry >
       {processedImages.map(({ imageUrl,fileName }, index) => (
         <div key={index} className=" relative">
            <img
            src={imageUrl}
            alt={`Processed ${index + 1}`}
            className="p-1"
          />
          <button className=" absolute  bottom-2 left-2 p bg-slate-900 text-white px-2 py-1"  onClick={() => saveImage(imageUrl, fileName)}>Download</button>
         </div>
          ))}
         
       </Masonry>
     
      </ResponsiveMasonry>
    </div>
  );
}

export default ShowImages;
