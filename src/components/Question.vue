<template>
  <div class="columns">
    <div class="column is-two-thirds is-offset-2">
      <div class="tile has-text-centered" style="background-color:#000">
        <article class="tile is-child notification is-info">
          <p class="title">{{questionString}}</p>
          <p class="subtitle">Click on the step title to display or hide tips</p>
          <article class="message is-success">
            <div class="message-header" v-on:click="isHidden = !isHidden">
              <div class="columns">
                <div class="column is-2">
                  <i v-bind:class="[isHidden ? 'fa-chevron-right' : 'fa-chevron-down', 'fa']"></i>
                </div>
                <div class="column">
                  <p>Description</p>
                </div>
              </div>
            </div>
            <div v-show="!isHidden" class="message-body">
              <p>
              To easily multiply any 2-digit numbers together a simple algorithm is as follows (where a is the tens digit of the first number, b is the ones digit of the first number, c is the tens digit of the second number and d is the ones digit of the second number):
              </p>
              <br>
              <p>
              ab x cd = (10a + b) * (10c + d)
              </p>
              <p>
              = 100(a * c) + 10(b * c) + 10(a * d) + (b * d)
              </p>
            </div>
          </article>
          <step v-for="i in steps" :args="args" :stepNumber="i" v-bind:key="'step'+i"></step>
          <div class="title">
            <input v-bind:class="isWrong ? 'shake animated is-danger' : ''" v-model="response" v-focus v-on:keyup.enter="evaluate" class="input is-info is-large" type="text" placeholder="Enter your answer and hit enter" value="">
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Step from '@/components/Step'
export default {
  name: 'question',
  data () {
    return {
      isHidden: true,
      args: [],
      ops: [],
      steps: 5,
      questionString: '',
      isWrong: false,
      response: ''
    }
  },
  created: function () {
    this.arguments(2, 10, 100, true)
    this.operations(1, 'x')
    this.question()
  },
  methods: {
    arguments: function (n, min, max, integer) {
      // returns a list of (n) numbers
      // a random number between min (inclusive) and max (exclusive)
      let argsArr = []
      for (var i = 0; i < n; i++) {
        argsArr[i] = Math.random() * (max - min) + min
      }
      if (integer) {
        argsArr = argsArr.map(Math.floor)
      }
      this.args = argsArr
    },
    operations: function (n, operation) {
      // returns a list of operations
      // +, -, *, /
      this.ops = operation.repeat(n).split('')
    },
    question: function () {
      let str = ''
      for (var i = 0; i < this.args.length; i++) {
        str += this.args[i] + ' '
        if (this.ops[i]) {
          str += this.ops[i] + ' '
        }
      }
      this.questionString = str + '= ?'
    },
    evaluate: function (event) {
      const total = this.args.reduce((a, b) => a * b, 1)
      const result = total === parseInt(this.response, 10)
      this.$emit('guess')
      if (result) {
        // emit next question event so exercise udpates
        this.$emit('next')
      } else {
        this.isWrong = true
        setTimeout(function () {
          this.isWrong = false
        }.bind(this), 1000)
      }
    }
  },
  components: {
    'step': Step
  }
}
</script>

<style>
.message-body {
  text-align: left;
}
</style>
