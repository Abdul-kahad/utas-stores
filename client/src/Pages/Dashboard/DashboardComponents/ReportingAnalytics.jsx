
const ReportingAnalytics = () => {
  return (
    <div className="ReportingAnalytics p-5">
      <div className="grid grid-cols-2 mb-10">
        <div className="">
          <h2>Most Requested Items</h2>
          <table className="text-left">
            <thead className="border-b border-gray-500">
              <tr>
                <th className="border border-gray-200 p-2">Item Name</th>
                <th className="border border-gray-200 p-2">Number of Requests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2">A4 Papper</td>
                <td className="border border-gray-200 p-2">104</td>
              </tr>
               <tr>
                <td className="border border-gray-200 p-2">Laptops</td>
                <td className="border border-gray-200 p-2">78</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <h2>Stock usage trends</h2>
          <div className=""></div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="">
          <h2>Department consumption</h2>
          <table className="text-left">
            <thead className="border-b border-gray-500">
              <tr>
                <th className="border border-gray-200 p-2">Department</th>
                <th className="border border-gray-200 p-2">Consumption</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2">Infotess</td>
                <td className="border border-gray-200 p-2">34%</td>
              </tr>
               <tr>
                <td className="border border-gray-200 p-2">Computer Science</td>
                <td className="border border-gray-200 p-2">28%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <h2>Monthly reports</h2>
          <div className=""></div>
        </div>
      </div>
    </div>
  )
}

export default ReportingAnalytics