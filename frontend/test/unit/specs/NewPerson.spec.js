import { shallow, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/components/NewPerson';

describe('NewPerson.Vue', () => {
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

  describe('NewPerson form tests', () => {
    let submitButton;
    let nameInput;
    let emailInput;
    beforeEach(() => {
      submitButton = wrapper.find('#submit');
      nameInput = wrapper.find("#nameInput");
      emailInput = wrapper.find("#emailInput");
    })

    it('form should give errors on submitting blank data', () => {
      submitButton.trigger('submit')
      expect(wrapper.vm.errors.name).toBe('name is required')
      expect(wrapper.vm.errors.email).toBe('a valid email is required')
    })

    it('from only has email error when given name and no email', () => {
      nameInput.element.value = 'cody'
      nameInput.trigger('input')
      submitButton.trigger('submit')
      expect(wrapper.vm.errors.name).toBe(undefined)
      expect(wrapper.vm.errors.email).toBe('a valid email is required')
    })

    it('email should correctly validate', () => {
      emailInput.element.value = 'cody'
      emailInput.trigger('input')
      submitButton.trigger('submit')
      expect(wrapper.vm.errors.email).toBe('a valid email is required')
    })

    it('no errors should occur with valid data', () => {
      nameInput.element.value = 'cody'
      nameInput.trigger('input')
      emailInput.element.value = 'cody@gmail.com'
      emailInput.trigger('input')
      submitButton.trigger('submit')
      expect(wrapper.vm.errors.email).toBe(undefined)
      expect(wrapper.vm.errors.name).toBe(undefined)
    })
  })
})
