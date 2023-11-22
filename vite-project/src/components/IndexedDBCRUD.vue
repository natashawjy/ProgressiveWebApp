<template>
    <div>
        <p>Data added: {{ addedData }}</p>
        <p>Data updated: {{ updatedDate }}</p>
        <p>Data deleted: {{ deletedData }}</p>
        <button @click="addData">Add Data</button>
        <button @click="readData">Read Data</button>
        <button @click="updateData">Update Data</button>
        <button @click="deleteData">Delete Data</button>
        
        <ul>
            <li v-for="boba in bobas" :key="boba.drink_id">
                {{ boba.name }} - {{ boba.price }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const dbName = "bubble_tea";
const bobaToAdd = {drink_id: "0001", name: "milk tea", price: "28000"};
const drinkIDtoUpdate = "0001";
const updatedBobaData = {drink_id: "0001", name: "milk tea", price: "32000"};
const drinkIDtoDelete = "0001";

const addedData = ref(null);
const updatedData = ref(null);
const bobas = ref([]);

const addData = () => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = (event) => {
        console.error("Error opening database:", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("boba", {keypath: "drink_id"});
        objectStore.createIndex("name", "name", {unique: true});
        objectStore.createIndex("price", "price", {unique: false});
    };

    request.onsuccess = (event) => {
        const db = event.target.result;

        const addTransaction = db.transaction("boba", "readwrite");
        const bobaObjectStore = addTransaction.objectStore("boba");

        const addRequest = bobaObjectStore.add(bobaToAdd);

        addRequest.onsuccess = (event) => {
            console.log("Data addedd successfully");
            addedData.value = "Yes";
        };

        addRequest.onerror = (event) => {
            console.error("Error adding data", event.target.error);
            addedData.value = "No";
        };

        addTransaction.oncomplete = () => {
            console.log("Add transaction completed");
            db.close();
            readData();
        };
    };
};

const readData = () => {
  const request = indexedDB.open(dbName, 2);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const readTransaction = db.transaction("boba", "readonly");
    const bobaObjectStore = readTransaction.objectStore("boba");

    const bobaCursor = bobaObjectStore.openCursor();

    bobaCursor.onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        bobas.value.push(cursor.value);
        cursor.continue();
      } else {
        console.log("Data read successfully");
        db.close();
      }
    };

    bobasCursor.onerror = (event) => {
      console.error("Error reading data", event.target.error);
      db.close();
    };
  };
};

const updateData = () => {
  const request = indexedDB.open(dbName, 2);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const updateTransaction = db.transaction("boba", "readwrite");
    const bobaObjectStore = updateTransaction.objectStore("boba");

    const updateRequest = bobaObjectStore.put(updatedBobaData);

    updateRequest.onsuccess = (event) => {
      console.log("Data updated successfully");
      updatedData.value = "Yes";
    };

    updateRequest.onerror = (event) => {
      console.error("Error updating data", event.target.error);
      updatedData.value = "No";
    };

    updateTransaction.oncomplete = () => {
      console.log("Update transaction completed");
      db.close();
    };
  };
};

const deleteData = () => {
  const request = indexedDB.open(dbName, 2);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const deleteTransaction = db.transaction("boba", "readwrite");
    const deleteObjectStore = deleteTransaction.objectStore("boba");

    const deleteRequest = deleteObjectStore.delete(drinkIDtoDelete);

    deleteRequest.onsuccess = (event) => {
      console.log("Data deleted successfully");
      deletedData.value = "Yes";
    };

    deleteRequest.onerror = (event) => {
      console.error("Error deleting data", event.target.error);
      deletedData.value = "No";
    };

    deleteTransaction.oncomplete = () => {
      console.log("Delete transaction completed");
      db.close();
    };
  };
};

onMounted();
</script>