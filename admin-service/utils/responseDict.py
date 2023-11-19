from typing import List, Dict


def validationError(message: str, errors: Dict[str, List[str]]):
    return {
        'message': message,
        'errors': errors
    }


def successResponse(message: str, data: Dict):
    return {
        'message': message,
        'data': data
    }


def failResponse(message: str):
    return {
        'message': message,
    }
