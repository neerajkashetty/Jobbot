import React from "react";
import ReactDOM from "react-dom";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Preview } from "../components/preview";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const MyDocument = () => (
  <PDFViewer>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}></View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

ReactDOM.render(<MyDocument />, document.getElementById("root"));
