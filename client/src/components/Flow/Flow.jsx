import Card from '../Card/Card'

const Flow = () => {
  const flow = [
    { icon: '1', title: 'Submit Request', description: 'Description 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '2', title: 'Manager Approves', description: 'Description 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '3', title: 'Items Issued', description: 'Description 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '4', title: 'Inventory Updated', description: 'Description 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
   
  ]
  return (
    <div className='p-20 bg-gray-50'>
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-600">How It Works</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {flow.map((item, index) => (
        <div className="w-60 rounded-md gap-5 p-5 shadow-lg bg-white">
          <div className="p-5 bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-5">
            <span>{item.icon}</span>
          </div>
          <div className="cardtext text-gray-500">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Flow