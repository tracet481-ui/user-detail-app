

from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [ 
    path('admin/', admin.site.urls),
    # path('api/', include('user.urls')),
    path("api/users/", include("user.urls")),
    path("api/posts/", include("post.urls")),
    # path('api/', include('album.urls')),
    path("api/albums/", include("album.urls")),
    path("api/todos/", include("todo.urls")),
    path("api/comments/", include("comment.urls")),
    path("api/companies/", include("company.urls")),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)