import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {addItem, updateItem, deleteItem, toggleItem, ShoppingItem  } from "@/redux/reducers/shoppingSlice"; 
export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shopping.items);

  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("1");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrSave = () => {
    if (itemName.trim() === "") return;

    if (editingId !== null) {
      dispatch(updateItem({ id: editingId, name: itemName, qty: itemQty }));
      setEditingId(null);
    } else {
      dispatch(addItem({ name: itemName, qty: itemQty }));
    }

    setItemName("");
    setItemQty("1");
  };

  const startEdit = (item: ShoppingItem) => {
    setEditingId(item.id);
    setItemName(item.name);
    setItemQty(item.qty);
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete Item", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          dispatch(deleteItem(id));
          if (editingId === id) {
            setEditingId(null);
            setItemName("");
            setItemQty("1");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Shopping List</Text>

      <View style={styles.inputZone}>
        <View style={{ flex: 2, marginRight: 10 }}>
          <Text style={styles.label}>Item name:</Text>
          <TextInput style={styles.input} value={itemName} onChangeText={setItemName} />
        </View>
        <View style={{ flex: 0.8, marginRight: 10 }}>
          <Text style={styles.label}>Qty:</Text>
          <TextInput style={styles.input} value={itemQty} onChangeText={setItemQty} />
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
                value={item.checked}
                onValueChange={() => dispatch(toggleItem(item.id))}
                color={item.checked ? "#080808" : undefined}
              />
              <View>
                <Text style={[styles.itemText, item.checked && styles.completedText]}>{item.name}</Text>
                <Text style={[styles.itemChild, item.checked && styles.completedText]}>*{item.qty}</Text>
              </View>
            </View>

            <View style={styles.itemActions}>
              <TouchableOpacity onPress={() => startEdit(item)}>
                <Ionicons name={editingId === item.id ? "eye-outline" : "pencil-outline"} size={20} color={"blue"} />
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
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 50,
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 30,
  },
  inputZone: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 30,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    height: 45,
  },
  addButton: {
    backgroundColor: "#000",
    width: 70,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
  itemRow: {
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editingRow: {
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  itemChild: { fontSize: 12, color: "#796e6e" },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  itemActions: {
    flexDirection: "row",
    gap: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
  check: {
    flexDirection: "row",
    gap: 15,
  },
  itemText: {},
});
