/* eslint-disable react/prop-types */

function ImageForm({borderColor,borderSize,setBorderColor,setBorderSize,handleImageOnChange}) {

  return (
    <div className=" border-slate-800 border max-w-[600px] m-auto mt-20 p-2 flex flex-col gap-2 text-white">
        <h1 className=" text-lg text-center tracking-widest font-semibold capitalize mb-4">Transform Your Photos with ImageBorderDecorator</h1>
        <div className="flex items-center gap-3 min-h-10 border border-slate-600 px-2 max-w-[400px] justify-between flex-wrap">
            <label className=" font-medium text-base">Border Size:</label>
            <input type="number" className=" p-1 outline-none bg-transparent border border-slate-600 w-52"
            value={borderSize}
            onChange={(e)=>setBorderSize(parseInt(e.target.value))}
            />
        </div>
        <div className="flex items-center gap-3 min-h-10 border border-slate-600 px-2 max-w-[400px] justify-between flex-wrap">
            <label className=" font-medium text-base">Border Color:</label>
            <input type="color" className="outline-none bg-transparent border border-slate-600 h-[35px] w-52"
            value={borderColor}
            onChange={(e)=>setBorderColor(e.target.value)}
            />
        </div>
        <div className="flex items-center gap-3 min-h-10 border border-slate-600 px-2 max-w-[400px] justify-between flex-wrap">
            <label className=" font-medium text-base">Select Images:</label>
            <input type="file" accept="image/*" multiple className="outline-none bg-transparent h-[35px] w-52"
             onChange={handleImageOnChange}
            />
        </div>
        <p className=" text-xs text-green-600 capitalize px-1 tracking-wide">Select multiple images simultaneously to apply borders to all of them at once!</p>
        <button className=" text-left px-4 bg-green-800 w-fit text-white py-1 rounded-md mt-2 hover:bg-green-700 transition-all duration-200 ease-in-out">Apply Border</button>
    </div>
  )
}

export default ImageForm