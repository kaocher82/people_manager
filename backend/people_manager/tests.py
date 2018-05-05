from django.test import TestCase, Client
from people_manager.models import Person
from people_manager.forms import PersonForm

class PersonTestViews(TestCase):
    def setUp(self):
        Person.objects.create(name='cody',email='cody@gmail.com')
        Person.objects.create(name='geoff',email='geoff@gmail.com')
        self.client = Client()

    def test_person_is_created(self):
        person = Person.objects.first()
        self.assertEqual(person.name, 'cody')
        self.assertEqual(person.email, 'cody@gmail.com')

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['people']), 2)

    def test_view(self):
        response = self.client.get('/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['person'].id, 1)
        self.assertEqual(response.context['person'].name, 'cody')

    def test_new_get(self):
        response = self.client.get('/new/')
        self.assertEqual(response.status_code, 200)

    def test_new_post(self):
        response = self.client.post('/new/', {'name': 'ben', 'email': 'ben@gmail.com'})
        self.assertEqual(response.status_code, 302)
        person = Person.objects.last()
        self.assertEqual(person.name, 'ben')

    def test_search(self):
        response = self.client.get('/search/', {'name': 'cody', 'email': 'cody@gmail.com'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['people']), 1)
        response = self.client.get('/search/', {'name': 'jane', 'email': 'jane@gmail.com'})
        self.assertEqual(len(response.context['people']), 0)

class PersonTestForm(TestCase):
    def test_person_form(self):
        form_data = {'name': 'cody', 'email': 'cody@gmail.com'}
        form = PersonForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_person_form_email(self):
        form_data = {'name': 'cody', 'email': 'ben'}
        form = PersonForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_person_form_required(self):
        form_data = {'name': '', 'email': ''}
        form = PersonForm(data=form_data)
        self.assertFalse(form.is_valid())
