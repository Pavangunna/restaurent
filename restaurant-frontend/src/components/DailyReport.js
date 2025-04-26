import React, { useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { getDailyReport } from "../api/api";
import { toast } from "react-toastify";

// 📝 Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 14 },
  table: { display: "table", width: "auto", marginTop: 10 },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "25%", padding: 5, border: "1px solid black" },
});

// 📝 Daily Report PDF Component
const DailyReportPDF = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>📅 Daily Orders Report</Text>
        <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: "#ddd" }]}>
          <Text style={styles.tableCol}>Customer</Text>
          <Text style={styles.tableCol}>Items</Text>
          <Text style={styles.tableCol}>Total (₹)</Text>
          <Text style={styles.tableCol}>Time</Text>
        </View>

        {/* Orders Data */}
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{order.customerName}</Text>
              <Text style={styles.tableCol}>
                {order.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")}
              </Text>
              <Text style={styles.tableCol}>₹{order.totalPrice}</Text>
              <Text style={styles.tableCol}>{new Date(order.createdAt).toLocaleTimeString()}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>No orders today.</Text>
        )}
      </View>
    </Page>
  </Document>
);

// 🖨️ Daily Report Component
const DailyReport = () => {
  const [orders, setOrders] = useState([]);

  // Fetch Daily Report
  const fetchReport = async () => {
    try {
      const data = await getDailyReport();
      console.log("Fetched Orders:", data);
      setOrders(data);
      toast.success("Daily report generated!");
    } catch (error) {
      toast.error("Error fetching report!");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-darkCard rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">📅 Daily Report</h2>
      
      {/* Fetch Report Button */}
      <button
        onClick={fetchReport}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
      >
        📊 Generate Report
      </button>

      {/* Download Report Button */}
      {orders.length > 0 && (
        <PDFDownloadLink document={<DailyReportPDF orders={orders} />} fileName="Daily_Report.pdf">
          {({ loading }) =>
            loading ? (
              "Generating PDF..."
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4">
                📄 Download Report
              </button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default DailyReport;
