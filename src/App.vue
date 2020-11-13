<template>
  <div id="app" class="main-container">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/styles/tailwind.scss';

#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main-container {
  @apply text-gray-dark text-2xl;
}

.error-msg-container {
  @apply text-left;

  .error-msg {
    @apply text-error-dark text-base tracking-wider;
    @apply ml-3;
  }
}
</style>
