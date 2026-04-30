from django.db import models
from user.models import User
from core.models import BaseModel



class Todo(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title