from rest_framework import serializers
from .models import User
from company.serializers import CompanySerializer

class UserSerializer(serializers.ModelSerializer):

    company_detail = CompanySerializer(source="company" , read_only=True)
    

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "username",
            "email",
            "password",
            "company",
            "company_detail",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "password": {"write_only": True, "required": False},
        }




    # class Meta:
    #     model = User
    #     fields = '__all__'


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = "__all__"



# class AlbumSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Album
#         fields = "__all__"



# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = "__all__"



