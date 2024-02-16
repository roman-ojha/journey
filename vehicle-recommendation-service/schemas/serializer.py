class Serializer:
    # exclude = []
    # data: dict | list = []

    def __init__(self, data: dict | list | None, many=False, exclude: list = []):
        if data == None:
            raise ValueError("Data is required")
        elif many == False:
            tempData = {}
            for key, value in data.items():
                if isinstance(value, object):
                    value = str(value)
                if key not in exclude:
                    # setattr(self, key, value)
                    tempData[key] = value
            print(tempData)
            self.data = tempData
        elif many == True:
            tempData = []
            for dic in data:
                tempDic = {}
                for key, value in dic.items():
                    if isinstance(value, object):
                        value = str(value)
                    if key not in exclude:
                        # setattr(self, key, value)
                        tempDic[key] = value
                tempData.append(tempDic)
            # setattr(self, "data", tempData)
            self.data = tempData
        else:
            self.data = None

    # serialize all Dictionary
    @staticmethod
    def serializeList(list: list, exclude=[]) -> list:
        return [Serializer(data=dic, exclude=exclude) for dic in list]
