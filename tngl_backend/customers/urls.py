from django.urls import path
from .views import CustomerListView, CustomerDetailView, CreateCustomerView


urlpatterns = [
    path('customers/', CustomerListView.as_view(), name='customer-list'),
    path('customers/create/', CreateCustomerView.as_view(), name='create-customer'),  # Replace CreateCustomerView with your actual view
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
]
