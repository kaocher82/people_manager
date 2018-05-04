from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Person
from .forms import PersonForm

def index(request):
    people = Person.objects.order_by('name')
    context = {'people': people, 'form': PersonForm()}
    return render(request, 'people_manager/index.html', context)

def show(request, id):
    person = get_object_or_404(Person, pk=id)
    return render(request, 'people_manager/show.html', {'person': person})

def new(request):
    if request.method == 'POST':
        person = PersonForm(request.POST)
        if person.is_valid():
            person.save()
            return HttpResponseRedirect(reverse('people_manager:index'))
    else:
        return render(
            request,
            'people_manager/new.html',
            {'form': PersonForm()}
        )

def search(request):
    name = request.GET.get('name', '')
    email = request.GET.get('email', '')
    form = PersonForm(initial={'name': name, 'email': email})
    people = Person.objects.filter(name=name, email=email)
    return render(
        request,
        'people_manager/search.html',
        {
            'people': people,
            'form': form,
            'search': { 'name': name, 'email': email }
        }
    )
