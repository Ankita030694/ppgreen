"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

interface Lead {
  id: string;
  clientName: string;
  contactNumber: string;
  clientType: string;
  leadSource: string;
  otherLeadSource?: string;
  brokerName?: string;
  brokerContactNumber?: string;
  salespersonName?: string;
  createdAt: any;
  status?: string;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(
          collection(db, "contact_inquiries"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        
        const leadsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Lead[];
        
        setLeads(leadsData);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    
    // Check if it's a Firestore Timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    
    // If it's a string from another source
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const leadRef = doc(db, "contact_inquiries", leadId);
      await updateDoc(leadRef, { status: newStatus });
      // Update local state for immediate UI feedback
      setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please ensure you have correct database permissions.");
    }
  };

  const downloadCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "Client Name",
      "Contact Number",
      "Client Type",
      "Lead Source",
      "Broker Name",
      "Broker Contact",
      "Salesperson Name",
      "Date",
      "Status"
    ];

    const escapeCSV = (str: string | undefined | null) => {
      if (!str) return "";
      const escaped = str.toString().replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csvRows = [
      headers.join(","),
      ...leads.map(lead => {
        const source = lead.leadSource === 'Other' && lead.otherLeadSource 
          ? `Other: ${lead.otherLeadSource}` 
          : lead.leadSource;
          
        return [
          escapeCSV(lead.clientName),
          escapeCSV(lead.contactNumber),
          escapeCSV(lead.clientType),
          escapeCSV(source),
          escapeCSV(lead.brokerName),
          escapeCSV(lead.brokerContactNumber),
          escapeCSV(lead.salespersonName),
          escapeCSV(formatDate(lead.createdAt)),
          escapeCSV(lead.status || 'New')
        ].join(",");
      })
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `PP_Green_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads & Inquiries</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all incoming contacts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-700">
              {leads.length} Total Leads
            </span>
          </div>

          <button
            onClick={downloadCSV}
            disabled={leads.length === 0}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-green-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Client Details</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Contact Info</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Type / Source</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Broker / Sales</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                      Loading leads data...
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No leads found in the database.
                  </td>
                </tr>
              ) : (
                leads.map((lead, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={lead.id} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.clientName || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`tel:${lead.contactNumber}`} className="text-green-600 hover:text-green-700 font-medium">
                        {lead.contactNumber || 'N/A'}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 w-fit">
                          {lead.clientType || 'N/A'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lead.leadSource === 'Other' && lead.otherLeadSource 
                            ? `Other: ${lead.otherLeadSource}` 
                            : (lead.leadSource || 'N/A')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        {lead.brokerName && (
                          <div className="text-gray-600">
                            <span className="font-semibold text-gray-900">Broker:</span> {lead.brokerName}
                            {lead.brokerContactNumber && ` (${lead.brokerContactNumber})`}
                          </div>
                        )}
                        {lead.salespersonName && (
                          <div className="text-gray-600">
                            <span className="font-semibold text-gray-900">Sales:</span> {lead.salespersonName}
                          </div>
                        )}
                        {!lead.brokerName && !lead.salespersonName && (
                          <span className="text-gray-400">Direct</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 cursor-pointer focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors shadow-sm
                          ${(!lead.status || lead.status === 'New') ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : ''}
                          ${lead.status === 'Hot Lead' ? 'bg-red-100 text-red-700 hover:bg-red-200' : ''}
                          ${lead.status === 'Warm Lead' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : ''}
                          ${lead.status === 'Cold Lead' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}
                          ${lead.status === 'Converted' ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                        `}
                      >
                        <option value="New" className="bg-white text-gray-900">New</option>
                        <option value="Hot Lead" className="bg-white text-gray-900">🔥 Hot Lead</option>
                        <option value="Warm Lead" className="bg-white text-gray-900">☀️ Warm Lead</option>
                        <option value="Cold Lead" className="bg-white text-gray-900">❄️ Cold Lead</option>
                        <option value="Converted" className="bg-white text-gray-900">✅ Converted</option>
                      </select>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
