from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UserViewSet, login_user

router = DefaultRouter()
router.register("", UserViewSet, basename="users")

# urlpatterns = router.urls


urlpatterns = [
    path("login/", login_user),
    path("", include(router.urls)),
]


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