import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase({ name: 'myDatabase.db', location: 'default' });

const HomeScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
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

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <View>
      <Text>Order List</Text>
      {orders.map((order) => (
        <Button
          key={order.id}
          title={`Order ${order.id}`}
          onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
        />
      ))}
    </View>
  );
};

export default HomeScreen;

