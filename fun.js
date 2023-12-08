import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'myDatabase.db', location: 'default' });

const fetchOrders = async () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM orders',
        [],
        (_, { rows }) => {
          const ordersData = rows.raw();
          setOrders(ordersData);
        },
        (tx, error) => {
          console.error('Error fetching orders', error);
        }
      );
    });
  } catch (error) {
    console.error('Error fetching orders', error);
  }
};
