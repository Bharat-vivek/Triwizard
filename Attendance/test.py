import pickle
with open('function.pkl','rb') as file:
    f = pickle.loads(file)
    print(f('images/Gopal.jpg'))
