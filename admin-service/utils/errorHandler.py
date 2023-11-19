from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    response = exception_handler(exc=exc, context=context)
    if response.status_code == 400:
        response.data = {
            'message': "The given data was invalid",
            'errors': response.data
        }
    elif response.status_code == 401:
        response.data = {
            'message': response.data['detail']
        }
    elif response.status_code >= 500:
        response.data = {
            'message': "Internal Server Error"
        }
    return response
