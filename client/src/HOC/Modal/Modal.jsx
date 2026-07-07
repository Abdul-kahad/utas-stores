
const Modal = (props) => {
  return (
    <div className="modal z-index-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 max-w-md w-full h-[250px] relative transform transition-all scale-100">
      <p className="text-2xl font-semibold my-5">{props.title}</p>
      <p className=" font-semibold">{props.action}</p>
      <span className="absolute bottom-10 right-10">
        <button className="border border-gray-500 rounded py-2 px-4 bg-gray-100 mr-5" onClick={props.confirm}>Confirm</button>
        <button className="border border-gray-500 rounded py-2 px-4 bg-gray-200" onClick={props.cancel}>Cancel</button>
      </span>
    </div>
  )
}

export default Modal