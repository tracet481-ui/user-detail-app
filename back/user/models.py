from django.db import models
from core.models import BaseModel


class User(BaseModel):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    website = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    # company = models.CharField(max_length=100, blank=True, null=True)
    from company.models import Company


    def __str__(self):
        return self.name
    


    company = models.ForeignKey(
        Company,
        on_delete = models.SET_NULL,
        null = True,
        blank = True,
        related_name = "users"
    )


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
    




