import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export function LoadingView({ children, message = '' }) {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='flex-col'>
        <Text className='text-4xl text-center'>{message}</Text>
        {children}
        <ActivityIndicator />
      </View>
    </View>
  );
}