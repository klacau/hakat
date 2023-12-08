import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // Загрузка списка заказов из AsyncStorage или сервера
      const ordersData = await AsyncStorage.getItem('orders');
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      }
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
