import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store"; // 1. Path to your store file (check if this is correct!)
import React from "react";

export default function RootLayout() {
  return (

    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
