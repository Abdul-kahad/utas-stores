
function Card(props) {
  return (
    <div className="w-80 h-40 rounded-md flex gap-5 p-5 shadow-lg bg-white">
      <div className="p-5 bg-gray-100 rounded-xl h-[50%]">
        <span>{props.icon}</span>
      </div>
      <div className="cardtext text-gray-500">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default Card