import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';

interface ShoppingItem {
  id: number;
  name: string;
  qty: string;
  checked: boolean;
}

export default function ShoppingList() {
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("1");
  // Track which item ID is being edited. null means we are adding a new item.
  const [editingId, setEditingId] = useState<number | null>(null);

  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: "Bananas", qty: "3 bunch", checked: false },
    { id: 2, name: "Milk Organic Eggs", qty: "3 dosh", checked: false },
    { id: 3, name: "Bell Peppers", qty: "2 units", checked: false }
  ]);


  const handleAddOrSave = () => {
    if (itemName.trim() === "") return;

    if (editingId !== null) {
 
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === editingId ? { ...item, name: itemName, qty: itemQty } : item
        )
      );
      setEditingId(null);
    } else {
 
      const newItem: ShoppingItem = {
        id: Date.now(),
        name: itemName,
        qty: itemQty,
        checked: false,
      };
      setItems([...items, newItem]);
    }

   
    setItemName("");
    setItemQty("1");
  };

  const startEdit = (item: ShoppingItem) => {
    setEditingId(item.id);
    setItemName(item.name);
    setItemQty(item.qty);
  };

  const toggleCheckbox = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Are you sure you want to delete?",
      "When you delete item it won't be able to be retrieve.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
            if (editingId === id) {
              setEditingId(null);
              setItemName("");
              setItemQty("1");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Shopping List</Text>

      <View style={styles.inputZone}>
        <View style={{ flex: 2, marginRight: 10 }}>
          <Text style={styles.label}>Item name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />
        </View>
        <View style={{ flex: 0.8, marginRight: 10 }}>
          <Text style={styles.label}>Qty:</Text>
          <TextInput
            style={styles.input}
            value={itemQty}
            onChangeText={setItemQty}
          />
        </View>
       
        <TouchableOpacity 
          style={[styles.addButton, editingId !== null && styles.saveButton]} 
          onPress={handleAddOrSave}
        >
          <Text style={styles.addButtonText}>{editingId !== null ? "Save" : "Add"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={[styles.itemRow, editingId === item.id && styles.editingRow]}>
            <View style={styles.check}>
              <Checkbox
                style={styles.checkbox}
                value={item.checked}
                onValueChange={() => toggleCheckbox(item.id)}
                color={item.checked ? '#080808' : undefined}
              />
              <View>
                <Text style={[styles.itemText, item.checked && styles.completedText]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemChild, item.checked && styles.completedText]}>
                  *{item.qty}
                </Text>
              </View>
            </View>
            
            <View style={styles.itemActions}>
              <TouchableOpacity onPress={() => startEdit(item)}>
                <Ionicons 
                  name={editingId === item.id ? "eye-outline" : "pencil-outline"} 
                  size={20} 
                  color={"blue"} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginTop: 50 },
  h1: { fontSize: 28, fontWeight: "bold", marginLeft: 30, marginBottom: 30 },
  inputZone: { flexDirection: "row", alignItems: "flex-end", marginBottom: 30, paddingHorizontal: 10, marginLeft: 10 },
  label: { fontSize: 15, fontWeight: "bold", marginLeft: 10, marginBottom: 5 },
  input: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 8, height: 45 },
  addButton: { backgroundColor: "#000", width: 70, height: 45, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: 5 },
  saveButton: { backgroundColor: "#2196F3" }, 
  addButtonText: { color: "white", fontWeight: "bold" },
  list: { paddingHorizontal: 20, gap: 10 },
  itemRow: { backgroundColor: '#f7f7f7', borderRadius: 15, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  editingRow: { borderWidth: 1, borderColor: '#2196F3' },
  itemChild: { fontSize: 12, color: '#796e6e' },
  completedText: { textDecorationLine: 'line-through', color: '#aaa' },
  itemActions: { flexDirection: 'row', gap: 15 },
  checkbox: { alignSelf: 'center' },
  check: { flexDirection: 'row', gap: 15 },
  itemText:{

  }
});
