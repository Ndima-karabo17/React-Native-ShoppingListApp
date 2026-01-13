import {  StyleSheet, View } from "react-native";
import ShoppingList from "./ShoppingList";

export default function Index() {
  return (
   
      <View style={styles.container}>
        <ShoppingList />
      </View>

  );
}
const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    
    marginTop: 50,
    height:'100%',

  },
})