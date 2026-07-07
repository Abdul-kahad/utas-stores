
const Notifications = () => {
  return (
    <div className="notifications p-5">
      <div className="p-2 border border-gray-200 rounded mb-2">
        <small className="text-red-300"><i className="fas fa-exclamation-triangle"></i> Alert</small>
        <p className="text-gray-700">Low on stock in Laptops</p>
      </div>
      <div className="p-2 border border-gray-200 rounded mb-2">
        <small className="text-blue-300"><i className="fas fa-info-circle"></i> Notification</small>
        <p className="text-gray-700">Request For Hand Sanitizers Fullfiled</p>
      </div>
      <div className="p-2 border border-gray-200 rounded mb-2">
        <small className="text-blue-300"><i className="fas fa-info-circle"></i> Notification</small>
        <p className="text-gray-700">Request For Office chairs Approved</p>
      </div>
    </div>
  )
}

export default Notifications