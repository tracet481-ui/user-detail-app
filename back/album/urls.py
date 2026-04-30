from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import AlbumViewSet, PhotoViewSet

router = DefaultRouter()
router.register("", AlbumViewSet, basename="albums")

urlpatterns = router.urls + [
        path(
            "photos/<uuid:pk>/",
            PhotoViewSet.as_view({
                "get": "retrieve",
                "delete": "destroy",
            }),
            name="photo-detail"
        ),
]