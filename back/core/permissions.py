from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError


class HasValidJWT(BasePermission):
    message = "Token yok veya geçersiz."

    def has_permission(self, request, view):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return False

        if auth_header.startswith("JWT "):
            token = auth_header.replace("JWT ", "").strip()
        elif auth_header.startswith("Bearer "):
            token = auth_header.replace("Bearer ", "").strip()
        else:
            return False

        try:
            AccessToken(token)
            return True
        except TokenError:
            return False