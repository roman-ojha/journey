from typing import List, Dict
from rest_framework.response import Response


class CreateResponse:
    def validationError(errors: Dict[str, List[str]], message: str = "The given data was invalid"):
        return {
            'message': message,
            'errors': errors
        }

    def successResponse(message: str = "Response Successfully", data: Dict = None):
        if data == None:
            return {
                'message': message
            }
        return {
            'message': message,
            'data': data
        }

    def failResponse(message: str = "Internal Server Error"):
        return {
            'message': message,
        }
