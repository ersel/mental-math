<template>
  <div>
    <section class="hero is-success">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Welcome to <i>Mental Math</i></h1>
          <h2 class="subtitle">A platform to learn and practice mental arithmetic tricks, simply click on an exercise below to get started.</h2>
        </div>
      </div>
    </section>
    <div class="container section blue-skies">
      <div v-for="i in Math.ceil(exercises.length / 3)" class="columns is-centered">
        <div v-for="exercise in exercises.slice((i - 1) * 3, i * 3)" class="column is-4">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
              {{exercise.title}}
              </p>
            </header>
            <div class="card-content">
              <div class="panel-block-item">
                {{exercise.description}}
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
              <a :href="exercise.route" class="button is-info">
                <span class="icon is-small">
                  <i class="fa fa-rocket"></i>
                </span>
                <span>{{exercise.button_label}}</span>
              </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
          <strong>MentalMath</strong> by <a href="http://erselaker.com">Ersel Aker</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          </p>
          <p>
          <a class="icon" href="https://github.com/ersel/mental-math">
            <i class="fa fa-github"></i>
          </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'Homepage',
  data () {
    return {
      exercises: [{
        title: 'Multiplication of any 2 digit numbers',
        description: 'Learn how to multiply any 2 digit numbers in 4 simple steps.',
        route: '/#/exercise1',
        button_label: 'Lets go!'
      }
      ]
    }
  }
}

</script>

<style>
.blue-skies {
  background-color: inherit;
}
</style>
