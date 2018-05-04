<template>
  <div>
    <span class="font-weight-bold">Filter:</span>
    <label>Name: </label>
    <input type="text" v-model="name" placeholder="Filter name..." />
    <label>Email: </label>
    <input type="text" v-model="email" placeholder="Filter email..." />
    <ul class="list-group">
      <li class="list-group-item">
        <router-link to="/new">Create new person</router-link>
      </li>
      <li class="list-group-item" v-for="person in filteredPeople" :key="person.id">
        <span class="font-weight-bold">name: </span>
        <span>
          {{ person.name }}
        </span>
        <span class="font-weight-bold">email: </span>
        <span>
          {{ person.email }}
        </span>
      </li>
      <li class="list-group-item" v-if="filteredPeople.length === 0 && !(name || email)">
        No people exist yet
      </li>
      <li class="list-group-item" v-if="filteredPeople.length === 0 && (name || email)">
        No people found in search
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PeopleList',
  data () {
    return {
      people: [],
      name: '',
      email: ''
    }
  },
  computed: {
    filteredPeople: function () {
      var name = this.name.toLowerCase()
      var email = this.email.toLowerCase()
      return this.people.filter(function (el) {
        return (
          name === el.name.toLowerCase().substring(0, name.length) &&
          email === el.email.toLowerCase().substring(0, email.length)
        )
      })
    }
  },
  created: function () {
    var self = this
    axios.get('http://0.0.0.0:8000/vue_manager/people/')
      .then(function (response) {
        self.people = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>
