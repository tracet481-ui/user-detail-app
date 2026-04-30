from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register("", UserViewSet, basename="users")

urlpatterns = router.urls



# ------------------------------------------------------


# from django.urls import path
# from .views import user_list, user_detail 

# urlpatterns = [
#     path('users/', user_list),
#     path('users/<uuid:id>/', user_detail),
#     # path('posts/', post_list),
#     # path('albums/', album_list),
#     # path('todos/', todo_list),
# ]