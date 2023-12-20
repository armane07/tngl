# from rest_framework import generics import RetrieveAPIView
from rest_framework.generics import RetrieveAPIView,ListCreateAPIView

from .models import Customer
from django.views.decorators.csrf import csrf_exempt
from .serializers import CustomerSerializer
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status



class CustomerListView(ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailView(RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CustomerSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response("Customer deleted", status=status.HTTP_204_NO_CONTENT)

    def get(self, request):
        customer_number = request.query_params.get('customer_number', None)
        if customer_number:
            try:
                customer = Customer.objects.get(customer_number=customer_number)
                serializer = CustomerSerializer(customer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Customer.DoesNotExist:
                return Response("Customer not found", status=status.HTTP_404_NOT_FOUND)
        return Response("Invalid customer number", status=status.HTTP_400_BAD_REQUEST)    


from django.views import View
from django.shortcuts import render, redirect
from .forms import CustomerForm


class CreateCustomerView(View):
    def get(self, request):
        form = CustomerForm()
        return render(request, 'create_customer.html', {'form': form})

    def post(self, request):
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('customer_list')  
        return render(request, 'create_customer.html', {'form': form})

