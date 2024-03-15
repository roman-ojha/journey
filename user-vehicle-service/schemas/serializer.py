from bson import ObjectId


class Serializer:
    def __init__(self, data: dict | list | None, many=False, exclude: list = []):
        if data == None:
            raise ValueError("Data is required")
        elif many == False:
            tempData = {}
            for key, value in data.items():
                if isinstance(value, ObjectId):
                    value = str(value)
                if isinstance(value, dict):
                    value = Serializer(data=value).data
                if isinstance(value, list):
                    value = Serializer(data=value, many=True).data
                if key not in exclude:
                    # setattr(self, key, value)
                    tempData[key] = value
            self.data = tempData
        elif many == True:
            self.data = [Serializer(
                data=dic, exclude=exclude).data for dic in data]
        else:
            self.data = None

    # serialize all Dictionary
    @staticmethod
    def serializeList(list: list, exclude=[]) -> list:
        return [Serializer(data=dic, exclude=exclude) for dic in list]
