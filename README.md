


## Developer Setup Guide
1. Prerequisites
   
Before starting, ensure you have the following installed:

Node.js (v18 or higher)

npm or yarn

Expo CLI (npm install -g expo-cli)

iOS/Android Simulator or the Expo Go app on a physical device.

2. Project Architecture
   
The application uses a modern Redux Toolkit structure to manage state and API interactions.

redux/store.ts: The central state container.

redux/reducers/shoppingSlice.ts: Contains the logic for API calls (Thunks) and state mutations.

ShoppingList.tsx: The main UI component using hooks to interact with Redux.



Here is the comprehensive documentation for the Shopping List App. This guide covers the technical architecture, installation steps, and a user manual.

🛠 Developer Setup Guide
1. Prerequisites
   -
Before starting, ensure you have the following installed:

Node.js (v18 or higher)

npm or yarn

Expo CLI (npm install -g expo-cli)

iOS/Android Simulator or the Expo Go app on a physical device.

2. Project Architecture
   -
The application uses a modern Redux Toolkit structure to manage state and API interactions.

redux/store.ts: The central state container.

redux/reducers/shoppingSlice.ts: Contains the logic for API calls (Thunks) and state mutations.

ShoppingList.tsx: The main UI component using hooks to interact with Redux.

3. Environment Configuration
   -
The app relies on an external API (MockAPI). Create a .env file in the root director

4. Installation & Running
   -
Clone the repository and navigate to the folder.

Install dependencies:

npm install

npm install @reduxjs/toolkit react-native expo-checkbox @expo/vector-icons

5. Start the application:
   -
npx expo start
