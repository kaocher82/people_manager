import { shallow, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/components/PeopleList';

describe('PeopleList.Vue', () => {
  let localVue = createLocalVue()
  localVue.use(VueRouter)
  let router = new VueRouter()
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(App, {
      localVue,
      router
    })
  })

  it('Should have empty people data and show message', () => {
    expect(wrapper.html()).toContain('No people exist yet')
    expect(wrapper.vm.people).toEqual([])
  })

  describe('List test', () => {
    let nameFilter;
    let emailFilter;
    beforeEach(() => {
      nameFilter = wrapper.find('#nameFilter');
      emailFilter = wrapper.find("#emailFilter");
      wrapper.vm.people = [
        {name: 'cody', email: 'cody@gmail.com'},
        {name: 'david', email: 'david@gmail.com'}
      ]
    })

    it('Adding two people inserts them into the dom', () => {
      expect(wrapper.html()).toContain('cody@gmail.com')
      expect(wrapper.html()).toContain('david@gmail.com')
      expect((wrapper.vm.people).length).toEqual(2)
    })

    it('name filter should result in one person being shown', () => {
      nameFilter.element.value = "cody"
      nameFilter.trigger('input')
      expect(wrapper.html()).toContain('cody')
      expect((wrapper.vm.filteredPeople).length).toEqual(1)
    })

    it('email filter should result in one person being shown', () => {
      emailFilter.element.value = "david@gmail.com"
      emailFilter.trigger('input')
      expect(wrapper.html()).toContain('david@gmail.com')
      expect((wrapper.vm.filteredPeople).length).toEqual(1)
    })

    it('name and email filter should result in one person being shown', () => {
      nameFilter.element.value = "cody"
      nameFilter.trigger('input')
      emailFilter.element.value = "cody@gmail.com"
      emailFilter.trigger('input')
      expect(wrapper.html()).toContain('cody@gmail.com')
      expect((wrapper.vm.filteredPeople).length).toEqual(1)
    })

    it('filtering on a persons name who does not exist results in no people being show', () => {
      nameFilter.element.value = "jane"
      nameFilter.trigger('input')
      expect((wrapper.vm.filteredPeople).length).toEqual(0)
    })

    it('filtering on a persons email who does not exist results in no people being show', () => {
      emailFilter.element.value = "jane@gmail.com"
      emailFilter.trigger('input')
      expect((wrapper.vm.filteredPeople).length).toEqual(0)
    })

    it('clicking clear button should clear filter inputs', () => {
      emailFilter.element.value = "jane@gmail.com"
      emailFilter.trigger('input')
      nameFilter.element.value = "jane"
      nameFilter.trigger('input')
      wrapper.vm.clearFilter()
      expect(nameFilter.element.value).toEqual('')
      expect(emailFilter.element.value).toEqual('')
    })
  })
})
