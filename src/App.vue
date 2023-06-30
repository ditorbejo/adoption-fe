<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container-home">
      <a class="home" href="/"> LoremIpsum </a>
    </div>
    <button aria-label="navigasi" class="hamburger-button">
      <svg
        class="hamburger-icon"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
        />
      </svg>
    </button>
  </header>
  <RouterView />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: black;
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffae11;
  padding: 5px 20px;
  .hamburger-button {
    padding: 0;
    border: none;
    background: none;
    opacity: 1;
    height: 44px;
    width: 44px;
    cursor: pointer;
    .hamburger-icon {
      font-size: 44px;
      color: white;
    }
  }
  .container-home a {
    font-size: large;
  }
}
</style>
