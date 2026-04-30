from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Album, Photo
from .serializers import AlbumSerializer, PhotoSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    serializer_class = AlbumSerializer

    def get_queryset(self):
        queryset = Album.objects.all()
        user_id = self.request.query_params.get("user")

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset

    @action(detail=True, methods=["get", "post"], url_path="photos")
    def photos(self, request, pk=None):
        album = self.get_object()

        if request.method == "GET":
            photos = album.photos.all()
            serializer = PhotoSerializer(
                photos,
                many=True,
                context={"request": request}
            )
            return Response(serializer.data)

        serializer = PhotoSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save(album=album)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer