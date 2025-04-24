// app/(auth)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
       <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar/>
    </>
  );
};

export default AuthLayout;
