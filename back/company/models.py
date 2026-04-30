from django.db import models
from core.models import BaseModel


# Create your models here.
class Company(BaseModel):
    name = models.CharField(max_length=255)
    catchPhrase = models.CharField(max_length=255, blank=True)
    bs = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank = True)
    street = models.CharField(max_length=255, blank = True)
    suite = models.CharField(max_length=255, blank = True)
    zipcode = models.CharField(max_length=255, blank = True)
    phone = models.CharField(max_length=255, blank = True)
    website = models.CharField(max_length=255, blank = True)
    created_at = models.DateTimeField(auto_now_add= True, blank= True)


    class Meta:
       ordering = ["-created_at"]


    def __str__(self):
        return self.name