import { useEffect, useState } from 'react';
import { getAuditLogs } from '../../../services/auditService';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchLogsData = async () => {
    try {
      const data = await getAuditLogs();
    //   console.log(data)
      setLogs(data || []);
    } catch (error) {
      console.error("Error aggregating audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsData();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (!log.timestamp) return false;

    const logTime = new Date(log.timestamp).getTime();

    if (startDate) {
      const startThreshold = new Date(startDate).setHours(0, 0, 0, 0);
      if (logTime < startThreshold) return false;
    }

    if (endDate) {
      const endThreshold = new Date(endDate).setHours(23, 59, 59, 999);
      if (logTime > endThreshold) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const dateObj = new Date(dateString);
    
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return `${formattedDate} • ${formattedTime}`;
  };

  const getActionBadge = (action) => {
    const badges = {
      ITEM_CREATED: 'bg-green-50 text-green-700 border-green-200',
      ITEM_UPDATED: 'bg-amber-50 text-amber-700 border-amber-200',
      ITEM_DELETED: 'bg-red-50 text-red-700 border-red-200',
      CATALOG_EXCEL_IMPORT: 'bg-purple-50 text-purple-700 border-purple-200',
      STOCK_ADJUSTMENT: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    const style = badges[action] || 'bg-gray-50 text-gray-700 border-gray-200';
    const cleanText = action ? action.replace(/_/g, ' ') : 'SYSTEM EVENT';

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border capitalize tracking-wide ${style}`}>
        {cleanText}
      </span>
    );
  };

  const renderDetails = (details) => {
    if (!details) return null;
    if (typeof details === 'string') return details;
    
    if (details.fileName && details.summary) {
      return (
        <div className="flex flex-col text-[11px] text-gray-500 gap-0.5">
          <span className="font-semibold text-gray-700">File: {details.fileName}</span>
          <span>Added: {details.summary.created || 0} • Updated: {details.summary.updated || 0}</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col text-[11px] text-gray-500">
        {details.name && <span className="font-semibold text-gray-700">{details.name}</span>}
        {details.category && <span>Category: {details.category}</span>}
      </div>
    );
  };

  return (
    <div className="audit-log view">
      <div className="p-2 flex flex-col gap-5">
        
        <div className="heading flex flex-col sm:flex-row justify-between items-start sm:items-center p-1 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">System Audit Logs</h2>
          </div>
          
          <div className="filter">
            <p className="text-xs font-bold text-gray-600 mb-1.5">Filter logs by date</p>
            <div className="flex flex-wrap items-end gap-3">
              <span className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-0.5" htmlFor="startDate">From date</label>
                <input 
                  id="startDate"
                  type="date" 
                  className="bg-gray-100 hover:bg-gray-200/70 p-1.5 text-xs font-semibold text-gray-700 rounded-lg outline-none transition-all cursor-pointer" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </span>
              
              <span className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-0.5" htmlFor="endDate">To date</label>
                <input 
                  id="endDate"
                  type="date" 
                  className="bg-gray-100 hover:bg-gray-200/70 p-1.5 text-xs font-semibold text-gray-700 rounded-lg outline-none transition-all cursor-pointer" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>

              <button 
                type="button"
                onClick={clearFilters}
                className={`text-xs h-8 ${ (startDate || endDate) ? 'opacity-100' : 'opacity-0 pointer-events-none' } py-1.5 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 font-semibold px-3 rounded-lg transition-all duration-200`}
              >
                <i className="fas fa-times mr-1"></i> Clear
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-14rem)]">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-50/75 sticky top-0 backdrop-blur-sm border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider z-10">
                <tr>
                  <th className="px-6 py-4">Log ID</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Action Event</th>
                  <th className="px-6 py-4">Operator</th>
                  <th className="px-6 py-4">Affected Resource</th>
                  <th className="px-6 py-4">IP Address</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic bg-white">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
                        Retrieving system audit logs...
                      </div>
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic bg-white">
                      No security audit logs found in this date range.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr 
                      key={log._id} 
                      className="hover:bg-gray-50/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-mono text-[11px] font-medium text-gray-400">
                        AUD-{log._id?.substring(4, 12).toUpperCase() || 'NEW'}
                      </td>
                      
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                        {formatDateTime(log.timestamp)}
                      </td>
                      
                      <td className="px-6 py-4">
                        {getActionBadge(log.action)}
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                            <i className="fas fa-user text-[10px] text-gray-400"></i>
                          </div>
                          <span className="font-semibold text-gray-800 text-xs">{log.userEmail}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-700 text-xs tracking-wider capitalize">
                            {log.targetModel ? `${log.targetModel} Level` : 'System Level'}
                          </span>
                          {renderDetails(log.details)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 border border-gray-200 text-[10px]">
                          {log.ipAddress || '127.0.0.1'}
                        </span>
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
  );
};

export default AuditLogs;