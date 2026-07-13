import { useEffect, useState } from 'react'
import { getSuppliers } from '../../../services/supplierServices'
import { getRestockReceipts } from '../../../services/receiptService' 

const RestockReceipts = () => {
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchReceiptData = async () => {
    try {
      const data = await getRestockReceipts()
      setReceipts(data.slice(0,10) || [])
    } catch (error) {
      console.error("Error aggregating restock receipts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReceiptData()
  }, [])

  // 2. Compute Filtered Receipts dynamically
  const filteredReceipts = receipts.filter((receipt) => {
    if (!receipt.createdAt) return false
    
    // Convert the receipt's DB timestamp to a midnight-normalized timestamp
    const receiptTime = new Date(receipt.createdAt).getTime()

    // If start date is set, check if receipt is older than start of that day
    if (startDate) {
      const startThreshold = new Date(startDate).setHours(0, 0, 0, 0)
      if (receiptTime < startThreshold) return false
    }

    // If end date is set, check if receipt is newer than the absolute end of that day (23:59:59)
    if (endDate) {
      const endThreshold = new Date(endDate).setHours(23, 59, 59, 999)
      if (receiptTime > endThreshold) return false
    }

    return true
  })

  const clearFilters = () => {
    setStartDate('')
    setEndDate('')
  }

  // Safely format database ISO dates into clean readable text
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="procurement view">
      <div className="p-2 flex flex-col gap-5">
        <div className="heading flex justify-between p-1">
            <h2 className="text-3xl font-bold text-gray-700">Restock Receipts</h2>
            <div className="filter">
              <p className='text-xs font-semibold mb-1'>Filter by date</p>
              <div className='flex gap-4'>
                <span className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-500 uppercase' htmlFor="startDate">From date</label>
                  <input 
                  id="startDate"
                  type="date" 
                  className='bg-gray-200 p-1 rounded' 
                  placeholder='From'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}/>
                </span>
                
                <span className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-500 uppercase' htmlFor="endDate">To date</label>
                  <input 
                  id='endDate'
                  type="date" 
                  className='bg-gray-200 p-1 rounded' 
                  placeholder='To'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}/>
                </span>

                <button 
                  type="button"
                  onClick={clearFilters}
                  className={`text-xs ${(startDate || endDate) ? 'opacity-100' : 'opacity-0' } py-2 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 font-medium px-2 rounded-lg transition-colors`}
                >
                  <i className="fas fa-times mr-1"></i> Clear Filters
                </button>
              </div>
            </div>
        </div>
        

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-14rem)]">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Receipt ID</th>
                  <th className="px-6 py-4">Date Processed</th>
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Supplier</th>
                  <th className="px-6 py-4 text-center">Qty Added</th>
                  <th className="px-6 py-4">Received By</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                {filteredReceipts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic bg-white">
                      No restock receipts found in database.
                    </td>
                  </tr>
                ) : (
                  filteredReceipts.map((receipt) => (
                    <tr 
                      key={receipt._id} 
                      className="hover:bg-gray-50/40 transition-colors duration-150"
                    >
                      {/* Receipt Identifier Hash */}
                      <td className="px-6 py-4 font-mono text-xs font-medium text-gray-900">
                        RC-{receipt._id?.substring(4, 12).toUpperCase() || 'NEW'}
                      </td>
                      
                      {/* Formatted Creation Date */}
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                        {formatDate(receipt.createdAt)}
                      </td>
                      
                      {/* Item Details Block */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 capitalize">{receipt.item?.name}</span>
                          <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                            {receipt.item?.category} • {receipt.item?.unit}
                          </span>
                        </div>
                      </td>
                      
                      {/* Supplier Context */}
                      <td className="px-6 py-4 text-gray-600 font-medium capitalize">
                        <div className="flex items-center">
                          <i className="fas fa-building text-gray-300 mr-2 text-xs"></i>
                          {receipt.supplier?.name || 'Unknown Supplier'}
                        </div>
                      </td>
                      
                      {/* Quantity Tag */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                          +{receipt.quantityReceived}
                        </span>
                      </td>
                      
                      {/* Logged Staff Receiver */}
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                        {receipt.receivedBy?.name || 'System Terminal'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RestockReceipts