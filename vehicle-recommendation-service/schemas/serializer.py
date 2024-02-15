class Serializer:
    # exclude = []

    def __init__(self, data=dict, exclude=None | list):
        if data:
            for key, value in data.items():
                if isinstance(value, object):
                    value = str(value)
                if key not in exclude:
                    setattr(self, key, value)
        else:
            raise ValueError("Data is required")

    # serialize all Dictionary
    @staticmethod
    def serializeList(list: list, exclude=None | list) -> list:
        return [Serializer(data=dic, exclude=exclude) for dic in list]
