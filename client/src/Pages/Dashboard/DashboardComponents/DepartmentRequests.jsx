import { useEffect, useState } from "react";
import { userRequests } from '../../../services/requestService';
import { triggerReceiptDownload } from "../../../services/receiptService"; 
import Spinner from "../../../components/Spinner/Spinner";

const DepartmentRequests = () => {
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false); 
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); 

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const results = await userRequests();
        setRequests(results || []);
      } catch (error) {
        console.error("Error fetching department requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Handler to call your Axios binary download pipeline safely
  const handleDownloadPDF = async (id) => {
    setDownloadLoading(true);
    await triggerReceiptDownload(id);
    setDownloadLoading(false);
  };

  return (
    <div className="DepartmentRequests p-5 w-full max-w-full relative">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Sent Requests</h2>
      </div>
      {loading ? (
        <span className="mt-20 w-full flex justify-center">
          <Spinner size="xxxl" />
        </span>
      ) : requests.length < 1 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-500 text-sm italic">
          No items have been requested yet.
        </div>
      ) : (
        <div className="w-full max-w-full">
          <div className="overflow-y-auto h-[calc(100vh-12rem)] bg-white border border-gray-200 rounded-xl shadow-sm">
            <table className="table-auto w-full text-left border-collapse">
              
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Requested Item(s)</th>
                  <th className="px-6 py-4 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 whitespace-nowrap">Unit</th>
                  <th className="px-6 py-4 whitespace-nowrap">Quantity</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {requests.map((request) => {
                  let statusStyles = "bg-gray-50 text-gray-700 border-gray-200";
                  const currentStatus = request.status?.toLowerCase();

                  if (currentStatus === "pending") {
                    statusStyles = "bg-amber-50 text-amber-700 border-amber-200";
                  } else if (currentStatus === "approved" || currentStatus === "issued") {
                    statusStyles = "bg-green-50 text-green-700 border-green-200";
                  } else if (currentStatus === "rejected") {
                    statusStyles = "bg-red-50 text-red-700 border-red-200";
                  }

                  return (
                    <tr 
                      key={request._id} 
                      className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {request.items[0]?.item?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {request.items[0]?.item?.category || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {request.items[0]?.item?.unit || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium whitespace-nowrap">
                        {request.items[0]?.quantity || 0}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${statusStyles}`}>
                          {request.status}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 text-center whitespace-nowrap flex items-center justify-center gap-2">
                        {/* NEW ACTION: View details modal button */}
                        <button
                          type="button"
                          className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 rounded-md shadow-sm transition-colors"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View
                        </button>

                        <button 
                          type="button"
                          className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-md shadow-sm transition-colors"
                          onClick={() => {/* request cancellation logic */}}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =======================================================
          🛠️ STEP 1 DIAGRAMMED CODE: REQUEST DETAILS OVERLAY MODAL
          ======================================================= */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-6 max-w-md w-full relative transform transition-all scale-100">
            
            {/* Modal Exit Cross Icon Button */}
            <button 
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-semibold leading-none"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="border-b border-gray-100 pb-4 mb-4">
              <span className="text-[10px] font-mono tracking-wider uppercase bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                ID: #{selectedRequest._id.slice(-6).toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mt-2">Receipt Details Summary</h3>
            </div>

            {/* Info Layout Metadata Blocks */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-5">
              <div>
                <p className="text-gray-400 font-medium mb-0.5">Filing Status</p>
                <span className="text-gray-800 font-semibold capitalize bg-gray-50 px-2 py-0.5 rounded border border-gray-200 text-[11px]">
                  {selectedRequest.status}
                </span>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-0.5">Date Requested</p>
                <p className="text-gray-800 font-semibold mt-1">
                  {new Date(selectedRequest.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Complete Itemized Order Entry Listing Row */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 text-xs mb-2">Requested Store Items</h4>
              <div className="border border-gray-100 rounded-lg overflow-hidden text-xs max-h-40 overflow-y-auto">
                <div className="bg-gray-50 px-3 py-2 font-semibold text-gray-500 grid grid-cols-3 border-b border-gray-100">
                  <span>Item Name</span>
                  <span>Category</span>
                  <span className="text-right">Qty Req</span>
                </div>
                
                {/* Dynamically parsing the internal request object collection array array schema matches */}
                {selectedRequest.items?.map((entry, index) => (
                  <div key={index} className="px-3 py-2.5 grid grid-cols-3 items-center text-gray-600 border-b border-gray-50 last:border-0">
                    <span className="font-medium text-gray-900 truncate pr-1">{entry.item?.name || "N/A"}</span>
                    <span className="truncate pr-1">{entry.item?.category || "General"}</span>
                    <span className="text-right font-mono font-medium text-gray-900">{entry.quantity || 0}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 3 TRIGGER: PDF Stream Exporter Download Button Link */}
            <button 
              type="button"
              onClick={() => handleDownloadPDF(selectedRequest._id)}
              disabled={downloadLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold p-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {downloadLoading ? (
                <>
                  <Spinner size="xs" />
                  <p>Compiling System Assets...</p>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  <p>Download Official PDF Receipt</p>
                </>
              )}
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default DepartmentRequests;