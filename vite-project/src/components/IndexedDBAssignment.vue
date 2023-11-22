<template>
    <div>
      <input type="file" @change="handleFileChange" accept="image/*" />
      <img :src="imageUrl" v-if="imageUrl" alt="Uploaded Image" />
    </div>
  </template>

  <script>
  export default {
    data() {
        return {
            imageUrl: null,
        }
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageUrl = URL.createObjectURL(file);
          this.saveImageToIndexedDB(e.target.result);
        };

        reader.readAsArrayBuffer(file);
      },
      saveImageToIndexedDB(blob) {
        const request = indexedDB.open("image_dex", 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(["images"], "readwrite");
          const objectStore = transaction.objectStore("images");
          const addRequest = objectStore.add({ image: blob });

          addRequest.onsuccess = () => {
            console.log("Added to ImageDex");
          };

          transaction.oncomplete = () => {
            db.close();
          };
        };
      },
    },
  };
  </script>