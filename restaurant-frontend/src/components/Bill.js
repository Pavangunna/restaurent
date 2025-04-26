import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// 📝 Styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 14 },
  table: { display: "table", width: "auto", marginTop: 10 },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "33%", padding: 5, border: "1px solid black" },
});

const Bill = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}> Restaurant Bill</Text>
        <Text style={styles.text}>Customer Name: {order.customerName}</Text>
        <Text style={styles.text}>Date: {new Date().toLocaleString()}</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: "#ddd" }]}>
          <Text style={styles.tableCol}>Item</Text>
          <Text style={styles.tableCol}>Quantity</Text>
          <Text style={styles.tableCol}>Price (₹)</Text>
        </View>
        {order.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.name}</Text>
            <Text style={styles.tableCol}>{item.quantity}</Text>
            <Text style={styles.tableCol}>{item.quantity * item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>
          Total Amount: ₹{order.totalPrice}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.text, { textAlign: "center", marginTop: 20 }]}>Thank You! Visit Again </Text>
      </View>
    </Page>
  </Document>
);

// PDF Download Button
export const BillDownloadButton = ({ order }) => (
  <PDFDownloadLink document={<Bill order={order} />} fileName="Restaurant_Bill.pdf">
    {({ loading }) =>
      loading ? (
        "Generating PDF..."
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4">
          📄 Download Bill
        </button>
      )
    }
  </PDFDownloadLink>
);

export default Bill;
