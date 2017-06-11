<template>
  <div>
    <section class="hero is-success">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{exerciseTitle}}
          </h1>
          <h2 class="subtitle">
            {{exerciseDescription}}
          </h2>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column is-two-thirds is-offset-2">
        <div class="tile has-text-centered" style="background-color:#000">
          <article class="tile is-child notification is-info">
            <!--<button @click="nextQuestion">Next Q</button>-->
            <!-- put individial questions here -->
            <div v-for="n in noOfQuestions" :key="startTime" >
              <component is="question" v-if="n == activeQuestion" v-on:guess="noOfGuesses += 1" v-on:next="nextQuestion"></component>
            </div>
            <div v-if="exerciseComplete">
              <div class=title>Great Work!</div>
              <div class=title>You've answered {{noOfQuestions}} questions.</div>
              <div class=title>It took you {{noOfGuesses}} guesses in {{myDuration}}.</div>
              <button class="button is-success is-large" v-on:click="replay">Play Again</button>
            </div>
            <div v-if="!exerciseComplete">
              <div class="title">
                <progress class="progress is-success is-large" v-bind:value="activeQuestion" v-bind:max="noOfQuestions"></progress>
              </div>
              <p class="subtitle">{{activeQuestion}} of {{noOfQuestions}}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question'
import moment from 'moment'

export default {
  name: 'exercise',
  data () {
    return {
      noOfQuestions: 10,
      noOfGuesses: 0,
      activeQuestion: 1,
      startTime: null,
      endTime: null,
      duration: 0,
      exerciseComplete: false,
      exerciseTitle: 'Multiplication of any 2 digit numbers',
      exerciseDescription: 'ab x cd = (10a + b) x (10c + d)',
      myDuration: 0
    }
  },
  created: function () {
    this.startTime = moment(new Date())
  },
  methods: {
    nextQuestion: function () {
      if (this.activeQuestion === this.noOfQuestions) {
        // exercise is completed
        // calculate duration
        // and set exerciseComplete to true
        this.endTime = moment(new Date())
        this.duration = moment.duration(this.endTime.diff(this.startTime)).asMilliseconds()
        const minutes = moment(this.duration).format('m')
        const seconds = moment(this.duration).format('s')
        this.myDuration = ''
        if (parseInt(minutes, 10) > 0) {
          if (parseInt(minutes, 10) === 1) {
            this.myDuration = `${minutes} minute and `
          } else {
            this.myDuration = `${minutes} minutes and `
          }
        }
        this.myDuration += `${seconds} seconds`
        this.exerciseComplete = true
      }

      this.activeQuestion += 1
    },
    replay: function () {
      this.activeQuestion = 1
      this.exerciseComplete = false
      this.startTime = moment(new Date())
      this.noOfGuesses = 0
      this.endTime = null
      this.duration = 0
      this.myDuration = 0
    }
  },
  components: {
    'question': Question
  }
}

</script>
