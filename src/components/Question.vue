<template>
  <div class="columns">
    <div class="column is-two-thirds is-offset-2">
      <div class="tile has-text-centered" style="background-color:#000">
        <article class="tile is-child notification is-info">
          <p class="title">{{questionString}}</p>
          <p class="subtitle">Click on the step title to display or hide tips</p>
          <article class="message is-success">
            <div class="message-header" v-on:click="isHidden = !isHidden">
              Step 1
            </div>
            <div v-show="!isHidden" class="message-body">Further explanation on the first step</div>
          </article>
          <div class="title">
            <input v-bind:class="isWrong ? 'shake animated is-danger' : ''" v-model="response" v-focus v-on:keyup.enter="evaluate" class="input is-info is-large" type="text" placeholder="Enter your answer and hit enter" value="">
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  data () {
    return {
      isHidden: true,
      args: [],
      ops: [],
      questionString: '',
      isWrong: false,
      response: ''
    }
  },
  created: function () {
    this.arguments(2, 0, 100, true)
    this.operations(1, '+')
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
      const total = this.args.reduce((a, b) => a + b, 0)
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
  }
}
</script>
