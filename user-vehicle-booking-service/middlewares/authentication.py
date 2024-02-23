from django.http.request import HttpRequest
from utils.decryptWithPrivateKey import decrypt_with_private_key
import json
from rest_framework.request import Request as RestRequest


class AuthUser:
    id: int | None = None
    email: str | None = None
    number: int | None = None
    f_name: str | None = None
    l_name: str | None = None
    picture: str | None = None
    gender: str | None = None

    def __init__(self, user: dict | None) -> None:
        if user:
            for key, value in user.items():
                setattr(self, key, value)

    def is_authenticated(self):
        if self.id is not None or self.email is not None:
            return True
        return False


# Newly created request class that extends RestRequest to use for views
class Request(RestRequest):
    auth_user: AuthUser


class ParseUserCredential:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest):
        decryptedUser = request.headers.get('x-user')
        if decryptedUser:
            try:
                user = json.loads(
                    decrypt_with_private_key(decryptedUser))
                # if user.get('id') is not None and user.get('email') is not None:
                #     request.auth_user = user
                request.auth_user = AuthUser(user)
            except json.JSONDecodeError:
                request.auth_user = AuthUser(None)
            except:
                request.auth_user = AuthUser(None)
        else:
            request.auth_user = AuthUser(None)

        return self.get_response(request)
