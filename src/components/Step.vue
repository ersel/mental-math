<template>
  <article class="message is-success">
    <div class="message-header" v-on:click="isHidden = !isHidden">
      <div class="columns">
        <div class="column is-2">
          <i v-bind:class="[isHidden ? 'fa-chevron-right' : 'fa-chevron-down', 'fa']"></i>
        </div>
        <div class="column">
          <p>Step {{stepNumber}}</p>
        </div>
      </div>
    </div>
    <div v-show="!isHidden" class="message-body">
      <p>{{info}}</p>
      <p>{{calculation}}</p>
      <p>{{result}}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'step',
  data () {
    return {
      isHidden: true,
      info: '',
      calculation: '',
      result: ''
    }
  },
  props: ['args', 'stepNumber'],
  created: function () {
    // lets prepare instruction depending on step number
    switch (this.stepNumber) {
      case 1:
        this.step1()
        break
      case 2:
        this.step2()
        break
      case 3:
        this.step3()
        break
      case 4:
        this.step4()
        break
      case 5:
        this.step5()
        break
      default:
        break
    }
  },
  methods: {
    getNthDigitAsNumber: function (number, n) {
      var digit = String(number).charAt(n)
      return Number(digit)
    },
    step1: function () {
      this.info = 'Let\'s calculate 100(a x c), a and c are first digits of the two numbers.'
      let a = this.getNthDigitAsNumber(this.args[0], 0)
      let c = this.getNthDigitAsNumber(this.args[1], 0)
      let result = a * c * 100
      this.calculation = `= 100 x (${a} x ${c})`
      this.result = `= ${result}`
      return result
    },
    step2: function () {
      let b = this.getNthDigitAsNumber(this.args[0], 1)
      let c = this.getNthDigitAsNumber(this.args[1], 0)
      this.info = `Let's calculate 10(b x c); b = ${b}, c = ${c}`
      let result = b * c * 10
      this.calculation = `= 10 x (${b} x ${c})`
      this.result = `= ${result}`
      return result
    },
    step3: function () {
      let a = this.getNthDigitAsNumber(this.args[0], 0)
      let d = this.getNthDigitAsNumber(this.args[1], 1)
      this.info = `Let's calculate 10(a x d); a = ${a}, d = ${d}`
      let result = a * d * 10
      this.calculation = `= 10 x (${a} x ${d})`
      this.result = `= ${result}`
      return result
    },
    step4: function () {
      let b = this.getNthDigitAsNumber(this.args[0], 1)
      let d = this.getNthDigitAsNumber(this.args[1], 1)
      this.info = `Let's calculate b x d; b = ${b}, d = ${d}`
      let result = b * d
      this.calculation = `= ${b} x ${d}`
      this.result = `= ${result}`
      return result
    },
    step5: function () {
      let step1 = this.step1()
      let step2 = this.step2()
      let step3 = this.step3()
      let step4 = this.step4()
      this.info = `Now add up all of the previous steps`
      let result = step1 + step2 + step3 + step4
      this.calculation = `= ${step1} + ${step2} + ${step3} + ${step4}`
      this.result = `= ${result}`
      return result
    }
  }
}
</script>

<style>
.message-body {
  text-align: left;
}
</style>
