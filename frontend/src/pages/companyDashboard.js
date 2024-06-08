import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, Button, Box } from '@chakra-ui/react';

const TransactionViewer = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const transactions = [
    { id: 1, date: '2024-06-01', amount: '$100.00', description: 'Example transaction 1' },
    { id: 2, date: '2024-06-02', amount: '$150.00', description: 'Example transaction 2' },
    { id: 3, date: '2024-06-03', amount: '$75.00', description: 'Example transaction 3' }
  ];

  const toggleCheckbox = (transactionId) => {
    setSelectedTransactions(prevSelected => {
      if (prevSelected.includes(transactionId)) {
        return prevSelected.filter(id => id !== transactionId);
      } else {
        return [...prevSelected, transactionId];
      }
    });
  };

  const handleSubmit = () => {
    // Process selectedTransactions here, e.g., send to server
    console.log(selectedTransactions);
  };

  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map(transaction => (
            <Tr key={transaction.id}>
              <Td>
                <Checkbox
                  isChecked={selectedTransactions.includes(transaction.id)}
                  onChange={() => toggleCheckbox(transaction.id)}
                />
              </Td>
              <Td>{transaction.date}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        colorScheme="blue"
        mt={4}
        onClick={handleSubmit}
        isDisabled={selectedTransactions.length === 0}
      >
        Submit
      </Button>
    </Box>
  );
};

export default TransactionViewer;
