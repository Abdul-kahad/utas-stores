import Card from '../Card/Card'

const Features = () => {
  const features = [
    { icon: '📊', title: 'Inventory Tracking', description: 'Description 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '📋', title: 'Request Management', description: 'Description 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '🔒', title: 'Role-Based Access', description: 'Description 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '📈', title: 'Reports & Analytics', description: 'Description 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '🔔', title: 'Smart Alerts', description: 'Description 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
    { icon: '🎨', title: 'Customizable Dashboards', description: 'Description 6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore?'},
  ]
  return (
    <div className='p-20 bg-gray-50'>
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-600">Features</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {features.map((item, index) => (
        <Card key={index} icon={item.icon} title={item.title} description={item.description}/>
      ))}
      </div>
    </div>
  )
}

export default Features