from django.db import models
from core.models import BaseModel
from django.contrib.auth.hashers import make_password, check_password



class User(BaseModel):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    # phone = models.CharField(max_length=50, blank=True, null=True)
    # website = models.CharField(max_length=100, blank=True, null=True)
    # city = models.CharField(max_length=100, blank=True, null=True)
    # company = models.CharField(max_length=100, blank=True, null=True)
    # from company.models import Company
    password = models.CharField(max_length = 255, default = "12345" )

    # def __str__(self):
    #     return self.name
    


    company = models.ForeignKey(
        "company.Company",
        # Company,
        on_delete = models.SET_NULL,
        null = True,
        blank = True,
        related_name = "users"
    )


def set_password(self, raw_password):
    self.password = make_password(raw_password)

def check_password(self, raw_password):
    return check_password(raw_password, self.password)
    


    def save ( self, *args, **kwargs ): 
        if self.password and not self.password.startswith("pbkdf2_") :
            self.password = make_password (self.password)


        super().save( *args, **kwargs ) 



    def __str__ (self) :
        return self.name 


# class Post(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
#     title = models.CharField(max_length=255)
#     body = models.TextField()

#     def __str__(self):
#         return self.title


# class Album(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='albums')
#     title = models.CharField(max_length=255)

#     def __str__(self):
#         return self.title


# class Todo(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
#     title = models.CharField(max_length=255)
#     completed = models.BooleanField(default=False)

#     def __str__(self):
#         return self.title
    




