from django.db import models
from user.models import User
from core.models import BaseModel


class Album(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='albums'
    )

    title = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Photo(BaseModel):
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name='photos'
    )

    title = models.CharField(
        max_length=255,
        blank=True
    )

    image = models.ImageField(
        upload_to='album_photos/'
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title or str(self.id)