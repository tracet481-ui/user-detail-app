from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



# -----------------------------------------------------------------------------------------

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status

# from .models import User
# from .serializers import UserSerializer

# @api_view(['GET', 'POST'])
# def user_list(request):
#     if request.method == 'GET':
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)

#     serializer = UserSerializer(users, many= True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#         return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    


# @api_view(['GET'])
# def user_detail(request, id):
#     try:
#         user = User.objects.get(id=id)
#     except User.DoesNotExist:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#     serializer = UserSerializer(user)
#     return Response(serializer.data)

# # -----------------------------------------------------------------------------------------------------------------
# # @api_view(['GET'])
# # def post_list(request):
# #     user_id = request.GET.get('userId')
# #     posts = Post.objects.filter(user_id=user_id) if user_id else Post.objects.all()
# #     serializer = PostSerializer(posts, many=True)
# #     return Response(serializer.data)


# # @api_view(['GET'])
# # def album_list(request):
# #     user_id = request.GET.get('userId')
# #     albums = Album.objects.filter(user_id=user_id) if user_id else Album.objects.all()
# #     serializer = AlbumSerializer(albums, many=True)
# #     return Response(serializer.data)


# # @api_view(['GET'])
# # def todo_list(request):
# #     user_id = request.GET.get('userId')
# #     todos = Todo.objects.filter(user_id=user_id) if user_id else Todo.objects.all()
# #     serializer = TodoSerializer(todos, many=True)
# #     return Response(serializer.data)