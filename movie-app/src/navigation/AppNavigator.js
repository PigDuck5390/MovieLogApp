// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MainScreen from "../screens/Main/MainScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import JoinScreen from "../screens/Join/JoinScreen";
import MoviesScreen from "../screens/Movies/MoviesScreen";
import BenefitScreen from "../screens/Benefit/BenefitScreen";
import EventScreen from "../screens/Event/EventScreen";
import MyPageScreen from "../screens/MyPage/MyPageScreen";
import ReservationScreen from "../screens/Reservation/ReservationScreen";
import SeatScreen from "../screens/Seat/SeatScreen";
import MyInfoScreen from "../screens/MyInfo/MyInfoScreen";
import MyReserveScreen from "../screens/MyReserve/MyReserveScreen";
import PaymentScreen from "../screens/Payment/PaymentScreen";
import VipLoungeScreen from "../screens/VipLounge/VipLoungeScreen";
import ServiceScreen from "../screens/Service/ServiceScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Main */}
        <Stack.Screen name="Main" component={MainScreen} />

        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />

        {/* User visible pages */}
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="Benefit" component={BenefitScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />

        {/* Parameter screens */}
        <Stack.Screen name="Seat" component={SeatScreen} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} />
        <Stack.Screen name="MyReserve" component={MyReserveScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />

        {/* Lounge */}
        <Stack.Screen name="VipLounge" component={VipLoungeScreen} />
        <Stack.Screen name="Service" component={ServiceScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
