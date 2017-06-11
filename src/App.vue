<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-left">
        <a href="/" class="nav-item">
          <img src="../static/logo.png" alt="MentalMath logo">
        </a>
      </div>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div class="nav-right nav-menu">
        <div class="nav-item">
          <div class="field is-grouped">
            <p class="control">
            <a href="https://github.com/ersel/mental-math" class="button is-success">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
              <span>Fork me on GitHub</span>
            </a>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  background-color: #3273dc;
}
</style>
