from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer

class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        user = self.request.query_params.get("user")

        if user:
            queryset = queryset.filter(user_id=user)

        return queryset