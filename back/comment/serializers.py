from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        # fields = "__all__"
        fields = [
            "id",
            "post",
            "name",
            "email",
            "body",
            "created_at",
            "updated_at",
            
        ]