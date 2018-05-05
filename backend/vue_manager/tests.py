from rest_framework import status
from people_manager.models import Person
from django.test import TestCase, Client

class VueManagerTestViews(TestCase):
    def setUp(self):
        Person.objects.create(name='cody',email='cody@gmail.com')
        Person.objects.create(name='geoff',email='geoff@gmail.com')
        self.client = Client()

    def test_get(self):
        response = self.client.get('/vue_manager/people/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_post(self):
        response = self.client.post('/vue_manager/people/', {'name': 'ben', 'email': 'ben@gmail.com'}, follow=True)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Person.objects.count(), 3)
        self.assertEqual(Person.objects.get(name='ben').name, 'ben')
