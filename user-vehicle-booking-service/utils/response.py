from typing import List, Dict


class CreateResponse:
    @staticmethod
    def validationError(errors: Dict[str, List[str]], message: str = "The given data was invalid"):
        return {
            'message': message,
            'errors': errors
        }

    # TODO: Improve Success response with other Express project
    @staticmethod
    def successResponse(message: str = "Response Successfully", data: Dict = None):
        if data == None:
            return {
                'message': message
            }
        return {
            'message': message,
            'data': data
        }

    @staticmethod
    def failResponse(message: str = "Internal Server Error"):
        return {
            'message': message,
        }
