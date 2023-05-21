
# #FUNCTION
# # [2,3,4,5] = 3.5
# # [2,5] = 3.5 
# result =[]
# def average(array):
#     countAverage = 0
#     for val in array:
#         countAverage += val
#     return countAverage / len(array)


# numberInput = int(input('Enter number: '))
# for index in range(numberInput):
#     inputArray = eval(input('Enter array value: '))
#     result.append(average(inputArray))
# print(average(result))

# Enter your code here. Read input from STDIN. Print output to STDOUT

onlyThreeItem =[]
counter =0
starter =0
isContinue = True
def ThreeConsecutive(array):
    return array[2] == array[1] + 1 and array[1] == array[0] + 1
def upperThan(value):
    return value > 95
while (isContinue and starter < 8):
    inputValue = int(input('Enter number: '))
    onlyThreeItem.append(inputValue)
    starter += 1
    counter += inputValue
    if upperThan(counter):
        isContinue = False
    elif len(onlyThreeItem) == 3:
        if(ThreeConsecutive(onlyThreeItem)):
            isContinue = False
        onlyThreeItem =[]
if(isContinue or starter>=8):
    print('YOU LOST')
else:
    print('YOU WIN')