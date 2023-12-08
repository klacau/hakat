import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'myDatabase.db', location: 'default' });

// Использование хука useFocusEffect для автоматической загрузки данных при фокусировке на экране
useFocusEffect(
  React.useCallback(() => {
    const fetchOrders = async () => {
      try {
        // Внимание: использование промиса для асинхронного выполнения SQL-запроса
        const ordersData = await new Promise((resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM orders',
              [],
              (_, { rows }) => {
                const ordersData = rows.raw();
                resolve(ordersData);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, [])
);
