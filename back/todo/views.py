from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.select_related("user").all()
        user_id = self.request.query_params.get("user")

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset