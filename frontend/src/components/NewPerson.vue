<template>
<div>
  <form name="createPerson" @submit="submitPerson">
    <p class="font-weight-bold"> Create a person </p>
    <div>
      <label>Name:</label>
      <input v-model="fields.name" type="text" placeholder="enter name of person..." />
      <p style="color:red">{{errors.name}}</p>
    </div>
    <div>
      <label>Email:</label>
      <input v-model="fields.email" type="text" placeholder="enter email of person..." />
      <p style="color:red">{{errors.email}}</p>
    </div>
    <button type="submit" class="btn"> Submit </button>
    <router-link to="/">Back</router-link>
  </form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewPerson',
  data () {
    return {
      fields: {
        name: '',
        email: ''
      },
      errors: {
        name: undefined,
        email: undefined
      }
    }
  },
  methods: {
    submitPerson () {
      var self = this

      self.errors = self.validatePerson()
      if (Object.keys(self.errors).length) return

      var data = {name: self.fields.name, email: self.fields.email}
      axios.post('http://0.0.0.0:8000/vue_manager/', data)
        .then(function (response) {
          self.$router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    validatePerson () {
      const errors = {}
      if (!this.fields.name) {
        errors.name = 'name is required'
      }
      if (!this.fields.email || !this.isEmail(this.fields.email)) {
        errors.email = 'a valid email is required'
      }
      return errors
    },
    isEmail (email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    }
  }
}
</script>
