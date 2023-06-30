<script setup></script>

<template>
  <main class="tambah-album">
    <h1>Tambah Album Kucing</h1>
    <div class="container-form">
      <p>Silahkan Upload Foto Kucing</p>
      <input type="file" id="img" name="img"/>
      <label for="img">Click me to upload image</label>
      <div class="container-button">
        <button>Simpan Gambar</button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  font-family: 'Open Sans', sans-serif;
}
main {
  background-color: white;
  color: black;
  width: 100%;
  padding: 10px 20px;
  .container-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 5px;
    input,
    button {
      border-radius: 10px;
      padding: 10px;
    }
    button {
      width: 100%;
      background-color: #ffd482;
    }
    label {
      border: 1px;
      border-style: solid;
      border-radius: 5px;
      width: 25%;
      padding: 5px;
      background-color: #afb1b6;
    }
    .container-button {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
