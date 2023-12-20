from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    customer_number = models.CharField(max_length=50)
    meter_serial_number = models.CharField(max_length=50)

    def __str__(self):
        return self.name
