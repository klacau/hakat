import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState({});

  const fetchOrderDetails = async () => {
    try {
      // Загрузка деталей заказа из AsyncStorage или сервера
      const orderDetailsData = await AsyncStorage.getItem(`order_${orderId}`);
      if (orderDetailsData) {
        setOrderDetails(JSON.parse(orderDetailsData));
      }
    } catch (error) {
      console.error('Error fetching order details', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const handleDeliveryComplete = async () => {
    try {
      // Логика для фиксации факта доставки
      // Сохранение факта доставки в AsyncStorage или отправка на сервер
      const updatedOrderDetails = { ...orderDetails, delivered: true };
      await AsyncStorage.setItem(`order_${orderId}`, JSON.stringify(updatedOrderDetails));
      fetchOrderDetails(); // Обновление состояния с новыми данными
    } catch (error) {
      console.error('Error completing delivery', error);
    }
  };

  return (
    <View>
      <Text>Order Details</Text>
      <Text>{`Order ID: ${orderId}`}</Text>
      <Text>{`Delivered: ${orderDetails.delivered ? 'Yes' : 'No'}`}</Text>
      <Button title="Complete Delivery" onPress={handleDeliveryComplete} />
    </View>
  );
};

export default OrderDetailScreen;
