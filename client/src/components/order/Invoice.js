import React from 'react';
import { 
  Document, 
  Page, 
  Text,  
  StyleSheet, 
} from '@react-pdf/renderer';
import { 
  Table, 
  TableHeader, 
  TableCell, 
  TableBody, 
  DataTableCell 
} from '@david.kucsai/react-pdf-table';
const Invoice = () => (
  <Document>
    <Page size='A4'>
       <Text>Order Invoice</Text>
    </Page>
  </Document>
)

 
export default Invoice;